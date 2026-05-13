// frontend/src/services/authService.ts
import axios from "axios";

const API_URL = "/api/auth";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
}

export const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(`${API_URL}/register`, userData);
  return response.data;
};

interface VerifyResponse {
  message: string;
}

export const verifyAccount = async (token: string): Promise<VerifyResponse> => {
  const response = await axios.get<VerifyResponse>(`${API_URL}/verify/${token}`);
  return response.data;
};

interface ForgotPasswordResponse {
  message: string;
  resetToken: string;
}

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  const response = await axios.post<ForgotPasswordResponse>(`${API_URL}/forgot-password`, { email });
  return response.data;
};
interface ResetPasswordResponse {
  message: string;
}

export const resetPassword = async (token: string, password: string): Promise<ResetPasswordResponse> => {
  const response = await axios.post<ResetPasswordResponse>(`${API_URL}/reset-password/${token}`, { password });
  return response.data;
};
