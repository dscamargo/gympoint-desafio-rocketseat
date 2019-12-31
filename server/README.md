Gympoint - Backend

Passo a passo para instalação, configuração e execução.

1 - Se estiver utilizando docker, inicie um container do postgres e do redis:

```docker run --name postgres -p 5432:5432 -d kartoza/postgis``` \
```docker run --name redis -p 6379:6379 -d redis:alpine```

2 - Instale as dependencias do projeto: ```yarn``` ou ```npm start```

3 - Faça uma cópia do arquivo .env.example presente do repositório e nomeie como .env

4 - Insira as suas configurações de envio de email, fila, banco de dados, dsn do Sentry e expiração do token no .env

5 - Inicie o servidor utilizando: `yarn dev`

6 - Inicie a fila utilizando: `yarn queue`

O servidor local ficará online no endereço - `http://localhost:3333`
