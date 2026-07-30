import { ServiceItem, PortfolioItem, ClientUser, ClientProject, SharedFile, PortalMessage, AuditLog, ContactInquiry } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'custom-web-dev',
    title: 'Bespoke Custom Web Engineering',
    category: 'web',
    tagline: 'High-performance web applications built for speed, scale, and distinction.',
    description: 'We craft minimalist, modern web applications engineered with precision. From complex React/TypeScript architectures to cloud-native backends, we elevate your digital presence.',
    features: [
      'Tailored UI/UX & Design Systems',
      'Lightning-fast SSR & SPA Architecture',
      'API Engineering & Microservices Integration',
      'Strict WCAG Accessibility & Enterprise Security'
    ],
    icon: 'Code2'
  },
  {
    id: 'logistics-portals',
    title: 'Enterprise Freight & Supply Portals',
    category: 'logistics',
    tagline: 'Custom digital infrastructure for logistics providers & freight forwarding.',
    description: 'Empower your supply chain with custom logistics software. Real-time cargo tracking, automated dispatch boards, carrier portals, and IoT sensor integration.',
    features: [
      'Real-Time Telematics & Cargo Tracking',
      'Automated Dispatch & Driver Workflows',
      'EDI / API Carrier Gateway Integration',
      'Custom Rate Calculators & Billing Systems'
    ],
    icon: 'Truck'
  },
  {
    id: 'warehouse-dashboard',
    title: 'Inventory & Warehouse Automation Systems',
    category: 'logistics',
    tagline: 'Real-time visibility into inventory flow, picking routes, and stock control.',
    description: 'Minimalist dashboard solutions designed for fast-paced logistics hubs. Streamline pick-and-pack operations, barcode scanning integration, and stock analytics.',
    features: [
      'Interactive Warehouse Mapping',
      'Barcode & RFID Scan Handling',
      'Stock Threshold Alerts & Order Fulfillment',
      'Multi-Location Synchronization'
    ],
    icon: 'PackageCheck'
  },
  {
    id: 'enterprise-web-solutions',
    title: 'Professional Business Web Applications',
    category: 'web',
    tagline: 'Custom web solutions built to convert clients and streamline business operations.',
    description: 'End-to-end web development for corporate entities, law firms, finance tech, and specialized consultancies requiring clean aesthetics and secure client portals.',
    features: [
      'Custom Client Portals & Secure File Vaults',
      'High-Conversion Minimalist Landing Experience',
      'CMS & Content Architecture Strategy',
      'Seamless Payment & CRM Synchronization'
    ],
    icon: 'Globe'
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'apex-freight-portal',
    title: 'Apex Global Dispatch & Supply Portal',
    client: 'Apex Freight Logistics',
    category: 'Logistics Software',
    description: 'A multi-modal transport management portal handling 14,000+ daily container movements across air, sea, and overland freight with live route telemetry.',
    metrics: '99.98% Uptime | +42% Dispatch Velocity',
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'WebSockets'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    featured: true
  },
  {
    id: 'vanguard-corp-web',
    title: 'Vanguard Capital Digital Platform',
    client: 'Vanguard Partners',
    category: 'Web Development',
    description: 'A ultra-minimalist web platform and investor dashboard built with responsive data visualization and AES-256 encrypted file sharing.',
    metrics: '<1.1s Page Load | 3.4x Conversion Growth',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    featured: true
  },
  {
    id: 'omni-fleet-tracker',
    title: 'OmniFleet Telematics & Route Optimizer',
    client: 'OmniTrans Network',
    category: 'Logistics Software',
    description: 'Custom fleet web app rendering interactive GPS tracking, fuel consumption analytics, and automated driver status dispatch.',
    metrics: '-18% Fuel Costs | Real-time GPS Tracking',
    techStack: ['React', 'D3.js', 'Express', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1200',
    featured: true
  },
  {
    id: 'strata-law-portal',
    title: 'Strata Legal Secure Document Hub',
    client: 'Strata Associates',
    category: 'Enterprise Tech',
    description: 'Custom enterprise website featuring an encrypted document exchange vault, automated client onboarding, and secure billing portal.',
    metrics: '100% Zero Data Leak Record | 5,000+ Files Exchanged',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Crypto-JS'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200'
  }
];

