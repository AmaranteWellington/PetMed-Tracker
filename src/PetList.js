import React from 'react';
import RemedioForm from './RemedioForm';

function PetList({
  pets,
  excluirPet,
  adicionarRemedioAoPet,
  registrarDose,
  removerDose,
}) {
  return (
    <ul className="space-y-6">
      {pets.map((pet, petIndex) => (
        <li
          key={pet.id}
          className="bg-white bg-opacity-20 rounded-lg p-4 shadow-lg"
        >
          <div className="flex justify-between items-center">
            <strong className="text-xl">{pet.nome}</strong> ({pet.especie})
            <button
              onClick={() => excluirPet(pet.id)}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-semibold transition"
            >
              Excluir
            </button>
          </div>
          <p className="italic">{pet.especie}</p>

          <RemedioForm petId={pet.id} onAddRemedio={adicionarRemedioAoPet} />

          {pet.remedios.length > 0 && (
            <ul className="mt-4 space-y-3">
              {pet.remedios.map((remedio, remedioIndex) => (
                <li
                  key={remedio.id}
                  className="bg-white bg-opacity-30 rounded p-3 shadow-inner"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      💊 <strong>{remedio.nome}</strong> - {remedio.dosagem} -{' '}
                      {remedio.frequencia}
                    </div>
                    <button
                      onClick={() => registrarDose(pet.id, remedio.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-semibold transition"
                    >
                      Registrar Dose
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold m1">
                      📅 Histórico de Doses:
                    </h4>
                    <ul className="space-y-1">
                      {remedio.doses.map((dose, doseIndex) => (
                        <li
                          key={doseIndex}
                          className={`text-xs px-2 py-1 rounded flex justify-between items-center ${
                            doseIndex === remedio.doses.length - 1
                              ? 'bg-green-500 text-white font-bold'
                              : 'bg-white/50 text-black'
                          }`}
                        >
                          <span>
                            💉 Dose {doseIndex + 1} -{' '}
                            {new Date(dose.dataHora).toLocaleString()}
                          </span>
                          <button
                            onClick={() =>
                              removerDose(petIndex, remedioIndex, doseIndex)
                            }
                            className="ml-2 text-red-600 hover:underline text-[10px]"
                          >
                            Remover
                          </button>
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
  );
}

export default PetList;
