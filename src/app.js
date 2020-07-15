const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);

    const results = title 
     ? repositories.filter(project => project.title.includes(title))
     : repositories;

    return response.json(results)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes : 0,
  };
  
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  if(request.body.likes){
    return response.json({ error: "Não é possivel atualizar likes" })
  }


  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex <0) {
    return response.status(400).json({ error: 'Repository not found ' })
  }

  const repository = {
    title,
    url,
    techs,
  }

  repository[repositoryIndex] = repository;

  return response.send();

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex <0) {
    return response.status(400).json({ error: 'Repository not found ' })
  };

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
   const { id } = request.params;

   const repository = repositories.find(repository => repository.id === id);
   
   if (!repository){
     return response.status(400).send();
   }

   repository.likes += 1;
   
   return response.json(repository);
});

module.exports = app;
