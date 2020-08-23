import React from "react";

import "./styles.css";
import api from "./services/api";
import { useState } from "react";

function App() {
  const [ respositories, setRepositories ] = useState([]);
  async function handleAddRepository() {
    const repositorie = await api.post('/repositories', {
      title: "Reposotorio 2",
      url: "http://teste.com.br",
      techs: "Teste"
    });
    setRepositories([
      ...respositories,
      repositorie.data
    ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepositories = respositories.filter(repository => 
      repository.id !== id
    )
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map( (repositorie)=> {
          return(
            <li key={repositorie.id}>
            {repositorie.title}  
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
            </button>
          </li>
          )
        })}       
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
