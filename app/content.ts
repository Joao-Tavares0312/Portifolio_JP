export type Lang = "pt" | "en";

type Link = { label: { pt: string; en: string }; href: string };
export type Case = {
  id: string;
  name: string;
  year: string;
  kind: { pt: string; en: string };
  line: { pt: string; en: string };
  body: { pt: string; en: string };
  facts?: { n: string; l: { pt: string; en: string } }[];
  stack: string[];
  image: string;
  /** telas extras do produto no ar: duas de desktop e uma de celular */
  shots: string[];
  mobile: string;
  /** gravação curta do produto no ar, sem som */
  video: string;
  /** cor do produto; só aparece na malha de pixels do fundo */
  accent: string;
  links: Link[];
};

const site = { pt: "Ver no ar", en: "Live site" };
const repo = { pt: "Código", en: "Code" };
const docs = { pt: "Documentação", en: "Docs" };

export const cases: Case[] = [
  {
    id: "fraus",
    name: "Fraus",
    year: "2026",
    kind: { pt: "IA aplicada · produto", en: "Applied AI · product" },
    line: {
      pt: "Estima a satisfação do cliente a partir das conversas com o chatbot.",
      en: "Estimates customer satisfaction from chatbot conversations.",
    },
    body: {
      pt: "Muita gente termina o atendimento com um “ok, obrigado” e sai insatisfeita. O Fraus recebe planilhas, CSV, JSON ou conversas exportadas do WhatsApp e estima a satisfação pelos sinais do texto. Usa modelos próprios, sem LLM na inferência.",
      en: "A lot of people end a support chat with “ok, thanks” and leave unhappy. Fraus takes spreadsheets, CSV, JSON or exported WhatsApp chats and estimates satisfaction from signals in the text. It uses its own models, with no LLM at inference.",
    },
    facts: [
      { n: "39", l: { pt: "features no fusor", en: "fused features" } },
      { n: "3", l: { pt: "BERTimbau fine-tunados", en: "fine-tuned BERTimbau" } },
      { n: "0", l: { pt: "LLMs em runtime", en: "LLMs at runtime" } },
    ],
    stack: ["Python", "BERTimbau", "PostgreSQL", "Supabase", "Vercel"],
    image: "/work/fraus.webp",
    shots: ["/work/fraus-2.webp", "/work/fraus-3.webp"],
    mobile: "/work/fraus-m.webp",
    video: "/work/fraus.mp4",
    accent: "#d9a441",
    links: [
      { label: site, href: "https://fraus-one.vercel.app/" },
      { label: docs, href: "https://joao-tavares0312.github.io/fraus-docs/" },
      { label: repo, href: "https://github.com/Joao-Tavares0312/Fraus" },
    ],
  },
  {
    id: "tars",
    name: "TARS",
    year: "2026",
    kind: { pt: "Plataforma SaaS", en: "SaaS platform" },
    line: {
      pt: "Plataforma para criar e operar atendentes de IA para lojas.",
      en: "A platform to build and run AI attendants for shops.",
    },
    body: {
      pt: "Dá para configurar, testar e operar assistentes de conversa. Tem painel do operador com fila de atendimento, base de conhecimento, equipe e auditoria. Atende por Telegram e por webchat.",
      en: "You can configure, test and run conversational assistants. It has an operator panel with a support queue, knowledge base, team and audit log. It answers on Telegram and on a webchat.",
    },
    stack: ["TypeScript", "PostgreSQL", "Telegram API", "Vercel"],
    image: "/work/tars.webp",
    shots: ["/work/tars-2.webp", "/work/tars-3.webp"],
    mobile: "/work/tars-m.webp",
    video: "/work/tars.mp4",
    accent: "#58d6a6",
    links: [
      { label: site, href: "https://tars-ten-rho.vercel.app" },
      { label: docs, href: "https://joao-tavares0312.github.io/tars-docs/" },
    ],
  },
  {
    id: "zerobala",
    name: "Zero Bala",
    year: "2026",
    kind: { pt: "E-commerce · cliente real", en: "E-commerce · real client" },
    line: {
      pt: "Loja online de uma bicicletaria de 30 anos em Varginha-MG.",
      en: "Online store for a 30-year-old bike shop in Varginha, Brazil.",
    },
    body: {
      pt: "Tem catálogo de bikes e peças, agendamento de oficina e painel admin para pedidos, produtos com foto, promoções e destaques. A sessão usa cookie HttpOnly assinado com HMAC e tudo roda no plano Hobby da Vercel.",
      en: "It has a bike and parts catalog, workshop booking and an admin panel for orders, products, promotions and featured items. The session uses an HMAC-signed HttpOnly cookie and everything runs on Vercel Hobby.",
    },
    stack: ["Next.js", "TypeScript", "Vercel"],
    image: "/work/zerobala.webp",
    shots: ["/work/zerobala-2.webp", "/work/zerobala-3.webp"],
    mobile: "/work/zerobala-m.webp",
    video: "/work/zerobala.mp4",
    accent: "#ff5a1f",
    links: [{ label: site, href: "https://zero-bala-sepia.vercel.app" }],
  },
  {
    id: "voz",
    name: "Voz Autista",
    year: "2026",
    kind: { pt: "Hardware assistivo · open source", en: "Assistive hardware · open source" },
    line: {
      pt: "Comunicador para pessoas autistas não-verbais que custa cerca de R$ 128.",
      en: "A communication device for non-verbal autistic people that costs about R$ 128.",
    },
    body: {
      pt: "A pessoa aperta o botão colorido de uma categoria e o aparelho fala a palavra pelo alto-falante. O case é impresso em 3D. O projeto tem manual de montagem, simulador no navegador e visualização 3D.",
      en: "The person presses a color-coded category button and the device says the word through a speaker. The case is 3D-printed. The project has an assembly manual, an in-browser simulator and a 3D viewer.",
    },
    facts: [
      { n: "35", l: { pt: "palavras", en: "words" } },
      { n: "7", l: { pt: "categorias", en: "categories" } },
    ],
    stack: ["Arduino", "C++", "DFPlayer", "Impressão 3D"],
    image: "/work/vozautista.webp",
    shots: ["/work/vozautista-2.webp", "/work/vozautista-3.webp"],
    mobile: "/work/vozautista-m.webp",
    video: "/work/vozautista.mp4",
    accent: "#4f7dff",
    links: [
      { label: site, href: "https://vozautista.vercel.app/" },
      { label: repo, href: "https://github.com/Joao-Tavares0312/Project_auts" },
    ],
  },
];

