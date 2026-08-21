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
    whatsappMessage: "Olá! Quero informações sobre Medicina na UCP/UNADES: turma 2026.2 ou transferência com aproveitamento de matérias.",
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
      "Sem vestibular tradicional",
      "Transferência com aproveitamento",
      "Desde R$ 1.500 / mês",
      "Turma 2026.2 · vagas limitadas"
    ],
    infoCard: {
      nextTerms: "Turmas 2026.2 e 2027.1",
      partnerUnis: "UCP & UNADES",
      classLocations: "Ciudad del Este / PJC",
      docSupport: "Acolhimento & Legal 100% Incluso"
    },
    photo: "/campaign/ucp-hospital.jpg",
    photoAlt: "Hospital Universitário da UCP em Ciudad del Este"
  },

  campaignGallery: [
    {
      src: "/campaign/ucp-alunos.jpg",
      alt: "Alunos de Medicina da UCP em Ciudad del Este",
      kicker: "Ingresso ou transferência",
      caption: "Aproveitamento de matérias",
      objectPosition: "50% 28%"
    },
    {
      src: "/campaign/ucp-hospital.jpg",
      alt: "Hospital Universitário próprio da UCP",
      kicker: "Hospital próprio",
      caption: "Prática real em CDE",
      objectPosition: "50% 46%"
    },
    {
      src: "/campaign/ucp-pratica.jpg",
      alt: "Estudante de Medicina da UCP com jaleco",
      kicker: "Teoria e prática",
      caption: "Formação desde o 1º semestre",
      objectPosition: "78% 22%"
    }
  ],

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
      myth: "Se eu transferir, perco tudo o que já cursei?",
      fact: "Não necessariamente. Analisamos o histórico e as ementas e pedimos o aproveitamento das matérias equivalentes na UCP ou UNADES. A validação final é da universidade — o objetivo é não te fazer recomeçar do zero."
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
      shortItem: "Mensalidade",
      value: "a partir de R$ 1.500",
      detail: "UNADES desde R$ 1.500. UCP 1º semestre: R$ 1.840 (R$ 1.655 com desconto). Matrícula UCP: R$ 1.800."
    },
    {
      item: "Moradia (kitnet ou apto compartilhado)",
      shortItem: "Moradia",
      value: "R$ 600 a R$ 1.200",
      detail: "Opções mobiliadas em Foz do Iguaçu (PR) ou Ciudad del Este."
    },
    {
      item: "Alimentação e supermercado",
      shortItem: "Alimentação",
      value: "R$ 600 a R$ 900",
      detail: "Custo de alimentação na região de fronteira."
    },
    {
      item: "Van estudantil fronteiriça",
      shortItem: "Transporte",
      value: "R$ 300 a R$ 450",
      detail: "Busca em Foz e deixa na faculdade em CDE."
    }
  ],

  universities: [
    {
      id: "ucp",
      name: "UCP - Universidad Central del Paraguay",
      sealTag: "Habilitada & Credenciada",
      sealInitial: "C",
      badgeColor: "#d32f2f",
      badgeBg: "rgba(211, 47, 47, 0.1)",
      avatarBg: "#fef2f2",
      description: "Hospital Universitário próprio em CDE, prática clínica desde o 1º semestre.",
      highlights: [
        { label: "Sede", value: "Ciudad del Este, fronteira com Foz" },
        { label: "Prática", value: "Hospital universitário próprio" },
        { label: "Base legal", value: "Ley Nº 3153/06" }
      ],
      estimatedMonthlyBRL: 1840,
      monthlyLabel: "R$ 1.840",
      monthlyDiscountLabel: "R$ 1.655 com desconto",
      pricingReference: "1º semestre · tabela UCP 2026.2 · câmbio 1.190",
      photo: "/campaign/ucp-ingresso.jpg",
      photoAlt: "Campus, laboratório e alunos da Medicina UCP",
      photoPosition: "50% 42%",
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
      description: "Turmas menores, preceptores próximos e mensalidade a partir de R$ 1.500.",
      highlights: [
        { label: "Sede", value: "Ciudad del Este" },
        { label: "Estágios", value: "Convênios em hospitais e centros de saúde" }
      ],
      estimatedMonthlyBRL: 1500,
      monthlyLabel: "~R$ 1.500",
      buttonText: "Conhecer a UNADES"
    }
  ],

  comparisonTable: [
    {
      aspect: "Ingresso",
      brazil: "Vestibular concorrido ou anos de cursinho",
      paraguay: "Matrícula direta, sem vestibular tradicional"
    },
    {
      aspect: "Transferência",
      brazil: "Trancar, perder semestre ou recomeçar do zero",
      paraguay: "Análise de ementas e aproveitamento de matérias"
    },
    {
      aspect: "Mensalidade",
      brazil: "R$ 10.000 a R$ 14.000 / mês",
      paraguay: "UNADES a partir de R$ 1.500 · UCP desde R$ 1.840"
    },
    {
      aspect: "6 anos",
      brazil: "R$ 750.000 a R$ 1.000.000+",
      paraguay: "Cerca de R$ 160.000 a R$ 200.000"
    },
    {
      aspect: "Diploma no Brasil",
      brazil: "Enamed (prova do INEP) também passou a ser obrigatória",
      paraguay: "Revalida INEP, com mentoria desde o 1º ano"
    }
  ],

  steps: [
    {
      number: "1",
      title: "Orientação & Reserva",
      desc: "Ingresso novo ou transferência: analisamos o histórico e protocolamos o aproveitamento de matérias."
    },
    {
      number: "2",
      title: "Documentação Blindada",
      desc: "Apostila de Haia, visto Mercosul e imigração — a gente cuida."
    },
    {
      number: "3",
      title: "Moradia & Recepção",
      desc: "Ajudamos a achar moradia em Foz ou CDE e a rota até a faculdade."
    },
    {
      number: "4",
      title: "Acompanhamento & Revalida",
      desc: "Mentoria contínua focada no Revalida e no CRM brasileiro."
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
      q: "O diploma vale para clinicar no Brasil?",
      a: "Sim. Depois da formatura, o caminho é o Revalida INEP. As grades da UCP e da UNADES atendem aos requisitos de carga horária. No Brasil, quem se forma aqui também faz prova do INEP (Enamed)."
    },
    {
      q: "Preciso de vestibular ou ENEM?",
      a: "Não. O ingresso é por homologação do ensino médio. Quem já está em outra faculdade pode pedir transferência com aproveitamento. As vagas por turma são limitadas."
    },
    {
      q: "Dá para transferir de outra faculdade e aproveitar matérias?",
      a: "Sim. Quem já faz Medicina ou outro curso da saúde (Biomedicina, Enfermagem, Farmácia, Fisioterapia) envia histórico e ementas. A gente analisa a grade, pede a validação junto à UCP ou UNADES e protocola o aproveitamento. A universidade dá a palavra final sobre a equivalência de cada disciplina."
    },
    {
      q: "Dá para morar em Foz e estudar em Ciudad del Este?",
      a: "Sim — é a rotina da maioria. A travessia pela Ponte da Amizade leva cerca de 15 a 25 minutos de van estudantil."
    },
    {
      q: "Quais documentos a UCP pede?",
      a: "RG, histórico do ensino médio (original ou cópia autenticada), certidão de nascimento, CPF, celular, endereço e e-mail do aluno e do responsável, e antecedentes criminais. A Travessia Med cuida de Apostila de Haia, convalidação e visto."
    },
    {
      q: "Quanto custa a matrícula na UCP?",
      a: "R$ 1.800, cobrada uma vez. A mensalidade do 1º semestre é cerca de R$ 1.840 (R$ 1.655 com desconto, câmbio 1.190)."
    },
    {
      q: "Os pais acompanham o processo?",
      a: "Sim. Há canal direto para responsáveis, status da documentação e apoio presencial na escolha de moradia em Foz."
    }
  ]
};
