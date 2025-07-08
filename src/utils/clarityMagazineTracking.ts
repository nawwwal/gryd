import clarityService from './clarityService';

/**
 * Magazine-specific tracking utilities for THE GRYD
 * These functions provide easy-to-use tracking for common magazine interactions
 */

export class MagazineTracking {
  /**
   * Track article interactions
   */
  static article = {
    /**
     * Track when a user starts reading an article
     */
    startReading: (articleId: string, title: string, category?: string) => {
      clarityService.setTag('article_id', articleId);
      clarityService.setTag('article_title', title);
      if (category) clarityService.setTag('article_category', category);
      clarityService.event('article_start_reading');
    },

    /**
     * Track article reading progress
     */
    trackProgress: (articleId: string, progressPercentage: number, timeSpent: number) => {
      clarityService.setTag('article_id', articleId);
      clarityService.setTag('reading_progress', progressPercentage.toString());
      clarityService.trackPerformance('reading_time', timeSpent, 'seconds');
      clarityService.event(`article_progress_${Math.floor(progressPercentage / 25) * 25}`);
    },

    /**
     * Track article completion
     */
    complete: (articleId: string, totalReadTime: number) => {
      clarityService.setTag('article_id', articleId);
      clarityService.trackPerformance('article_completion_time', totalReadTime, 'seconds');
      clarityService.event('article_completed');
    },

    /**
     * Track article sharing
     */
    share: (articleId: string, platform: string) => {
      clarityService.setTag('article_id', articleId);
      clarityService.setTag('share_platform', platform);
      clarityService.event('article_shared');
    },

    /**
     * Track article bookmarking/saving
     */
    bookmark: (articleId: string) => {
      clarityService.setTag('article_id', articleId);
      clarityService.event('article_bookmarked');
    }
  };

  /**
   * Track navigation and discovery
   */
  static navigation = {
    /**
     * Track menu interactions
     */
    menuClick: (menuItem: string, section: string) => {
      clarityService.trackInteraction('click', `menu_${menuItem}`, section);
    },

    /**
     * Track search usage
     */
    search: (query: string, resultsCount: number) => {
      clarityService.setTag('search_query', query);
      clarityService.setTag('search_results_count', resultsCount.toString());
      clarityService.event('search_performed');
    },

    /**
     * Track filter usage
     */
    filter: (filterType: string, filterValue: string) => {
      clarityService.setTag('filter_type', filterType);
      clarityService.setTag('filter_value', filterValue);
      clarityService.event('filter_applied');
    },

    /**
     * Track category browsing
     */
    browseCategory: (category: string) => {
      clarityService.setTag('browsed_category', category);
      clarityService.event('category_browsed');
    }
  };

  /**
   * Track user engagement
   */
  static engagement = {
    /**
     * Track newsletter subscription
     */
    newsletterSignup: (source: string) => {
      clarityService.setTag('newsletter_source', source);
      clarityService.event('newsletter_signup');
    },

    /**
     * Track comment interactions
     */
    comment: (action: 'add' | 'like' | 'reply', articleId?: string) => {
      clarityService.setTag('comment_action', action);
      if (articleId) clarityService.setTag('article_id', articleId);
      clarityService.event(`comment_${action}`);
    },

    /**
     * Track social media follows
     */
    socialFollow: (platform: string) => {
      clarityService.setTag('social_platform', platform);
      clarityService.event('social_follow');
    },

    /**
     * Track contact form submissions
     */
    contactForm: (formType: string, success: boolean) => {
      clarityService.setTag('form_type', formType);
      clarityService.setTag('form_success', success.toString());
      clarityService.event('contact_form_submitted');
    }
  };

  /**
   * Track performance and technical metrics
   */
  static performance = {
    /**
     * Track image loading performance
     */
    imageLoad: (imageType: string, loadTime: number, success: boolean) => {
      clarityService.setTag('image_type', imageType);
      clarityService.setTag('image_load_success', success.toString());
      clarityService.trackPerformance('image_load_time', loadTime, 'ms');
    },

    /**
     * Track content loading
     */
    contentLoad: (contentType: string, loadTime: number) => {
      clarityService.trackPerformance(`${contentType}_load_time`, loadTime, 'ms');
    },

    /**
     * Track mobile-specific interactions
     */
    mobileInteraction: (interaction: string, element: string) => {
      clarityService.setTag('device_type', 'mobile');
      clarityService.trackInteraction(interaction, element, 'mobile');
    }
  };

  /**
   * Track errors and issues
   */
  static errors = {
    /**
     * Track content loading errors
     */
    contentError: (contentType: string, errorMessage: string, url?: string) => {
      clarityService.trackError('content_load', `${contentType}: ${errorMessage}`, url);
    },

    /**
     * Track API errors
     */
    apiError: (endpoint: string, statusCode: number, errorMessage: string) => {
      clarityService.setTag('api_endpoint', endpoint);
      clarityService.setTag('api_status_code', statusCode.toString());
      clarityService.trackError('api_error', errorMessage, endpoint);
    },

    /**
     * Track user experience issues
     */
    uxIssue: (issueType: string, description: string, severity: 'low' | 'medium' | 'high') => {
      clarityService.setTag('ux_issue_type', issueType);
      clarityService.setTag('ux_issue_severity', severity);
      clarityService.trackError('ux_issue', description, issueType);
    }
  };

  /**
   * Track user preferences and settings
   */
  static preferences = {
    /**
     * Track theme changes
     */
    themeChange: (newTheme: string) => {
      clarityService.setTag('user_theme', newTheme);
      clarityService.event('theme_changed');
    },

    /**
     * Track font size changes
     */
    fontSizeChange: (newSize: string) => {
      clarityService.setTag('user_font_size', newSize);
      clarityService.event('font_size_changed');
    },

    /**
     * Track language preferences
     */
    languageChange: (newLanguage: string) => {
      clarityService.setTag('user_language', newLanguage);
      clarityService.event('language_changed');
    }
  };

  /**
   * Initialize magazine-specific tracking
   */
  static initialize = () => {
    // Set magazine-specific tags
    clarityService.setTag('site_type', 'magazine');
    clarityService.setTag('magazine_name', 'THE GRYD');

    // Track initial page type
    const path = window.location.pathname;
    let pageType = 'other';

    if (path === '/') pageType = 'home';
    else if (path.startsWith('/work')) pageType = 'work';
    else if (path.startsWith('/about')) pageType = 'about';
    else if (path.startsWith('/playground')) pageType = 'playground';
    else if (path.startsWith('/contact')) pageType = 'contact';

    clarityService.setTag('page_type', pageType);
    clarityService.trackPageView(pageType);
  };
}

export default MagazineTracking;
