import React from "react";
import "./rodada.css";
import { arrow_left, arrow_right, edit, confirm } from "../../assets/index";

const TabelaRodada = (props) => {
  const [rodada, setRodada] = React.useState(1);
  const [tabelaRodada, setTabelaRodada] = React.useState([]);
  const [novaTabelaRodada, setNovaTabelaRodada] = React.useState([]);
  const [linhaEditavel, setLinhaEditavel] = React.useState(null);
  const [golCasa, setGolCasa] = React.useState(null);
  const [golVisitante, setGolVisitante] = React.useState(null);
  const [edicao, setEdicao] = React.useState("edicao");
  const [idEvento, setIdEvento] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:8081/jogos/1")
      .then((res) => res.json())
      .then((dados) => {
        setTabelaRodada(dados.dados);
        setNovaTabelaRodada(dados.dados);
      });
  }, []);

  const atualizarTabela = (rodada) => {
    fetch(`http://localhost:8081/jogos/${rodada}`)
      .then((res) => res.json())
      .then((dados) => {
        setTabelaRodada(dados.dados);
        setNovaTabelaRodada(dados.dados);
      });
  };

  const editarPartida = (element, estado) => {
    setLinhaEditavel(element.id);
    console.log(element.id);
    setGolCasa(element.childNodes[1].innerText);
    setGolCasa(element.childNodes[3].innerText);
    if (estado === "confirm") {
      setEdicao("confirm");

      fetch("http://localhost:8081/jogos", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          id: parseInt(element.id),
          golsCasa: parseInt(element.childNodes[1].innerText),
          golsVisitante: parseInt(element.childNodes[3].innerText),
        }),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setEdicao("edicao");
    }
  };

  // const insertInput = () => {
  //   {linhaEditavel==}(
  //                   <input
  //                     className="gols-visitante"
  //                     value={element.gols_visitante}
  //                     type="number"
  //                   />
  //                 )
  // }

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
              <tr id={element.id} key={element.id}>
                <td>
                  <div className="time">
                    <div>{element.time_casa}</div>
                    <img src={element.brasao_casa} alt="img" />{" "}
                  </div>
                </td>

                <td className="pontuacao">
                  {props.token == "" ? element.gols_casa : element.gols_casa}
                  {/* <input
                      className="gols-casa"
                      value={novaTabelaRodada[index].gols_casa}
                      onChange={(event) => {
                        const tabelaNova = novaTabelaRodada;
                        tabelaNova[index].gols_casa = event.target.value;
                        setNovaTabelaRodada(tabelaNova);
                      }}
                      type="number"
                    /> */}
                </td>
                <td>x</td>
                <td className="pontuacao">
                  {props.token == ""
                    ? element.gols_visitante
                    : element.gols_visitante}
                </td>
                {/* "{ insertInput }" */}
                <td>
                  <div className="time">
                    {element.time_visitante}
                    <img src={element.brasao_visitante} alt="img" />{" "}
                  </div>
                </td>
                {props.token != "" ? (
                  <td>
                    {" "}
                    <img
                      className="img-editar"
                      src={edicao === "edicao" ? edit : confirm}
                      alt="editar"
                      onClick={(event) => {
                        setIdEvento(
                          event.target.parentElement.parentElement.id
                        );
                        edicao === "edicao"
                          ? editarPartida(
                              event.target.parentElement.parentElement,
                              "confirm"
                            )
                          : editarPartida(
                              event.target.parentElement.parentElement,
                              "edicao"
                            );
                      }}
                    />
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
