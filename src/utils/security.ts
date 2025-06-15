
// Security utility functions

// Rate limiting utility
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {}
  
  canAttempt(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    this.attempts.set(key, validAttempts);
    return validAttempts.length < this.maxAttempts;
  }
  
  recordAttempt(key: string): void {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    attempts.push(now);
    this.attempts.set(key, attempts);
  }
  
  reset(key: string): void {
    this.attempts.delete(key);
  }
}

// Input validation utilities
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 100;
  },
  
  username: (username: string): boolean => {
    return username.length >= 3 && username.length <= 50 && /^[a-zA-Z0-9_]+$/.test(username);
  },
  
  password: (password: string): boolean => {
    return password.length >= 6 && password.length <= 100;
  },
  
  name: (name: string): boolean => {
    return name.trim().length >= 2 && name.trim().length <= 50;
  },
  
  message: (message: string): boolean => {
    return message.trim().length >= 10 && message.trim().length <= 1000;
  }
};

// Basic HTML sanitization (for production, use DOMPurify)
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/data:/gi, '')
    .trim();
};

// Secure token generation
export const generateSecureToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Content Security Policy headers (for reference)
export const securityHeaders = {
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src 'self';
    frame-ancestors 'none';
  `.replace(/\s+/g, ' ').trim(),
  
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

export default {
  RateLimiter,
  validators,
  sanitizeHtml,
  generateSecureToken,
  securityHeaders
};
