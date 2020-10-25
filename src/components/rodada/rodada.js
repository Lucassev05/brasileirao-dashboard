import React from "react";
import "./rodada.css";
import { arrow_left, arrow_right } from "../../assets/index";

const TabelaRodada = (props) => {
  const [rodada, setRodada] = React.useState(1);
  const [tabelaRodada, setTabelaRodada] = React.useState([]);
  const [novaTabelaRodada, setNovaTabelaRodada] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8081/jogos/1")
      .then((res) => res.json())
      .then((dados) => {
        setTabelaRodada(dados.dados);
        setNovaTabelaRodada(dados.dados);
      });
  }, []);

  const atualizarTabela = (rodada) => {
    console.log(rodada);
    fetch(`http://localhost:8081/jogos/${rodada}`)
      .then((res) => res.json())
      .then((dados) => {
        setTabelaRodada(dados.dados);
        setNovaTabelaRodada(dados.dados);
      });
  };

  return (
    <div className="rodada">
      <table>
        <thead>
          <tr key="0">
            <th colSpan="6">
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
                    <img src={element.brasao_casa} alt="img" />{" "}
                  </div>
                </td>

                <td className="pontuacao">
                  {props.token == "" ? (
                    element.gols_casa
                  ) : (
                    <input
                      class="gols-casa"
                      value={novaTabelaRodada[index].gols_casa}
                      onChange={(event) => {
                        const tabelaNova = novaTabelaRodada;
                        tabelaNova[index].gols_casa = event.target.value;
                        setNovaTabelaRodada(tabelaNova);
                      }}
                      type="number"
                    />
                  )}
                </td>
                <td>x</td>
                <td className="pontuacao">
                  {props.token == "" ? (
                    element.gols_visitante
                  ) : (
                    <input
                      class="gols-visitante"
                      value={element.gols_visitante}
                      type="number"
                    />
                  )}
                </td>
                <td>
                  <div className="time">
                    {element.time_visitante}
                    <img src={element.brasao_visitante} alt="img" />{" "}
                  </div>
                </td>
                {props.token != "" ? (
                  <td>
                    <button>Confirm</button>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaRodada;
