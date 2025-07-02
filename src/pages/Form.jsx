import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Send, 
  ArrowLeft, 
  CheckCircle,
  AlertCircle,
  Clock,
  Globe,
  Loader2
} from 'lucide-react';
import toastManager from '../utils/toastManager';
import { Toaster } from 'react-hot-toast';
import api from '../api/axios';
import SkeletonLoader, { FormSkeleton } from '../components/SkeletonLoader';

const Form = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch form data on component mount
  useEffect(() => {
    fetchForm();
  }, [slug]);

  const fetchForm = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching form with slug:', slug);
      console.log('API URL:', `/api/forms/public/${slug}`);
      
      const response = await api.get(`/api/forms/public/${slug}`);
      
      console.log('Form API response:', response.data);
      
      if (response.data.success) {
        const formData = response.data.data.form;
        setForm(formData);
        
        // Check if form is active
        if (!formData.isActive) {
          setError('This form is no longer accepting submissions.');
          return;
        }
        
        // Check submission deadline
        if (formData.settings?.submissionDeadline) {
          const deadline = new Date(formData.settings.submissionDeadline);
          if (new Date() > deadline) {
            setError('The submission deadline for this form has passed.');
            return;
          }
        }
        
        // Initialize form data with default values
        const initialData = {};
        formData.fields.forEach(field => {
          initialData[field.name] = field.type === 'checkbox' ? false : '';
        });
        setFormData(initialData);
      }
    } catch (err) {
      console.error('Error fetching form:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        url: err.config?.url
      });
      
      if (err.response?.status === 404) {
        setError('Form not found. Please check the link and try again.');
      } else if (err.response?.status === 401) {
        setError('Authentication error. Please try again.');
      } else if (err.response?.status === 403) {
        setError('Access denied. This form may be private.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to load form. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
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
  };

  const validateForm = () => {
    const errors = {};
    
    form.fields.forEach(field => {
      if (field.required) {
        const value = formData[field.name];
        
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors[field.name] = `${field.label} is required`;
        }
      }
      
      // Email validation
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          errors[field.name] = 'Please enter a valid email address';
        }
      }
      
      // Phone validation
      if (field.type === 'tel' && formData[field.name]) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(formData[field.name])) {
          errors[field.name] = 'Please enter a valid phone number';
        }
      }
      
      // Length validation
      if (field.validation) {
        const value = formData[field.name];
        if (value && field.validation.minLength && value.length < field.validation.minLength) {
          errors[field.name] = `Must be at least ${field.validation.minLength} characters`;
        }
        if (value && field.validation.maxLength && value.length > field.validation.maxLength) {
          errors[field.name] = `Must be no more than ${field.validation.maxLength} characters`;
        }
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toastManager.error(null, 'Please fix the errors in the form');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Prepare submission data
      const submissionData = {
        studentInfo: {
          fullName: formData.fullName || '',
          email: formData.email || '',
          phoneNumber: formData.phone || formData.phoneNumber || '',
          dateOfBirth: formData.dateOfBirth || '',
          address: {
            street: formData.address || '',
            city: formData.city || '',
            state: formData.state || '',
            country: formData.country || '',
            zipCode: formData.zipCode || ''
          }
        },
        formData: formData // Include all form data for custom fields
      };
      
      const response = await api.post(`/api/forms/${form._id}/submit`, submissionData);
      
      if (response.data.success) {
        toastManager.success('Application submitted successfully!');
        
        // Reset form
        const initialData = {};
        form.fields.forEach(field => {
          initialData[field.name] = field.type === 'checkbox' ? false : '';
        });
        setFormData(initialData);
        setValidationErrors({});
        
        // Show success message
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      const errorMessage = err.response?.data?.message || 'Failed to submit application. Please try again.';
      toastManager.error(err, errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      placeholder: field.placeholder,
      className: `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        validationErrors[field.name] ? 'border-red-500' : 'border-gray-300'
      }`,
      value: formData[field.name] || '',
      onChange: (e) => handleInputChange(field.name, e.target.value)
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
      case 'number':
        return (
          <input
            type={field.type}
            {...commonProps}
          />
        );
        
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
            className={`${commonProps.className} resize-none`}
          />
        );
        
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select {field.label}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={formData[field.name] || false}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={field.name} className="text-sm text-gray-700">
              {field.label}
            </label>
          </div>
        );
        
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${field.name}_${index}`}
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={`${field.name}_${index}`} className="text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
        
      case 'date':
        return (
          <input
            type="date"
            {...commonProps}
          />
        );
        
      default:
        return (
          <input
            type="text"
            {...commonProps}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <SkeletonLoader.Styles />
        <div className="max-w-2xl mx-auto px-4">
          {/* Header skeleton */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <SkeletonLoader.Skeleton width="w-24" height="h-5" />
              <SkeletonLoader.Skeleton width="w-20" height="h-5" />
            </div>
            <SkeletonLoader.Skeleton width="w-64" height="h-8" className="mb-2" />
            <SkeletonLoader.Skeleton width="w-96" height="h-4" className="mb-4" />
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <SkeletonLoader.Skeleton width="w-48" height="h-4" />
            </div>
          </div>
          
          {/* Form skeleton */}
          <FormSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Form Unavailable</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Form Not Found</h1>
          <p className="text-gray-600 mb-6">The form you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>
            {form.language && (
              <div className="flex items-center text-sm text-gray-500">
                <Globe className="w-4 h-4 mr-1" />
                {form.language.name}
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{form.name}</h1>
          {form.description && (
            <p className="text-gray-600">{form.description}</p>
          )}
          
          {form.settings?.submissionDeadline && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center text-yellow-800">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  Submission deadline: {new Date(form.settings.submissionDeadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((field) => (
                <div key={field.name} className="space-y-2">
                  {field.type !== 'checkbox' && (
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                  )}
                  
                  {renderField(field)}
                  
                  {field.helpText && (
                    <p className="text-xs text-gray-500">{field.helpText}</p>
                  )}
                  
                  {validationErrors[field.name] && (
                    <p className="text-xs text-red-500">{validationErrors[field.name]}</p>
                  )}
                </div>
              ))}
            
            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by Langzy - Language Learning Platform</p>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
              color: '#fff',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#EF4444',
              color: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default Form;
