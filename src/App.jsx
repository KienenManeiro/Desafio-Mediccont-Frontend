//TO-DO
//Nao selecionar status acaba nao gerando status para a tarefa criada/editada
//Ao clicar para editar uma tarefa, atualizar TarefaForm com as infos da tarefa à editar
import React, { useEffect, useState } from "react";
import TarefaForm from "./components/TarefaForm";
import TarefaList from "./components/TarefaList";
import "./App.css";
import { api } from "./services/api";

const initialTarefaEstados = {
  tarefa: "",
  status: "Pendente",
  observacao: "",
  dataInicial: "2024-10-18T03:08:09.560Z",
};

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefaEstado, setTarefaEstado] = useState(initialTarefaEstados);

  const addTarefa = async (tarefaParam) => {
    if (Object.hasOwn(tarefaEstado, "id")) {
      await api.put("", tarefaParam); //!!!!!
      const tarefasAtualizadas = tarefas.map((tarefa) =>
        tarefa.id === tarefaParam.id ? tarefaParam : tarefa
      );
      setTarefas(tarefasAtualizadas);
      setTarefaEstado(initialTarefaEstados);
    } else {
      //tarefaEdit não tem ID, receber ID do Post Request à API
      //Como tarefaEdit gera ID no BDD não possuímos ele no front
      //logo se faz necessário um request do BDD
      const response = await api.post("", tarefaParam); //!!!!! tarefaEstado!!!
      tarefaParam.id = response.data;
      setTarefas([...tarefas, tarefaParam]); //add
      console.log("tarefas add...\n");
      console.log(tarefas);
    }
  };

  const deleteTarefa = async (index) => {
    console.log("tarefas Delete...\n");
    console.log(tarefas);
    console.log(index); //Index de Tarefa recém criada chegando como undefined MajorProblem

    await api.delete(`${index}`);
    const tarefasAtualizadas = tarefas.filter((tarefa) => tarefa.id !== index);
    setTarefas(tarefasAtualizadas);
  };

  const editTarefa = (tarefa) => {
    setTarefaEstado(tarefa);
  };

  const getTarefas = async () => {
    const response = await api.get();
    console.log(response.data);
    setTarefas(response.data);
  };

  useEffect(() => {
    getTarefas();
  }, []); //[] array de dependencias

  return (
    <div className="App">
      <h1>Gerenciador de Tarefas</h1>
      <TarefaForm
        onAdd={addTarefa}
        tarefa={tarefaEstado}
        isEditing={!!Object.hasOwn(tarefaEstado, "id")}
      />
      <TarefaList
        tarefas={tarefas}
        onDelete={deleteTarefa}
        onEdit={editTarefa}
      />
    </div>
  );
}

export default App;
