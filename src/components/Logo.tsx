'use client';

interface LogoProps {
  src?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  src = '/logo.png',
  width = 140,
  height = 56,
  className = '',
}: LogoProps) {
  return (
    <div
      className={`shrink-0 ${className}`}
      style={{
        width,
        height,
        background: 'linear-gradient(135deg, #ff6b35, #c84bff, #00d4ff)',
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
      role="img"
      aria-label="ZYPTA"
    />
  );
}
