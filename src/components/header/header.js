import React from "react";
import "./header.css";

const Header = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="menu">
      <div className="conteudo">
        <h1>Brasileirão</h1>
        <div className="login">
          <label className="email">
            Email
            <input
              onInput={(event) => setEmail(event.target.value)}
              value={email}
              type="email"
            />
          </label>
          <label className="senha">
            Senha
            <input
              onInput={(event) => setPassword(event.target.value)}
              value={password}
              type="password"
            />
          </label>
          <button
            onClick={() =>
              props.realizarLogin({
                email: email,
                password: password,
              })
            }
          >
            Logar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
