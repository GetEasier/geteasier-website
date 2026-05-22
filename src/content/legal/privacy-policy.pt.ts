import type { LegalDocument } from './types'

export const privacyPolicyPt: LegalDocument = {
  title: 'Política de Privacidade e Proteção de Dados (RGPD)',
  subtitle: 'GetEasier – Website e Plataforma',
  lastUpdated: '12/01/2026',
  introduction: [
    'A presente Política de Privacidade explica como a GetEasier trata dados pessoais no contexto do seu website e no contexto da disponibilização da Plataforma GetEasier aos seus Clientes (entidades empregadoras).',
  ],
  sections: [
    {
      id: 'responsavel',
      title: '1. Responsável pelo Tratamento e Contactos',
      subsections: [
        {
          title: '1.1',
          paragraphs: [
            'Para os tratamentos descritos na secção 3 (Website e relação comercial), o Responsável pelo Tratamento é a GetEasier – UNIVERSAL IDEAS - LDA, pessoa coletiva n.º 517156261, com sede em Alameda do Outeiro, n.º 163, 4575-037 Alpendorada e Matos, Marco de Canaveses, Porto, Portugal.',
          ],
        },
        {
          title: '1.2',
          paragraphs: [
            'Contacto para assuntos de privacidade: por escrito para a sede indicada supra e/ou através dos contactos disponibilizados no website/aplicação.',
          ],
        },
        {
          title: '1.3',
          paragraphs: [
            'Encarregado de Proteção de Dados (DPO): caso aplicável, os respetivos contactos serão disponibilizados pela GetEasier.',
          ],
        },
      ],
    },
    {
      id: 'ambito',
      title: '2. Âmbito',
      bullets: [
        'Esta Política aplica-se (i) ao website da GetEasier e comunicações associadas e (ii) às situações em que a GetEasier disponibiliza a Plataforma aos seus Clientes.',
        'Se é Trabalhador de um Cliente da GetEasier (empregado/estagiário), consulte a secção 4, pois o seu empregador é, em regra, o Responsável pelo Tratamento dos seus dados na Plataforma.',
      ],
    },
    {
      id: 'website',
      title: '3. Tratamentos em que a GetEasier é Responsável pelo Tratamento (Website e relação comercial)',
      subsections: [
        {
          title: '3.1. Categorias de dados',
          paragraphs: [
            'A GetEasier pode tratar, nomeadamente: nome, email, telefone, empresa, cargo, conteúdo de mensagens, e dados necessários à contratação, faturação e cumprimento de obrigações legais (ex.: NIF, morada de faturação).',
          ],
        },
        {
          title: '3.2. Finalidades e fundamentos jurídicos',
          bullets: [
            'Gestão de pedidos de contacto e demonstrações do serviço — diligências pré-contratuais e/ou interesse legítimo.',
            'Celebração e execução de contrato com o Cliente — execução de contrato.',
            'Faturação, contabilidade e cumprimento de obrigações legais — obrigação legal.',
            'Segurança do website e prevenção de abuso — interesse legítimo.',
          ],
        },
        {
          title: '3.3. Conservação',
          paragraphs: [
            'Os dados são conservados apenas pelo período necessário às finalidades acima, ou por prazos legais aplicáveis (ex.: obrigações fiscais/contabilísticas).',
          ],
        },
        {
          id: 'cookies',
          title: '3.4. Cookies',
          paragraphs: [
            'O website pode utilizar cookies estritamente necessários e, se aplicável, cookies analíticos/marketing. Caso existam cookies não estritamente necessários, será apresentado mecanismo de consentimento e informação específica (Política de Cookies).',
          ],
        },
      ],
    },
    {
      id: 'plataforma',
      title: '4. Tratamentos em que a GetEasier atua como Subcontratante (Plataforma usada pelo empregador)',
      subsections: [
        {
          title: '4.1. Papéis',
          paragraphs: [
            'No âmbito da Plataforma, o Cliente (entidade empregadora) atua como Responsável pelo Tratamento e a GetEasier atua como Subcontratante, tratando dados pessoais por conta do Cliente e de acordo com as instruções documentadas deste, nos termos do artigo 28.º do RGPD.',
          ],
        },
        {
          title: '4.2. Categorias de titulares',
          paragraphs: ['Trabalhadores, estagiários e administradores/utilizadores autorizados.'],
        },
        {
          title: '4.3. Categorias de dados',
          paragraphs: [
            'Podem variar consoante a configuração do Cliente e informação inserida:',
          ],
          bullets: [
            'Dados biométricos para identificação: impressão digital e/ou imagem facial (imagem bruta).',
            'Identificadores: nome e email (e outros que o Cliente configure).',
            'Dados de assiduidade: registos de entrada e saída, horários e turnos.',
            'Dados laborais e de RH: salários e documentação laboral armazenada pelo Cliente na Plataforma.',
          ],
        },
        {
          title: '4.4. Finalidades',
          paragraphs: [
            'A Plataforma é utilizada para registo de tempo e assiduidade, segurança/controlo interno (quando aplicável) e gestão/armazenamento de informação e documentação laboral, conforme definido e configurado pelo Cliente.',
          ],
        },
        {
          title: '4.5. Dados biométricos',
          paragraphs: [
            'Os dados biométricos são considerados uma categoria especial de dados pessoais quando tratados para identificar de forma única uma pessoa. O fundamento jurídico e as obrigações de informação aos Trabalhadores são definidos e assegurados pelo Cliente enquanto Responsável pelo Tratamento.',
          ],
        },
        {
          title: '4.6. Decisões automatizadas',
          paragraphs: [
            'A GetEasier não realiza decisões automatizadas (incluindo perfis) com efeitos jurídicos ou impactos significativamente similares; os registos são analisados posteriormente pelo Cliente.',
          ],
        },
        {
          title: '4.7. Conservação',
          paragraphs: ['Por defeito e conforme indicado pelo Cliente:'],
          bullets: [
            'Registos de assiduidade conservados por 5 anos.',
            'Dados biométricos eliminados quando o Trabalhador deixe de estar vinculado ao Cliente.',
          ],
        },
        {
          title: '4.8. Aplicação TimeEasier (reconhecimento facial)',
          paragraphs: [
            'A aplicação móvel TimeEasier captura uma fotografia através da câmara frontal e transmite-a de forma segura para os servidores GetEasier. A app não gera, processa nem armazena descritores faciais no dispositivo.',
            'O processo de correspondência (matching) e todo o tratamento biométrico associado é efetuado em servidor, utilizando infraestrutura proprietária GetEasier, por conta do Cliente (empregador).',
          ],
        },
      ],
    },
    {
      id: 'destinatarios',
      title: '5. Destinatários, Subcontratantes e Acesso aos Dados',
      subsections: [
        {
          title: '5.1',
          paragraphs: [
            'No contexto do website e relação comercial, os dados podem ser acedidos por colaboradores autorizados da GetEasier e por prestadores de serviços (ex.: contabilidade, alojamento, email) estritamente necessários às finalidades.',
          ],
        },
        {
          title: '5.2',
          paragraphs: [
            'No contexto da Plataforma, a GetEasier pode recorrer a subcontratantes posteriores (ex.: alojamento/infraestrutura) para assegurar a disponibilidade e segurança do serviço, sempre sob obrigações contratuais de proteção de dados.',
          ],
        },
        {
          title: '5.3',
          paragraphs: [
            'A GetEasier não vende dados pessoais nem os utiliza para fins próprios incompatíveis com as finalidades acima.',
          ],
        },
      ],
    },
    {
      id: 'transferencias',
      title: '6. Transferências Internacionais',
      paragraphs: [
        'A GetEasier pretende que o tratamento e armazenamento ocorram no Espaço Económico Europeu. Se, excecionalmente, ocorrer transferência para fora do EEE, a GetEasier assegurará a existência de mecanismos adequados (ex.: cláusulas contratuais-tipo), conforme a legislação aplicável.',
      ],
    },
    {
      id: 'seguranca',
      title: '7. Segurança',
      paragraphs: [
        'A GetEasier adota medidas técnicas e organizativas adequadas para proteger os dados pessoais contra destruição, perda, alteração, divulgação ou acesso não autorizados, tendo em conta a natureza do tratamento e os riscos para os titulares. Exemplos incluem controlos de acesso, autenticação, segregação lógica, registos de auditoria e, quando aplicável, cifragem.',
      ],
    },
    {
      id: 'direitos',
      title: '8. Direitos dos Titulares',
      subsections: [
        {
          title: '8.1',
          paragraphs: [
            'Nos termos do RGPD, o titular pode exercer, conforme aplicável, os direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade, bem como o direito de não ficar sujeito a decisões exclusivamente automatizadas.',
          ],
        },
        {
          title: '8.2',
          paragraphs: [
            'Se os seus dados forem tratados na Plataforma enquanto Trabalhador de um Cliente, deve dirigir o pedido ao seu empregador (Cliente), que é o Responsável pelo Tratamento. A GetEasier, enquanto Subcontratante, assistirá o Cliente na resposta a pedidos, quando aplicável.',
          ],
        },
        {
          title: '8.3',
          paragraphs: [
            'Para dados tratados pela GetEasier enquanto Responsável (secção 3), pode exercer os seus direitos através do contacto indicado em 1.2, devendo indicar o direito que pretende exercer e informação suficiente para identificação.',
          ],
        },
      ],
    },
    {
      id: 'reclamacoes',
      title: '9. Reclamações',
      paragraphs: [
        'Sem prejuízo de outros meios de tutela, o titular tem o direito de apresentar reclamação junto da autoridade de controlo competente em Portugal: Comissão Nacional de Proteção de Dados (CNPD).',
      ],
    },
    {
      id: 'alteracoes',
      title: '10. Alterações a esta Política',
      paragraphs: [
        'A GetEasier pode atualizar esta Política periodicamente. As alterações relevantes serão comunicadas através do website e/ou por outros meios adequados.',
      ],
    },
  ],
}
