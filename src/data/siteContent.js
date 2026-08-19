/**
 * ============================================================================
 * TRAVESSIA MED - ARQUIVO CENTRAL DE CONTEÚDO HUMANIZADO E CONFIGURAÇÕES
 * ============================================================================
 * Textos focados em acolhimento familiar, desmistificação de dúvidas,
 * transparência total de custos e realização do sonho da Medicina.
 */

export const siteConfig = {
  brand: {
    name: "TRAVESSIA MED",
    tagline: "Sua jornada médica começa aqui",
    description: "Assessoria educacional humanizada. Cuidamos do seu acolhimento, visto, moradia em Foz ou CDE, matrícula na UCP/UNADES e mentoria Revalida para você realizar o sonho de ser médico.",
    logoPath: "/travessia-med-mark.svg",
  },

  contact: {
    whatsappNumber: "595982399595", // +595 982 399595 — Paraguay
    whatsappMessage: "Olá! Gostaria de conversar com a equipe da Travessia Med sobre Medicina na UCP e UNADES.",
    whatsappParentsMessage: "Olá! Sou pai/mãe de estudante e gostaria de conversar com a coordenação sobre a segurança, moradia e legalidade do curso no Paraguai.",
    phoneDisplay: "+595 982 399 595",
    locations: [
      "Foz do Iguaçu - PR (Sede de Acolhimento Brasil)",
      "Ciudad del Este - Alto Paraná (Sede Acadêmica Paraguai)"
    ]
  },

  hero: {
    badge: "Assessoria de Acolhimento & Admissão • UCP & UNADES",
    titleStart: "O seu sonho de ser",
    titleHighlight: "Médico",
    titleEnd: "começa agora. Sem anos perdidos no vestibular.",
    description: "Você não precisa passar mais um ano na ansiedade do cursinho. Inicie sua faculdade de Medicina em instituições de excelência com quem cuida de você desde a escolha do apartamento até o seu CRM no Brasil.",
    ctaButtonText: "Quero Começar Meu Sonho",
    whatsappButtonText: "Falar com um Orientador",
    trustChecks: [
      "Ingresso sem vestibular tradicional",
      "UNADES a partir de R$ 1.500; UCP desde R$ 1.825 no 1º semestre",
      "Suporte completo para pais e alunos",
      "Você pode morar em Foz do Iguaçu (PR)"
    ],
    infoCard: {
      nextTerms: "Turmas 2026.2 e 2027.1",
      partnerUnis: "UCP & UNADES",
      classLocations: "Ciudad del Este / PJC",
      docSupport: "Acolhimento & Legal 100% Incluso"
    }
  },

  // Mitos e Verdades para quebrar objeções imediatas
  mythsAndFacts: [
    {
      myth: "Preciso ser fluente em espanhol antes de me mudar?",
      fact: "Não! Mais de 90% dos alunos e boa parte dos professores são brasileiros ou habituados ao português. A transição é muito suave no dia a dia e você aprende o espanhol naturalmente ao longo do 1º ano."
    },
    {
      myth: "Sou obrigado a morar no Paraguai?",
      fact: "Não! A grande maioria dos estudantes prefere morar em Foz do Iguaçu (lado brasileiro) e atravessar a Ponte da Amizade diariamente de van estudantil ou carro. Você mantém toda a sua rotina e segurança no Brasil."
    },
    {
      myth: "O Revalida é um bicho de sete cabeças?",
      fact: "O Revalida é uma prova do INEP baseada na medicina prática — e prova do INEP deixou de ser 'só de quem estuda fora'. No Brasil, o Enamed (Exame Nacional de Avaliação da Formação Médica) já é obrigatório para concluintes e, agora, também para alunos do 4º ano. Quem estuda focado na matriz brasileira desde o 1º ano com a nossa mentoria chega preparado para a avaliação do INEP."
    },
    {
      myth: "O diploma paraguaio é reconhecido no Brasil?",
      fact: "Sim! Após a conclusão do curso e a realização da prova do Revalida (lei federal brasileira nº 13.959), o diploma é apostilado e registrado em universidade pública brasileira, concedendo o CRM definitivo."
    }
  ],

  // Guia de Custo de Vida Real na Fronteira (Foz do Iguaçu / CDE)
  costOfLiving: [
    {
      item: "Mensalidade da Faculdade",
      value: "UNADES: a partir de R$ 1.500 · UCP: R$ 1.825 no 1º semestre",
      detail: "Na UCP 2026.1, o valor promocional divulgado para o 1º semestre é R$ 1.641,67. Valores em reais são estimativas cambiais."
    },
    {
      item: "Moradia (Kitnet ou Apto Compartilhado)",
      value: "R$ 600 a R$ 1.200",
      detail: "Opções mobiliadas e seguras em Foz do Iguaçu (PR) ou CDE"
    },
    {
      item: "Alimentação & Supermercado",
      value: "R$ 600 a R$ 900",
      detail: "Custo de alimentação acessível na região de fronteira"
    },
    {
      item: "Transporte / Van Estudantil Fronteiriça",
      value: "R$ 300 a R$ 450",
      detail: "Busca na porta do condomínio em Foz e deixa na faculdade"
    }
  ],

  universities: [
    {
      id: "ucp",
      name: "UCP - Universidad Central del Paraguay",
      sealTag: "Ley Nº 3153/06 • Reconhecida",
      sealInitial: "C",
      badgeColor: "#d32f2f",
      badgeBg: "rgba(211, 47, 47, 0.1)",
      avatarBg: "#fef2f2",
      description: "Uma das maiores referências médicas do Paraguai. Conta com mesa anatômica 3D (Anatomage), amplos laboratórios de microbiologia e histologia, além de clínicas universitárias que atendem à comunidade e proporcionam prática médica intensa desde os primeiros anos.",
      highlights: [
        { label: "Sedes", value: "Ciudad del Este (fronteira com Foz do Iguaçu) e Pedro Juan Caballero" },
        { label: "Prática Clínica", value: "Clínicas universitárias próprias e ambulatórios" },
        { label: "Metodologia", value: "Preparação contínua voltada ao médico generalista e Revalida" }
      ],
      estimatedMonthlyBRL: 1825,
      monthlyLabel: "R$ 1.825",
      monthlyDiscountLabel: "R$ 1.641,67 com desconto",
      pricingReference: "1º semestre · tabela UCP 2026.1",
      buttonText: "Conhecer a UCP"
    },
    {
      id: "unades",
      name: "UNADES - Medicina UNADES",
      sealTag: "Habilitada & Credenciada",
      sealInitial: "+",
      badgeColor: "#1b8a43",
      badgeBg: "rgba(27, 138, 67, 0.1)",
      avatarBg: "#f0fdf4",
      description: "Destaca-se pelo acolhimento e turmas com tamanho ideal, permitindo contato direto com os médicos preceptores. Excelente relação custo-benefício, com infraestrutura moderna e convênios hospitalares consolidados.",
      highlights: [
        { label: "Sede", value: "Ciudad del Este (localização estratégica e segura)" },
        { label: "Atenção Docente", value: "Professores próximos acompanhando sua evolução diária" },
        { label: "Estágios", value: "Parcerias ativas em centros de saúde e hospitais" }
      ],
      estimatedMonthlyBRL: 1500,
      monthlyLabel: "~R$ 1.500",
      buttonText: "Conhecer a UNADES"
    }
  ],

  comparisonTable: [
    {
      aspect: "Ingresso no Curso",
      brazil: "✕ Vestibulares concorridos (300+ por vaga) ou anos de cursinho",
      paraguay: "✓ Matrícula direta e homologação de documentos escolares"
    },
    {
      aspect: "Mensalidade",
      brazil: "✕ R$ 10.000 a R$ 14.000 / mês (valor fixo desde o 1º ano)",
      paraguay: "✓ UNADES a partir de R$ 1.500; UCP de R$ 1.825 a R$ 3.575 conforme o semestre (referência 2026.1)"
    },
    {
      aspect: "Investimento em 6 Anos",
      brazil: "✕ R$ 750.000 a R$ 1.000.000+",
      paraguay: "✓ ~R$ 160.000 a R$ 200.000 no total dos 6 anos (sem endividamento familiar)"
    },
    {
      aspect: "Documentação e Visto",
      brazil: "Não se aplica",
      paraguay: "✓ A Travessia Med faz todo o trâmite jurídico e consular"
    },
    {
      aspect: "Onde Você Mora",
      brazil: "Capitais com alto custo e trânsito",
      paraguay: "✓ Foz do Iguaçu (PR) ou CDE com tranquilidade e baixo custo"
    },
    {
      aspect: "Diploma & Exercício",
      brazil: "✕ Não é mais 'CRM direto': Enamed (prova do INEP) obrigatório para concluintes e 4º ano",
      paraguay: "✓ Revalida INEP com mentoria desde o 1º ano — no Brasil, a prova do INEP também passou a ser obrigatória"
    }
  ],

  steps: [
    {
      number: "1",
      title: "Orientação & Reserva",
      desc: "Conversamos com você e sua família, analisamos seu perfil, tiramos todas as dúvidas e garantimos sua vaga na turma."
    },
    {
      number: "2",
      title: "Documentação Blindada",
      desc: "Cuidamos de tudo: Apostilamento de Haia, MEC e Ministério das Relações Exteriores do Paraguai, visto Mercosul e imigração."
    },
    {
      number: "3",
      title: "Moradia & Recepção",
      desc: "Ajudamos você a alugar um bom apartamento em Foz do Iguaçu ou CDE, escolher a melhor rota de transporte e fazer compras iniciais."
    },
    {
      number: "4",
      title: "Acompanhamento & Revalida",
      desc: "Não te deixamos sozinho após a matrícula: oferecemos mentoria contínua, materiais de apoio e simulados focados no CRM brasileiro."
    }
  ],

  testimonials: [
    {
      stars: 5,
      quote: "Depois de 3 anos de cursinho em Campinas vendo minha filha deprimida, decidimos buscar a Travessia Med. Hoje ela está no 4º ano da UCP, morando com total segurança em Foz do Iguaçu. Foi a melhor escolha da nossa vida.",
      initials: "CL",
      author: "Carla e Dr. Eduardo Lemos",
      role: "Pais da aluna Beatriz Lemos (UCP)",
      color: "var(--navy-primary)"
    },
    {
      stars: 5,
      quote: "Eu tinha muito receio da língua e da adaptação. Mas a equipe da assessoria me buscou na rodoviária, ajudou a mobiliar o apartamento e me apresentou a outros calouros. Hoje me sinto em casa.",
      initials: "GV",
      author: "Gabriel Vasconcelos",
      role: "Estudante de Medicina do 2º Ano - UNADES",
      color: "var(--gold-dark)"
    },
    {
      stars: 5,
      quote: "Me formei no Paraguai com todo o suporte da Travessia Med, passei na prova do Revalida do INEP e hoje tenho meu CRM ativo no Paraná atuando no SAMU e UBS. A formação é séria e completa.",
      initials: "MA",
      author: "Dr. Matheus Almeida",
      role: "Médico Revalidado (CRM-PR)",
      color: "var(--scrub)"
    }
  ],

  faq: [
    {
      q: "O diploma obtido no Paraguai é válido para clinicar como médico no Brasil?",
      a: "Sim! Para exercer a Medicina no Brasil com diploma obtido no exterior, o médico realiza o Revalida INEP (exame unificado aplicado pelo Governo Federal). As grades curriculares da UCP e da UNADES possuem carga horária superior à média brasileira e atendem a todos os requisitos do MEC e CFM."
    },
    {
      q: "Só quem estuda no exterior precisa fazer prova do INEP?",
      a: "Não. Quem se forma em Medicina no Brasil também precisa fazer prova do INEP agora: o Enamed (Exame Nacional de Avaliação da Formação Médica) é obrigatório para concluintes e, nesta edição, também para alunos do 4º ano. A participação é componente curricular e a ausência pode impedir a colação de grau. Ou seja, a avaliação nacional do INEP deixou de ser um diferencial negativo de quem estuda no Paraguai — o caminho do diploma estrangeiro continua sendo o Revalida, com mentoria da Travessia Med desde o 1º ano."
    },
    {
      q: "Preciso fazer vestibular ou ter nota do ENEM para ingressar?",
      a: "Não. O ingresso é feito por homologação documental e convalidação do ensino médio. O número de vagas por turma é limitado pelas normas das faculdades, por isso recomendamos a reserva antecipada."
    },
    {
      q: "Como funciona morar em Foz do Iguaçu (Brasil) e estudar em Ciudad del Este (Paraguai)?",
      a: "É a rotina da maioria dos brasileiros! Foz do Iguaçu e Ciudad del Este são cidades vizinhas separadas pela Ponte da Amizade. Existem vans estudantis que buscam os alunos na porta de casa em Foz e deixam na faculdade em 15 a 25 minutos com faixa exclusiva de travessia."
    },
    {
      q: "Quais documentos preciso providenciar para a assessoria?",
      a: "Você só precisa nos enviar: Certidão de Nascimento/Casamento, Histórico e Certificado do Ensino Médio, RG, Título de Eleitor e Certidão de Antecedentes Criminais. Toda a parte complexa (Apostila de Haia, convalidações diplomáticas no Paraguai e visto) é feita pela nossa equipe jurídica."
    },
    {
      q: "Como os pais podem acompanhar o processo?",
      a: "Temos um canal direto e exclusivo para pais e responsáveis, com relatórios de status da documentação, visitas guiadas às faculdades e suporte presencial na recepção e escolha de moradia em Foz do Iguaçu."
    },
    {
      q: "É possível fazer transferência se já iniciei outro curso na área da saúde?",
      a: "Sim! Se você já cursou períodos de Medicina, Biomedicina, Enfermagem, Farmácia ou Fisioterapia, fazemos a análise de ementas para dispensar disciplinas equivalentes."
    }
  ]
};
