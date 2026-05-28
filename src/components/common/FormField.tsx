import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, required, error, touched, children }: FormFieldProps) {
  const showError = touched && error;

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive text-sm">*</span>}
      </Label>
      {children}
      <AnimatePresence mode="wait">
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="flex items-center gap-1.5 text-[13px] text-destructive"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
