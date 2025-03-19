# Teste Frontend Amicci

Este projeto é uma aplicação web que consulta informações climáticas de diferentes cidades. Desenvolvida como parte de um desafio técnico, a aplicação oferece as seguintes funcionalidades:

- **Busca por cidade**: Permite inserir o nome de uma cidade e obter dados climáticos.
- **Localização atual**: Utiliza a API de geolocalização do navegador para determinar a localização do usuário, acessa a API do Google Maps para obter o nome da cidade e exibe os dados climáticos correspondentes.

## Estrutura do Projeto

A pasta `src/` contém o código-fonte organizado da seguinte forma:

- **`__tests__/`**: Testes unitários e de integração.
- **`app/`**: Páginas da aplicação.
  - **`layout.tsx`**: Componente que envolve a estrutura do projeto.
  - **`page.tsx`**: Página principal que exibe o formulário de busca e os resultados climáticos.
- **`app/api/`**: Funções para comunicação com APIs externas.
  - **`geocode`**: Funções para obter o nome da cidade a partir das coordenadas geográficas usando a API do Google Maps.
  - **`weather`**: Funções para obter dados climáticos da API do OpenWeatherMap.
- **`components/`**: Componentes reutilizáveis da interface do usuário.
  - **`ui`**: Componentes provenientes do ShadCN.
  - **`weather`**: Componentes específicos para exibição dos cards climáticos.
- **`hooks/`**: Funções personalizadas para encapsular a lógica de negócio.
  - **`use-weather.ts`**: Hook para buscar dados climáticos utilizando as APIs do OpenWeatherMap e Google Maps.

## Como Executar o Projeto

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/KernelGM/teste-fontend-amicci.git
   ```

2. **Acessar o diretório do projeto:**

   ```bash
   cd teste-fontend-amicci
   ```

3. **Criar um arquivo `.env` dentro da pasta com as chaves das APIs:**

   ```bash
   OPENWEATHER_API_KEY=COLOQUE_SUA_CHAVE_AQUI
   GOOGLE_MAPS_API_KEY=COLOQUE_SUA_CHAVE_AQUI
   ```

## Com Docker

**Se você tiver o Docker e o Docker Compose instalados, basta rodar:**

   ```bash
   docker-compose up --build
   ```

   A aplicação estará disponível em: `http://localhost:3100`.

## Sem Docker

**Se você não tiver o Docker instalado, siga os passos abaixo:**

1. **Instale as dependências do projeto:**

   ```bash
   pnpm install
   ```

2. **Inicie o servidor de desenvolvimento:**

   ```bash
   pnpm run dev
   ```

## Testes

Os testes e o linting são executados automaticamente ao rodar o Docker Compose. Para rodá-los manualmente, basta instalar as dependências com:

```bash
pnpm install
```

E então executar os testes com:

```bash
pnpm run test
```

## Tecnologias Utilizadas

- **React + Next.js**: Framework React para construção de interfaces.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Tailwind CSS**: Framework CSS para design moderno e responsivo.
- **Jest**: Framework de testes para JavaScript.
- **ShadCN**: Biblioteca de componentes UI (botões, cards, inputs, etc).
- **Lucide React**: Ícones vetoriais.
- **Next Themes**: Suporte a temas dinâmicos.
- **Tailwind CSS Animate**: Animações com Tailwind.

## Licença

Este projeto está licenciado sob a MIT License.
