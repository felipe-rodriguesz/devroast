# Code Editor com Syntax Highlighting - Especificação

## Visão Geral

Editor de código interativo para a homepage do DevRoast que permite ao usuário colar código, aplicar syntax highlighting automaticamente com base na linguagem detectada, e oferecer opção de selecionar manualmente a linguagem.

## Requisitos Funcionais

### 1. Entrada de Código (EDITÁVEL)
- Área de texto para o usuário colar seu código
- Suporte a múltiplas linhas
- **Editável** após colar (caso de uso principal)
- Não precisa de funcionalidades avançadas como multi-cursor ou search/replace

### 2. Syntax Highlighting
- Motor: **Shiki** (já está no projeto)
- Atualização do highlight em tempo real
- Linguagens suportadas:
  - JavaScript
  - TypeScript
  - Python
  - Java
  - C
  - C++
  - Go
  - Rust
  - PHP
  - Ruby
  - Bash
  - JSON
  - YAML
  - Markdown

### 3. Line Numbers
- Exibir números de linha no editor

### 4. Indentação Automática
- Desejável mas não obrigatória para primeira versão

### 5. Detecção de Linguagem Automática
- Detectar automaticamente quando o usuário cola código
- Feedback imediato

### 6. Seleção Manual de Linguagem
- Dropdown para o usuário escolher a linguagem
- Opção "Auto" (padrão) para detecção automática
- UI que indica claramente a linguagem selecionada

### 7. Arquitetura
- Syntax highlighting no **cliente** (feedback imediato)
- Detecção de linguagem no **cliente** (feedback imediato)
- Código será enviado para o **servidor** para análise/roast

---

## Análise de Opções

### Opção 1: Shiki + Textarea Overlay (Recomendada)

**Inspiração: Ray-So**

Ray.so usa uma abordagem de overlay:
- Um `textarea` transparente sobre o código com syntax highlighting
- O textarea captura toda a entrada do usuário
- O código destacado fica atrás (z-index menor)
- Sincroniza scroll entre os dois elementos

**Prós:**
- Leve e performático
- Total controle sobre a UI
- Shiki já está no projeto
- Suporta todas as linguagens necessárias
- Excelente qualidade de highlight

**Contras:**
- Reimplementar scroll sync
- Reimplementar indentação

### Opção 2: Monaco Editor (@monaco-editor/react)

**Popularidade:** 3.1M downloads/semana

**Prós:**
- Editor completo (same as VS Code)
- Suporte a IntelliSense
- Detecção de linguagem built-in

**Contras:**
- Bundle muito grande (~3MB)
- Overkill para o caso de uso

### Opção 3: CodeMirror (@uiw/react-textarea-code-editor)

**Popularidade:** 96K downloads/semana

**Prós:**
- Leve (~50KB)
- Simples de usar

**Contras:**
- Menos customizável
- Menos linguagens que Shiki

---

## Decisão Recomendada

### Shiki + Textarea Overlay

**Justificativa:**
1. Shiki já está instalado no projeto (para CodeBlock)
2. Abordagem leve e performática
3. Total controle sobre styling (match com design do DevRoast)
4. Ray-So comprovou que essa abordagem funciona bem

### Detecção de Linguagem

Usar `highlight.js` (hljs.highlightAuto) conforme Ray-So:
- Leve e rápido
- Detecção automática confiável
- Funciona no browser

---

## TODOs

- [x] **Investigação:** Verificar como Shiki é usado no CodeBlock atual
- [x] **Investigação:** Verificar se highlight.js já está no projeto (ou adicionar)
- [x] **Investigação:** Verificar código atual do editor em src/app/home-editor.tsx
- [x] **Implementação:** Criar componente CodeEditor com textarea overlay
- [x] **Implementação:** Integrar Shiki para syntax highlighting
- [x] **Implementação:** Integrar highlight.js para detecção automática
- [x] **Implementação:** Adicionar seletor de linguagem (dropdown)
- [x] **Implementação:** Adicionar line numbers
- [ ] **Implementação:** Implementar indentação automática (se possível)
- [x] **Estilização:** Garantir que o editor match com o design system DevRoast
- [x] **Integração:** Conectar com o botão "roast_my_code" na homepage
- [ ] **Teste:** Testar com as 14 linguagens especificadas

---

## Implementação Concluída

### Arquivos Modificados/Criados:
1. `src/components/ui/code-input.tsx` - Componente reescrito com:
   - Overlay de syntax highlighting (Shiki + textarea)
   - Line numbers dinâmicos
   - Language selector dropdown
   - Detecção automática via highlight.js

2. `src/components/code-editor.tsx` - Atualizado para expor:
   - Props `language` e `onLanguageChange`

3. `src/app/home-editor.tsx` - Integrado com o novo editor

### Detalhes da Implementação:
- **Approach:** Shiki + Textarea Overlay (inspirado no Ray-So)
- **Detecção automática:** highlight.js com hljs.highlightAuto
- **14 linguagens suportadas:** JavaScript, TypeScript, Python, Java, C, C++, Go, Rust, PHP, Ruby, Bash, JSON, YAML, Markdown
- **UI:** Selector dropdown no header do editor

---

## Referências

- [Ray-So Repository](https://github.com/raycast/ray-so)
- [Ray-So Editor.tsx](https://github.com/raycast/ray-so/blob/main/app/(navigation)/(code)/components/Editor.tsx)
- [Ray-So code.ts](https://github.com/raycast/ray-so/blob/main/app/(navigation)/(code)/store/code.ts)
- [Shiki Documentation](https://shiki.style)
- [highlight.js Documentation](https://highlightjs.org)
