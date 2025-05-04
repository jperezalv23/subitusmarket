export function Avatar({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`avatar ${className}`}>{children}</div>
  }
  
  export function AvatarImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return <img src={src} alt={alt} className={`avatar-image ${className}`} />
  }
  
  export function AvatarFallback({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`avatar-fallback ${className}`}>{children}</div>
  }