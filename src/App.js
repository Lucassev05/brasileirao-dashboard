import React from "react";
import Header from "./components/header/header";
import TabelaClassificacao from "./components/classificacao/classificacao";
import TabelaRodada from "./components/rodada/rodada";
import "./App.css";

function App() {
  const [token, setToken] = React.useState("");

  const realizarLogin = (data) => {
    fetch("https://desafio-3-back-cubos-academy.herokuapp.com/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((dados) => {
        setToken(dados.dados.token);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="app">
      <Header token={token} realizarLogin={realizarLogin} />
      <div className="body">
        <div className="conteudo">
          <TabelaClassificacao />
          <TabelaRodada token={token} />
        </div>
      </div>
    </div>
  );
}

export default App;
