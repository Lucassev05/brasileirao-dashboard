import React from "react";
import { Table } from "@material-ui/core";

import "./classificacao.css";

const TabelaClassificacao = (props) => {
  const [classificacao, setClassificacao] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8081/classificacao")
      .then((res) => res.json())
      .then((dados) => {
        setClassificacao(dados.dados);
      });
  }, []);

  return (
    <div className="tabela">
      <table>
        <thead>
          <tr key="0">
            <th>Classificação</th>
            <th>PTS</th>
            <th>E</th>
            <th>V</th>
            <th>D</th>
            <th>GF</th>
            <th>GS</th>
            <th>SG</th>
          </tr>
        </thead>
        <tbody>
          {classificacao.map((element, index) => {
            return (
              <tr key={index + 1}>
                <td>
                  <div className="conteudo-td">
                    {index < 9 ? "0" + (index + 1) : index + 1}º{" "}
                    <div>
                      <img src={element.brasao} alt="img" /> {element.nome}
                    </div>
                  </div>
                </td>
                <td>{element.pontos}</td>
                <td>{element.empates}</td>
                <td>{element.vitorias}</td>
                <td>{element.derrotas}</td>
                <td>{element.golsFeitos}</td>
                <td>{element.golsSofridos}</td>
                <td>{element.golsFeitos - element.golsSofridos}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaClassificacao;
