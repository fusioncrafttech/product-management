import { useState, useCallback } from "react";

type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: { value: RegExp; message: string };
  custom?: (value: string) => string | undefined;
};

type ValidationRules<T extends string> = Record<T, ValidationRule>;
type FormErrors<T extends string> = Partial<Record<T, string>>;
type FormTouched<T extends string> = Partial<Record<T, boolean>>;

export function useFormValidation<T extends string>(rules: ValidationRules<T>) {
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<FormTouched<T>>({});

  const validateField = useCallback(
    (field: T, value: string): string | undefined => {
      const rule = rules[field];
      if (!rule) return undefined;

      if (rule.required && !value.trim()) {
        return "This field is required";
      }
      if (rule.minLength && value.length < rule.minLength) {
        return `Must be at least ${rule.minLength} characters`;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        return `Must be no more than ${rule.maxLength} characters`;
      }
      if (rule.pattern && !rule.pattern.value.test(value)) {
        return rule.pattern.message;
      }
      if (rule.custom) {
        return rule.custom(value);
      }
      return undefined;
    },
    [rules]
  );

  const validateAll = useCallback(
    (values: Record<T, string>): boolean => {
      const newErrors: FormErrors<T> = {};
      const allTouched: FormTouched<T> = {};
      let isValid = true;

      for (const field of Object.keys(rules) as T[]) {
        allTouched[field] = true;
        const error = validateField(field, values[field] || "");
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }

      setErrors(newErrors);
      setTouched(allTouched);
      return isValid;
    },
    [rules, validateField]
  );

  const setFieldError = useCallback((field: T, error: string | undefined) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const setFieldTouched = useCallback(
    (field: T, value: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [validateField]
  );

  const clearFieldError = useCallback((field: T) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const reset = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const getFieldState = useCallback(
    (field: T) => ({
      error: errors[field],
      touched: touched[field] || false,
      hasError: !!(touched[field] && errors[field]),
    }),
    [errors, touched]
  );

  const isValid = Object.values(errors).every((e) => !e);

  return {
    errors,
    touched,
    validateField,
    validateAll,
    setFieldError,
    setFieldTouched,
    clearFieldError,
    reset,
    getFieldState,
    isValid,
  };
}
