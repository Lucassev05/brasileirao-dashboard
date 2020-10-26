import React from "react";
import { Table } from "@material-ui/core";
import { arrow_up, arrow_down, sort } from "../../assets/index";

import "./classificacao.css";

const TabelaClassificacao = (props) => {
  const [classificacao, setClassificacao] = React.useState([]);
  const [colunaDeOrdenacao, setColunaDeOrdenacao] = React.useState(
    "classificacao"
  );
  const [ascOuDesc, setAscOuDesc] = React.useState("desc");

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
            <th>
              Classificação{" "}
              <HeaderOrdenacao
                colunaDeOrdenacao={colunaDeOrdenacao}
                setColunaDeOrdenacao={setColunaDeOrdenacao}
                ascOuDesc={ascOuDesc}
                classificacao={classificacao}
                setClassificacao={setClassificacao}
                setAscOuDesc={setAscOuDesc}
                titulo="classificacao"
              />
            </th>
            <th>
              PTS{" "}
              <HeaderOrdenacao
                colunaDeOrdenacao={colunaDeOrdenacao}
                setColunaDeOrdenacao={setColunaDeOrdenacao}
                ascOuDesc={ascOuDesc}
                setAscOuDesc={setAscOuDesc}
                classificacao={classificacao}
                setClassificacao={setClassificacao}
                titulo="pts"
              />
            </th>
            <th>
              E{" "}
              <HeaderOrdenacao
                colunaDeOrdenacao={colunaDeOrdenacao}
                setColunaDeOrdenacao={setColunaDeOrdenacao}
                ascOuDesc={ascOuDesc}
                setAscOuDesc={setAscOuDesc}
                classificacao={classificacao}
                setClassificacao={setClassificacao}
                titulo="e"
              />
            </th>
            <th>
              V{" "}
              <HeaderOrdenacao
                colunaDeOrdenacao={colunaDeOrdenacao}
                setColunaDeOrdenacao={setColunaDeOrdenacao}
                ascOuDesc={ascOuDesc}
                setAscOuDesc={setAscOuDesc}
                classificacao={classificacao}
                setClassificacao={setClassificacao}
                titulo="v"
              />
            </th>
            <th>
              D{" "}
              <HeaderOrdenacao
                colunaDeOrdenacao={colunaDeOrdenacao}
                setColunaDeOrdenacao={setColunaDeOrdenacao}
                ascOuDesc={ascOuDesc}
                setAscOuDesc={setAscOuDesc}
                classificacao={classificacao}
                setClassificacao={setClassificacao}
                titulo="d"
              />
            </th>
            <th>
              GF{" "}
              <HeaderOrdenacao
                colunaDeOrdenacao={colunaDeOrdenacao}
                setColunaDeOrdenacao={setColunaDeOrdenacao}
                ascOuDesc={ascOuDesc}
                setAscOuDesc={setAscOuDesc}
                classificacao={classificacao}
                setClassificacao={setClassificacao}
                titulo="gf"
              />
            </th>
            <th>
              GS{" "}
              <HeaderOrdenacao
                colunaDeOrdenacao={colunaDeOrdenacao}
                setColunaDeOrdenacao={setColunaDeOrdenacao}
                ascOuDesc={ascOuDesc}
                setAscOuDesc={setAscOuDesc}
                classificacao={classificacao}
                setClassificacao={setClassificacao}
                titulo="gs"
              />
            </th>
            <th>
              SG{" "}
              <HeaderOrdenacao
                colunaDeOrdenacao={colunaDeOrdenacao}
                setColunaDeOrdenacao={setColunaDeOrdenacao}
                ascOuDesc={ascOuDesc}
                setAscOuDesc={setAscOuDesc}
                classificacao={classificacao}
                setClassificacao={setClassificacao}
                titulo="sg"
              />
            </th>
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

const HeaderOrdenacao = (props) => {
  const ordernarTabela = async (ordenacao, titulo) => {
    let ordenacaoAtual = "";

    if (ordenacao === "desc") {
      props.setAscOuDesc("desc");
      ordenacaoAtual = "desc";
    } else {
      props.setAscOuDesc("asc");
      ordenacaoAtual = "asc";
    }

    const novaTabela = props.classificacao;
    if (titulo === "classificacao") {
      //ordena asc
      await novaTabela.sort((a, b) => {
        const saldoGolsA = a.golsFeitos - a.golsSofridos;
        const saldoGolsB = b.golsFeitos - b.golsSofridos;
        const empatePontos = a.pontos === b.pontos;
        const empateVitorias = a.vitorias === b.vitorias;
        const empateSaldoGols = saldoGolsA === saldoGolsB;
        const empateGolsFeitos = a.golsFeitos === b.golsFeitos;

        if (empatePontos) {
          if (empateVitorias) {
            if (empateSaldoGols) {
              if (empateGolsFeitos) {
                return a.nome.localeCompare(b.nome);
              }
              return a.golsFeitos < b.golsFeitos ? -1 : 1;
            }
            return saldoGolsA < saldoGolsB ? -1 : 1;
          }
          return a.vitorias < b.vitorias ? -1 : 1;
        }
        return a.pontos < b.pontos ? -1 : 1;
      });
    } else if (titulo === "pts") {
      //ordena asc
      await novaTabela.sort((a, b) => {
        return a.pontos < b.pontos ? -1 : 1;
      });
    } else if (titulo === "e") {
      //ordena asc
      await novaTabela.sort((a, b) => {
        return a.empates < b.empates ? -1 : 1;
      });
    } else if (titulo === "v") {
      //ordena asc
      await novaTabela.sort((a, b) => {
        return a.vitorias < b.vitorias ? -1 : 1;
      });
    } else if (titulo === "d") {
      //ordena asc
      await novaTabela.sort((a, b) => {
        return a.derrotas < b.derrotas ? -1 : 1;
      });
    } else if (titulo === "gf") {
      //ordena asc golsFeitos
      await novaTabela.sort((a, b) => {
        return a.golsFeitos < b.golsFeitos ? -1 : 1;
      });
    } else if (titulo === "gs") {
      //ordena asc golsSofridos
      await novaTabela.sort((a, b) => {
        return a.golsSofridos < b.golsSofridos ? -1 : 1;
      });
    } else if (titulo === "sg") {
      //ordena asc element.golsFeitos - element.golsSofridos
      await novaTabela.sort((a, b) => {
        return a.golsFeitos - a.golsSofridos < b.golsFeitos - b.golsSofridos
          ? -1
          : 1;
      });
    }

    if (ordenacaoAtual === "desc") {
      await novaTabela.reverse();

      let novaTabela1 = novaTabela.map((element) => element);

      return props.setClassificacao(novaTabela1);
    }
    let novaTabela2 = novaTabela.map((element) => element);
    return props.setClassificacao(novaTabela2);
  };

  return (
    <img
      src={
        props.colunaDeOrdenacao === props.titulo
          ? props.ascOuDesc === "desc"
            ? arrow_down
            : arrow_up
          : sort
      }
      alt=""
      onClick={() => {
        props.setColunaDeOrdenacao(props.titulo);
        props.colunaDeOrdenacao === props.titulo
          ? props.ascOuDesc === "asc"
            ? ordernarTabela("desc", props.titulo)
            : ordernarTabela("asc", props.titulo)
          : ordernarTabela("desc", props.titulo);
      }}
    />
  );
};

export default TabelaClassificacao;
