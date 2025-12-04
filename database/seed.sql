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
insert into public.perguntas (id, questionario_id, texto, created_at, tipo_id) values
  (...todos os registros exatamente como você enviou...)
;

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
