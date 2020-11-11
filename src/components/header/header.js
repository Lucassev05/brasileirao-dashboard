import React from "react";
import "./header.css";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

// const useStyles = withStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "25ch",
//       borderColor: "red",
//     },
//   },
// }));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#808080",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    multilineColor: {
      color: "red",
    },
  },
})(TextField);

const Header = (props) => {
  //   const classes = useStyles();
  return (
    <div>
      {/* <div className="login">
        <h1>Realize seu login para editar</h1>
        <form noValidate autoComplete="off">
          <CssTextField
            id="outlined-basic"
            label="E-mail"
            type="email"
            variant="outlined"
          />
          <CssTextField
            className="input"
            id="outlined-basic"
            label="Senha"
            type="password"
            variant="outlined"
          />
        </form>
      </div> */}
      <div className="header">
        <div className="content">
          <h1>Brasileirão</h1>
          <PowerSettingsNewIcon className="btn-logar" />
        </div>
      </div>
    </div>
  );
};

export default Header;
