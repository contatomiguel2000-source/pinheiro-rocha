/*
  Conteúdo real da Pinheiro Rocha (Instagram @pinheirorocha.arq, destaques "Feedbacks" e "Prêmio 2025",
  carrossel "minha história" e ficha do Google Maps). Fotos exportadas em public/img, vídeos em public/vid.
  Nas galerias: tag "Antes" = como era, "Obra" = durante a execução, "Projeto 3D" = imagem do projeto.
*/

export const studio = {
  name: "Pinheiro Rocha",
  full: "Pinheiro Rocha Arquitetura e Urbanismo",
  architect: "Laísy Pinheiro Rocha",
  slogan: "Onde a vida ganha forma, beleza e propósito.",
  instagram: "https://www.instagram.com/pinheirorocha.arq/",
  handle: "@pinheirorocha.arq",
  whatsapp: "https://wa.me/5532984201162",
  whatsappNumber: "5532984201162",
  whatsappLabel: "(32) 98420-1162",
  address: "Av. Gov. Valadares, 185 · Centro",
  city: "Bom Jardim de Minas · MG",
  maps: "https://www.google.com/maps/place/Pinheiro+Rocha+Arquitetura+e+Urbanismo/@-21.9511922,-44.1889496,17z",
};

export const nav = [
  { href: "#projetos", label: "Projetos" },
  { href: "#antes-depois", label: "Antes e depois" },
  { href: "#processo", label: "Processo" },
  { href: "#videos", label: "Vídeos" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export type Tag = "Antes" | "Obra" | "Projeto 3D";
export type Shot = { src: string; tag?: Tag; note?: string };
export type Category = "Comercial" | "Residencial" | "Fachadas";
export type Project = {
  id: string;
  title: string;
  kind: string;
  place: string;
  year: string;
  category: Category;
  status: string;
  text: string;
  cover: string;
  shots: Shot[];
  videos?: string[];
};

const seq = (name: string, n: number, tags: Record<number, Tag> = {}, notes: Record<number, string> = {}): Shot[] =>
  Array.from({ length: n }, (_, i) => ({ src: `/img/${name}-${i}.webp`, tag: tags[i], note: notes[i] }));

export const projects: Project[] = [
  {
    id: "clinica",
    title: "Clínica Ceemed",
    kind: "Recepção de clínica médica",
    place: "Interiores",
    year: "2026",
    category: "Comercial",
    status: "Executado",
    text: "A recepção é o primeiro contato do paciente com a clínica. A proposta foi criar um ambiente leve, acolhedor e atemporal, com linhas orgânicas, iluminação indireta e uma paleta suave que deixa a espera mais confortável.",
    cover: "/img/clinica-0.webp",
    shots: seq("clinica", 12, { 9: "Projeto 3D", 10: "Antes", 11: "Antes" }),
    videos: ["clinica"],
  },
  {
    id: "dynafit",
    title: "Academia Dynafit",
    kind: "Academia",
    place: "Bom Jardim de Minas",
    year: "2025",
    category: "Comercial",
    status: "Executado",
    text: "Um ambiente moderno, impactante e funcional, pensado para a circulação e o conforto de quem treina. As cores da marca entram no projeto de forma estratégica e a iluminação transforma a academia em um espaço imersivo.",
    cover: "/img/dynafit-0.webp",
    shots: seq("dynafit", 12, { 10: "Antes", 11: "Antes" }),
    videos: ["dynafit"],
  },
  {
    id: "psicovida",
    title: "Psicovida",
    kind: "Espaço terapêutico",
    place: "Bom Jardim de Minas",
    year: "Executado",
    category: "Comercial",
    status: "De lanchonete a consultório",
    text: "Uma antiga lanchonete virou um espaço dedicado à saúde mental. Iluminação suave, azul da marca da cliente para trazer calma e uma fachada que transmite acolhimento e profissionalismo.",
    cover: "/img/psico-fachada-0.webp",
    shots: [...seq("psico-fachada", 6, { 4: "Antes", 5: "Antes" }), ...seq("psico", 9, { 7: "Projeto 3D", 8: "Antes" })],
    videos: ["psicovida"],
  },
  {
    id: "alfa",
    title: "Núcleo Alfa Conecta",
    kind: "Recepção e salas de psicopedagogia",
    place: "Bom Jardim de Minas",
    year: "2025",
    category: "Comercial",
    status: "Executado",
    text: "Amadeirado para trazer aconchego, textura ripada e luz quente atrás do painel. Sem trocar o piso, sem móveis planejados e sem rebaixamento de gesso: um projeto lindo sem uma grande obra.",
    cover: "/img/alfa-0.webp",
    shots: [...seq("alfa", 7, { 5: "Projeto 3D", 6: "Antes" }), ...seq("alfa-ped", 6, { 5: "Antes" })],
    videos: ["alfa"],
  },
  {
    id: "sala",
    title: "Sala e cozinha integradas",
    kind: "Residência",
    place: "Arquitetura e interiores",
    year: "2026",
    category: "Residencial",
    status: "Executado",
    text: "Da laje no tijolo à casa pronta: sala com cozinha integradas, projeto clean, moderno e elegante, com luz indireta no gesso contornando todo o ambiente.",
    cover: "/img/sala-0.webp",
    shots: seq("sala", 14, { 10: "Obra", 11: "Obra", 12: "Obra", 13: "Obra" }),
  },
  {
    id: "suite",
    title: "Suíte do casal",
    kind: "Residência",
    place: "Interiores",
    year: "2026",
    category: "Residencial",
    status: "Executado",
    text: "Uma suíte em tons claros, refúgio para o descanso como os clientes desejavam. No lugar do painel ripado de MDF, revestimento: mais durabilidade e a mesma estética.",
    cover: "/img/suite-0.webp",
    shots: seq("suite", 8, { 5: "Obra", 6: "Obra", 7: "Obra" }),
  },
  {
    id: "campo",
    title: "Casa de campo",
    kind: "Residência rústica contemporânea",
    place: "Arquitetura e interiores",
    year: "2025",
    category: "Residencial",
    status: "Em obra",
    text: "Beiral frontal para dar movimento, tijolinho, pedra e madeira na fachada. Por dentro, sala com parede verde e cozinha com uma ilha generosa, pensada para cozinhar, abrir massas e receber.",
    cover: "/img/campo-fachada-0.webp",
    shots: [
      ...seq("campo-fachada", 5, { 0: "Projeto 3D", 1: "Projeto 3D", 2: "Projeto 3D", 3: "Obra", 4: "Obra" }),
      ...seq("campo-sala", 6, { 0: "Projeto 3D", 1: "Projeto 3D", 2: "Projeto 3D", 3: "Projeto 3D", 4: "Projeto 3D", 5: "Obra" }),
      ...seq("campo-cozinha", 6, { 0: "Projeto 3D", 1: "Projeto 3D", 2: "Projeto 3D", 3: "Projeto 3D", 4: "Projeto 3D", 5: "Obra" }),
    ],
    videos: ["campo"],
  },
  {
    id: "chale",
    title: "Chalé",
    kind: "Casa de veraneio",
    place: "Projetado do zero",
    year: "Executado",
    category: "Residencial",
    status: "Projeto querido do escritório",
    text: "Telhado inclinado, janelas com moldura colorida e madeira por toda parte. Um refúgio com personalidade, projetado do zero pelo escritório.",
    cover: "/img/chale-0.webp",
    shots: seq("chale", 8),
    videos: ["chale"],
  },
  {
    id: "padaria",
    title: "Padaria Santana",
    kind: "Arquitetura e interiores comerciais",
    place: "Executado",
    year: "2025",
    category: "Comercial",
    status: "Executado",
    text: "Um espaço onde o cheiro de pão quentinho encontra o aconchego do design. Paleta acolhedora, iluminação suave e um toque verde que convida a ficar.",
    cover: "/img/padaria-0.webp",
    shots: seq("padaria", 9, { 4: "Projeto 3D", 5: "Projeto 3D", 6: "Projeto 3D", 7: "Projeto 3D", 8: "Antes" }),
    videos: ["padaria"],
  },
  {
    id: "compare",
    title: "Compare Suplementos",
    kind: "Escritório e estúdio de conteúdo",
    place: "Londrina · PR · projeto online",
    year: "2026",
    category: "Comercial",
    status: "Feito a distância",
    text: "Projeto feito totalmente a distância. Mesa central com gavetas e passagem para os fios, vários cenários para gravação e muito verde para o dia a dia de trabalho.",
    cover: "/img/compare-0.webp",
    shots: seq("compare", 4, { 3: "Antes" }),
  },
  {
    id: "fachadas",
    title: "Fachadas autorais",
    kind: "Casas, geminadas e edifícios",
    place: "Arquitetura",
    year: "2022 a 2026",
    category: "Fachadas",
    status: "Projetos 3D e obras",
    text: "Linhas retas, volumes marcantes, madeira, pedra e iluminação integrada. Fachadas pensadas para traduzir quem mora ali e continuar bonitas daqui a muitos anos.",
    cover: "/img/geminadas-0.webp",
    shots: [
      ...seq("imponencia", 3, { 0: "Projeto 3D", 1: "Projeto 3D", 2: "Projeto 3D" }, { 0: "Pedra, madeira e vidro" }),
      ...seq("geminadas", 4, { 0: "Projeto 3D", 1: "Projeto 3D", 2: "Projeto 3D", 3: "Projeto 3D" }, { 0: "Geminadas sem cara de geminada, 2025" }),
      ...seq("edificio", 2, { 0: "Projeto 3D", 1: "Projeto 3D" }, { 0: "Edifício autoral de uso misto" }),
      ...seq("predio", 3, { 0: "Obra", 1: "Projeto 3D", 2: "Antes" }, { 0: "Prédio residencial em execução" }),
      ...seq("garagem", 3, { 0: "Projeto 3D", 1: "Projeto 3D", 2: "Antes" }, { 0: "Ampliação de garagem e fachada" }),
      ...seq("fachada-2026", 3, { 0: "Projeto 3D", 1: "Projeto 3D", 2: "Projeto 3D" }, { 0: "Residência, 2026" }),
    ],
    videos: ["predio", "muro"],
  },
];

/* projetos em destaque (rolagem em tela cheia, como na referência) */
export const featured = ["sala", "clinica", "dynafit"];

export const stats = [
  { value: 250, prefix: "+", suffix: "", label: "Projetos entregues" },
  { value: 1, prefix: "", suffix: "º", label: "Lugar · Melhores do Ano 2025" },
  { value: 26.5, prefix: "", suffix: " mil", label: "Pessoas acompanham no Instagram", decimals: 1 },
  { value: 4, prefix: "", suffix: " estados", label: "Com projetos: MG, SP, RJ e PR" },
];

export const beforeAfter = [
  { label: "Sala integrada", before: "/img/sala-11.webp", after: "/img/sala-1.webp" },
  { label: "Academia", before: "/img/dynafit-10.webp", after: "/img/dynafit-2.webp" },
  { label: "Recepção", before: "/img/alfa-6.webp", after: "/img/alfa-1.webp" },
];

export const process = [
  {
    n: "01",
    t: "Escuta e visita",
    d: "Ir até o lugar, entender a rotina, o terreno e o sonho de quem vai morar ou trabalhar ali. Presencial em Bom Jardim de Minas, Juiz de Fora e região, ou online.",
    img: "/img/visita-obra.webp",
  },
  {
    n: "02",
    t: "Projeto em 3D",
    d: "A ideia vira imagem: fachada, ambientes, cores e luz. Ajustamos juntos até ficar do jeitinho que você quer.",
    img: "/img/geminadas-1.webp",
  },
  {
    n: "03",
    t: "Detalhamento",
    d: "Projeto arquitetônico completo, marcenaria, iluminação e acabamentos detalhados para a obra não ter improviso.",
    img: "/img/clinica-5.webp",
  },
  {
    n: "04",
    t: "Obra pronta",
    d: "Acompanhamento até o fim, para o que foi desenhado ser o que foi construído.",
    img: "/img/sala-2.webp",
  },
];

export const services = [
  { t: "Projeto arquitetônico", d: "Casas, geminadas e edifícios, do terreno à fachada." },
  { t: "Fachadas", d: "Reforma de fachada e muro frontal com identidade." },
  { t: "Interiores", d: "Salas, cozinhas, suítes, banheiros e closets planejados." },
  { t: "Espaços comerciais", d: "Clínicas, consultórios, academias, padarias e lojas." },
  { t: "Projetos online", d: "Para qualquer cidade do Brasil, do briefing ao 3D." },
];

export const videos = [
  { id: "clinica", title: "Recepção da clínica", tag: "Antes e depois" },
  { id: "dynafit", title: "Academia Dynafit", tag: "Antes e depois" },
  { id: "campo", title: "Casa de campo", tag: "Obra e projeto" },
  { id: "psicovida", title: "Consultório Psicovida", tag: "Antes e depois" },
  { id: "chale", title: "Chalé", tag: "Projeto e obra pronta" },
  { id: "alfa", title: "Núcleo Alfa Conecta", tag: "Antes e depois" },
  { id: "padaria", title: "Padaria Santana", tag: "Antes e depois" },
  { id: "predio", title: "Fachada de prédio", tag: "Antes, projeto e execução" },
  { id: "cozinha2", title: "Cozinha reformada", tag: "Antes e depois" },
  { id: "gourmet", title: "Salão de festas rústico", tag: "Projeto 3D" },
  { id: "muro", title: "Muro frontal", tag: "Antes e depois" },
  { id: "cozinha", title: "Cozinha integrada", tag: "Antes e projeto" },
];

/* depoimentos reais (destaque "Feedbacks" e comentários); a imagem é sempre de um projeto */
export const testimonials = [
  {
    name: "Thaís",
    about: "Projeto de fachada",
    text: "Estamos simplesmente encantados com o seu trabalho! A forma como você transformou o projeto da fachada da nossa futura casa é incrível. Cada detalhe reflete seu talento, cuidado e criatividade.",
    img: "/img/psico-fachada-0.webp",
  },
  {
    name: "Cristiane",
    about: "Casa e consultório",
    text: "Ficou do nosso gosto, com ideias inteligentes suas para o projeto arquitetônico. Todos que passam pela rua elogiam e perguntam quem projetou. Passo seu nome para os interessados.",
    img: "/img/clinica-0.webp",
  },
  {
    name: "Carla Helena",
    about: "Projeto da casa",
    text: "Todos os detalhes que nós pedimos ela executou com muito carinho, fez e refez até chegarmos em um denominador comum, sempre com paciência, nos orientando em cada detalhe e mostrando soluções.",
    img: "/img/chale-1.webp",
  },
  {
    name: "Hugo",
    about: "Projeto residencial",
    text: "Durante as reuniões, sempre com atenção em cada detalhe: tamanhos, cores, praticidade, comodidade no ambiente e, acima de tudo, escutando as opiniões do cliente. Excelente trabalho.",
    img: "/img/sala-0.webp",
  },
  {
    name: "Ilídia",
    about: "Reforma de fachada",
    text: "Nossa fachada ficou linda, muito melhor do que a gente esperava! Gostaria de parabenizar você por ter feito várias alterações até ficar do jeitinho que a gente queria.",
    img: "/img/psico-fachada-3.webp",
  },
  {
    name: "Rogério",
    about: "Comentário no Instagram",
    text: "Ficou exatamente como eu imaginava: elegante, moderno e cheio de personalidade. Seu cuidado com cada detalhe e seu talento fizeram toda a diferença no resultado final.",
    img: "/img/chale-3.webp",
  },
  {
    name: "Larissa",
    about: "Projeto de interiores",
    text: "Superou nossas expectativas! Obrigada pela atenção, pela dedicação e por conseguir fazer mais do que imaginamos. Super recomendo seu trabalho.",
    img: "/img/sala-4.webp",
  },
  {
    name: "Denise",
    about: "Projeto de interiores",
    text: "Passando para agradecer por toda a atenção e dedicação. Amei cada detalhe do seu projeto. Super indico, ótima profissional.",
    img: "/img/clinica-2.webp",
  },
];

export const story = [
  "Nasci e cresci em Bom Jardim de Minas, literalmente dentro de uma loja de materiais de construção. Entre cimentos, tintas e ferramentas era o meu parquinho.",
  "Em 2011 fui para São José dos Campos com uma bolsa integral para arquitetura, mas o coração me puxou para casa. Voltei para Minas, estudei, passei na UFJF e ali encontrei o meu lugar.",
  "A pinha do logo nasceu do meu sobrenome: prosperidade, criatividade, expansão. Arquitetura, para mim, é qualidade de vida. É estética, é psicologia cotidiana, é legado.",
];
