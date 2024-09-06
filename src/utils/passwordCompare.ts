import bcrypt from 'bcryptjs';

export const checkPassword = (password: string, passwordHash: string): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
}