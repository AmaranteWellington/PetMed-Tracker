import React, { useState } from 'react';
function RemedioForm({ onAddRemedio, petId }) {
  const [nome, setNome] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [frequencia, setFrequencia] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoRemedio = {
      id: Date.now().toString(),
      nome,
      dosagem,
      frequencia,
      doses: [],
    };
    onAddRemedio(petId, novoRemedio);
    setNome('');
    setDosagem('');
    setFrequencia('');
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md mb-6 space-y-4"
    >
      <h4 className="text-lg font-semibold text-white">💊Adicionar Remédio</h4>
      <input
        type="text"
        placeholder="Nome do remédio"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="w-full p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="text"
        placeholder="Dosagem"
        value={dosagem}
        onChange={(e) => setDosagem(e.target.value)}
        required
        className="w-full p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="text"
        placeholder="Frequência"
        value={frequencia}
        onChange={(e) => setFrequencia(e.target.value)}
        required
        className="w-full p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
      >
        Salvar Rémedio
      </button>
    </form>
  );
}

export default RemedioForm;
