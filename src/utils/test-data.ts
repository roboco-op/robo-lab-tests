import type { ConsultationFormData } from '../types/scanner.types';

export const TEST_URLS = {
  valid: 'https://example.com',
  roboLab: 'https://aiagentfinder.robo-lab.io/',
  multiple: ['https://example.com', 'https://google.com', 'https://github.com'],
  invalid: 'invalid-url',
} as const;

export const TEST_EMAIL = process.env.TEST_EMAIL ?? 'patrickm@roboco-op.org';

export const CONSULTATION_DATA: ConsultationFormData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  company: 'Acme Corporation',
  message: 'I am interested in learning more about your web scanning services and would like to schedule a consultation.',
  website: 'https://roboco-op.org/',
};
