
import { useState } from 'react';

// Basic HTML sanitization function (in production, use DOMPurify)
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    } else if (formData.email.trim().length > 100) {
      newErrors.email = 'Email must be less than 100 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Sanitize all inputs before processing
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        message: sanitizeInput(formData.message)
      };

      console.log('Form submitted with sanitized data:', sanitizedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form on success
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('success');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-form-section">
      <h3 className="form-title">Quick Message</h3>
      
      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="caption text-green-700">✓ Message sent successfully!</p>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="caption text-red-700">✗ Failed to send message. Please try again.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="editorial-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input interactive-input ${errors.name ? 'border-red-300' : ''}`}
            maxLength={50}
            disabled={isSubmitting}
            required
          />
          {errors.name && <p className="caption text-red-600 mt-1">{errors.name}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input interactive-input ${errors.email ? 'border-red-300' : ''}`}
            maxLength={100}
            disabled={isSubmitting}
            required
          />
          {errors.email && <p className="caption text-red-600 mt-1">{errors.email}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message" className="form-label">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`form-textarea interactive-input ${errors.message ? 'border-red-300' : ''}`}
            maxLength={1000}
            disabled={isSubmitting}
            required
          />
          <div className="flex justify-between items-center mt-1">
            {errors.message ? (
              <p className="caption text-red-600">{errors.message}</p>
            ) : (
              <span></span>
            )}
            <p className="caption text-gryd-soft text-xs">
              {formData.message.length}/1000
            </p>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="form-submit interactive-submit"
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          <span className="submit-arrow">↗</span>
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