export const INITIAL_CLIENTS: ClientUser[] = [
  {
    id: 'client-apex',
    name: 'Sarah Jenkins',
    email: 's.jenkins@apexlogistics.com',
    company: 'Apex Freight Logistics',
    projectTitle: 'Apex Global Supply Portal v2',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'client-vanguard',
    name: 'Marcus Vance',
    email: 'marcus@vanguardcapital.io',
    company: 'Vanguard Partners',
    projectTitle: 'Custom Web Engineering & Client Vault',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200'
  }
];

export const INITIAL_PROJECTS: ClientProject[] = [
  {
    id: 'proj-apex-01',
    clientId: 'client-apex',
    clientName: 'Apex Freight Logistics',
    title: 'Apex Global Supply Portal v2',
    type: 'Logistics Software Engineering',
    progress: 78,
    status: 'development',
    startDate: '2026-05-10',
    targetCompletion: '2026-08-30',
    stagingUrl: 'https://staging.tomcat-logistics.internal/apex-v2',
    milestones: [
      {
        id: 'm1',
        title: 'Architecture & UI Wireframes',
        dueDate: '2026-05-25',
        status: 'completed',
        description: 'Complete technical spec and minimalist Figma component library.'
      },
      {
        id: 'm2',
        title: 'API Integration & Real-Time Telematics',
        dueDate: '2026-06-30',
        status: 'completed',
        description: 'Hooked up GPS telematics, EDI 214 shipment status feeds.'
      },
      {
        id: 'm3',
        title: 'Client Secure Portal & File Sharing',
        dueDate: '2026-07-28',
        status: 'completed',
        description: 'Encrypted document vault for Bill of Lading & Customs files.'
      },
      {
        id: 'm4',
        title: 'Final Security Audit & Deployment',
        dueDate: '2026-08-30',
        status: 'in_progress',
        description: 'Penetration testing and Cloud Run production rollout.'
      }
    ]
  },
  {
    id: 'proj-vanguard-01',
    clientId: 'client-vanguard',
    clientName: 'Vanguard Partners',
    title: 'Custom Web Platform & Investor Portal',
    type: 'Bespoke Web Development',
    progress: 92,
    status: 'testing',
    startDate: '2026-06-01',
    targetCompletion: '2026-08-15',
    stagingUrl: 'https://vanguard-dev.tomcat.agency',
    milestones: [
      {
        id: 'vm1',
        title: 'Minimalist Brand Alignment & Layout',
        dueDate: '2026-06-15',
        status: 'completed',
        description: 'Dark-slate theme, typography pairing, responsive grid.'
      },
      {
        id: 'vm2',
        title: 'Secure File Sharing Vault',
        dueDate: '2026-07-10',
        status: 'completed',
        description: 'Client upload & download portal for quarterly reports.'
      },
      {
        id: 'vm3',
        title: 'User Acceptance Testing',
        dueDate: '2026-08-05',
        status: 'in_progress',
        description: 'Final stakeholder walkthrough and QA feedback.'
      }
    ]
  }
];

export const INITIAL_FILES: SharedFile[] = [
  {
    id: 'file-01',
    name: 'Apex_SupplyChain_API_Specification_v2.4.pdf',
    size: 2450000,
    type: 'application/pdf',
    category: 'Spec',
    uploadedBy: 'Tomcat Engineering',
    uploadedByRole: 'admin',
    uploadedAt: '2026-07-25 09:14 AM',
    clientId: 'client-apex',
    isEncrypted: true,
    downloadCount: 14
  },
  {
    id: 'file-02',
    name: 'Bill_of_Lading_Manifest_EU_Route_982.pdf',
    size: 1180000,
    type: 'application/pdf',
    category: 'Logistics Manifest',
    uploadedBy: 'Sarah Jenkins (Apex)',
    uploadedByRole: 'client',
    uploadedAt: '2026-07-28 02:45 PM',
    clientId: 'client-apex',
    isEncrypted: true,
    downloadCount: 6
  },
  {
    id: 'file-03',
    name: 'Tomcat_Web_Dev_Service_Agreement_Signed.pdf',
    size: 890000,
    type: 'application/pdf',
    category: 'Contract',
    uploadedBy: 'Tomcat Legal',
    uploadedByRole: 'admin',
    uploadedAt: '2026-06-02 11:30 AM',
    clientId: 'client-vanguard',
    isEncrypted: true,
    downloadCount: 4
  },
  {
    id: 'file-04',
    name: 'Vanguard_Quarterly_Financial_Summary_Q2.xlsx',
    size: 3400000,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    category: 'Invoice',
    uploadedBy: 'Marcus Vance (Vanguard)',
    uploadedByRole: 'client',
    uploadedAt: '2026-07-22 04:10 PM',
    clientId: 'client-vanguard',
    isEncrypted: true,
    downloadCount: 9
  },
  {
    id: 'file-05',
    name: 'Tomcat_Logistics_Tech_Whitepaper_2026.pdf',
    size: 4200000,
    type: 'application/pdf',
    category: 'General',
    uploadedBy: 'Tomcat Architecture',
    uploadedByRole: 'admin',
    uploadedAt: '2026-07-15 10:00 AM',
    clientId: 'global',
    isEncrypted: false,
    downloadCount: 42
  }
];

