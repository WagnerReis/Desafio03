import React, { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Dev React ${Date.now()}`,
      url: "url.qualquer.com",
      techs: "React",
      likes: 0
    });
    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const responde = await api.delete(`repositories/${id}`);
    return;
  }

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[repositories]);

  return (
    <div>
      <ul data-testid="repository-list">
        <ul>
          {repositories.map(repositorie => 
            <li key={repositorie.id}>
                {repositorie.title} 
                <button onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
                </button>
            </li>)}
        </ul>
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
