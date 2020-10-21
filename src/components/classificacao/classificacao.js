import React from "react";
import { Table } from "@material-ui/core";

import "./classificacao.css";

const TabelaClassificacao = () => {
  const [classificacao, setClassificacao] = React.useState([]);

  React.useEffect(() => {
    fetch("https://desafio-3-back-cubos-academy.herokuapp.com/classificacao")
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
                      <img
                        src="https://e.imguol.com/futebol/brasoes/40x40/internacional.png"
                        alt="img"
                      />{" "}
                      {element.nome}
                    </div>
                  </div>
                </td>
                <td>{element.pontos}</td>
                <td>{element.empates}</td>
                <td>{element.vitorias}</td>
                <td>{element.derrotas}</td>
                <td>{element.golsFeitos}</td>
                <td>{element.golsSofridos}</td>
                <td>48</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaClassificacao;
