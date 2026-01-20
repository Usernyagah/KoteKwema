import { useState, useRef } from 'react';
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react';
import { uploadImage, type UploadResponse } from '../utils/cloudinary';
import { Button } from './ui/button';

interface ImageUploadProps {
  onUploadComplete: (url: string, publicId: string) => void;
  onUploadError?: (error: string) => void;
  folder?: string;
  maxSize?: number; // in MB
  maxWidth?: number;
  maxHeight?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'jpg' | 'png' | 'webp';
  className?: string;
  disabled?: boolean;
}

export default function ImageUpload({
  onUploadComplete,
  onUploadError,
  folder = 'projects',
  maxSize = 10,
  maxWidth,
  maxHeight,
  quality = 'auto',
  format = 'auto',
  className = '',
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      const err = 'Please select an image file';
      setError(err);
      onUploadError?.(err);
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      const err = `File size must be less than ${maxSize}MB`;
      setError(err);
      onUploadError?.(err);
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress (Cloudinary doesn't provide progress events for unsigned uploads)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await uploadImage(file, {
        folder,
        maxWidth,
        maxHeight,
        quality,
        format,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadedImage(result);
      onUploadComplete(result.secure_url, result.public_id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      onUploadError?.(errorMessage);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setUploadedImage(null);
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />

      {!uploadedImage ? (
        <div
          onClick={handleClick}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200
            ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
            ${disabled || uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {uploading ? (
            <div className="space-y-2">
              <Loader2 className="w-8 h-8 mx-auto animate-spin text-gray-400" />
              <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-8 h-8 mx-auto text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP up to {maxSize}MB
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  Image uploaded successfully
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {uploadedImage.secure_url}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="ml-2 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {uploadedImage.secure_url && (
            <img
              src={uploadedImage.secure_url}
              alt="Uploaded"
              className="mt-3 w-full h-32 object-cover rounded"
            />
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}


