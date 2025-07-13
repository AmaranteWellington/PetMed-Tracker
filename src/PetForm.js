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
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Animal</h2>
      <input
        type="text"
        placeholder="Nome do Animal"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Espécie (ex:Gato ou Cachorro)"
        value={especie}
        onChange={(e) => setEspecie(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default PetForm;
