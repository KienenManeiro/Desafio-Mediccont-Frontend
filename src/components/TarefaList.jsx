//listagem e ações
import React, { useState } from "react";
import "./TarefaList.css";
import moment from "moment";

const TarefaList = ({ tarefas, onDelete, onEdit }) => {
  const [hover, setHover] = useState(-1); //estudar mais a funcionalidade de hooks
  function deleteButton(tarefa) {
    console.log(tarefa);
    onDelete(tarefa.id);
  }
  return (
    <div className="tarefa-list">
      <h2>Lista de Tarefas</h2>
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa, index) => (
            <li
              key={index}
              onMouseEnter={(e) => setHover(index)}
              onMouseLeave={(e) => setHover(-1)}
            >
              <span>
                {" "}
                {moment(tarefa.dataInicial).utc().format("DD/MM/YYYY")}{" "}
              </span>
              <span>
                {tarefa.tarefa} - {tarefa.status}
              </span>
              {hover === index && <span>{tarefa.observacao} </span>}
              <div className="btns">
                <button onClick={() => onEdit(tarefa)}>Editar</button>
                <button onClick={() => deleteButton(tarefa)}>Deletar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TarefaList;
