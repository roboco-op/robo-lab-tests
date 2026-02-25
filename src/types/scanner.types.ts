export interface ScanResult {
  url: string;
  status: 'success' | 'error' | 'pending';
  reportSent?: boolean;
}

export interface ConsultationFormData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  message?: string;
}

export interface TestConfig {
  baseURL: string;
  testEmail: string;
}
