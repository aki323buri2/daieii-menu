import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Main from './containers/Main'; 
import { Tooltip, createMuiTheme, MuiThemeProvider } from '@material-ui/core'; 
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: { primary: { main: blue[800] } }, 
});
const applyTheme = element => (
  <MuiThemeProvider theme={theme}>
    {element}
  </MuiThemeProvider>
);
function App() {
  return applyTheme(
    <Router>
      <Switch>
        <Route exact path="/" component={AppLogo} />
        <Route path="/main" component={Main} />
      </Switch>
    </Router>
  );
};
const AppLogo = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Tooltip title="クリックしてください" placement="top">
          <Link to="/main">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </Tooltip>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
