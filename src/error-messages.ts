
export const ERROR_MESSAGES: Record<string, string | ((error: any) => string)> = {
    required: 'This field is required.',
    email: 'Invalid email format.',
    minlength: (error) => `Minimum length required is ${error.requiredLength} characters, but only ${error.actualLength} were entered.`,
    maxlength: (error) => `Maximum length allowed is ${error.requiredLength} characters.`,
    pattern: 'Invalid format.',
    strongPassword: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.',
    passwordMismatch: 'Passwords do not match.'
  };