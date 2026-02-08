import React from 'react';

export type SpinnerVariant =
  | 'circular'
  | 'dots'
  | 'bars'
  | 'ring'
  | 'bars2'
  | 'orbit'
  | 'arc'
  | 'stepBar';

export interface SpinnerProps {
  variant?: SpinnerVariant;
  className?: string;
  inline?: boolean;
}

export function Spinner({
  variant = 'circular',
  inline,
  className,
}: SpinnerProps) {
  const classes = [
    'uui-spinner',
    `uui-spinner-${variant}`,
    inline && 'uui-spinner-inline',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'circular') {
    return (
      <svg aria-hidden="true" className={classes} viewBox="22 22 44 44">
        <circle
          className="uui-spinner-circle"
          cx="44"
          cy="44"
          fill="none"
          r="19.8"
          strokeWidth="4.6"
        />
      </svg>
    );
  }

  if (variant === 'bars2') {
    return (
      <svg
        className="uui-bars-spinner"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="12" rx="2" width="4" x="22" />
        <rect
          height="12"
          rx="2"
          transform="rotate(-135 33.9 16.9)"
          width="4"
          x="33.9"
          y="16.9"
        />
        <rect
          height="12"
          rx="2"
          transform="rotate(-90 36 26)"
          width="4"
          x="36"
          y="26"
        />
        <rect
          height="12"
          rx="2"
          transform="rotate(-45 31.1 33.9)"
          width="4"
          x="31.1"
          y="33.9"
        />
        <rect height="12" rx="2" width="4" x="22" y="36" />
        <rect
          height="12"
          rx="2"
          transform="rotate(-135 8.4 42.4)"
          width="4"
          x="8.4"
          y="42.4"
        />
        <rect
          height="12"
          rx="2"
          transform="rotate(-90 0 26)"
          width="4"
          y="26"
        />
        <rect
          height="12"
          rx="2"
          transform="rotate(-45 5.6 8.4)"
          width="4"
          x="5.6"
          y="8.4"
        />
      </svg>
    );
  }

  if (variant === 'orbit') {
    return (
      <svg
        className="uui-orbit-spinner"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="4" r="4" />
        <circle cx="38.1421" cy="9.8579" r="4" />
        <circle cx="44" cy="24" r="4" />
        <circle cx="38.1421" cy="38.1421" r="4" />
        <circle cx="24" cy="44" r="4" />
        <circle cx="9.8579" cy="38.1421" r="4" />
        <circle cx="4" cy="24" r="4" />
        <circle cx="9.8579" cy="9.8579" r="4" />
      </svg>
    );
  }

  if (variant === 'arc') {
    return (
      <svg
        className="uui-ring-spinner"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="28"
          cy="28"
          fill="none"
          opacity="0.25"
          r="22"
          stroke="currentColor"
          strokeWidth="8"
        />

        <circle
          cx="28"
          cy="28"
          fill="none"
          r="22"
          stroke="currentColor"
          strokeDasharray="69 69"
          strokeDashoffset="0"
          strokeLinecap="butt"
          strokeWidth="8"
        />
      </svg>
    );
  }

  if (variant === 'stepBar') {
    return (
      <svg className="uui-bars-steps" viewBox="0 0 48 48">
        <rect height="8" rx="4" width="8" x="6" y="20" />
        <rect height="8" rx="4" width="8" x="20" y="20" />
        <rect height="8" rx="4" width="8" x="34" y="20" />
      </svg>
    );
  }

  return (
    <svg
      className="uui-dots2-spinner"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="24" r="4" />
      <circle cx="24" cy="24" r="4" />
      <circle cx="38" cy="24" r="4" />
    </svg>
  );
}
