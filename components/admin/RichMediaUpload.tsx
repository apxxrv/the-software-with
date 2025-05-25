import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Upload, X, Image, Video, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichMediaUploadProps {
  onUploadComplete: (url: string) => void;
  acceptedFileTypes?: string[];
  maxSize?: number; // in bytes
  type?: 'image' | 'video' | 'audio';
}

export function RichMediaUpload({
  onUploadComplete,
  acceptedFileTypes = ['image/*', 'video/*', 'audio/*'],
  maxSize = 10 * 1024 * 1024, // 10MB default
  type = 'image'
}: RichMediaUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // TODO: Implement actual file upload to your storage service
      // This is a mock upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      // Simulate upload completion
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        setIsUploading(false);
        // Mock URL - replace with actual upload URL
        onUploadComplete('https://example.com/uploaded-file');
      }, 5000);
    } catch (err) {
      setError('Upload failed. Please try again.');
      setIsUploading(false);
    }
  }, [maxSize, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false
  });

  const getIcon = () => {
    switch (type) {
      case 'image':
        return <Image className="w-8 h-8" />;
      case 'video':
        return <Video className="w-8 h-8" />;
      case 'audio':
        return <Music className="w-8 h-8" />;
      default:
        return <Upload className="w-8 h-8" />;
    }
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} disabled={isUploading} />
        <div className="flex flex-col items-center gap-2">
          {getIcon()}
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? "Drop the file here"
              : "Drag & drop a file here, or click to select"}
          </p>
          <p className="text-xs text-muted-foreground">
            Max file size: {maxSize / (1024 * 1024)}MB
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-sm text-destructive flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}

      {isUploading && (
        <div className="mt-4 space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
} 