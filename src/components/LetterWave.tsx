'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ElementType } from 'react';

type LetterWaveProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: 'scroll' | 'mount';
};

const ease = [0.23, 1, 0.32, 1] as const;

export function LetterWave({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0.04,
  speed = 0.018,
  trigger = 'scroll',
}: LetterWaveProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  const reducedMotion = hasMounted && prefersReducedMotion;
  const interval = Math.min(Math.max(speed, 0.032), 1.5 / Math.max(text.length, 1));
  const isVisible = trigger === 'mount' || inView;
  const words = text.split(' ');

  const hidden = reducedMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        transform: 'perspective(600px) translate3d(0, -0.8em, -48px) rotateX(-78deg)',
      };

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          const lettersBefore = words.slice(0, wordIndex).join('').length + wordIndex;

          return (
            <span
              key={`${word}-${wordIndex}`}
              className="inline-block whitespace-nowrap overflow-hidden align-top py-[0.14em] -my-[0.14em]"
            >
              {Array.from(word).map((letter, letterIndex) => {
                const index = lettersBefore + letterIndex;
                const letterDelay = delay + index * interval;

                return (
                  <motion.span
                    key={`${letter}-${index}`}
                    className="inline-block"
                    style={{ transformOrigin: '50% 0%' }}
                    initial={hidden}
                    animate={
                      isVisible
                        ? reducedMotion
                          ? { opacity: 1 }
                          : {
                              opacity: 1,
                              transform:
                                'perspective(600px) translate3d(0, 0, 0) rotateX(0deg)',
                            }
                        : hidden
                    }
                    transition={
                      reducedMotion
                        ? {
                            opacity: {
                              duration: 0.45,
                              ease: 'linear',
                              delay: letterDelay,
                            },
                          }
                        : {
                            default: {
                              duration: 1,
                              ease,
                              delay: letterDelay,
                            },
                            opacity: {
                              duration: 0.55,
                              ease: 'linear',
                              delay: letterDelay,
                            },
                          }
                    }
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </span>
          );
        }).reduce<React.ReactNode[]>((result, word, index) => {
          result.push(word);
          if (index < words.length - 1) result.push(' ');
          return result;
        }, [])}
      </span>
    </Tag>
  );
}

export default LetterWave;
