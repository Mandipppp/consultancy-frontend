// API Service for Form Management (Frontend)
import api from '../api/axios';

class ApiService {
  constructor() {
    this.api = api;
  }

  // Helper method for making requests with proper error handling
  async makeRequest(endpoint, options = {}) {
    try {
      let response;
      
      if (options.method) {
        // For POST, PUT, DELETE requests
        response = await this.api({
          url: endpoint,
          method: options.method,
          data: options.body,
          headers: options.headers,
          ...options
        });
      } else {
        // For GET requests
        response = await this.api.get(endpoint, options);
      }

      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      };
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'An unexpected error occurred';
      
      return {
        success: false,
        error: errorMessage,
        message: errorMessage
      };
    }
  }

  // ===========================================
  // FORM MANAGEMENT
  // ===========================================

  /**
   * Create a new form
   */
  async createForm(formData) {
    const payload = {
      name: formData.title || formData.name,
      description: formData.description || '',
      fields: this.mapFieldsForBackend(formData.fields || []),
      category: formData.category || 'general',
      language: formData.language || null,
      isActive: formData.isActive !== undefined ? formData.isActive : true,
      emailNotifications: {
        enabled: true,
        adminEmails: [],
        autoReplyTemplate: {
          subject: `Thank you for your application to ${formData.title || formData.name}`,
          message: 'We have received your application and will review it shortly.'
        }
      },
      settings: {
        allowMultipleSubmissions: false,
        maxSubmissions: 1,
        requiresApproval: true,
        maxCapacity: null,
        submissionDeadline: null
      }
    };

    return this.makeRequest('/api/forms/create', {
      method: 'POST',
      body: payload,
    });
  }

  /**
   * Get all forms
   */
  async getAllForms(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/forms${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  /**
   * Get form by ID (Public access)
   */
  async getFormById(formId) {
    return this.makeRequest(`/api/forms/${formId}`);
  }

  /**
   * Update form
   */
  async updateForm(formId, formData) {
    const payload = {
      name: formData.title || formData.name,
      description: formData.description || '',
      fields: this.mapFieldsForBackend(formData.fields || []),
      category: formData.category || 'general',
      language: formData.language || null,
      isActive: formData.isActive !== undefined ? formData.isActive : true,
    };

    return this.makeRequest(`/api/forms/${formId}`, {
      method: 'PUT',
      body: payload,
    });
  }

  /**
   * Delete form
   */
  async deleteForm(formId, permanent = false) {
    const endpoint = `/api/forms/${formId}${permanent ? '?permanent=true' : ''}`;
    return this.makeRequest(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * Get languages for form creation
   */
  async getLanguages() {
    return this.makeRequest('/api/forms/languages');
  }

  // ===========================================
  // FORM SUBMISSION (Public)
  // ===========================================

  /**
   * Submit application form (public endpoint)
   */
  async submitApplication(formId, applicationData) {
    // Process file uploads first
    const processedData = await this.processFormSubmission(applicationData);
    
    return this.makeRequest(`/api/forms/${formId}/submit`, {
      method: 'POST',
      body: processedData,
    });
  }

  // ===========================================
  // FILE UPLOAD HANDLING
  // ===========================================

  /**
   * Upload file to Cloudinary via backend
   */
  async uploadFile(file, folder = 'langzy/forms') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const response = await this.api.post('/api/upload/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('File upload error:', error);
      throw new Error(error.response?.data?.message || 'Failed to upload file');
    }
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(files, folder = 'langzy/forms') {
    const uploadPromises = files.map(file => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }

  // ===========================================
  // APPLICATION MANAGEMENT
  // ===========================================

  /**
   * Get all applications
   */
  async getAllApplications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/applications${queryString ? `?${queryString}` : ''}`;
    return this.makeRequest(endpoint);
  }

  /**
   * Get application by ID
   */
  async getApplicationById(applicationId) {
    return this.makeRequest(`/api/applications/${applicationId}`);
  }

  /**
   * Update application status
   */
  async updateApplicationStatus(applicationId, statusData) {
    return this.makeRequest(`/api/applications/${applicationId}/status`, {
      method: 'PUT',
      body: statusData,
    });
  }

  // ===========================================
  // HELPER METHODS
  // ===========================================

  /**
   * Map frontend field format to backend format
   */
  mapFieldsForBackend(fields) {
    return fields.map((field, index) => ({
      name: this.generateFieldName(field.label || `field_${index + 1}`),
      label: field.label || `Field ${index + 1}`,
      type: this.mapFieldType(field.type),
      required: Boolean(field.required),
      placeholder: field.placeholder || '',
      helpText: field.helpText || '',
      order: field.order !== undefined ? field.order : index,
      options: this.mapFieldOptions(field),
      validation: this.mapFieldValidation(field),
      // File upload specific properties
      ...(field.type === 'file' && {
        fileUpload: {
          maxSize: parseInt(field.maxSize || 10) * 1024 * 1024, // Convert MB to bytes
          acceptedTypes: this.getFileAcceptTypes(field.uploadPurpose),
          allowMultiple: Boolean(field.allowMultiple),
          folder: `langzy/forms/${field.uploadPurpose || 'documents'}`
        }
      })
    }));
  }

  /**
   * Generate field name from label
   */
  generateFieldName(label) {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 50);
  }

  /**
   * Map frontend field types to backend field types
   */
  mapFieldType(frontendType) {
    const typeMapping = {
      'language-selection': 'select',
      'proficiency-level': 'select',
      'education-level': 'select',
      'time-preference': 'select',
      'tel': 'phone',
      'file': 'file'
    };

    return typeMapping[frontendType] || frontendType;
  }

  /**
   * Map field options for select/checkbox fields
   */
  mapFieldOptions(field) {
    if (!field.options || !Array.isArray(field.options)) {
      return [];
    }

    return field.options.map(option => ({
      value: option.value || option.label?.toLowerCase().replace(/\s+/g, '_'),
      label: option.label || option.value,
      id: option.id || undefined
    }));
  }

  /**
   * Map field validation rules
   */
  mapFieldValidation(field) {
    const validation = {};

    if (field.type === 'email') {
      validation.pattern = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$';
      validation.message = 'Please enter a valid email address';
    }

    if (field.type === 'tel' || field.type === 'phone') {
      validation.pattern = '^[+]?[0-9\\s\\-\\(\\)]{10,}$';
      validation.message = 'Please enter a valid phone number';
    }

    if (field.type === 'file') {
      validation.maxSize = parseInt(field.maxSize || 10) * 1024 * 1024;
      validation.acceptedTypes = this.getFileAcceptTypes(field.uploadPurpose);
    }

    return validation;
  }

  /**
   * Get accepted file types based on upload purpose
   */
  getFileAcceptTypes(purpose) {
    const typeMapping = {
      'photos': ['.png', '.jpg', '.jpeg'],
      'documents': ['.pdf', '.doc', '.docx'],
      'certificates': ['.pdf', '.jpg', '.jpeg', '.png'],
      'transcripts': ['.pdf'],
      'cv': ['.pdf', '.doc', '.docx'],
      'passport': ['.jpg', '.jpeg', '.png', '.pdf'],
      'test-scores': ['.pdf', '.jpg', '.jpeg', '.png'],
      'any': ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']
    };

    return typeMapping[purpose] || typeMapping['any'];
  }

  /**
   * Process form submission data including file uploads
   */
  async processFormSubmission(formData) {
    const processedData = { ...formData };

    // Handle file uploads in form responses
    if (processedData.responses) {
      for (const [fieldName, value] of Object.entries(processedData.responses)) {
        if (value instanceof File || (Array.isArray(value) && value[0] instanceof File)) {
          try {
            if (Array.isArray(value)) {
              // Multiple files
              const uploadResults = await this.uploadMultipleFiles(value);
              processedData.responses[fieldName] = uploadResults.map(result => ({
                url: result.data?.url || result.url,
                filename: result.filename || 'uploaded_file',
                size: result.size || 0
              }));
            } else {
              // Single file
              const uploadResult = await this.uploadFile(value);
              processedData.responses[fieldName] = {
                url: uploadResult.data?.url || uploadResult.url,
                filename: uploadResult.filename || value.name,
                size: value.size || 0
              };
            }
          } catch (uploadError) {
            console.error('File upload failed:', uploadError);
            throw new Error(`Failed to upload file for ${fieldName}: ${uploadError.message}`);
          }
        }
      }
    }

    return processedData;
  }

  /**
   * Generate form URL for sharing
   */
  generateFormUrl(formId) {
    return `${window.location.origin}/form/${formId}`;
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService; 