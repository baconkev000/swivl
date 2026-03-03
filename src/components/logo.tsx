"use client";

import Image from "next/image";

interface LogoProps {
  height?: number;
  className?: string;
  variant?: "light" | "dark";
}

    /**
     * swivo Logo Component
     * High-end minimalist branding using the official logo image.
     */
export default function Logo({ height = 24, className = "", variant = "dark" }: LogoProps) {
  // Total size increase: 1.15 multiplier applied as per user request
    const size = Math.round(height * 1.15);
    const aspectRatio = 4.0; // Increased to ensure the wordmark is fully visible
    const width = Math.round(size * aspectRatio);
    
    return (
      <div className={`relative flex items-center select-none ${className}`} style={{ height: `${size}px`, width: `${width}px` }}>
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/ac7698f2-a38b-41d3-98e1-66161d9459d0/swivo-resized-1772417255079.webp?width=8000&height=8000&resize=contain"
          alt="swivo Logo"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-contain ${variant === 'light' ? 'brightness-0 invert' : ''}`}
        />
      </div>
    );
}


