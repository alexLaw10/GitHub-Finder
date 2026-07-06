# GitHub Finder (monorepo)

Aplicação client-side que consulta a API pública do GitHub para buscar um usuário, ver seus detalhes e navegar pelos seus repositórios. Organizada como monorepo [Nx](https://nx.dev/).

## Stack

- [Nx](https://nx.dev/) — orquestração do monorepo (build, typecheck, cache)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build e dev server
- [React Router](https://reactrouter.com/) — roteamento client-side
- [Axios](https://axios-http.com/) — chamadas HTTP
- [TanStack Query](https://tanstack.com/query) — cache e estados de loading/erro
- [Sass](https://sass-lang.com/) + CSS Modules, com nomenclatura [BEM](http://getbem.com/) — estilos próprios, responsivos, sem depender de nenhuma UI framework

## Estrutura

```
apps/
  github-finder/        App React: rotas, componentes e hooks específicos do domínio GitHub
packages/
  types/                Tipos compartilhados (GithubUser, GithubRepo)
  api-client/            Cliente HTTP da API do GitHub (axios) + tratamento de erros
  design-system/         Design system genérico: átomos, moléculas e templates de layout (SCSS+BEM)
```

`apps/github-finder` depende de `packages/design-system` e `packages/api-client` (que por sua vez depende de `packages/types`). Só viram pacote separado os módulos que fazem sentido isolar: `design-system` porque é genuinely reutilizável (sem nenhum conhecimento de GitHub), e `api-client`/`types` porque são agnósticos de framework. Os componentes de tela (`UserCard`, `RepoList`, `RepoListItem`, `RepoDetailCard`, `SortSelect`, `Loading`, `ErrorMessage`) e os hooks (`useUser`, `useRepos`, `useRepo`) ficam dentro do próprio app, em `apps/github-finder/src/app/components` e `apps/github-finder/src/app/hooks` — são específicos deste app e não têm motivo pra virar pacote.

### Design system (`packages/design-system`)

Componentes genéricos, sem conhecimento de GitHub, organizados em atomic design:

- **Átomos**: `Button`/`ButtonLink`, `Badge`, `Avatar`, `Spinner`, `Alert`, `TextInput`, `Select`, `Card` (com `Card.Body`/`Card.Title`/`Card.Text`), `BackLink`
- **Moléculas**: `SearchBar`, `StatItem`, `LanguageBadge`, `StarCount`, `SortDropdown`
- **Templates**: `PageContainer`, `CenteredLayout`, `EmptyState`

Os componentes do app consomem esses blocos para montar as telas.

**Imports internos**: dentro do `design-system`, moléculas importam átomos via alias `@` (ex.: `@/atoms/Button/Button`) em vez de caminho relativo (`../../atoms/Button/Button`). O alias `@` aponta pra `packages/design-system/src/lib` e está configurado em **5 lugares** que precisam ficar sincronizados: `tsconfig.lib.json`/`tsconfig.spec.json` do próprio pacote (typecheck do design-system), `vitest.config.ts` do pacote (testes do design-system), e `vite.config.mts`/`tsconfig.app.json`/`tsconfig.spec.json` do **app** — porque o `design-system` expõe `"types"`/`"import"` apontando direto pro `src` (sem build próprio), o Vite e o TypeScript do app acabam processando esses arquivos como se fossem parte do próprio programa do app, e precisam saber resolver o alias também.

### Module boundaries

Cada projeto tem uma tag de camada (`nx.tags` no `package.json`, ou `tags` no `project.json` do app) e o ESLint (`@nx/enforce-module-boundaries` em `eslint.config.mjs`) trava quem pode importar quem:

| Tag | Projeto | Pode depender de |
|---|---|---|
| `type:model` | `types` | nada |
| `type:data` | `api-client` | `type:model` |
| `type:ui` | `design-system` | nada |
| `type:app` | `github-finder` | `type:model`, `type:data`, `type:ui` |

Isso é aplicado de verdade — não é só documentação. Ex: se `design-system` tentar importar `api-client`, `npx nx run-many -t lint` falha com `A project tagged with "type:ui" cannot depend on any libs with tags`.

### Estilos (SCSS + BEM)

Cada componente tem seu `.module.scss` co-localizado, com classes em BEM (`&__elemento`, `&--modificador`) aninhadas via Sass. `packages/design-system/src/styles` guarda variáveis e mixins compartilhados (cores, espaçamento, breakpoints); `apps/github-finder/src/app/styles` tem seu próprio espelho reduzido dessas variáveis para os componentes do app (evita import cruzando fronteira de pacote). Não há nenhuma dependência de UI framework (Bootstrap foi removido) — toda a responsividade é feita nos próprios arquivos `.scss` via mixins de breakpoint.

> **Nota de decisão**: o layout inicialmente usava Bootstrap. A versão atual usa SCSS + BEM escrito à mão, de propósito — para demonstrar domínio de CSS/Sass além de consumir classes prontas de um framework. A responsividade continua atendida (testada em 320px/375px/desktop), mas é uma opção deliberada diferente do que um enunciado que pede "seguindo os padrões Bootstrap" sugere.

### Testes

- **`packages/design-system`**: cada átomo/molécula/template tem um `.spec.tsx` co-localizado (Vitest + Testing Library + jest-dom), cobrindo renderização, variantes/classes BEM, interações (clique, mudança de valor) e atributos de acessibilidade (`aria-label`, `aria-hidden`, `role`, nível de heading do `Card.Title`).
- **`packages/api-client`**: `api-client.spec.ts` mocka o axios (`vi.spyOn(githubApi, 'get')`) para testar as chamadas (`getUser`, `getUserRepos`, `getRepo`) e o mapeamento de erros (`getApiErrorMessage` para 404/403/outros/erros não-axios), sem bater na API real.
- **`apps/github-finder`**: hooks (`useGithubResource`, `useUser`, `useRepos`, `useRepo`) testados com `renderHook` + `QueryClientProvider`, mockando `@github-finder/api-client`; componentes (`RepoList` — inclui a lógica de ordenação por estrelas/forks/atualização/nome —, `SortSelect`, `UserCard`, `RepoListItem`, `RepoDetailCard`, `ErrorMessage`, `Loading`); rotas (`Search`, `UserProfile`, `RepoDetail`) mockando os hooks pra exercitar loading/erro/sucesso sem bater na API real.

```bash
npx nx test design-system   # roda a suíte do design system
npx nx test api-client      # roda a suíte do api-client
npx nx test github-finder   # roda a suíte do app
npx nx run-many -t test     # roda testes de todos os projetos que tiverem
```

## Rotas

| Rota                | Página                                    |
| -------------------- | ------------------------------------------ |
| `/`                   | Busca de usuário                            |
| `/:username`          | Perfil do usuário + lista de repositórios   |
| `/:username/:repo`    | Detalhes de um repositório                  |

## Instalação e uso

Pré-requisitos: Node.js 20+ (o workspace está fixado em `20.20.2` via [Volta](https://volta.sh/), veja `"volta"` em `package.json`).

```bash
npm install
npx nx serve github-finder
```

A aplicação estará disponível em `http://localhost:4200`.

### Como utilizar a aplicação

1. **Buscar um usuário**: na tela inicial (`/`), digite um username do GitHub (ex.: `octocat`) no campo de busca e clique em "Buscar" (ou tecle Enter).
2. **Ver o perfil**: você é redirecionado para `/:username`, onde vê avatar, nome, bio (quando houver), email (quando público), número de seguidores, seguindo e repositórios, além de um link para o perfil no GitHub.
3. **Ver e reordenar os repositórios**: logo abaixo do perfil fica a lista de repositórios, ordenada por **estrelas** (decrescente) por padrão. Use o dropdown "Ordenar por" para reordenar por forks, atualização mais recente ou nome (A-Z).
4. **Ver detalhes de um repositório**: clique em qualquer repositório da lista para ir a `/:username/:repo`, com nome, descrição, número de estrelas, linguagem principal e um link externo para o repositório no GitHub.
5. **Voltar**: use os links "← Nova busca" / "← Voltar para {username}" para navegar de volta sem perder o fluxo.

Se o usuário ou repositório buscado não existir, ou se o limite de requisições da API do GitHub for excedido, uma mensagem de erro amigável é exibida no lugar do conteúdo (veja a seção "Observações" abaixo).

Outros comandos úteis:

```bash
npx nx build github-finder         # build de produção do app
npx nx run-many -t typecheck       # typecheck de todos os pacotes
npx nx run-many -t lint            # lint de todos os pacotes
npx nx graph                       # visualizar o grafo de dependências entre apps/pacotes
```

## CI

`.github/workflows/ci.yml` roda em todo push/PR pra `main`: `npm ci` seguido de `npx nx run-many -t lint typecheck test build` (4 projetos). Não depende de Nx Cloud nem de nenhum serviço externo — roda 100% autocontido no runner do GitHub Actions.

## Observações

- A API do GitHub tem um limite de 60 requisições/hora para chamadas não autenticadas. Erros de usuário/repositório não encontrado (404) e de limite excedido (403) são tratados com mensagens amigáveis na interface (`getApiErrorMessage` em `packages/api-client`).
- Não há autenticação nem chaves de API envolvidas — todas as chamadas são feitas diretamente ao endpoint público `https://api.github.com`.
- O Nx Cloud (cache remoto/CI) **não está conectado** neste workspace por padrão.
