# Firebase Storage CORS Configuration

## Problem

If you're seeing CORS errors when uploading images:
```
Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/...' from origin 'http://localhost:8081' has been blocked by CORS policy
```

This means Firebase Storage needs CORS configuration to allow uploads from your development environment.

## Quick Fix

### Method 1: Using gsutil (Recommended)

1. **Install Google Cloud SDK** (if not already installed):
   ```bash
   # On macOS
   brew install google-cloud-sdk
   
   # On Linux
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   
   # On Windows
   # Download from: https://cloud.google.com/sdk/docs/install
   ```

2. **Authenticate**:
   ```bash
   gcloud auth login
   ```

3. **Set your project**:
   ```bash
   gcloud config set project kote-kwema
   ```

4. **Apply CORS configuration**:
   ```bash
   gsutil cors set firebase-storage-cors.json gs://kote-kwema.firebasestorage.app
   ```

   **Note:** Replace `kote-kwema.firebasestorage.app` with your actual storage bucket name from your `.env` file (`VITE_FIREBASE_STORAGE_BUCKET`).

5. **Verify CORS is set**:
   ```bash
   gsutil cors get gs://kote-kwema.firebasestorage.app
   ```

### Method 2: Using Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project (`kote-kwema`)
3. Navigate to **Cloud Storage** > **Buckets**
4. Click on your storage bucket (`kote-kwema.firebasestorage.app`)
5. Go to **Configuration** tab
6. Scroll to **CORS** section
7. Click **Edit CORS configuration**
8. Copy and paste the contents of `firebase-storage-cors.json`:
   ```json
   [
     {
       "origin": ["http://localhost:8080", "http://localhost:8081", "http://127.0.0.1:8080", "http://127.0.0.1:8081"],
       "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
       "maxAgeSeconds": 3600,
       "responseHeader": ["Content-Type", "Authorization"]
     }
   ]
   ```
9. Click **Save**

### Method 3: Using Firebase CLI

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**:
   ```bash
   firebase login
   ```

3. **Set your project**:
   ```bash
   firebase use kote-kwema
   ```

4. **Apply CORS** (requires gsutil):
   ```bash
   gsutil cors set firebase-storage-cors.json gs://kote-kwema.firebasestorage.app
   ```

## For Production

When deploying to production, update `firebase-storage-cors.json` to include your production domain:

```json
[
  {
    "origin": [
      "http://localhost:8080",
      "http://localhost:8081",
      "https://yourdomain.com",
      "https://www.yourdomain.com"
    ],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Authorization"]
  }
]
```

Then re-apply the CORS configuration using one of the methods above.

## Troubleshooting

- **Still getting CORS errors?** Make sure you're using the correct bucket name (check your `.env` file)
- **Can't find gsutil?** Make sure Google Cloud SDK is properly installed and in your PATH
- **Permission denied?** Make sure you're authenticated and have the correct project selected

## Verification

After setting CORS, try uploading an image again. The CORS errors should be gone.