export const more = [
  {
    name: "Neuro",
    icon: "bot",
    tag: { pt: "Experimental · em produção", en: "Experimental · in production" },
    text: {
      pt: "Uma IA que eu fiz e uso no dia a dia. Roda em um servidor MCP, conversa por voz e texto no Discord, tem STT/TTS local e memória de longo prazo.",
      en: "An AI I built and use every day. It runs on an MCP server, talks by voice and text on Discord, has local STT/TTS and long-term memory.",
    },
    href: undefined as string | undefined,
  },
  {
    name: "Casa IoT",
    icon: "home",
    tag: { pt: "ESP32 · MQTT", en: "ESP32 · MQTT" },
    text: {
      pt: "Casa inteligente simulada com ESP32. Dá para controlar pelo celular a temperatura, a umidade, a porta e a luz de quatro cômodos.",
      en: "A simulated smart home on ESP32. You control temperature, humidity, the door and the lights of four rooms from a phone.",
    },
    href: "https://wokwi.com/projects/467281169365558273",
  },
];

export const path = [
  {
    year: "2026",
    icon: "work",
    when: { pt: "fev 2026 até hoje", en: "Feb 2026 to now" },
    org: "Sourei · Wascer",
    role: { pt: "Desenvolvedor", en: "Developer" },
    text: {
      pt: "Trabalho no Wascer, um produto de tracking server-side. Faço tags de servidor do GTM e integrações de conversão.",
      en: "I work on Wascer, a server-side tracking product. I build GTM server tags and conversion integrations.",
    },
    tags: ["GTM server-side"],
  },
  {
    year: "2024",
    icon: "coffee",
    when: { pt: "jun 2024 a mar 2026", en: "Jun 2024 to Mar 2026" },
    org: "Jaguara Coffee",
    role: { pt: "Desenvolvedor · estágio", en: "Developer · internship" },
    text: {
      pt: "Meu primeiro emprego como desenvolvedor. Fiquei quase dois anos.",
      en: "My first job as a developer. I stayed almost two years.",
    },
    tags: [] as string[],
  },
  {
    year: "CC",
    icon: "study",
    when: { pt: "em andamento", en: "in progress" },
    org: "UNIS-MG",
    role: { pt: "Ciência da Computação", en: "B.Sc. Computer Science" },
    text: {
      pt: "Graduação em andamento, em Varginha-MG.",
      en: "Degree in progress, in Varginha, Brazil.",
    },
    tags: ["Algoritmos", "Estruturas de dados", "Engenharia de software"],
  },
];

