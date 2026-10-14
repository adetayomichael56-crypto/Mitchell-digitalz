export interface ClientInquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  preferredContact: 'email' | 'whatsapp' | 'call';
  referralSource?: string;
  timestamp: string;
  status: 'new' | 'reviewed' | 'contacted' | 'proposal_sent' | 'archived';
  notes?: string;
  securityMeta?: {
    verifiedHuman: boolean;
    submissionDurationSeconds: number;
    securityFlags: string[];
  };
}

export interface InquirySubmissionPayload {
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  preferredContact: 'email' | 'whatsapp' | 'call';
  referralSource?: string;
  // Security fields
  _hp_company?: string; // Honeypot field (must be empty)
  _formRenderTime?: number; // Timestamp when form was loaded to detect instant bots
  securityAnswer?: number; // Human verification challenge
  securityExpected?: number;
}
