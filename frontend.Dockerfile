FROM node:22

# Diretório de trabalho
WORKDIR /teste-fontend-amicci

# Copia os arquivos de dependências
COPY ./package.json ./
RUN npm install -g pnpm && pnpm install

# Copia o código-fonte do frontend
COPY ./ .

# Compila o frontend
RUN pnpm run build

# Expõe a porta onde o frontend estará ouvindo
EXPOSE 3000

# Comando para iniciar o frontend
CMD ["pnpm", "run", "start"]
