import React, { useState } from 'react';
import PetForm from './PetForm';
import RemedioForm from './RemedioForm';

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

  const adicionarRemedioAoPet = (petId, novoRemedio) => {
    const novaLista = pets.map((pet) => {
      if (pet.id === petId) {
        return {
          ...pet,
          remedios: [...pet.remedios, novoRemedio],
        };
      } else {
        return pet;
      }
    });
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
            <strong>{pet.nome}</strong> ({pet.especie}){''}
            <button onClick={() => excluirPet(pet.id)}>Excluir</button>
            {/*Formulário de remédio*/}
            <RemedioForm petId={pet.id} onAddRemedio={adicionarRemedioAoPet} />
            {/*lista de remédio do pet*/}
            {pet.remedios.length > 0 && (
              <ul>
                {pet.remedios.map((remedio) => (
                  <li key={remedio.id}>
                    💊{remedio.nome} - {remedio.dosagem} - {remedio.frequencia}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
