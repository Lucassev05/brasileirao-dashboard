import React from "react";
import Header from "./components/header/header";
import TabelaClassificacao from "./components/classificacao/classificacao";
import TabelaRodada from "./components/rodada/rodada";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <div className="conteudo">
          <TabelaClassificacao />
          <TabelaRodada />
        </div>
      </div>
    </div>
  );
}

export default App;
