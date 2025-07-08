import Clarity from '@microsoft/clarity';

interface ClarityConfig {
  projectId: string;
  enableConsent?: boolean;
  autoInit?: boolean;
}

class ClarityService {
  private initialized = false;
  private projectId: string = 'sbqend2ga6';
  private enableConsent = false;

  /**
   * Initialize Clarity with project configuration
   * @param config Configuration object containing project ID and options
   */
  init(config: ClarityConfig): void {
    if (this.initialized) {
      console.warn('Clarity is already initialized');
      return;
    }

    if (!config.projectId) {
      throw new Error('Clarity project ID is required for initialization');
    }

    try {
      this.projectId = config.projectId;
      this.enableConsent = config.enableConsent || false;

      Clarity.init(config.projectId);
      this.initialized = true;

      console.log(`Clarity initialized successfully with project ID: ${config.projectId}`);
    } catch (error) {
      console.error('Failed to initialize Clarity:', error);
      throw error;
    }
  }

  /**
   * Check if Clarity is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Identify API - Set custom identifiers for site visitors
   * @param customId Unique identifier for the customer (required)
   * @param customSessionId Custom session identifier (optional)
   * @param customPageId Custom page identifier (optional)
   * @param friendlyName Friendly name for the customer (optional)
   */
  identify(
    customId: string,
    customSessionId?: string,
    customPageId?: string,
    friendlyName?: string
  ): void {
    if (!this.initialized) {
      console.warn('Clarity not initialized. Call init() first.');
      return;
    }

    try {
      Clarity.identify(customId, customSessionId, customPageId, friendlyName);
      console.log(`Clarity identify called for user: ${customId}`);
    } catch (error) {
      console.error('Failed to identify user in Clarity:', error);
    }
  }

  /**
   * Set custom tags for filtering and analyzing data
   * @param key The key for the tag
   * @param value The value(s) for the tag
   */
  setTag(key: string, value: string | string[]): void {
    if (!this.initialized) {
      console.warn('Clarity not initialized. Call init() first.');
      return;
    }

    try {
      Clarity.setTag(key, value);
      console.log(`Clarity tag set: ${key} = ${Array.isArray(value) ? value.join(', ') : value}`);
    } catch (error) {
      console.error('Failed to set Clarity tag:', error);
    }
  }

  /**
   * Track custom events
   * @param eventName The name of the event to track
   */
  event(eventName: string): void {
    if (!this.initialized) {
      console.warn('Clarity not initialized. Call init() first.');
      return;
    }

    try {
      Clarity.event(eventName);
      console.log(`Clarity event tracked: ${eventName}`);
    } catch (error) {
      console.error('Failed to track Clarity event:', error);
    }
  }

  /**
   * Set cookie consent status
   * @param hasConsent Whether consent is given (default: true)
   */
  consent(hasConsent: boolean = true): void {
    if (!this.initialized) {
      console.warn('Clarity not initialized. Call init() first.');
      return;
    }

    try {
      Clarity.consent(hasConsent);
      console.log(`Clarity consent set to: ${hasConsent}`);
    } catch (error) {
      console.error('Failed to set Clarity consent:', error);
    }
  }

  /**
   * Upgrade session for prioritized recording
   * @param reason The reason for the upgrade
   */
  upgrade(reason: string): void {
    if (!this.initialized) {
      console.warn('Clarity not initialized. Call init() first.');
      return;
    }

    try {
      Clarity.upgrade(reason);
      console.log(`Clarity session upgraded: ${reason}`);
    } catch (error) {
      console.error('Failed to upgrade Clarity session:', error);
    }
  }

  /**
   * Helper method to track page views with automatic page identification
   * @param pageName Name of the page being viewed
   * @param customPageId Optional custom page ID
   */
  trackPageView(pageName: string, customPageId?: string): void {
    this.setTag('page_name', pageName);
    if (customPageId) {
      this.setTag('page_id', customPageId);
    }
    this.event('page_view');
  }

  /**
   * Helper method to track user interactions
   * @param action The action performed (e.g., 'click', 'scroll', 'hover')
   * @param element The element interacted with
   * @param value Optional value associated with the interaction
   */
  trackInteraction(action: string, element: string, value?: string): void {
    this.setTag('interaction_action', action);
    this.setTag('interaction_element', element);
    if (value) {
      this.setTag('interaction_value', value);
    }
    this.event(`user_${action}`);
  }

  /**
   * Helper method to track errors
   * @param errorType Type of error (e.g., 'javascript', 'network', 'validation')
   * @param errorMessage Error message or description
   * @param errorLocation Where the error occurred
   */
  trackError(errorType: string, errorMessage: string, errorLocation?: string): void {
    this.setTag('error_type', errorType);
    this.setTag('error_message', errorMessage);
    if (errorLocation) {
      this.setTag('error_location', errorLocation);
    }
    this.event('error_occurred');
  }

  /**
   * Helper method to track performance metrics
   * @param metricName Name of the performance metric
   * @param value The metric value
   * @param unit Unit of measurement (optional)
   */
  trackPerformance(metricName: string, value: number, unit?: string): void {
    this.setTag('performance_metric', metricName);
    this.setTag('performance_value', value.toString());
    if (unit) {
      this.setTag('performance_unit', unit);
    }
    this.event('performance_metric');
  }
}

// Create and export singleton instance
export const clarityService = new ClarityService();

// Export types for external use
export type { ClarityConfig };
export default clarityService;
