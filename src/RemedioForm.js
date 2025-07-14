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
    <form onSubmit={handleSubmit}>
      <h4>Adicionar Remédio</h4>
      <input
        type="text"
        placeholder="Nome do remédio"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dosagem"
        value={dosagem}
        onChange={(e) => setDosagem(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Frequência"
        value={frequencia}
        onChange={(e) => setFrequencia(e.target.value)}
        required
      />
      <button type="submit">Salvar Rémedio</button>
    </form>
  );
}

export default RemedioForm;
