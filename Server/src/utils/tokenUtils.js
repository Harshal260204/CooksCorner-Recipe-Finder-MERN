import crypto from 'crypto';

// Generate email verification token
export const generateEmailVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate password reset token
export const generatePasswordResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Hash token for storing in database
export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};