export const INITIAL_MESSAGES: PortalMessage[] = [
  {
    id: 'msg-01',
    senderId: 'admin-1',
    senderName: 'Tomcat Engineering Lead',
    senderRole: 'admin',
    clientId: 'client-apex',
    text: 'Hello Sarah! We have pushed the latest telematics update to the staging portal. Bill of Lading uploads are now secured with direct AES-256 checks.',
    timestamp: '2026-07-28 10:15 AM'
  },
  {
    id: 'msg-02',
    senderId: 'client-apex',
    senderName: 'Sarah Jenkins (Apex Logistics)',
    senderRole: 'client',
    clientId: 'client-apex',
    text: 'That is fantastic! I uploaded the new EU route manifest in the Secure Document Vault. Could you review the schema?',
    timestamp: '2026-07-28 02:46 PM'
  },
  {
    id: 'msg-03',
    senderId: 'admin-1',
    senderName: 'Tomcat Engineering Lead',
    senderRole: 'admin',
    clientId: 'client-apex',
    text: 'Received! The route manifest matches our parser. We will finalize the live staging verification tomorrow morning.',
    timestamp: '2026-07-28 03:02 PM'
  },
  {
    id: 'msg-04',
    senderId: 'admin-1',
    senderName: 'Tomcat Principal Architect',
    senderRole: 'admin',
    clientId: 'client-vanguard',
    text: 'Marcus, the minimalist design overhaul is 92% complete. Take a look at the staging URL link in your portal overview.',
    timestamp: '2026-07-29 09:30 AM'
  }
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-101',
    name: 'David Reynolds',
    email: 'd.reynolds@transatlantic-freight.com',
    company: 'Transatlantic Freight Group',
    serviceType: 'logistics_tech',
    budget: '$25,000 - $50,000',
    message: 'We require a custom web application to track our maritime container fleet and allow client portal file downloads for shipping certificates.',
    createdAt: '2026-07-29 11:20 AM',
    status: 'new'
  },
  {
    id: 'inq-102',
    name: 'Elena Rostova',
    email: 'elena@rostovadesign.co',
    company: 'Rostova Architectural Studio',
    serviceType: 'custom_web',
    budget: '$15,000 - $25,000',
    message: 'Looking for a minimalist custom website development solution with a modern aesthetic to showcase our project portfolio.',
    createdAt: '2026-07-28 04:15 PM',
    status: 'reviewed'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-1',
    action: 'FILE_UPLOAD',
    user: 'Sarah Jenkins (Apex)',
    timestamp: '2026-07-28 02:45 PM',
    details: 'Uploaded Bill_of_Lading_Manifest_EU_Route_982.pdf to client-apex vault'
  },
  {
    id: 'audit-2',
    action: 'ADMIN_ACCESS',
    user: 'Tomcat Administrator',
    timestamp: '2026-07-30 07:10 AM',
    details: 'Authenticated via restricted footer access key'
  },
  {
    id: 'audit-3',
    action: 'INQUIRY_RECEIVED',
    user: 'System',
    timestamp: '2026-07-29 11:20 AM',
    details: 'New contact inquiry received from Transatlantic Freight Group'
  }
];
