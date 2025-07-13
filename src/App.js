import React, { useState, useEffect } from 'react';
import PetForm from './PetForm';

function App() {
  const [pets, setPets] = useState([]);
  //Carregar pets no LocalStorage na inicialização
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('pets');
    if (dadosSalvos) {
      setPets(JSON.parse(dadosSalvos));
    }
  }, []);
  //Salvar pets no LocalStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('pets', JSON.stringify(pets));
  }, [pets]);
  const adicionarPet = (novoPet) => {
    const novaLista = [...pets, novoPet];
    setPets(novaLista);
    localStorage.setItem('pets', JSON.stringify(novaLista));
  };
  const excluirPet = (id) => {
    const novaLista = pets.filter((pet) => pet.id !== id);
    setPets(novaLista);
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
