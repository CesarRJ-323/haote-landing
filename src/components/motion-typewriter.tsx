'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type TypewriterLine = {
  text: string;
  className?: string;
};

type MotionTypewriterProps = {
  lines: TypewriterLine[];
  className?: string;
  speed?: number;
};

export function MotionTypewriter({ lines, className = '', speed = 45 }: MotionTypewriterProps) {
  const fullText = lines.map((line) => line.text).join('\n');
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [fullText]);

  useEffect(() => {
    if (count >= fullText.length) return;

    const timeout = window.setTimeout(() => {
      setCount((value) => value + 1);
    }, speed);

    return () => window.clearTimeout(timeout);
  }, [count, fullText, speed]);

  const visibleText = fullText.slice(0, count);
  let offset = 0;

  return (
    <h1 className={className} aria-label={fullText.replace('\n', ' ')}>
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => {
          const lineStart = offset;
          const lineEnd = lineStart + line.text.length;
          offset = lineEnd + 1;
          const visibleLine = visibleText.slice(lineStart, lineEnd);

          return (
            <span key={lineIndex} className={`block ${line.className ?? ''}`}>
              {visibleLine}
              {count >= lineStart && count < lineEnd && (
                <motion.span
                  aria-hidden="true"
                  className="typewriter-caret"
                  animate={{ opacity: [0.65, 0, 0.65] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
