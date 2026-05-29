-- =========================================
--  SEED DO BANCO - Avaliador Didático
-- =========================================

-- =========================================
-- Seeds da tabela opcoes
-- =========================================
insert into public.opcoes (id, texto, ordem, created_at) values
  (66, 'Sim', 1, '2025-11-05 23:55:18.260809+00'),
  (67, 'Não', 2, '2025-11-05 23:55:18.260809+00'),
  (68, 'Parcialmente', 3, '2025-11-05 23:55:18.260809+00');

-- =========================================
-- Seeds da tabela perguntas
-- =========================================
INSERT INTO public.perguntas (id, questionario_id, texto, tipo_id) VALUES
  (1, 1, 'Os recursos tecnológicos utilizados por você favorecem a aprendizagem colaborativa?', 1), -- [cite: 2012]
  (2, 1, 'As técnicas e os recursos que você utiliza são adequados à natureza do conteúdo ensinado?', 1), -- [cite: 2013]
  (3, 1, 'Você atualiza constantemente os temas conforme a evolução tecnológica?', 1), -- [cite: 2014]
  (4, 1, 'As atividades que você propõe favorecem a aplicação prática do conteúdo aprendido?', 2), -- [cite: 2015]
  (5, 1, 'Você participa de espaços coletivos de reflexão e inovação pedagógica?', 2), -- [cite: 2016]
  (6, 1, 'Você estabelece uma comunicação aberta e dialógica com os alunos?', 2), -- [cite: 2017]
  (7, 1, 'Você verifica a eficácia das técnicas que utiliza em suas aulas?', 3), -- [cite: 2018]
  (8, 1, 'Você considera e valoriza as experiências e os conhecimentos prévios dos estudantes?', 3), -- [cite: 2019]
  (9, 1, 'Você revisa periodicamente os objetivos da disciplina à medida que o contexto social e tecnológico se transforma?', 3), -- [cite: 2020]
  (10, 1, 'Você revisa o conteúdo a fim de garantir que ele contribua efetivamente para o alcance dos objetivos de aprendizagem?', 4), -- [cite: 2021]
  (11, 1, 'A instituição oferece recursos, tempo e apoio suficientes para que você realize seu trabalho docente?', 4), -- [cite: 2022]
  (12, 1, 'Os objetivos de ensino que você estabelece orientam de forma efetiva o planejamento e a seleção das atividades?', 4), -- [cite: 2023]
  (13, 1, 'Você percebe que os estudantes compreendem e reconhecem a importância dos objetivos de aprendizagem?', 5), -- [cite: 2026]
  (14, 1, 'As técnicas que você utiliza em suas aulas estimulam a participação ativa dos alunos?', 5), -- [cite: 2027]
  (15, 1, 'Há espaço para que os alunos participem da definição de metas ou desafios da disciplina?', 5), -- [cite: 2028]
  (16, 1, 'Você adapta suas estratégias de ensino de acordo com o engajamento e o ritmo dos alunos?', 6), -- [cite: 2029]
  (17, 1, 'Você ajusta os métodos de ensino de acordo com o tipo de conteúdo (teórico, prático ou conceitual)?', 6), -- [cite: 2030]
  (18, 1, 'O conteúdo que você aborda em suas aulas está alinhado às demandas do mercado e da sociedade atual?', 6), -- [cite: 2031]
  (19, 1, 'Você demonstra domínio conceitual e atualizado do conteúdo que leciona?', 7), -- [cite: 2032]
  (20, 1, 'As discussões que você promove em aula incentivam reflexões sobre os impactos sociais e éticos da Computação?', 7), -- [cite: 2033]
  (21, 1, 'Você ajusta o conteúdo de acordo com os resultados de aprendizagem observados?', 7), -- [cite: 2034]
  (22, 1, 'Você seleciona técnicas fundamentadas em evidências de aprendizagem ativa?', 8), -- [cite: 2035]
  (23, 1, 'Você relaciona o conteúdo a situações práticas e profissionais reais?', 8), -- [cite: 2036]
  (24, 1, 'Você percebe incentivo institucional para práticas baseadas em Aprendizagem Ativa?', 8), -- [cite: 2037]
  (25, 1, 'Você busca continuamente novas metodologias e recursos para aprimorar sua prática docente?', 9), -- [cite: 2038]
  (26, 1, 'Os objetivos da sua disciplina refletem as competências exigidas pelas diretrizes curriculares e pela sociedade?', 9), -- [cite: 2039]
  (27, 1, 'Você apresenta os objetivos da disciplina aos alunos de maneira clara e acessível?', 9), -- [cite: 2040]
  (28, 1, 'As estratégias adotadas por você refletem práticas éticas e responsáveis no uso da tecnologia?', 10), -- [cite: 2041]
  (29, 1, 'Você utiliza ferramentas que favorecem a inclusão e a acessibilidade digital em suas aulas?', 10), -- [cite: 2044]
  (30, 1, 'O conteúdo que você apresenta é contextualizado e significativo?', 10), -- [cite: 2046]
  (31, 1, 'Você percebe que os alunos compreendem a relevância do conteúdo para sua futura atuação profissional?', 11), -- [cite: 2047]
  (32, 1, 'O conteúdo que você seleciona está coerente com os objetivos estabelecidos?', 11), -- [cite: 2048]
  (33, 1, 'Você percebe um clima de respeito, empatia e cooperação nas interações em sua sala de aula?', 11), -- [cite: 2049]
  (34, 1, 'As metodologias e os recursos que você utiliza estão alinhados às políticas institucionais de inovação pedagógica?', 12), -- [cite: 2050]
  (35, 1, 'Ao definir os objetivos da disciplina, você considera também aspectos éticos e de cidadania digital?', 12), -- [cite: 2051]
  (36, 1, 'Você articula objetivos cognitivos (saber), procedimentais (saber fazer) e atitudinais (saber ser) em sua disciplina?', 12), -- [cite: 2052]
  (37, 1, 'Você oferece oportunidades para que os estudantes apliquem o aprendizado em contextos reais (projetos, extensão, comunidade)?', 13), -- [cite: 2053]
  (38, 1, 'As metodologias que você escolhe estão diretamente relacionadas aos objetivos definidos?', 13), -- [cite: 2054]
  (39, 1, 'Você utiliza indicadores de sucesso, como rubricas, autoavaliação e feedback, para verificar se os objetivos foram alcançados?', 13), -- [cite: 2055]
  (40, 1, 'O que você propõe ensinar é consistente com as estratégias que você realmente adota?', 14), -- [cite: 2056]
  (41, 1, 'Você percebe que o curso incentiva a formação de valores éticos, colaborativos e sustentáveis?', 14), -- [cite: 2057]
  (42, 1, 'Você incentiva os alunos a refletirem sobre seu papel social e profissional enquanto futuros cientistas da computação?', 14), -- [cite: 2058]
  (43, 1, 'Você oferece espaço para que o estudante explore o conteúdo de forma autônoma ou investigativa?', 15), -- [cite: 2061]
  (44, 1, 'Você define objetivos claros para cada aula ou unidade?', 15), -- [cite: 2062]
  (45, 1, 'Os objetivos da sua disciplina levam em consideração o perfil e as necessidades dos alunos?', 15); -- [cite: 2063]

