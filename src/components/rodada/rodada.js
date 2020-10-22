import React from "react";
import "./rodada.css";
import { arrow_left, arrow_right } from "../../assets/index";

const TabelaRodada = (props) => {
  const [rodada, setRodada] = React.useState(1);
  const [tabelaRodada, setTabelaRodada] = React.useState([]);

  React.useEffect(() => {
    fetch("https://desafio-3-back-cubos-academy.herokuapp.com/jogos/1")
      .then((res) => res.json())
      .then((dados) => {
        setTabelaRodada(dados.dados);
      });
  }, []);

  const atualizarTabela = (rodada) => {
    fetch(`https://desafio-3-back-cubos-academy.herokuapp.com/jogos/${rodada}`)
      .then((res) => res.json())
      .then((dados) => {
        setTabelaRodada(dados.dados);
      });
  };

  return (
    <div className="rodada">
      <table>
        <thead>
          <tr key="0">
            <th colSpan="5">
              <div className="cabecalho">
                <img
                  src={arrow_left}
                  alt="voltar"
                  onClick={() => {
                    if (rodada > 1) {
                      setRodada(rodada - 1);
                      atualizarTabela(rodada - 1);
                    }
                  }}
                />
                {rodada}ª rodada
                <img
                  src={arrow_right}
                  alt="proxima"
                  onClick={() => {
                    if (rodada < 38) {
                      setRodada(rodada + 1);
                      atualizarTabela(rodada + 1);
                    }
                  }}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tabelaRodada.map((element, index) => {
            return (
              <tr key={index + 1}>
                <td>
                  <div className="time">
                    <div>{element.time_casa}</div>
                    <img
                      src="https://e.imguol.com/futebol/brasoes/40x40/internacional.png"
                      alt="img"
                    />{" "}
                  </div>
                </td>

                <td className="pontuacao">{element.gols_casa}</td>
                <td>x</td>
                <td className="pontuacao">{element.gols_visitante}</td>
                <td>
                  <div className="time">
                    {element.time_visitante}
                    <img
                      src="https://e.imguol.com/futebol/brasoes/40x40/internacional.png"
                      alt="img"
                    />{" "}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaRodada;
