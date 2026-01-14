# Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard for managing properties, job vacancies, and email subscriptions.

**Note:** This setup works perfectly with Firebase's **free Spark plan**. No paid subscription is required.

## Prerequisites

1. A Firebase project (free Spark plan is sufficient)
2. Firebase Authentication enabled
3. Firestore Database enabled

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
   - **Important:** Select the **Spark (free) plan** when prompted
   - The free plan is more than sufficient for this admin dashboard
3. Enable the following services (all available on free plan):
   - **Authentication** (Email/Password) - Unlimited on free plan
   - **Firestore Database** - 1 GB storage, 50K reads/day, 20K writes/day on free plan

### 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings
2. Scroll down to "Your apps" section
3. Click on the web icon (`</>`) to add a web app
4. Copy the Firebase configuration values

### 3. Configure Environment Variables

Create a `.env` file in the root directory with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 4. Set Up Firestore Collections

The admin dashboard uses the following Firestore collections:

- `properties` - Stores property listings
- `jobVacancies` - Stores job postings
- `emailSubscriptions` - Stores newsletter subscriptions

These collections will be created automatically when you add your first item.

### 5. Set Up Firestore Database Mode

When creating your Firestore database, choose **"Start in test mode"** (this is fine for development). You'll update the security rules in the next step.

**Note:** Test mode allows reads/writes for 30 days, but we'll set up proper security rules immediately.

### 6. Set Up Firestore Security Rules

Add these security rules to your Firestore database (Firestore > Rules):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Properties collection
    match /properties/{document=**} {
      allow read: if true; // Public read access
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Job vacancies collection
    match /jobVacancies/{document=**} {
      allow read: if true; // Public read access
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Email subscriptions collection
    match /emailSubscriptions/{document=**} {
      allow read: if request.auth != null; // Only authenticated users can read
      allow create: if true; // Anyone can subscribe
      allow update, delete: if request.auth != null; // Only authenticated users can update/delete
    }
  }
}
```

### 7. Create Admin User

1. In Firebase Console, go to **Authentication**
2. Click on **"Sign-in method"** tab
3. Enable **"Email/Password"** authentication provider (click on it and toggle "Enable")
4. Go to the **"Users"** tab
5. Click **"Add user"** to create an admin user with email and password
   - This user will be able to access the admin dashboard

## Accessing the Admin Dashboard

1. Start your development server: `npm run dev`
2. Navigate to `/admin/login`
3. Log in with your admin credentials
4. You'll be redirected to `/admin` dashboard

## Features

### Properties Management
- Add new properties with details like title, type, location, price, bedrooms, bathrooms, area, and description
- Properties are stored in Firestore and can be displayed on your website

### Job Vacancies Management
- Add new job postings with title, department, location, job type, description, and requirements
- Include application email or URL for candidates to apply

### Email Subscriptions
- View all email subscriptions from newsletter signups
- See subscription dates
- Delete subscriptions if needed
- Subscriptions are automatically saved when users subscribe via the News component

## Usage

### Adding a Property

1. Go to the "Properties" tab in the admin dashboard
2. Fill in the property form:
   - Title (required)
   - Type: Residential, Commercial, Mixed-Use, or Land
   - Location (required)
   - Price, Bedrooms, Bathrooms, Area (optional)
   - Image URL (optional)
   - Description (required)
3. Click "Add Property"

### Adding a Job Vacancy

1. Go to the "Job Vacancies" tab
2. Fill in the job form:
   - Job Title (required)
   - Department: Architecture, Engineering, Interior Design, Urban Planning, or Administration
   - Location (required)
   - Job Type: Full-Time, Part-Time, Contract, or Internship
   - Application Email or URL (optional)
   - Job Description (required)
   - Requirements (optional)
3. Click "Add Job Vacancy"

### Viewing Email Subscriptions

1. Go to the "Email Subscriptions" tab
2. View all subscriptions in a table format
3. Delete subscriptions by clicking the trash icon

## Firebase Free Plan Limits

The Firebase Spark (free) plan includes generous limits that are more than sufficient for this admin dashboard:

- **Authentication**: Unlimited users
- **Firestore Database**: 
  - 1 GB storage
  - 50,000 reads per day
  - 20,000 writes per day
  - 20,000 deletes per day
- **Network**: 10 GB/month egress

For most small to medium-sized websites, these limits are more than adequate. You can monitor your usage in the Firebase Console.

## Security Notes

- The admin dashboard requires authentication
- Only users with valid Firebase Auth credentials can access the dashboard
- Firestore security rules should be configured as shown above
- Consider implementing role-based access control for production use
- The free plan includes all security features needed for this dashboard

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check that your `.env` file has the correct Firebase configuration
- Make sure environment variables start with `VITE_`
- Restart your development server after changing `.env` file

### "Permission denied" errors
- Check your Firestore security rules
- Ensure you're logged in as an authenticated user
- Verify the security rules match the structure above

### Subscriptions not saving
- Check browser console for errors
- Verify Firestore is enabled in Firebase Console
- Ensure security rules allow creation of documents in `emailSubscriptions` collection

### "Quota exceeded" errors
- Check your Firebase Console usage dashboard
- Free plan limits: 50K reads/day, 20K writes/day
- If you're approaching limits, consider optimizing queries or upgrading to Blaze plan (pay-as-you-go)

### Billing concerns
- **Good news:** The Spark (free) plan has no credit card required
- All features used in this admin dashboard are available on the free plan
- You'll only be charged if you upgrade to the Blaze plan (which you don't need for this dashboard)
