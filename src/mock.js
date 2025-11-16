// Mock data for portfolio

export const portfolioData = {
  hero: {
    name: "Mohamed Msalli Oumaou",
    title: "Estudiante de Informática | IES Villaverde",
    subtitle: "Especializado en Sistemas Microinformáticos y Redes",
    description: "Estudiante de Formación Profesional con experiencia práctica en mantenimiento de hardware, soporte técnico y gestión de sistemas. Apasionado por la tecnología y el aprendizaje continuo.",
    cta: "Ver experiencia",
    image: "https://fv5-3.files.fm/thumb_show.php?i=twubpucrkj&view&v=1&PHPSESSID=09229aecaac85e5fb2e0a9c99c20ecddb4ca41d8",
    showStats: false
  },
  
  about: {
    title: "Sobre mí",
    description: "Estudiante de Formación Profesional en Informática con sólida formación técnica y experiencia práctica en entornos profesionales reales.",
    story: [
      "Actualmente curso Formación Profesional en Sistemas Microinformáticos y Redes en IES Villaverde. Mi formación me ha permitido desarrollar competencias técnicas en sistemas operativos, hardware y software empresarial.",
      "He completado prácticas profesionales en Creatica ONG y Vimantik, donde he aplicado mis conocimientos en mantenimiento de hardware, instalación de software, soporte técnico y gestión de inventarios. Estas experiencias me han permitido desarrollar habilidades de trabajo en equipo y atención al detalle.",
      "Domino sistemas operativos Linux y Windows, así como herramientas de oficina y gestión. Mi objetivo es seguir creciendo profesionalmente en el sector IT, especializándome en administración de sistemas y redes."
    ],
    values: [
      { icon: "Users", title: "Trabajo en Equipo", description: "Colaboración efectiva con compañeros y superiores" },
      { icon: "Clock", title: "Puntualidad", description: "Compromiso con horarios y entregas" },
      { icon: "Eye", title: "Atención al Detalle", description: "Precisión en cada tarea realizada" },
      { icon: "BookOpen", title: "Aprendizaje Continuo", description: "Siempre en formación y actualización" }
    ],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop"
  },
  
  projects: [
    {
      id: 1,
      title: "Prácticas en Vimantik",
      category: "Soporte Técnico",
      description: "Soporte técnico y mantenimiento de equipos, gestión de inventario con Excel y organización de almacén tecnológico.",
      technologies: ["Windows", "Excel", "Inventario", "Mantenimiento", "Organización de documentos",],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      color: "#00ff88"
    },
    {
      id: 2,
      title: "Prácticas en Creatica ONG",
      category: "Mantenimiento IT",
      description: "Mantenimiento de hardware, instalación y actualización de software, y gestión documental en entorno organizacional.",
      technologies: ["Linux", "Windows", "Instalación Software", "Documentación", "Configuración de sistemas", "Actualizar" ],
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
      color: "#0080ff"
    }
  ],
  
  diplomas: [
    {
      id: 1,
      title: "FP Informática de Oficina",
      institution: "IES Villaverde",
      year: "2023-2025",
      icon: "GraduationCap"
    },
    {
      id: 2,
      title: "Estudiando FP en Sistemas Microinformáticos y Redes",
      institution: "IES Villaverde",
      year: "2025...",
      icon: "Network"
    },
    {
      id: 3,
      title: "Prácticas Profesionales",
      institution: "Creatica ONG - Madrid",
      year: "05/2024-06/2024",
      icon: "Building"
    }
  ],

  skills: {
    technical: [
      { name: "Linux", level: 85, icon: "Terminal" },
      { name: "Windows", level: 60, icon: "Monitor" },
      { name: "Excel", level: 75, icon: "FileSpreadsheet" },
      { name: "Microsoft Office", level: 60, icon: "FileText" },
      { name: "Google Workspace", level: 55, icon: "Cloud" },
      { name: "Redes", level: 75, icon: "Network" }
    ],
    languages: [
      { name: "Español", level: 100, flag: "🇪🇸" },
      { name: "Árabe", level: 100, flag: "AR" },
      { name: "Inglés", level: 40, flag: "IN" }
    ]
  },
  
  contact: {
    title: "¿Trabajamos juntos?",
    subtitle: "Estoy disponible para prácticas, proyectos colaborativos y oportunidades de aprendizaje en el sector IT.",
    email: "studmohammad@gmail.com",
    phone: "+34 624 335 571",
    location: "Avenida de Orovilla, Madrid",
    social: [
      { name: "LinkedIn", icon: "Linkedin", url: "https://www.linkedin.com/in/mohamed-msalli-oumaou-09a957370/", text: "Este es mi perfil" },
      { name: "Email", icon: "Mail", url: "mailto:studmohammad@gmail.com" },
      { name: "WhatsApp", icon: "MessageCircle", url: "https://wa.me/34624335571" }
    ]
  },
  
  footer: {
    copyright: "© 2025 Mohamed Msalli Oumaou. Todos los derechos reservados.",
    legal: [
      { text: "Aviso Legal", link: "#"},
      { text: "Política de Privacidad", link: "#" },
    ]
  }
};