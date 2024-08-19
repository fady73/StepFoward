export interface RegisterFormData {
    email: string;
    password: string;
    photoIdFront: File | null;
    photoIdBack: File | null;
  }
  
  export interface ApiResponse {
    message: string;
    error?: string;
  }
  