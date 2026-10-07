/* ============================================================
   site.config.js — THE ONLY FILE YOU EDIT
   Everything shown on the page comes from this object.
   ============================================================ */
window.SITE = {
  meta: {
    name: "Ammar Yasser",
    fullName: "Ammar Yasser Mohamed Abd-El Aal",
    role: "Mechatronics Engineer",
    tagline: "R&D · Robotics · Electric mobility",
    siteUrl: "https://amaryasser3210-sketch.github.io",
    ogImage: "assets/og-image.jpg"
  },

  links: {
    linkedin: "https://www.linkedin.com/in/ammar-yasser-2505bb19a/",
    email: "amaryasser3210@gmail.com",
    phone: "+201061769179",
    phoneDisplay: "+20 106 176 9179",
    location: "October Gardens, Giza, Egypt",
    cv: "assets/AmmarYasser_resume.pdf"
  },

  hero: {
    eyebrow: "Mechatronics Engineering · Ain Shams University",
    title: "Ammar Yasser",
    headline: "Turning mechatronic concepts into working hardware.",
    intro:
      "Aspiring Mechatronics Engineer with experience in robotics, embedded systems and mechanical design — passionate about R&D and electric mobility.",
    avatar: "assets/avatar.webp",
    facts: [
      { label: "Based in", value: "Giza, Egypt" },
      { label: "Current role", value: "Tech Team Leader, Trophy Technologies" },
      { label: "Focus", value: "Electric mobility & embedded R&D" }
    ],
    ctas: [
      { label: "View projects", href: "#projects", primary: true },
      { label: "Download CV", href: "assets/AmmarYasser_resume.pdf", download: true }
    ]
  },

  about: {
    heading: "About",
    paragraphs: [
      "I am a mechatronics engineering undergraduate (2022–2027) who enjoys the full path of a product: concept sketches, CAD and simulation, then firmware and boards that make it move.",
      "My experience spans mechanical design with SolidWorks and Fusion 360, mechatronic system design stages — modelling, verification and validation — plus embedded work on ESP32-S2 and AVR platforms, battery pack design with MATLAB/Simulink, and PCB design.",
      "I currently lead the technical team of the R&D department at Trophy Technologies, covering embedded systems, software and simulation teams."
    ],
    facts: [
      { label: "Education", value: "BEng Mechatronics, Ain Shams University" },
      { label: "Experience", value: "Startups, competitions & Fab Lab operations" },
      { label: "Languages", value: "Arabic (native), English (professional)" },
      { label: "Status", value: "Tech Team Leader @ Trophy Technologies" }
    ]
  },

  projects: {
    heading: "Research & Projects",
    intro: "Selected work across concept design, simulation, embedded systems and fabrication.",
    items: [
      {
        id: "kairo-ebike",
        title: "Bicycle-to-Electric Conversion Kit",
        org: "KAIRO",
        year: "2026",
        role: "Mechanical Designer",
        tags: ["Mechanical Design", "Simulation", "E-Mobility"],
        cover: "assets/projects/kairo-ebike/cover.webp",
        summary:
          "System concept design of a portable kit that converts a standard bicycle into an electric one, sized from first-principles load and power studies.",
        highlights: [
          "Concept design of the complete conversion system",
          "Load studies and power-consumption analysis",
          "Motor actuation sizing for real riding conditions",
          "Power-transmission design and packaging"
        ],
        links: []
      },
      {
        id: "royal-herbs-packing",
        title: "Auto-Packing Machine Extension",
        org: "ASU Innovation Hub · Royal Competition",
        year: "2026",
        role: "Competition Candidate",
        tags: ["Mechanical Design", "DFM", "CAD"],
        cover: "assets/projects/royal-herbs-packing/cover.webp",
        summary:
          "Detailed initial concept for extending an auto-packing machine (tea packaging) at Royal Herbs Company, designed for manufacturability and throughput.",
        highlights: [
          "Concept modelling in SolidWorks and Fusion 360",
          "Design-for-Manufacturing principles applied throughout",
          "Machine layout optimised for line efficiency",
          "Documented concept proposal for the company"
        ],
        links: []
      },
      {
        id: "trophy-battery-soc",
        title: "Battery Pack Design & SoC Node",
        org: "Trophy Technologies",
        year: "2026",
        role: "Tech Team Leader, R&D",
        tags: ["Embedded", "Battery", "PCB"],
        cover: "assets/projects/trophy-battery-soc/cover.webp",
        summary:
          "Battery pack design and an ESP32-S2 node that reports state-of-charge over MQTT, developed while leading the R&D technical teams.",
        highlights: [
          "Battery modelling with MATLAB/Simulink Battery Builder",
          "State-of-charge estimation firmware on ESP32-S2",
          "PCB design for the monitoring node",
          "MQTT telemetry; leads embedded, software & simulation teams"
        ],
        links: []
      },
      {
        id: "fablab-3dprinting",
        title: "Fab Lab Operations & Additive Manufacturing",
        org: "Industry 4.0 Innovation Hub (ITIDA) · ASU Innovation Hub",
        year: "2025",
        role: "Fab Lab Operator",
        tags: ["Fabrication", "Additive Manufacturing"],
        cover: "assets/projects/fablab-3dprinting/cover.webp",
        summary:
          "Ran and standardised Fab Lab equipment: 3D printers, CNC coordinate systems, filament selection and slicing — plus documented operational standards.",
        highlights: [
          "Operated and maintained 3D printing and CNC equipment",
          "Filament types, slicing strategies and failure modes",
          "Developed standardisation documentation for lab processes",
          "Trained on CNC coordinate systems and fixtures"
        ],
        links: []
      }
    ]
  },

  skills: {
    heading: "Technical Skills",
    intro: "Tools and methods I use regularly.",
    groups: [
      {
        name: "Mechanical & CAD",
        items: ["SolidWorks (CSWA)", "Fusion 360", "Autodesk Inventor", "SketchUp", "CorelDraw", "Design for Manufacturing"]
      },
      {
        name: "Robotics & Simulation",
        items: ["MATLAB Robotics Toolbox", "Simulink", "Simscape Multibody", "Battery Builder", "Modelling, V&V"]
      },
      {
        name: "Embedded & Electronics",
        items: ["ESP32-S2", "AVR ATmega32", "Ai Thinker PB-03F", "PCB design", "MQTT", "TIA Portal (STEP 7 · WinCC)"]
      },
      {
        name: "Fabrication & Prototyping",
        items: ["FDM 3D printing", "CNC coordinate systems", "Slicing & print tuning", "Fab Lab operations"]
      },
      {
        name: "Software & Documentation",
        items: ["Programming (MICA, national level)", "LaTeX", "Technical report writing", "MS Word & Excel"]
      }
    ]
  },

  timeline: {
    heading: "Experience & Education",
    items: [
      {
        kind: "work",
        title: "Tech Team Leader · R&D Department",
        org: "Trophy Technologies (start-up)",
        period: "Jun 2026 – Present",
        detail: "Lead the technical team of the R&D department — embedded systems, software and simulation teams. Battery design, MATLAB Battery Builder, ESP32-S2 SoC, PCB design, MQTT."
      },
      {
        kind: "work",
        title: "Mechanical Designer",
        org: "KAIRO (start-up)",
        period: "Jun 2026 – Sep 2026",
        detail: "System concept design of a portable bicycle-to-electric conversion kit: load studies, power-consumption analysis, motor actuation sizing and power-transmission design."
      },
      {
        kind: "competition",
        title: "Candidate · Royal Competition",
        org: "ASU Innovation Hub",
        period: "Mar 2026 – May 2026",
        detail: "Detailed initial concept for an auto-packing machine extension (tea packaging) at Royal Herbs Company, applying SolidWorks/Fusion 360 and DFM principles."
      },
      {
        kind: "work",
        title: "Fab Lab Operator",
        org: "Industry 4.0 Innovation Hub, ITIDA",
        period: "Aug 2025",
        detail: "Managed Fab Lab equipment and resources; developed and documented operational standards for lab processes and services."
      },
      {
        kind: "training",
        title: "SIMATIC Programming 1 · TIA Portal",
        org: "Siemens Digital Industry",
        period: "Aug 2025",
        detail: "STEP 7, WinCC and Startdrive: overview and performance characteristics of the SIMATIC S7 system family."
      },
      {
        kind: "training",
        title: "Trainee",
        org: "ASU Innovation Hub",
        period: "Mar 2025",
        detail: "3D printing machines, CNC coordinate systems, filament types, slicing options and the common failure modes to avoid."
      },
      {
        kind: "education",
        title: "BEng Mechatronics Engineering",
        org: "Ain Shams University (ASU)",
        period: "2022 – 2027",
        detail: "Fields of study: mechanical design principles, mechatronic system design and control."
      },
      {
        kind: "education",
        title: "Computer Programming & Self-Learning",
        org: "Masr International Computer Academy (MICA)",
        period: "2019 – 2022",
        detail: "Excelled in programming, self-learning and online research — 4th place nationally with a score of 98.2%."
      }
    ]
  },

  badges: [
    {
      title: "Certifications",
      items: [
        { name: "SolidWorks CAD Design Associate", detail: "CSWA / CSWP · Jul 2025" },
        { name: "MATLAB & Simulink", detail: "MathWorks platform · Jun 2025" },
        { name: "Mechanical Design via SolidWorks", detail: "Udemy · Nov 2024" }
      ]
    },
    {
      title: "Awards & Competitions",
      items: [
        { name: "Nawah for Entrepreneurship", detail: "2nd place nationally (2020) · 3rd place (2021)" },
        { name: "MICA National Programming", detail: "4th place nationally · 98.2% score" },
        { name: "ASU Innovation Hub Royal Competition", detail: "Concept candidate · 2026" }
      ]
    }
  ],

  contact: {
    heading: "Get in touch",
    intro:
      "Interested in mechatronics, embedded R&D or electric mobility projects? The fastest ways to reach me:",
    note: "Open to internships, collaborations and R&D roles."
  }
};
