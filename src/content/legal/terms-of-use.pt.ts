import type { LegalDocument } from './types'

export const termsOfUsePt: LegalDocument = {
  title: 'Termos e Condições de Utilização e Prestação de Serviços',
  subtitle: 'Plataforma GetEasier – Controlo de Assiduidade e Gestão de Informação Laboral',
  lastUpdated: '12/01/2026',
  introduction: [
    'Estes Termos e Condições (os "Termos") regulam o acesso e a utilização da plataforma GetEasier (a "Plataforma") e a prestação dos respetivos serviços ao Cliente (entidade empregadora), bem como as condições contratuais essenciais aplicáveis à relação entre a GetEasier e o Cliente.',
    'AO CONTRATAR OU UTILIZAR A PLATAFORMA, O CLIENTE DECLARA QUE LEU, COMPREENDEU E ACEITA ESTES TERMOS.',
  ],
  sections: [
    {
      id: 'identificacao',
      title: '1. Identificação do Prestador',
      paragraphs: [
        'GetEasier - UNIVERSAL IDEAS - LDA, pessoa coletiva n.º 517156261, com sede em Alameda do Outeiro, n.º 163, 4575-037 Alpendorada e Matos, Marco de Canaveses, Porto, Portugal, doravante denominada "GetEasier".',
        'Contactos: por escrito para a sede indicada supra e/ou através dos contactos disponibilizados na Plataforma.',
      ],
    },
    {
      id: 'definicoes',
      title: '2. Definições',
      bullets: [
        '"Cliente": entidade empregadora que contrata a Plataforma para utilização interna.',
        '"Utilizadores": pessoas autorizadas pelo Cliente a aceder à Plataforma (ex.: administradores de RH).',
        '"Trabalhadores": trabalhadores, estagiários e outras pessoas cujos dados sejam tratados pelo Cliente através da Plataforma.',
        '"Dados Pessoais": quaisquer informações relativas a uma pessoa singular identificada ou identificável, nos termos do RGPD.',
        '"Dados Biométricos": dados biométricos usados para identificar de forma única uma pessoa singular (ex.: impressão digital e imagem facial).',
        '"Serviços": funcionalidades disponibilizadas pela GetEasier através da Plataforma, incluindo registo de assiduidade, segurança/controlo de acesso (se aplicável) e gestão de documentação laboral (conforme configurado pelo Cliente).',
      ],
    },
    {
      id: 'objeto',
      title: '3. Objeto e Âmbito',
      subsections: [
        {
          title: '3.1',
          paragraphs: [
            'A GetEasier disponibiliza ao Cliente um serviço de software (SaaS), acessível via internet, destinado ao registo e gestão de assiduidade dos Trabalhadores e, conforme configurado, ao armazenamento e organização de informação e documentação laboral.',
          ],
        },
        {
          title: '3.2',
          paragraphs: [
            'A Plataforma permite a recolha de dados biométricos (impressão digital e/ou imagem facial) para efeitos de identificação do Trabalhador no momento da "picagem". O processo de correspondência (matching) é efetuado em servidor.',
            'A aplicação TimeEasier captura fotografias através da câmara do dispositivo e transmite-as ao backend GetEasier; a app não gera nem armazena descritores faciais localmente.',
          ],
        },
        {
          title: '3.3',
          paragraphs: [
            'Salvo acordo escrito em contrário, a Plataforma não se destina a utilização por consumidores finais; é um serviço B2B para utilização interna do Cliente.',
          ],
        },
      ],
    },
    {
      id: 'contas',
      title: '4. Contas, Acessos e Perfis',
      subsections: [
        {
          title: '4.1',
          paragraphs: [
            'A criação e gestão de contas de acesso é efetuada por administradores de Recursos Humanos ("Admin RH") designados pelo Cliente.',
          ],
        },
        {
          title: '4.2',
          paragraphs: [
            'O Cliente é responsável por: (i) definir perfis e permissões; (ii) garantir que os Utilizadores mantêm credenciais seguras; (iii) impedir acessos não autorizados; e (iv) atualizar ou desativar acessos quando deixem de ser necessários.',
          ],
        },
        {
          title: '4.3',
          paragraphs: [
            'O Cliente reconhece que é responsável pela recolha e introdução dos dados na Plataforma e pela exatidão e atualidade da informação inserida.',
          ],
        },
      ],
    },
    {
      id: 'obrigacoes-cliente',
      title: '5. Obrigações do Cliente',
      bullets: [
        'Utilizar a Plataforma apenas para fins lícitos e no âmbito da gestão interna do Cliente.',
        'Assegurar que dispõe de fundamento jurídico aplicável para os tratamentos de dados pessoais realizados através da Plataforma, incluindo dados biométricos, e que cumpre os deveres de informação aos Trabalhadores.',
        'Não introduzir na Plataforma conteúdos ilícitos, difamatórios, discriminatórios, ou que violem direitos de terceiros.',
        'Garantir que os equipamentos utilizados para recolha (ex.: dispositivos de captura) são adequados e utilizados de forma segura.',
        'Cooperar com a GetEasier na resolução de incidentes e na gestão de pedidos relacionados com a Plataforma.',
      ],
    },
    {
      id: 'obrigacoes-geteasier',
      title: '6. Obrigações da GetEasier',
      bullets: [
        'Disponibilizar a Plataforma nos termos acordados com o Cliente e prestar suporte técnico.',
        'Prestar suporte ao Cliente através dos canais indicados, procurando responder no prazo de até 24 (vinte e quatro) horas úteis.',
        'Manter, de forma adequada, medidas técnicas e organizativas destinadas a proteger a Plataforma e os dados tratados no contexto do serviço, nos termos do RGPD e do acordo de subcontratação (cláusula 10).',
      ],
    },
    {
      id: 'condicoes-comerciais',
      title: '7. Condições Comerciais',
      subsections: [
        {
          title: '7.1',
          paragraphs: [
            'O preço, o modelo de faturação e eventuais condições específicas (ex.: número de Utilizadores, módulos, integrações) são definidos em proposta comercial e/ou contrato próprio ("Condições Particulares").',
          ],
        },
        {
          title: '7.2',
          paragraphs: [
            'Em caso de conflito entre estes Termos e as Condições Particulares, prevalecem as Condições Particulares.',
          ],
        },
      ],
    },
    {
      id: 'propriedade-intelectual',
      title: '8. Propriedade Intelectual e Licença de Utilização',
      subsections: [
        {
          title: '8.1',
          paragraphs: [
            'A Plataforma, o respetivo código, documentação, marcas, logótipos e demais conteúdos pertencem à GetEasier ou aos seus licenciadores e estão protegidos por direitos de propriedade intelectual.',
          ],
        },
        {
          title: '8.2',
          paragraphs: [
            'Durante a vigência do contrato, a GetEasier concede ao Cliente uma licença de utilização não exclusiva, intransmissível e limitada ao uso interno do Cliente, para aceder e utilizar a Plataforma nos termos destes Termos.',
          ],
        },
        {
          title: '8.3',
          paragraphs: [
            'É proibido ao Cliente (ou aos Utilizadores) copiar, modificar, descompilar, fazer engenharia reversa, distribuir ou explorar a Plataforma fora do permitido por lei e por estes Termos.',
          ],
        },
      ],
    },
    {
      id: 'confidencialidade',
      title: '9. Confidencialidade',
      subsections: [
        {
          title: '9.1',
          paragraphs: [
            'Cada Parte compromete-se a manter confidenciais as informações técnicas, comerciais e quaisquer outras informações não públicas obtidas no âmbito da relação contratual.',
          ],
        },
        {
          title: '9.2',
          paragraphs: [
            'A obrigação de confidencialidade mantém-se durante a vigência do contrato e por 5 (cinco) anos após a sua cessação, salvo se a lei impuser prazo diferente.',
          ],
        },
      ],
    },
    {
      id: 'protecao-dados',
      title: '10. Proteção de Dados Pessoais (Acordo de Subcontratação)',
      subsections: [
        {
          title: '10.1. Papéis',
          paragraphs: [
            'No âmbito do serviço, o Cliente atua como Responsável pelo Tratamento e a GetEasier atua como Subcontratante, tratando dados pessoais por conta do Cliente e de acordo com as suas instruções documentadas, nos termos do artigo 28.º do RGPD.',
          ],
        },
        {
          title: '10.2. Objeto e duração',
          paragraphs: [
            'O tratamento abrange os dados pessoais necessários à prestação dos Serviços durante a vigência do contrato e conforme descrito no Anexo I.',
          ],
        },
        {
          title: '10.3. Natureza e finalidades',
          paragraphs: [
            'O tratamento consiste, em especial, na recolha, registo, organização, conservação e consulta de dados de assiduidade e dados biométricos para identificação, bem como no armazenamento/gestão de documentação laboral, conforme configurado pelo Cliente.',
          ],
        },
        {
          title: '10.4. Tipos de dados e titulares',
          paragraphs: [
            'Os tipos de dados e categorias de titulares constam do Anexo I (Trabalhadores, estagiários e administradores).',
          ],
        },
        {
          title: '10.5. Subcontratantes posteriores',
          paragraphs: [
            'A GetEasier poderá recorrer a subcontratantes posteriores (ex.: alojamento/infraestrutura) estritamente necessários à prestação do serviço. O Cliente autoriza genericamente tal recurso, sem prejuízo de a GetEasier informar o Cliente das alterações relevantes, permitindo oposição por motivo justificado.',
          ],
        },
        {
          title: '10.6. Medidas de segurança',
          paragraphs: [
            'A GetEasier implementa medidas técnicas e organizativas adequadas para proteger os dados pessoais, tendo em conta o estado da técnica, custos de implementação e natureza do tratamento (ex.: controlos de acesso, autenticação, registos de auditoria e, quando aplicável, cifragem).',
          ],
        },
        {
          title: '10.7. Assistência ao Cliente',
          paragraphs: [
            'A GetEasier assistirá o Cliente, tendo em conta a natureza do tratamento, no cumprimento das suas obrigações relativas a: (i) resposta a pedidos de direitos dos titulares; (ii) segurança; (iii) notificações de violação de dados; e (iv) avaliações de impacto e consultas prévias, quando aplicável.',
          ],
        },
        {
          title: '10.8. Violações de dados pessoais',
          paragraphs: [
            'A GetEasier notificará o Cliente sem demora injustificada após ter conhecimento de uma violação de dados pessoais relativa ao serviço, fornecendo informação disponível para permitir ao Cliente cumprir os seus deveres legais.',
          ],
        },
        {
          title: '10.9. Devolução e eliminação',
          paragraphs: [
            'No termo do contrato, a GetEasier, conforme instruções do Cliente, devolverá e/ou eliminará os dados pessoais tratados por conta do Cliente, salvo obrigação legal de conservação. O Cliente reconhece que cópias residuais podem subsistir em sistemas de backup por período limitado, sendo eliminadas no ciclo normal de retenção.',
          ],
        },
        {
          title: '10.10. Auditorias',
          paragraphs: [
            'O Cliente poderá, mediante aviso prévio razoável e em termos proporcionais, solicitar informação e evidência documental adequada do cumprimento das obrigações de subcontratante, sem comprometer segredos comerciais ou segurança da infraestrutura.',
          ],
        },
      ],
    },
    {
      id: 'suspensao',
      title: '11. Suspensão e Cessação',
      subsections: [
        {
          title: '11.1',
          paragraphs: [
            'A GetEasier pode suspender temporariamente o acesso à Plataforma, com comunicação prévia sempre que possível, quando tal seja necessário por motivos de segurança, manutenção, incumprimento contratual (incluindo falta de pagamento, se aplicável) ou utilização abusiva.',
          ],
        },
        {
          title: '11.2',
          paragraphs: [
            'Qualquer Parte pode resolver o contrato nos termos acordados nas Condições Particulares e/ou nos termos da lei aplicável.',
          ],
        },
      ],
    },
    {
      id: 'responsabilidade',
      title: '12. Limitação de Responsabilidade',
      subsections: [
        {
          title: '12.1',
          paragraphs: [
            'A Plataforma é disponibilizada "tal como está" e "conforme disponível", sem prejuízo dos níveis de serviço eventualmente acordados nas Condições Particulares.',
          ],
        },
        {
          title: '12.2',
          paragraphs: [
            'A GetEasier não é responsável por: (i) decisões de gestão de pessoal tomadas pelo Cliente; (ii) inexatidões introduzidas pelo Cliente; (iii) indisponibilidades decorrentes de fatores externos (internet, energia, terceiros); ou (iv) utilização da Plataforma em violação destes Termos.',
          ],
        },
        {
          title: '12.3',
          paragraphs: [
            'Na máxima medida permitida por lei, a GetEasier não responde por danos indiretos, lucros cessantes, perda de oportunidade, perda de negócio ou danos reputacionais.',
          ],
        },
        {
          title: '12.4',
          paragraphs: [
            'Sem prejuízo do disposto na lei aplicável, a responsabilidade total da GetEasier por danos diretos emergentes destes Termos fica limitada ao montante total efetivamente pago pelo Cliente à GetEasier nos 12 (doze) meses anteriores ao evento que deu origem à responsabilidade, ou, se inferior, ao montante anual contratualizado.',
          ],
        },
        {
          title: '12.5',
          paragraphs: [
            'As limitações anteriores não se aplicam em caso de dolo ou culpa grave, nem prejudicam quaisquer responsabilidades que não possam ser limitadas por lei.',
          ],
        },
      ],
    },
    {
      id: 'alteracoes-termos',
      title: '13. Alterações aos Termos',
      paragraphs: [
        'A GetEasier pode atualizar estes Termos para refletir alterações legais, técnicas ou operacionais. Sempre que as alterações sejam materialmente relevantes, a GetEasier comunicará ao Cliente com antecedência razoável, aplicando-se as novas versões a partir da data indicada.',
      ],
    },
    {
      id: 'lei-foro',
      title: '14. Lei Aplicável e Foro',
      paragraphs: [
        'Estes Termos regem-se pela lei portuguesa. Para dirimir litígios emergentes destes Termos, é competente o foro da comarca de Porto, com expressa renúncia a qualquer outro, salvo norma imperativa em contrário.',
      ],
    },
    {
      id: 'contactos',
      title: '15. Contactos',
      paragraphs: [
        'Para comunicações relacionadas com estes Termos: por escrito para a sede indicada supra e/ou através dos contactos disponibilizados na Plataforma.',
      ],
    },
    {
      id: 'anexo-i',
      title: 'Anexo I – Descrição do Tratamento (Art. 28.º RGPD)',
      bullets: [
        'Objeto: prestação do serviço de registo de assiduidade e identificação para "picagem", e, conforme configurado, gestão/armazenamento de documentação laboral.',
        'Duração: durante a vigência do contrato e pelo período necessário para devolução/eliminação dos dados, nos termos da cláusula 10.9.',
        'Natureza das operações: recolha, registo, organização, conservação, consulta, utilização, transmissão e eliminação, conforme instruções do Cliente.',
        'Categorias de titulares: trabalhadores, estagiários e administradores (Utilizadores).',
        'Categorias de dados: dados biométricos (impressão digital e/ou imagem facial para identificação); dados de identificação e contacto; dados de assiduidade; dados laborais e de RH.',
        'Finalidades (definidas pelo Cliente): registo de assiduidade, segurança/controlo interno e gestão de informação/documentação laboral.',
        'Retenção (por defeito): registos de assiduidade — 5 anos; dados biométricos — eliminados quando o trabalhador deixe de estar vinculado ao Cliente.',
      ],
    },
  ],
}
