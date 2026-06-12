"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Bucket = "logos" | "screenshots" | "avatars" | "articles";

async function uploadFile(bucket: Bucket, file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

interface SingleImageUploaderProps {
  bucket: Bucket;
  value: string | null;
  onChange: (url: string | null) => void;
  label?: string;
}

export function SingleImageUploader({ bucket, value, onChange, label }: SingleImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      const file = accepted[0];
      if (!file) return;
      setUploading(true);
      try {
        onChange(await uploadFile(bucket, file));
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Upload failed — check Supabase storage setup.");
      } finally {
        setUploading(false);
      }
    },
    [bucket, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
  });

  if (value) {
    return (
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value} alt={label ?? "Uploaded image"} className="h-20 w-20 rounded-lg border object-contain bg-white p-1" />
        <Button type="button" variant="outline" size="sm" onClick={() => onChange(null)}>
          <X className="h-4 w-4" /> Remove
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-muted/50 px-6 py-8 text-center transition-colors",
        isDragActive ? "border-brand bg-brand-light" : "border-border hover:border-brand/50"
      )}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <Loader2 className="h-6 w-6 animate-spin text-brand" />
      ) : (
        <Upload className="h-6 w-6 text-muted-foreground" />
      )}
      <p className="text-sm text-muted-foreground">
        {uploading ? "Uploading…" : `Drag & drop ${label ?? "an image"}, or click to browse`}
      </p>
    </div>
  );
}

interface MultiImageUploaderProps {
  bucket: Bucket;
  values: string[];
  onChange: (urls: string[]) => void;
  max?: number;
}

export function MultiImageUploader({ bucket, values, onChange, max = 10 }: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      const room = max - values.length;
      const files = accepted.slice(0, room);
      if (files.length === 0) return;
      setUploading(true);
      try {
        const urls = await Promise.all(files.map((f) => uploadFile(bucket, f)));
        onChange([...values, ...urls]);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Upload failed — check Supabase storage setup.");
      } finally {
        setUploading(false);
      }
    },
    [bucket, max, onChange, values]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const move = (index: number, delta: -1 | 1) => {
    const next = [...values];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {values.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {values.map((url, i) => (
            <li key={url} className="group relative rounded-lg border bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Screenshot ${i + 1}`} className="aspect-video w-full rounded object-cover" />
              <div className="absolute inset-x-1 bottom-1 flex justify-between rounded bg-navy/80 px-1 py-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button type="button" aria-label="Move left" onClick={() => move(i, -1)} className="text-white disabled:opacity-30" disabled={i === 0}>
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Delete screenshot"
                  onClick={() => onChange(values.filter((u) => u !== url))}
                  className="text-white"
                >
                  <X className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Move right" onClick={() => move(i, 1)} className="text-white disabled:opacity-30" disabled={i === values.length - 1}>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {values.length < max && (
        <div
          {...getRootProps()}
          className={cn(
            "flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-muted/50 px-6 py-6 text-center transition-colors",
            isDragActive ? "border-brand bg-brand-light" : "border-border hover:border-brand/50"
          )}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-brand" />
          ) : (
            <Upload className="h-5 w-5 text-muted-foreground" />
          )}
          <p className="text-sm text-muted-foreground">
            {uploading ? "Uploading…" : `Add screenshots (${values.length}/${max})`}
          </p>
        </div>
      )}
    </div>
  );
}
