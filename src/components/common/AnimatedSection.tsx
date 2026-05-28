import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSection({ delay = 0, children, className, ...props }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
