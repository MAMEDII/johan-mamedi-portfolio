import type { FAQItem, SiteContent, SocialItem, VideoItem } from "../types/content";

const tri = (en: string, pt = en, es = en) => ({ en, pt, es });

export const fallbackSite: SiteContent = {
  name: "Johan Mamedi",
  brandName: "MAMEDI",
  heroLabel: tri("VIDEO EDITOR PORTFOLIO", "PORTFOLIO DE EDITOR DE VIDEO", "PORTAFOLIO DE EDITOR DE VIDEO"),
  headline: tri("MAMEDI"),
  subtitle: tri("Where storytelling meets precision.", "Onde a narrativa encontra a precisao.", "Donde la narrativa se encuentra con la precision."),
  heroWords: {
    en: ["RETENTION", "PACING", "STORYTELLING", "PRECISION", "CINEMATIC FLOW"],
    pt: ["RETENCAO", "RITMO", "NARRATIVA", "PRECISAO", "FLUXO CINEMATICO"],
    es: ["RETENCION", "RITMO", "NARRATIVA", "PRECISION", "FLUJO CINEMATICO"],
  },
  nav: {
    en: { home: "Home", about: "About", longForm: "Long Form", shorts: "Shorts", motionDesign: "Motion Design", faq: "FAQ", contact: "Contact" },
    pt: { home: "Inicio", about: "Sobre", longForm: "Longos", shorts: "Curtos", motionDesign: "Motion Design", faq: "FAQ", contact: "Contato" },
    es: { home: "Inicio", about: "Sobre mi", longForm: "Largos", shorts: "Cortos", motionDesign: "Motion Design", faq: "FAQ", contact: "Contacto" },
  },
  sectionEyebrows: {
    en: { about: "ABOUT / 01", workspace: "WORKSPACE / 02", longForm: "SELECTED WORK / 03", shorts: "VERTICAL WORK / 04", motionDesign: "MOTION SYSTEMS / 05", faq: "QUESTIONS / 06" },
    pt: { about: "SOBRE / 01", workspace: "ESPACO / 02", longForm: "TRABALHOS / 03", shorts: "VERTICAIS / 04", motionDesign: "MOTION / 05", faq: "PERGUNTAS / 06" },
    es: { about: "SOBRE MI / 01", workspace: "ESPACIO / 02", longForm: "TRABAJOS / 03", shorts: "VERTICALES / 04", motionDesign: "MOTION / 05", faq: "PREGUNTAS / 06" },
  },
  scrollLabel: tri("SCROLL", "ROLAR", "DESLIZAR"),
  aboutTitle: tri("Built around the story.", "Construido em torno da historia.", "Construido alrededor de la historia."),
  aboutText: tri(
    "I'm Johan Mamedi, {age} years old, and a video editor with a lifelong connection to editing. I started editing as a child, around the age of seven, and I have been working professionally with YouTube channels and digital content since May 2024.\n\nProfessional editing experience: {experience}.",
    "Sou Johan Mamedi, editor de video de {age} anos, com uma conexao com edicao desde a infancia. Comecei a editar por volta dos sete anos e trabalho profissionalmente com canais do YouTube e conteudo digital desde maio de 2024.\n\nExperiencia profissional em edicao: {experience}.",
    "Soy Johan Mamedi, editor de video de {age} anos, con una conexion con la edicion desde la infancia. Empece a editar alrededor de los siete anos y trabajo profesionalmente con canales de YouTube y contenido digital desde mayo de 2024.\n\nExperiencia profesional en edicion: {experience}.",
  ),
  toolsTitle: tri("Tools of the trade", "Ferramentas de trabalho", "Herramientas de trabajo"),
  toolStatus: tri("Adobe", "Adobe", "Adobe"),
  tools: [
    { name: "Premiere Pro", badge: "Pr", icon: "assets/software/premiere.png" },
    { name: "After Effects", badge: "Ae", icon: "assets/software/after-effects.png" },
    { name: "Photoshop", badge: "Ps", icon: "assets/software/photoshop.png" },
  ],
  workspaceTitle: tri("Editing Workspace", "Espaco de Edicao", "Espacio de Edicion"),
  workspaceLabels: { en: ["PREMIERE", "AFTER EFFECTS", "PHOTOSHOP"], pt: ["PREMIERE", "AFTER EFFECTS", "PHOTOSHOP"], es: ["PREMIERE", "AFTER EFFECTS", "PHOTOSHOP"] },
  longFormTitle: tri("Long Form", "Videos Longos", "Videos Largos"),
  longFormDescription: tri("Horizontal edits with cinematic pacing, strong hooks, and clean visual flow."),
  shortsTitle: tri("Shorts", "Curtos", "Cortos"),
  shortsDescription: tri("Fast vertical edits made for retention, captions, impact frames, and replay value."),
  motionDesignTitle: tri("Motion Design", "Motion Design", "Motion Design"),
  motionDesignDescription: tri(
    "Animated visuals, kinetic typography, transitions and motion graphics built to add energy, clarity and style to every edit.",
    "Visuais animados, tipografia cinetica, transicoes e motion graphics criados para adicionar energia, clareza e estilo a cada edicao.",
    "Visuales animados, tipografia cinetica, transiciones y motion graphics creados para agregar energia, claridad y estilo a cada edicion.",
  ),
  faqTitle: tri("Frequently asked", "Perguntas frequentes", "Preguntas frecuentes"),
  faqDescription: tri("The essentials before we start creating."),
  contactBadge: tri("Available For Work", "Disponivel Para Trabalhos", "Disponible Para Trabajar"),
  contactTitle: tri("Let's build sharper, more engaging content.", "Vamos criar conteudo mais preciso e envolvente.", "Creemos contenido mas preciso y atractivo."),
  contactDescription: tri("Tell me about the story you want to bring to life."),
  footerText: tri("Johan Mamedi Portfolio - All rights reserved"),
  languageLabels: { en: "English", pt: "Portugues", es: "Espanol" },
};

export const fallbackVideos: VideoItem[] = [
  { id: "fallback-1", youtube: "dQw4w9WgXcQ", title: tri("The Art of Momentum"), category: tri("Video edit"), kind: "long", aspectRatio: "horizontal", active: true, order: 1 },
  { id: "fallback-2", youtube: "aqz-KE-bpKQ", title: tri("Beyond The Frame"), category: tri("Video edit"), kind: "short", aspectRatio: "vertical", active: true, order: 1 },
  { id: "fallback-motion-1", youtube: "M7lc1UVf-VE", title: tri("Kinetic Title System"), category: tri("Motion Design"), kind: "motion", aspectRatio: "9:16", active: true, order: 1 },
];

export const fallbackSocials: SocialItem[] = [
  { id: "email", label: "Email", url: "mailto:hello@johanmamedi.com", active: true },
  { id: "twitter", label: "X / Twitter", url: "https://x.com/", active: true },
  { id: "discord", label: "Discord", url: "https://discord.com/", active: true },
];

export const fallbackFaq: FAQItem[] = [
  { id: "services", question: tri("What services do you provide?", "Quais servicos voce oferece?", "Que servicios ofreces?"), answer: tri("I edit long-form videos, shorts and digital content."), active: true, order: 1 },
  { id: "contact", question: tri("How can I contact you?", "Como posso entrar em contato?", "Como puedo contactarte?"), answer: tri("Use any of the contact links below. Email and Discord are the fastest options.", "Use qualquer um dos links de contato abaixo. E-mail e Discord sao as opcoes mais rapidas.", "Usa cualquiera de los enlaces de contacto de abajo. El correo electronico y Discord son las opciones mas rapidas."), active: true, order: 2 },
];
