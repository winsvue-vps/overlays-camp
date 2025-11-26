import { type CSSProperties } from 'react';
import  { motion, type HTMLMotionProps, type Transition } from 'motion/react';
import { cn } from '@/utils/cn';

type ShimmeringTextProps = {
  text: string;
  duration?: number;
  transition?: Transition;
  wave?: boolean;
  color?: string;
  shimmeringColor?: string;
} & Omit<HTMLMotionProps<'span'>, 'children'>;
function ShimmeringText({
  text,
  duration = 1,
  transition,
  wave = false,
  className,
  color = '#fff',
  shimmeringColor = '#568EFF',
  ...props
}: ShimmeringTextProps) {
  return (
    <motion.span
      className={cn('relative inline-block [perspective:500px]', className)}
      style={
        {
          '--shimmering-color': shimmeringColor,
          '--color': color,
          color: 'var(--color)',
        } as CSSProperties
      }
      {...props}
    >
      {text?.split('')?.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre [transform-style:preserve-3d]"
          initial={{
            ...(wave
              ? {
                  scale: 1,
                  rotateY: 0,
                }
              : {}),
            color: 'var(--color)',
          }}
          animate={{
            ...(wave
              ? {
                  x: [0, 5, 0],
                  y: [0, -5, 0],
                  scale: [1, 1.1, 1],
                  rotateY: [0, 15, 0],
                }
              : {}),
            color: [color, shimmeringColor, color],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: text.length * 0.05,
            delay: (i * duration) / text.length,
            ease: 'easeInOut',
            ...transition,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
export { ShimmeringText, type ShimmeringTextProps };