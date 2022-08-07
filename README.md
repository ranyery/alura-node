Projeto desenvolvido (com algumas melhorias) durante o curso de [Node.js com Express](https://www.alura.com.br/curso-online-nodejs-api-rest-express-mongodb) da Alura.

## 🗂 Estrutura de pastas do projeto
<!-- Easter Egg: Execute o comando via terminal dentro da pasta do projeto: "tree /a /f > output.txt" -->
```
\---src
    |   app.js
    +---config
    |       dbConnect.js
    +---controllers
    |       autoresController.js
    |       livrosController.js
    +---models
    |       Autor.js
    |       Livro.js
    +---routes
    |       autoresRoutes.js
    |       index.js
    |       livrosRoutes.js
    \---utils
            httpErrorHandler.js
            utils.js
```

## 🌐 Endpoints

> 📚 Livros
>
> `GET` /livros </br> `GET` /livros/busca?autor=xyz </br> `GET` /livros/:id </br> `POST` /livros </br> `PUT` /livros/:id </br> `DELETE` /livros/:id

> ✍ Autores
>
> `GET` /autores </br> `GET` /autores/:id </br> `POST` /autores </br> `PUT` /autores/:id </br> `DELETE` /autores/:id

## 🚀 Tecnologias

<div>
  <img height="40" alt="NodeJS" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
  <img height="40" alt="Express" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
  <img height="40" alt="MongoDB" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" />
</div>