export const stack = ["Python", "TypeScript", "React", "Next.js", "PostgreSQL", "Supabase", "Docker", "Kotlin", "C++ / Arduino", "GTM server-side", "WebGPU"];

export const certs = [
  { name: "Inglês B2", by: "Cambridge English", year: "2022", icon: "lang" },
  { name: "Olimpíada Brasileira de Astronomia", by: "SAB", year: "2024", icon: "astro" },
  { name: "Excel completo", by: "Udemy", year: "2025", icon: "sheet" },
  { name: "Git e GitHub", by: "Estudonauta", year: "2025", icon: "git" },
  { name: "Python", by: "Estudonauta", year: "2025", icon: "python" },
  { name: "MySQL", by: "Estudonauta", year: "2026", icon: "db" },
];

export const about = {
  pt: [
    "Moro em Varginha, no sul de Minas, e estudo Ciência da Computação no UNIS-MG.",
    "Nos meus projetos eu faço tudo: converso com quem vai usar, monto o banco de dados, escrevo o back-end e o front e publico. O Fraus, o TARS e a Zero Bala foram feitos assim.",
    "Trabalho na Sourei desde fevereiro de 2026, no Wascer, que é um produto de tracking server-side. Antes disso fiquei quase dois anos na Jaguara Coffee, meu primeiro emprego como desenvolvedor.",
    "Tenho inglês B2 pelo Cambridge, participei da Olimpíada Brasileira de Astronomia e uso no dia a dia uma IA que eu mesmo fiz, a Neuro.",
  ],
  en: [
    "I live in Varginha, in southern Minas Gerais, Brazil, and study Computer Science at UNIS-MG.",
    "In my projects I do everything: I talk to the people who will use it, set up the database, write the back-end and the front-end and deploy. Fraus, TARS and Zero Bala were built that way.",
    "I've worked at Sourei since February 2026, on Wascer, a server-side tracking product. Before that I spent almost two years at Jaguara Coffee, my first job as a developer.",
    "I have B2 English from Cambridge, took part in the Brazilian Astronomy Olympiad and use an AI I built myself, Neuro, every day.",
  ],
};

export const t = {
  pt: {
    nav: ["Início", "Sobre", "Experiência", "Projetos"],
    role: "Programador fullstack",
    contact: "Contato",
    back: "Todos os projetos",
    next: "Próximo",
    langBtn: "EN",
    langLabel: "Switch to English",
    title: ["João", "Pedro"],
    lede: "Faço o produto inteiro: banco de dados, back-end, front e deploy.",
    sub: "Desenvolvedor na Sourei e estudante de Ciência da Computação no UNIS-MG. Quatro produtos no ar: IA que lê atendimentos, plataforma de chatbots, e-commerce e hardware assistivo.",
    ctaWork: "Ver o trabalho",
    ctaTalk: "Conversar",
    status: "Disponível para projetos · Varginha, MG",
    workH: "Trabalho selecionado",
    moreH: "Também no laboratório",
    pathH: "Trajetória",
    stackH: "Ferramentas",
    certH: "Certificações",
    contactH: "Quer falar comigo?",
    contactSub: "Pode ser por e-mail, WhatsApp ou LinkedIn.",
    rights: "Feito em Next.js.",
  },
  en: {
    nav: ["Home", "About", "Experience", "Projects"],
    role: "Full-stack developer",
    contact: "Contact",
    back: "All projects",
    next: "Next",
    langBtn: "PT",
    langLabel: "Mudar para português",
    title: ["João", "Pedro"],
    lede: "I build the whole product: database, back-end, front-end and deploy.",
    sub: "Developer at Sourei and Computer Science student at UNIS-MG. Four products live: AI that reads support chats, a chatbot platform, an e-commerce store and assistive hardware.",
    ctaWork: "See the work",
    ctaTalk: "Let's talk",
    status: "Open to projects · Varginha, Brazil",
    workH: "Selected work",
    moreH: "Also in the lab",
    pathH: "Path",
    stackH: "Tools",
    certH: "Certifications",
    contactH: "Want to talk?",
    contactSub: "Email, WhatsApp or LinkedIn all work.",
    rights: "Built with Next.js.",
  },
};
