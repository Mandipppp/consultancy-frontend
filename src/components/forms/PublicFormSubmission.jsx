import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  X, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Image as ImageIcon,
  Download,
  Eye,
  Loader2,
  Send,
  ArrowLeft
} from 'lucide-react';
import apiService from '../../services/api';

const PublicFormSubmission = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  const [formResponses, setFormResponses] = useState({});
  const [fileUploads, setFileUploads] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  // Load form data
  useEffect(() => {
    const loadForm = async () => {
      try {
        setLoading(true);
        const response = await apiService.getFormById(formId);
        
        if (response.success) {
          setForm(response.data.form);
          // Initialize form responses
          const initialResponses = {};
          response.data.form.fields.forEach(field => {
            initialResponses[field.name] = '';
          });
          setFormResponses(initialResponses);
        } else {
          setError('Form not found');
        }
      } catch (err) {
        console.error('Load form error:', err);
        setError('Failed to load form');
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      loadForm();
    }
  }, [formId]);

  // Handle input changes
  const handleInputChange = useCallback((fieldName, value) => {
    setFormResponses(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  }, [validationErrors]);

  // Handle file uploads
  const handleFileUpload = useCallback(async (fieldName, files) => {
    try {
      const field = form.fields.find(f => f.name === fieldName);
      const isMultiple = field?.fileUpload?.allowMultiple;
      
      // Validate file size and type
      const maxSize = field?.fileUpload?.maxSize || (10 * 1024 * 1024); // 10MB default
      const acceptedTypes = field?.fileUpload?.acceptedTypes || [];
      
      const filesToUpload = Array.from(files);
      
      // Validate each file
      for (const file of filesToUpload) {
        if (file.size > maxSize) {
          throw new Error(`File ${file.name} is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
        }
        
        if (acceptedTypes.length > 0) {
          const fileExt = '.' + file.name.split('.').pop().toLowerCase();
          if (!acceptedTypes.includes(fileExt)) {
            throw new Error(`File type ${fileExt} is not allowed for ${file.name}`);
          }
        }
      }

      // Upload files
      setFileUploads(prev => ({
        ...prev,
        [fieldName]: { uploading: true, files: filesToUpload }
      }));

      let uploadResults;
      if (isMultiple) {
        uploadResults = await apiService.uploadMultipleFiles(filesToUpload, field?.fileUpload?.folder);
      } else {
        const result = await apiService.uploadFile(filesToUpload[0], field?.fileUpload?.folder);
        uploadResults = [result];
      }

      // Update file uploads state
      setFileUploads(prev => ({
        ...prev,
        [fieldName]: { 
          uploading: false, 
          files: filesToUpload,
          uploadResults: uploadResults.map(result => result.data || result)
        }
      }));

      // Update form responses
      if (isMultiple) {
        handleInputChange(fieldName, uploadResults.map(result => result.data || result));
      } else {
        handleInputChange(fieldName, uploadResults[0].data || uploadResults[0]);
      }

    } catch (error) {
      console.error('File upload error:', error);
      setFileUploads(prev => ({
        ...prev,
        [fieldName]: { uploading: false, error: error.message }
      }));
    }
  }, [form, handleInputChange]);

  // Remove uploaded file
  const removeUploadedFile = useCallback((fieldName, fileIndex) => {
    const currentUploads = fileUploads[fieldName];
    if (!currentUploads) return;

    const newFiles = currentUploads.files.filter((_, index) => index !== fileIndex);
    const newResults = currentUploads.uploadResults?.filter((_, index) => index !== fileIndex);

    setFileUploads(prev => ({
      ...prev,
      [fieldName]: {
        ...currentUploads,
        files: newFiles,
        uploadResults: newResults
      }
    }));

    // Update form responses
    const field = form.fields.find(f => f.name === fieldName);
    if (field?.fileUpload?.allowMultiple) {
      handleInputChange(fieldName, newResults || []);
    } else {
      handleInputChange(fieldName, newResults?.[0] || '');
    }
  }, [fileUploads, form, handleInputChange]);

  // Validate form
  const validateForm = useCallback(() => {
    const errors = {};
    
    form.fields.forEach(field => {
      if (field.required) {
        const value = formResponses[field.name];
        if (!value || (Array.isArray(value) && value.length === 0) || 
            (typeof value === 'string' && value.trim() === '')) {
          errors[field.name] = `${field.label} is required`;
        }
      }

      // Validate email format
      if (field.type === 'email' && formResponses[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formResponses[field.name])) {
          errors[field.name] = 'Please enter a valid email address';
        }
      }

      // Validate phone format
      if (field.type === 'phone' && formResponses[field.name]) {
        const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(formResponses[field.name])) {
          errors[field.name] = 'Please enter a valid phone number';
        }
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form, formResponses]);

  // Submit form
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      
      // Prepare submission data
      const submissionData = {
        studentInfo: {
          fullName: formResponses.full_name || formResponses.name || '',
          email: formResponses.email || '',
          phoneNumber: formResponses.phone_number || formResponses.phone || '',
        },
        responses: formResponses,
        submissionSource: 'website'
      };

      const response = await apiService.submitApplication(formId, submissionData);
      
      if (response.success) {
        setSubmitted(true);
      } else {
        throw new Error(response.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError(`Failed to submit form: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  }, [formId, formResponses, validateForm]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Loading form...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Form Not Found</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Success state
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your application. We have received your submission and will review it shortly.
          </p>
          <button
            onClick={() => navigate('/')}
            className="flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Form Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{form.name}</h1>
          {form.description && (
            <p className="text-gray-600">{form.description}</p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            {form.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={formResponses[field.name]}
                onChange={(value) => handleInputChange(field.name, value)}
                onFileUpload={(files) => handleFileUpload(field.name, files)}
                fileUpload={fileUploads[field.name]}
                onRemoveFile={(fileIndex) => removeUploadedFile(field.name, fileIndex)}
                error={validationErrors[field.name]}
              />
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Individual Form Field Component
const FormField = ({ field, value, onChange, onFileUpload, fileUpload, onRemoveFile, error }) => {
  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Choose an option...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option.value)}
                  onChange={(e) => {
                    const currentValues = value || [];
                    if (e.target.checked) {
                      onChange([...currentValues, option.value]);
                    } else {
                      onChange(currentValues.filter(v => v !== option.value));
                    }
                  }}
                  className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'file':
        return <FileUploadField 
          field={field} 
          onFileUpload={onFileUpload}
          fileUpload={fileUpload}
          onRemoveFile={onRemoveFile}
          error={error}
        />;

      default:
        return (
          <input
            type={field.type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderField()}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {field.helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{field.helpText}</p>
      )}
    </div>
  );
};

// File Upload Field Component
const FileUploadField = ({ field, onFileUpload, fileUpload, onRemoveFile, error }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files?.length > 0) {
      onFileUpload(files);
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const getFileTypeDisplay = (purpose) => {
    const types = {
      'photos': 'PNG, JPG, JPEG',
      'documents': 'PDF, DOC, DOCX',
      'certificates': 'PDF, JPG, PNG',
      'transcripts': 'PDF only',
      'cv': 'PDF, DOC, DOCX',
      'passport': 'JPG, PNG, PDF',
      'test-scores': 'PDF, JPG, PNG',
      'any': 'All file types'
    };
    return types[purpose] || 'PDF, DOC, JPG, PNG';
  };

  const getAcceptTypes = (purpose) => {
    const types = {
      'photos': '.png,.jpg,.jpeg',
      'documents': '.pdf,.doc,.docx',
      'certificates': '.pdf,.jpg,.jpeg,.png',
      'transcripts': '.pdf',
      'cv': '.pdf,.doc,.docx',
      'passport': '.jpg,.jpeg,.png,.pdf',
      'test-scores': '.pdf,.jpg,.jpeg,.png',
      'any': '.pdf,.doc,.docx,.jpg,.jpeg,.png'
    };
    return types[purpose] || '.pdf,.doc,.docx,.jpg,.jpeg,.png';
  };

  return (
    <div className="space-y-3">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input
          type="file"
          multiple={field.fileUpload?.allowMultiple}
          accept={getAcceptTypes(field.uploadPurpose)}
          onChange={(e) => e.target.files?.length > 0 && onFileUpload(e.target.files)}
          className="hidden"
          id={`file-${field.name}`}
        />
        
        <label htmlFor={`file-${field.name}`} className="cursor-pointer">
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600 font-medium mb-1">
            {field.fileUpload?.allowMultiple ? 'Choose files or drag & drop' : 'Choose file or drag & drop'}
          </p>
          <p className="text-sm text-gray-500">
            {getFileTypeDisplay(field.uploadPurpose)} up to {(field.fileUpload?.maxSize || 10485760) / (1024 * 1024)}MB
          </p>
        </label>
      </div>

      {/* Upload Instructions */}
      {field.uploadInstructions && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-800">
            💡 {field.uploadInstructions}
          </p>
        </div>
      )}

      {/* Upload Status */}
      {fileUpload && (
        <div className="space-y-2">
          {fileUpload.uploading && (
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Uploading files...</span>
            </div>
          )}

          {fileUpload.error && (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{fileUpload.error}</span>
            </div>
          )}

          {fileUpload.files?.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-3">
                {file.type?.startsWith('image/') ? (
                  <ImageIcon className="w-5 h-5 text-blue-500" />
                ) : (
                  <FileText className="w-5 h-5 text-gray-500" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {fileUpload.uploadResults?.[index] && (
                  <span className="text-xs text-green-600 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Uploaded
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onRemoveFile(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicFormSubmission; 