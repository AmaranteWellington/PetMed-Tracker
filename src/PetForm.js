import React, { useState } from 'react';

function PetForm({ onAddPet }) {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    //criar objeto pet
    const novoPet = {
      id: Date.now().toString(), // pra ter um id único
      nome,
      especie,
      remedios: [],
    };
    // Chama a função enviada pelo App para salvar o pet
    onAddPet(novoPet);
    //limpa o formulario
    setNome('');
    setEspecie('');
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-md mb-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-white"> 🐾Cadastrar Animal</h2>
      <input
        type="text"
        placeholder="Nome do Animal"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className="w-full p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Espécie (ex:Gato ou Cachorro)"
        value={especie}
        onChange={(e) => setEspecie(e.target.value)}
        required
        className="w-full p-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
      >
        Cadastrar
      </button>
    </form>
  );
}

export default PetForm;
