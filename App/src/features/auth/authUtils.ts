import { IUserInfo } from "./useAuth";

export function isValidEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password: string, confirmPassword?: string) {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must include at least one lowercase letter.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one uppercase letter.";
  }

  if (!/\d/.test(password)) {
    return "Password must include at least one digit.";
  }

  if (confirmPassword && password !== confirmPassword) {
    return "Passwords do not match.";
  }
}

export function verifyUserInfo(info: IUserInfo | null | undefined): boolean {
  if (!info) return false;

  if (!info.token || info.token.length < 1) return false;
  if (!info.email || info.email.length < 1) return false;
  if (!info.name || info.name.length < 1) return false;

  return true;
}
