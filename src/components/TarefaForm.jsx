//cadastra e atualiza
import React, { useState } from 'react';
import './TarefaForm.css'; // Importando o CSS específico

const TarefaForm = ({ onAdd, tarefa = { tarefa: "", status: "Pendente", observacao: "", dataInicial: "" }, isEditing }) => {
  const [nomeTarefa, setNomeTarefa] = useState(tarefa.tarefa || '');
  
  const [observacaoTarefa, setObservacaoTarefa] = useState(tarefa.observacao || '');
  
  const [status, setStatus] = useState(tarefa.status || 'Pendente');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...tarefa, tarefa: nomeTarefa, status, observacao: observacaoTarefa });
    //reset form to default
    setNomeTarefa('');
    setObservacaoTarefa('');
    setStatus('Pendente');
  };

  return (
    <form className="tarefa-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editar Tarefa' : 'Adicionar Tarefa'}</h2>
      <input
        type="text"
        placeholder="Nome da tarefa"
        value={nomeTarefa}
        onChange={(e) => setNomeTarefa(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Observações"
        value={observacaoTarefa}
        onChange={(e) => setObservacaoTarefa(e.target.value)}
      />

      <select required value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Selecione o status</option>
        <option value="Pendente">Pendente</option>
        <option value="Concluída">Concluída</option>
      </select>
      <button type="submit">{isEditing ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
};

export default TarefaForm;