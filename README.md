# 🚀 Projeto de Automação de Testes

Projeto profissional de automação de testes utilizando **Playwright** com TypeScript, seguindo as melhores práticas de QA.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Executando Testes](#executando-testes)
- [Page Objects](#page-objects)
- [Configuração](#configuração)
- [Tags e Filtros](#tags-e-filtros)
- [Relatórios](#relatórios)

## 🔧 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Git

## 📦 Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Instalar navegadores do Playwright:**
```bash
npx playwright install
```

3. **Configurar variáveis de ambiente (opcional):**
Crie um arquivo `.env` na raiz do projeto:
```
BASE_URL=http://localhost:3000
```

## 📁 Estrutura do Projeto

```
.
├── tests/
│   ├── e2e/              # Testes end-to-end
│   │   ├── login.spec.ts
│   │   └── navigation.spec.ts
│   ├── api/              # Testes de API
│   │   └── api-example.spec.ts
│   └── support/          # Arquivos de suporte
│       ├── fixtures/     # Dados de teste e fixtures
│       ├── helpers/      # Funções auxiliares
│       └── page-objects/ # Page Object Model
├── playwright.config.ts  # Configuração do Playwright
├── package.json
└── README.md
```

## 🎯 Executando Testes

### Comandos Principais

```bash
# Executar todos os testes
npm test

# Executar com interface visual (headed mode)
npm run test:headed

# Executar em modo debug
npm run test:debug

# Executar com UI mode (modo interativo)
npm run test:ui

# Executar apenas testes E2E
npm run test:e2e

# Executar apenas testes de API
npm run test:api

# Executar testes com tag @smoke
npm run test:smoke

# Executar testes com tag @regression
npm run test:regression

# Executar em navegador específico
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Executar Testes Específicos

```bash
# Executar um arquivo específico
npx playwright test tests/e2e/login.spec.ts

# Executar testes que contenham uma palavra
npx playwright test --grep "login"

# Executar testes em paralelo
npx playwright test --workers=4
```

## 📄 Page Objects

O projeto utiliza o padrão **Page Object Model (POM)** para melhor organização e manutenibilidade.

### Exemplo de uso:

```typescript
import { LoginPage } from '../support/page-objects/LoginPage';

test('exemplo de teste', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('usuario@teste.com', 'senha123');
});
```

### Criando novos Page Objects:

1. Crie um arquivo em `tests/support/page-objects/`
2. Estenda a classe `BasePage`
3. Defina os locators como propriedades
4. Crie métodos para ações da página

## ⚙️ Configuração

### Configuração do Playwright (`playwright.config.ts`)

Principais configurações:

- **timeout**: Tempo máximo para executar um teste (30s)
- **baseURL**: URL base da aplicação
- **retries**: Número de tentativas em caso de falha
- **workers**: Número de testes em paralelo
- **projects**: Navegadores configurados (Chrome, Firefox, Safari, Mobile)

### Variáveis de Ambiente

Você pode configurar através de variáveis de ambiente:

```bash
# Windows PowerShell
$env:BASE_URL="https://app.exemplo.com"
npm test

# Linux/Mac
BASE_URL=https://app.exemplo.com npm test
```

## 🏷️ Tags e Filtros

Use tags para organizar seus testes:

```typescript
test('@smoke Deve fazer login', async ({ page }) => {
  // Teste crítico
});

test('@regression Deve validar formulário', async ({ page }) => {
  // Teste de regressão
});
```

Executar por tag:
```bash
npx playwright test --grep @smoke
```

## 📊 Relatórios

### Relatório HTML

Após executar os testes, visualize o relatório:

```bash
npm run test:report
```

Ou:
```bash
npx playwright show-report
```

### Screenshots e Vídeos

- Screenshots são salvos automaticamente quando um teste falha
- Vídeos são gravados apenas para testes que falharam
- Localização: `test-results/`

## 🛠️ Helpers e Utilitários

O projeto inclui helpers reutilizáveis em `tests/support/helpers/`:

- `waitForElement`: Aguarda elemento estar visível
- `safeFill`: Preenche campo de forma segura
- `safeClick`: Clica em elemento após garantir visibilidade
- `generateRandomEmail`: Gera email aleatório para testes

## 📝 Dados de Teste

Dados de teste estão centralizados em `tests/support/fixtures/test-data.ts`:

```typescript
import { testUsers } from '../support/fixtures/test-data';

await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
```

## 🔍 Debugging

### Modo Debug

```bash
npm run test:debug
```

### UI Mode (Recomendado)

```bash
npm run test:ui
```

O UI Mode permite:
- Ver os testes em tempo real
- Executar testes individualmente
- Ver o código sendo executado
- Inspecionar elementos

### Trace Viewer

Para ver traces detalhados:

```bash
npx playwright show-trace trace.zip
```

## 📚 Recursos Adicionais

- [Documentação do Playwright](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Adicione testes para novas funcionalidades
3. Certifique-se de que todos os testes passam
4. Faça commit e push

## 📄 Licença

ISC

---

**Desenvolvido com ❤️ para automação de testes**
