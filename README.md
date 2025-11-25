# Avaliador Didático da Computação

Sistema Web de Autoavaliação Docente baseado no **Hexágono Didático da Computação**

### 👨‍💻 Autor: Ígor Almeida Guedes

### 🎓 Curso: Sistemas de Informação

### 👨‍🏫 Orientador: Prof. Ronney Moreira de Castro

### 📄 Base teórica: _Hexágono Didático da Computação_ de Castro (2019)

---

## 📌 Visão Geral

Este repositório contém o código-fonte do artefato computacional desenvolvido como parte do Trabalho de Conclusão de Curso.  
O sistema tem como objetivo **auxiliar docentes de Computação a diagnosticar e refletir sobre suas práticas pedagógicas**, utilizando como referência o **Hexágono Didático da Computação**, um modelo orientado ao planejamento didático fundamentado na Aprendizagem Ativa.

O sistema permite que o docente:

-   responda um questionário inteligente baseado nas seis dimensões do Hexágono;
-   receba um **perfil visual** representado em um hexágono SVG personalizado;
-   visualize pontos fortes e fracos da prática docente;
-   leia descrições explicativas das dimensões com desempenho insuficiente;
-   acesse e baixe relatórios anteriores em um painel histórico.

---

## 🎯 Objetivo Geral

Desenvolver uma aplicação web que permita diagnosticar a prática pedagógica do docente a partir das dimensões do Hexágono Didático da Computação, apresentando um relatório visual e interpretativo para apoio à reflexão profissional.

---

## 🧩 Funcionalidades Principais

### ✔️ Questionário Inteligente

-   Estruturado de acordo com o Hexágono Didático da Computação.
-   Perguntas sorteadas **aleatoriamente** por tipo.
-   Evita **repetição de perguntas** dentro do mesmo tipo.
-   Resposta "Parcialmente" → apresenta novas perguntas do mesmo tipo até esgotar.

### ✔️ Geração Automática do Hexágono

-   Construção de um **SVG dinâmico** contendo:
    -   vértices identificados (Professor, Aluno, Conteúdo, etc.);
    -   cores indicando equilíbrio (verde) ou fragilidade (vermelho);
    -   explicações detalhadas de cada relação frágil.

### ✔️ Relatórios Salvos

-   Cada preenchimento gera um relatório em SVG salvo no Supabase.
-   Interface com miniaturas estilo “galeria” para listar relatórios.
-   Possibilidade de download do arquivo.

### ✔️ Autenticação

-   Login de usuários via Supabase Auth.
-   Cada docente vê apenas seus próprios relatórios.

### ✔️ Interface Moderna

-   Sidebar dinâmica (shadcn/ui).
-   Topbar fixa com botão de alternância de tema.
-   Layout responsivo e clean.

---

## 🧱 Arquitetura e Tecnologias

| Tecnologia                        | Função                                       |
| --------------------------------- | -------------------------------------------- |
| **React + Vite**                  | Interface do sistema                         |
| **TypeScript**                    | Tipagem estática                             |
| **Supabase**                      | Banco de dados, autenticação e armazenamento |
| **shadcn/ui**                     | Componentes estilizados                      |
| **TailwindCSS**                   | Estilização                                  |
| **Lucide Icons**                  | Ícones                                       |
| **Vercel**                        | Deploy recomendado                           |
| **Design Science Research (DSR)** | Base metodológica                            |

---

## 🗂️ Estrutura do Projeto

```
src/
├─ app/
│ ├─ App.tsx
│ └─ routes.tsx
│
├─ components/
│ ├─ AppSidebar.tsx
│ ├─ Hexagon.tsx
│ ├─ Layout.tsx
│ ├─ NavLink.tsx
│ ├─ PrivateRoute.tsx
│ ├─ Sidebar.tsx
│ ├─ theme-provider.tsx
│ └─ ThemeToggle.tsx
│
├─ pages/
├─────Auth/
│    ├─ Login.tsx
│    └─ Register.tsx
├─────Dashboard/
│    ├─ Form.tsx
│    ├─ Home.tsx
│    ├─ Information.tsx
│    ├─ Questionnaire.tsx
│    ├─ ReportDetails.tsx
│    └─ Reports.tsx
│
├─ /styles
│ ├─ form.css
│ └─ globals.css
│
├─ services/
│ └─ supabase.ts
```

## 🚀 Como executar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/IgorAlmeidaGuedes/tcc-avaliador-didatico.git
cd tcc-avaliador-didatico
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar arquivo .env

```ini
VITE_SUPABASE_URL=sua-url
VITE_SUPABASE_ANON_KEY=sua-key
```

### 4. Executar o projeto

```bash
npm run dev
```

## 🌐 Deploy (Vercel)

1. Suba o projeto para o GitHub
2. Acesse https://vercel.com
3. Importe o repositório
4. Adicione as variáveis de ambiente:

```ini
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

5. Finalize o deploy automático 🎉

## 📊 Fundamentação Teórica (Resumo)

Este sistema foi desenvolvido com base no modelo **Hexágono Didático da Computação**, que organiza a prática docente em seis dimensões interdependentes: **Objetivos, Conteúdo, Professor, Aluno, Técnicas/Recursos e Condições**.

Esse modelo foi utilizado como referência conceitual para guiar o desenvolvimento do artefato, conforme a abordagem **Design Science Research (DSR)**, fundamentada em _Hevner et al. (2004)_.

---

## 🏁 Status do Projeto

-   ✔ Totalmente funcional
-   ✔ Questionário dinâmico com perguntas aleatórias
-   ✔ Geração de relatórios em SVG
-   ✔ Histórico completo para cada usuário
-   ✔ Pronto para deploy público

## 📬 Contato

**Ígor Almeida Guedes**  
📧 **guedes.igor018@gmail.com**
