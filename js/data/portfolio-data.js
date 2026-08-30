/**
 * AKMAL B — PORTFOLIO DATA ARCHITECTURE
 * Centralized data store for all portfolio content.
 * 
 * IMPORTANT:
 * - All personal details, educational background, skills, and links are centralized here.
 * - Future additions (projects, certifications, achievements, experience) can be easily added
 *   to the respective arrays below without modifying the UI markup or component code.
 */

export const PORTFOLIO_DATA = {
  profile: {
    name: "Akmal B",
    initials: "AB",
    role: "Computer Science Engineering Student",
    specialization: "Cyber Security",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "SRM Trichy",
    graduationYear: 2030,
    location: "Trichy, Tamil Nadu, India",
    status: "Currently exploring Cloud Security",
    headline: "Building the foundations of a secure digital future.",
    shortBio: "I'm Akmal B, a Computer Science Engineering student specializing in Cyber Security at SRM Trichy. I’m building my foundations in Linux, networking, programming, and security while exploring the path toward Cloud Security.",
    aboutDetailed: [
      "I'm Akmal B, a Computer Science Engineering student specializing in Cyber Security at SRM Trichy.",
      "My current focus is building strong fundamentals across Linux, networking, programming, and cybersecurity while exploring how modern systems can be designed, operated, and secured.",
      "I'm particularly interested in exploring Cloud Security as I continue developing my technical foundation and discovering the areas of cybersecurity that I want to specialize in."
    ],
    philosophy: "I believe technical understanding grows through experimentation, practical work, and continuously questioning how systems operate.",
    avatar: {
      webp: "assets/images/akmal-profile-800.webp",
      png: "assets/images/akmal-profile-800.png",
      alt: "Akmal B — Computer Science and Cyber Security student"
    }
  },

  socials: {
    github: "https://github.com/Akmal-cybersecurity",
    linkedin: "https://www.linkedin.com/in/akmal-b-136618416/",
    email: "sahulakmal805@gmail.com",
    resumeUrl: "" // Set to URL when resume is published
  },

  technicalFoundation: [
    { name: "Linux", category: "Systems", status: "Hands-on", icon: "terminal" },
    { name: "Networking", category: "Infrastructure", status: "Learning", icon: "network" },
    { name: "Python", category: "Programming", status: "Active", icon: "code" },
    { name: "C", category: "Programming", status: "Core", icon: "cpu" },
    { name: "Cybersecurity", category: "Security", status: "Foundational", icon: "shield" },
    { name: "Cloud Security", category: "Direction", status: "Exploring", icon: "cloud" }
  ],

  skillCategories: [
    {
      id: "programming",
      name: "Programming",
      description: "Foundational languages for problem-solving, automation, and systems interaction.",
      skills: [
        {
          name: "Python",
          status: "Current Focus",
          description: "Scripting, basic automation, algorithm practice, and data manipulation.",
          tags: ["Scripting", "Automation", "Logic"]
        },
        {
          name: "C",
          status: "Core Learning",
          description: "Low-level memory awareness, data structures, pointer mechanics, and OS fundamentals.",
          tags: ["Low-Level", "Memory", "Algorithms"]
        }
      ]
    },
    {
      id: "systems",
      name: "Systems & Environments",
      description: "Operating systems, command-line interfaces, and system architecture fundamentals.",
      skills: [
        {
          name: "Linux",
          status: "Hands-on Practice",
          description: "CLI navigation, shell utilities, permissions, process management, and environment configuration.",
          tags: ["CLI", "Filesystem", "Processes", "Shell"]
        }
      ]
    },
    {
      id: "networking",
      name: "Networking",
      description: "Understanding data transport, protocol architectures, and packet flows.",
      skills: [
        {
          name: "Networking Fundamentals",
          status: "Learning",
          description: "OSI & TCP/IP models, DNS, IP addressing, routing concepts, subnetting, and common application protocols.",
          tags: ["TCP/IP", "DNS", "Subnetting", "Protocols"]
        }
      ]
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      description: "Core security principles, threat awareness, and safe architectural paradigms.",
      skills: [
        {
          name: "Cybersecurity Fundamentals",
          status: "Building Foundations",
          description: "CIA triad, defense-in-depth, threat models, basic cryptography concepts, and security hygiene.",
          tags: ["CIA Triad", "Threat Awareness", "Principles"]
        }
      ]
    },
    {
      id: "cloud-security",
      name: "Cloud Security",
      description: "Current exploration area focusing on cloud architecture and modern defense.",
      skills: [
        {
          name: "Cloud Security Principles",
          status: "Active Exploration",
          description: "Exploring identity management (IAM), shared responsibility model, secure cloud configs, and perimeter defense.",
          tags: ["IAM", "Shared Responsibility", "Infrastructure", "Exploration"]
        }
      ]
    }
  ],

  learningJourney: [
    {
      step: "01",
      title: "Computer Science Foundations",
      subtitle: "Academic Core at SRM Trichy",
      status: "In Progress",
      description: "Studying core computational logic, discrete mathematics, computer architecture, and foundational problem solving.",
      isCurrent: false,
      isCompleted: false
    },
    {
      step: "02",
      title: "Programming & Problem Solving",
      subtitle: "Python & C",
      status: "Active Practice",
      description: "Strengthening procedural programming in C and modular automation scripting in Python.",
      isCurrent: false,
      isCompleted: false
    },
    {
      step: "03",
      title: "Linux & Operating Systems",
      subtitle: "Systems Administration & CLI",
      status: "Hands-on Learning",
      description: "Practicing environment navigation, user permissions, process lifecycle, and filesystem mechanics.",
      isCurrent: true,
      isCompleted: false
    },
    {
      step: "04",
      title: "Networking & Protocols",
      subtitle: "Data Transmission & Architectures",
      status: "Core Study",
      description: "Mastering OSI layers, TCP/UDP sockets, packet routing, DNS infrastructure, and network segmentation.",
      isCurrent: true,
      isCompleted: false
    },
    {
      step: "05",
      title: "Cybersecurity Fundamentals",
      subtitle: "Defensive Principles & Threat Modeling",
      status: "Foundations",
      description: "Exploring vulnerability concepts, authentication mechanics, cryptography basics, and security standards.",
      isCurrent: true,
      isCompleted: false
    },
    {
      step: "06",
      title: "Cloud Security Exploration",
      subtitle: "Current Specialization Interest",
      status: "Exploration Phase",
      description: "Investigating cloud infrastructure models, IAM policies, container isolation, and cloud compliance frameworks.",
      isCurrent: true,
      isCompleted: false
    },
    {
      step: "07",
      title: "Practical Projects & Future Specialization",
      subtitle: "Hands-on Labs & Applied Defense",
      status: "Upcoming Milestone",
      description: "Building lab environments, documenting experiments, and deepening knowledge into specialized security domains.",
      isCurrent: false,
      isCompleted: false
    }
  ],

  areasOfExploration: [
    {
      title: "Cloud Security",
      badge: "Primary Interest",
      isPrimary: true,
      description: "Understanding shared responsibility, IAM least privilege, secure cloud architectures, and storage bucket permissions.",
      topics: ["Identity & Access (IAM)", "Cloud Infrastructure", "Secure Configurations", "Cloud Perimeter Security"]
    },
    {
      title: "Network Security",
      badge: "Core Foundation",
      isPrimary: false,
      description: "Analyzing packet flows, protocol vulnerabilities, firewalls, and network perimeter defenses.",
      topics: ["Packet Analysis", "Firewalls", "Segmentation", "Traffic Monitoring"]
    },
    {
      title: "Systems & Linux Security",
      badge: "Hands-on",
      isPrimary: false,
      description: "Kernel permissions, service hardening, access controls, and shell script safety.",
      topics: ["File Permissions", "Hardening", "Process Isolation", "Audit Logs"]
    },
    {
      title: "Web Security",
      badge: "Exploration",
      isPrimary: false,
      description: "Understanding common web application vulnerabilities (OWASP Top 10) and secure API principles.",
      topics: ["OWASP Concepts", "Authentication", "Input Validation", "HTTPS & TLS"]
    },
    {
      title: "Threat Detection & Defense",
      badge: "Conceptual",
      isPrimary: false,
      description: "Learning how anomalous activity is identified, logged, and mitigated across enterprise environments.",
      topics: ["Logging & Telemetry", "Incident Response Basics", "Threat Vectors", "IOCs"]
    },
    {
      title: "Secure Software Development",
      badge: "Code Practice",
      isPrimary: false,
      description: "Writing defensively in C and Python, preventing memory leaks, buffer overruns, and logic errors.",
      topics: ["Defensive Coding", "Memory Safety", "Error Handling", "Code Review"]
    }
  ],

  // Structured Projects Array — Empty state by default per prompt rules
  // When real projects are built, add them here and they will render automatically!
  projects: [
    /* Example schema for future projects:
    {
      id: "project-1",
      title: "Cloud IAM Policy Auditor",
      category: "Cloud Security",
      description: "Automated scanner for misconfigured IAM roles and overly permissive cloud policies.",
      technologies: ["Python", "Boto3", "Cloud Security"],
      image: "assets/images/projects/iam-auditor.webp",
      github: "https://github.com/Akmal-cybersecurity/project-name",
      demo: "",
      featured: true,
      date: "2026",
      problem: "Identifying shadow admin permissions and privilege escalation vectors.",
      solution: "Engineered a recursive policy evaluator checking effective rights.",
      lessons: "Learned nuances of conditional access and IAM evaluation logic.",
      futureImprovements: "Add remediation automation via Webhooks."
    }
    */
  ],

  // Structured Experience Array — Empty state by default
  experience: [
    /* Example schema for future experience:
    {
      id: "exp-1",
      role: "Security Research Intern",
      organization: "Example Cyber Labs",
      type: "Internship",
      period: "Jun 2027 – Aug 2027",
      location: "Remote",
      description: "Analyzed cloud misconfigurations and contributed to internal security benchmarks.",
      skills: ["Cloud Security", "Python", "Linux"]
    }
    */
  ],

  // Structured Certifications Array — Empty state by default
  certifications: [
    /* Example schema for future certifications:
    {
      id: "cert-1",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      issueDate: "2026",
      expiryDate: "2029",
      credentialId: "AWS-123456",
      credentialUrl: "https://aws.amazon.com/verification",
      badgeImage: "assets/images/certs/aws.svg",
      skills: ["Cloud Architecture", "Security Fundamentals"]
    }
    */
  ],

  // Structured Achievements Array — Empty state by default
  achievements: [
    /* Example schema for future achievements:
    {
      id: "ach-1",
      title: "National Hackathon Finalist",
      organization: "Tech Conclave 2026",
      date: "October 2026",
      category: "Cybersecurity",
      description: "Designed a lightweight perimeter telemetry monitor with automated alert triage.",
      proofUrl: ""
    }
    */
  ],

  education: {
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Science & Engineering",
    specialization: "Cyber Security",
    institution: "SRM Trichy",
    period: "2026 – 2030",
    expectedGraduation: "2030",
    location: "Trichy, Tamil Nadu, India",
    focusAreas: [
      "Computer Science Core",
      "Cybersecurity Foundations",
      "Operating Systems & Linux Architecture",
      "Data Communication & Networking",
      "Algorithms & Data Structures in C/Python",
      "Information Security & Cryptography"
    ]
  }
};
