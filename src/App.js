import React, { useState } from 'react';
import PetForm from './PetForm';
import RemedioForm from './RemedioForm';
import PetList from './PetList';

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

  const registrarDose = (petId, remedioId) => {
    const novaLista = pets.map((pet) => {
      if (pet.id === petId) {
        const novosRemedios = pet.remedios.map((remedio) => {
          if (remedio.id === remedioId) {
            const novaDose = {
              dataHora: new Date().toISOString(),
            };
            return {
              ...remedio,
              doses: [...remedio.doses, novaDose],
            };
          }
          return remedio;
        });

        return {
          ...pet,
          remedios: novosRemedios,
        };
      }
      return pet;
    });

    setPets(novaLista);
    localStorage.setItem('pets', JSON.stringify(novaLista));
  };
  const removerDose = (petIndex, remedioIndex, doseIndex) => {
    const novosPets = [...pets];
    novosPets[petIndex].remedios[remedioIndex].doses.splice(doseIndex, 1);
    setPets(novosPets);
    localStorage.setItem('pets', JSON.stringify(novosPets));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 text-white font-sans">
      <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-lg">
        PetMed Tracker
      </h1>
      <PetForm onAddPet={adicionarPet} />
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b border-white/50 pb-2">
        Animais Cadastrados:
      </h2>
      <PetList
        pets={pets}
        excluirPet={excluirPet}
        adicionarRemedioAoPet={adicionarRemedioAoPet}
        registrarDose={registrarDose}
        removerDose={removerDose}
      />
    </div>
  );
}

export default App;
