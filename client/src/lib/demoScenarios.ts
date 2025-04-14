export interface ScenarioData {
  userQuery: string;
  intent: string;
  confidence: number;
  authentication: boolean;
  contextUpdates: {
    userId: string;
    accountNum: string;
    lastActivity: string;
    callOrigin: string;
  };
  workflowStep: string;
  workflowDetails: string;
  systemResponse: string;
}

export const scenarios: Record<string, ScenarioData> = {
  'new-customer': {
    userQuery: "Hi, I'm interested in your services. What options do you have?",
    intent: "Service Information",
    confidence: 92,
    authentication: false,
    contextUpdates: {
      userId: "Guest User",
      accountNum: "N/A",
      lastActivity: "First Contact",
      callOrigin: "Website Referral"
    },
    workflowStep: "Intent Recognition",
    workflowDetails: "New customer inquiry routing",
    systemResponse: "Thank you for your interest! We offer several service packages including Basic, Premium, and Enterprise levels. Each comes with different features and support options. Would you like me to explain the details of each package, or are you looking for a specific service feature?"
  },
  'billing-question': {
    userQuery: "I need to check my account balance and make a payment.",
    intent: "Account Balance Inquiry",
    confidence: 85,
    authentication: true,
    contextUpdates: {
      userId: "ID-58472",
      accountNum: "AC-39584721",
      lastActivity: "Payment (3 days ago)",
      callOrigin: "Mobile App"
    },
    workflowStep: "Authentication",
    workflowDetails: "Account verification required",
    systemResponse: "I'd be happy to help you check your account balance. For security purposes, I'll need to verify your identity. Could you please provide either your account number or the phone number associated with your account?"
  },
  'tech-support': {
    userQuery: "My internet connection keeps dropping every few minutes.",
    intent: "Technical Support",
    confidence: 78,
    authentication: true,
    contextUpdates: {
      userId: "ID-76231",
      accountNum: "AC-42315879",
      lastActivity: "Open Support Ticket #45632",
      callOrigin: "Transfer from Chat"
    },
    workflowStep: "Intent Recognition",
    workflowDetails: "Technical issue classification",
    systemResponse: "I'm sorry to hear you're experiencing connection issues. I'd like to help troubleshoot that for you. Could you tell me which devices are affected and when you first noticed the problem? Also, have you already tried restarting your router?"
  },
  'update-info': {
    userQuery: "I need to update my mailing address on file.",
    intent: "Account Information Update",
    confidence: 88,
    authentication: true,
    contextUpdates: {
      userId: "ID-24513",
      accountNum: "AC-78912345",
      lastActivity: "Profile Updated (2 weeks ago)",
      callOrigin: "Direct Call"
    },
    workflowStep: "Authentication",
    workflowDetails: "Identity verification for update",
    systemResponse: "I'll be glad to help you update your mailing address. For security purposes, I'll first need to verify your identity. Could you please provide your full name and the last four digits of your account number or the phone number registered with your account?"
  },
  'complaint': {
    userQuery: "I've been overcharged on my last bill and I'm very unhappy with the service I received when I called before.",
    intent: "Complaint Escalation",
    confidence: 95,
    authentication: true,
    contextUpdates: {
      userId: "ID-91325",
      accountNum: "AC-25698741",
      lastActivity: "Billing Dispute (1 day ago)",
      callOrigin: "Callback Request"
    },
    workflowStep: "Routing Decision",
    workflowDetails: "Priority escalation to supervisor",
    systemResponse: "I sincerely apologize for the billing error and the unsatisfactory service you've experienced. I understand how frustrating this situation must be. I want to make sure this gets resolved properly for you. Let me connect you directly with a billing specialist who can review your charges and address your concerns immediately."
  }
};

export const initialConversation = [
  {
    sender: 'system',
    text: 'Hello, thank you for calling our support line. How can I help you today?',
    time: '00:00'
  }
];
