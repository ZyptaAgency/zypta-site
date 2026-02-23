'use client';

import React from 'react';

interface ZyptaTextProps {
  text: string;
  className?: string;
}

/**
 * Replaces every occurrence of "Zypta" (case-insensitive) in the given text
 * with a <span> styled in the Ethnocentric font + gradient.
 */
export default function ZyptaText({ text, className = '' }: ZyptaTextProps) {
  const parts = text.split(/(Zypta)/gi);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.toLowerCase() === 'zypta' ? (
          <span key={i} className="font-ethno gradient-text">
            {part.toUpperCase()}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </span>
  );
}
