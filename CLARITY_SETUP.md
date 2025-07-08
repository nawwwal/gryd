# Microsoft Clarity Setup Guide

Microsoft Clarity has been successfully installed and integrated into your website! This guide will help you complete the setup and start collecting behavioral analytics data.

## 🎯 What is Microsoft Clarity?

Microsoft Clarity is a **free** behavioral analytics tool that provides:
- **Session replays** - Watch exactly how users interact with your site
- **Heatmaps** - See where users click, scroll, and focus
- **Insights** - Get AI-powered insights about user behavior
- **Smart events** - Track key user actions automatically

## 📦 Installation Status

✅ **Package installed**: `@microsoft/clarity` has been added to your project
✅ **Service created**: Comprehensive Clarity service utility (`src/utils/clarityService.ts`)
✅ **Integration complete**: Clarity is integrated into your main App.tsx
✅ **Performance tracking**: Automatic performance metrics collection

## 🔧 Configuration Required

### Step 1: Create Clarity Project

1. Go to [https://clarity.microsoft.com/](https://clarity.microsoft.com/)
2. Sign up or sign in with your Microsoft account
3. Click **"New project"**
4. Enter your website details:
   - **Name**: THE GRYD Magazine
   - **Website**: your-domain.com
5. Click **"Add new project"**

### Step 2: Get Your Project ID

1. In your Clarity dashboard, go to **Settings** → **Overview**
2. Copy your **Project ID** (format: `abcdef1234`)

### Step 3: Set Environment Variable

Create a `.env` file in your project root with your Clarity Project ID:

```bash
# Create .env file
touch .env

# Add your Clarity Project ID
echo "VITE_CLARITY_PROJECT_ID=your_actual_project_id_here" >> .env
```

**Example .env file:**
```env
# Microsoft Clarity Configuration
VITE_CLARITY_PROJECT_ID=abcdef1234

# Other configuration (optional)
VITE_NODE_ENV=development
VITE_ENABLE_ANALYTICS=true
```

⚠️ **Important**: Replace `your_actual_project_id_here` with your real Project ID from Clarity dashboard.

## 🚀 Features Available

### Automatic Tracking
- ✅ Page views and navigation
- ✅ Performance metrics (load times)
- ✅ User interactions
- ✅ Error tracking

### Manual Tracking (via clarityService)

```typescript
import clarityService from '@/utils/clarityService';

// Track custom events
clarityService.event('button_clicked');

// Set custom tags for filtering
clarityService.setTag('user_type', 'premium');

// Track user interactions
clarityService.trackInteraction('click', 'navigation_menu', 'about_page');

// Track errors
clarityService.trackError('javascript', 'Failed to load content', 'HomePage');

// Track performance metrics
clarityService.trackPerformance('api_response_time', 450, 'ms');

// Identify users (optional - only if you have user IDs)
clarityService.identify('user123', 'session456', 'page789', 'John Doe');
```

### Cookie Consent (if required)

If your website requires cookie consent:

```typescript
// Grant consent
clarityService.consent(true);

// Revoke consent
clarityService.consent(false);
```

## 📊 Viewing Your Data

1. Go to [https://clarity.microsoft.com/](https://clarity.microsoft.com/)
2. Select your project
3. View live data in:
   - **Dashboard**: Overview and key metrics
   - **Recordings**: Session replays
   - **Heatmaps**: Click and scroll maps
   - **Insights**: AI-powered insights

## 🛠 Development vs Production

### Development
- Clarity will log initialization status to console
- All tracking events are logged for debugging
- You can test with your development URL

### Production
- Clean console output (warnings/errors only)
- Full tracking active
- Real user sessions recorded

## 🔍 Troubleshooting

### Common Issues

**1. "Project ID not found" warning**
- Check if `.env` file exists in project root
- Verify `VITE_CLARITY_PROJECT_ID` is set correctly
- Restart your development server after adding env variables

**2. No data appearing in Clarity dashboard**
- Wait 5-10 minutes for data to appear
- Check browser console for Clarity errors
- Verify your website URL matches what you entered in Clarity project

**3. TypeScript errors**
- Run `npm install @microsoft/clarity` again
- Check that all imports are correct
- Restart TypeScript language server in your editor

### Debug Mode

To enable debug logging:

```typescript
// In src/App.tsx or any component
clarityService.setTag('debug_mode', 'true');
```

## 📱 Advanced Features

### Custom Page Tracking
```typescript
// Track specific page views
clarityService.trackPageView('product_detail', 'product_123');
```

### Session Upgrades
```typescript
// Prioritize important sessions for recording
clarityService.upgrade('premium_user_checkout');
```

### Error Boundary Integration
```typescript
// In your error boundaries
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    clarityService.trackError(
      'react_error',
      error.message,
      errorInfo.componentStack
    );
  }
}
```

## 🔒 Privacy & GDPR

- Clarity **automatically masks** sensitive content by default
- No personally identifiable information is collected without explicit configuration
- Respects Do Not Track browser settings
- Full control over data collection through consent API

### Content Masking
Clarity automatically masks:
- Input fields with type="password"
- Elements with `data-clarity-mask` attribute
- Credit card and social security number patterns

To mask custom content:
```html
<div data-clarity-mask>This content will be masked</div>
```

## 📈 Next Steps

1. ✅ Complete the environment variable setup above
2. 🚀 Deploy your site and verify tracking works
3. 📊 Explore your Clarity dashboard after 24 hours of data collection
4. 🎯 Set up custom events for key user actions specific to your magazine
5. 📝 Review insights and optimize user experience

## 🆘 Support

- **Microsoft Clarity Documentation**: [https://docs.microsoft.com/clarity/](https://docs.microsoft.com/clarity/)
- **Support Email**: clarityms@microsoft.com
- **Community**: Stack Overflow with `microsoft-clarity` tag

---

**🎉 Congratulations!** Microsoft Clarity is now ready to provide insights into how users interact with THE GRYD magazine website. The setup will help you understand user behavior, optimize the reading experience, and improve engagement with your content.
