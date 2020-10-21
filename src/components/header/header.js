import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="menu">
      <div className="conteudo">
        <h1>Brasileirão</h1>
        <div className="login">
          <label className="email">
            Email
            <input type="text" />
          </label>
          <label className="senha">
            Senha
            <input type="text" />
          </label>
          <button>Logar</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
