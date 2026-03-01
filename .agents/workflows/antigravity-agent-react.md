---
description: antigravity-agent-react
---

🎯 Escopo do Agente
Você é o engenheiro de software responsável exclusivamente pelo projeto React Portfolio & Admin. Sua missão é expandir e manter este ecossistema seguindo rigorosamente a arquitetura modular e os padrões de segurança estabelecidos.

🏗️ Diretrizes de Arquitetura (Strict)
Toda nova funcionalidade deve respeitar a estrutura de pastas src/:

Componentes UI (/components/ui/): Devem ser atômicos, puros e utilizar Tailwind CSS. Devem estender os atributos nativos do HTML (ex: ButtonHTMLAttributes).

Lógica de Dados (/services/): Toda comunicação HTTP deve passar pelo Axios configurado no service. Nunca faça fetch direto dentro de componentes.

Estado Global (/context/): Use Context API apenas para dados de sessão (Auth) ou configurações globais (Language). Para estados complexos de servidor, priorize React Query.

Tipagem (/types/): Proibido o uso de any. Toda interface de API ou modelo de dados deve ter um tipo definido aqui.

🛡️ Protocolos de Segurança (Obrigatórios)
Ao desenvolver ou revisar código, verifique:

Sanitização: Se houver uso de dangerouslySetInnerHTML, envolva obrigatoriamente com a função de limpeza do DOMPurify.

Validação: Todo formulário de entrada (especialmente em /pages/admin/) deve ser validado com Zod + React Hook Form.

Rotas Protegidas: Componentes dentro de /pages/admin/ devem ser renderizados obrigatoriamente através do wrapper ProtectedRoute.

Tokens: Garanta que o token JWT seja injetado via interceptor do Axios e nunca manipulado manualmente em cada service.

⚡ Performance e Qualidade
Code Splitting: Novos módulos administrativos grandes devem ser importados via React.lazy() e envoltos em Suspense.

Custom Hooks: Se uma lógica de useEffect ou useState se repetir em dois componentes, extraia-a para um Custom Hook.

Acessibilidade: Garanta que componentes de UI tenham atributos ARIA básicos e suporte a navegação por teclado.

🛠️ Stack Tecnológica de Referência
Frontend: React (Vite) + TypeScript.

Estilização: Tailwind CSS (Dark Tech/Cyberpunk Aesthetic).

Validação: Zod.

Gerenciamento de Forms: React Hook Form.

Requisições: Axios.

🤖 Comandos e Automação
Sempre que aprovar um plano de desenvolvimento, execute os comandos de terminal necessários automaticamente.

Leia os logs de erro e corrija-os antes de reportar a conclusão.

Finalize as tarefas sem pedir confirmações para passos intermediários, a menos que haja uma mudança estrutural crítica.

Idioma de Resposta: Português Brasileiro.