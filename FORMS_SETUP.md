# Form Handling Setup Guide

This project uses **Formspree** for form submissions - a free service that handles form submissions without requiring a backend server.

## Setup Instructions

### 1. Create Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form

### 2. Get Your Form IDs

After creating forms in Formspree, you'll get unique form IDs. You need to create separate forms for:

- **Newsletter Subscription** (News component)
- **Consultation Request** (Contact/Consultation page)
- **General Inquiry** (Contact/Inquiry page)
- **Project Inquiry** (Contact/Project page)

### 3. Update Form IDs in Code

#### Newsletter Form (News.tsx)

Replace `YOUR_FORM_ID` in `src/components/News.tsx`:

```typescript
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
```

#### Contact Forms (ContactForm.tsx)

Replace `YOUR_FORMSPREE_FORM_ID` in `src/components/ContactForm.tsx`:

```typescript
const getFormId = () => {
  if (formId) return formId;
  return "YOUR_FORMSPREE_FORM_ID"; // Replace with your form ID
};
```

**OR** pass form IDs as props when using ContactForm:

```typescript
<ContactForm 
  formType="consultation"
  formId="your_consultation_form_id"
/>
```

### 4. Form Types

The ContactForm component supports three types:
- `consultation` - Request Consultation page
- `inquiry` - General Inquiry page  
- `project` - Project Inquiry page

### 5. Testing

1. Fill out a form on your site
2. Check your Formspree dashboard for submissions
3. You'll receive email notifications (if configured)

## Alternative: Use Different Form Services

If you prefer not to use Formspree, you can replace the fetch calls with:

- **Netlify Forms** (if deploying to Netlify)
- **EmailJS** (direct email sending)
- **SendGrid API** (requires backend)
- **Custom backend endpoint**

## Form Fields

### Newsletter Form
- Email (required)

### Contact Forms
- Name (required)
- Email (required)
- Phone (optional)
- Message (required)
- Project Type (project form only)
- Budget Range (project form only)
- Timeline (project form only)

## Email Notifications

Formspree will send email notifications to the email address associated with your account. You can configure:
- Email templates
- Auto-responders
- Webhook integrations
- Spam filtering

## Free Tier Limits

Formspree free tier includes:
- 50 submissions per month
- Email notifications
- Basic spam protection

For more submissions, upgrade to a paid plan.