-- =========================================
-- Seeds da tabela questionarios
-- =========================================
insert into public.questionarios (id, titulo, descricao, created_at) values
  (1, 'Questionário Hexágono didatico', 'Questionário do TCC', '2025-09-22 23:45:20.626085+00');

-- =========================================
-- Seeds da tabela tipos_pergunta
-- =========================================
insert into public.tipos_pergunta (id, nome) values
  (2, 'Objetivos - Aluno'),
  (3, 'Aluno - Técnicas e Recursos'),
  (4, 'Técnicas e Recursos - Conteúdo'),
  (5, 'Conteúdo - Organização/Sociedade'),
  (6, 'Organização/Sociedade - Professor'),
  (7, 'Professor - Conteúdo'),
  (8, 'Professor - Técnicas e Recursos'),
  (9, 'Professor - Aluno'),
  (10, 'Objetivos - Organização/Sociedade'),
  (11, 'Objetivos - Conteúdo'),
  (12, 'Objetivos - Técnicas e Recursos'),
  (13, 'Aluno - Organização/Sociedade'),
  (14, 'Aluno - Conteúdo'),
  (15, 'Técnicas e Recursos - Organização/Sociedade'),
  (1, 'Professor - Objetivos');

-- =========================================
-- Seeds da tabela resultado
-- (não possui seeds)
-- =========================================

-- =========================================
-- Seeds da tabela usuarios
-- (não possui seeds)
-- =========================================
