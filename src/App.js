import React, { useState, useEffect } from 'react';
import PetForm from './PetForm';

function App() {
  const [pets, setPets] = useState(() => {
    const dadosSalvos = localStorage.getItem('pets');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const adicionarPet = (novoPet) => {
    const novaLista = [...pets, novoPet];
    setPets(novaLista);
    localStorage.setItem('pets', JSON.stringify(novaLista));
  };
  const excluirPet = (id) => {
    const novaLista = pets.filter((pet) => pet.id !== id);
    setPets(novaLista);
    localStorage.setItem('pets', JSON.stringify(novaLista));
  };
  return (
    <div>
      <h1>PetMed Tracker</h1>
      <PetForm onAddPet={adicionarPet} />
      <h2>Animais Cadastrados:</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            {pet.nome} ({pet.especie}){''}
            <button onClick={() => excluirPet(pet.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
