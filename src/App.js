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

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 text-white font-sans">
      <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-lg">
        PetMed Tracker
      </h1>
      <PetForm onAddPet={adicionarPet} />
      <h2 className="text-2xl font-semibold mt-8 mb-4 border-b border-white/50 pb-2">
        Animais Cadastrados:
      </h2>
      <ul className="space-y-6">
        {pets.map((pet) => (
          <li
            key={pet.id}
            className="bg-white bg-opacity-20 rounded-lg p-4 shadow-lg"
          >
            <div className="flex justify-between items-center">
              <strong className="text-xl">{pet.nome}</strong> ({pet.especie})
              {''}
              <button
                onClick={() => excluirPet(pet.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-semibold transition"
              >
                Excluir
              </button>
            </div>
            <p className="italic">{pet.especie}</p>

            {/*Formulário de remédio*/}
            <RemedioForm petId={pet.id} onAddRemedio={adicionarRemedioAoPet} />
            {/*lista de remédio do pet*/}
            {pet.remedios.length > 0 && (
              <ul className="mt-4 space-y-3">
                {pet.remedios.map((remedio) => (
                  <li
                    key={remedio.id}
                    className="bg-white bg-opacity-30 rounded p-3 shadow-inner"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        💊<strong>{remedio.nome}</strong> - {remedio.dosagem} -{' '}
                        {remedio.frequencia}
                      </div>
                      <button onClick={() => registrarDose(pet.id, remedio.id)}>
                        Registrar Dose
                      </button>
                    </div>

                    {/* Histórico de doses */}
                    <div>
                      <h4 className="text-sm font-semibold m1">
                        📅 Histórico de Doses:{' '}
                      </h4>
                      <ul className="space-y-1">
                        {remedio.doses.map((dose, index) => (
                          <li
                            key={index}
                            className={`text-xs px-2 py-1 rounded ${
                              index === remedio.doses.length - 1
                                ? 'bg-green-500 text-white font-bold'
                                : 'bg-white/50 text-black'
                            }`}
                          >
                            💉 Dose {index + 1}-
                            {new Date(dose.dataHora).toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    </div>
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
