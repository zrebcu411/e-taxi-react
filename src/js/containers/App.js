import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import yellow from 'material-ui/colors/yellow';
import grey from 'material-ui/colors/grey';
import store from '../store/configureStore';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';
// import logo from '../../assets/logo.svg';
// import '../../styles/css/App.css';


const theme = createMuiTheme({
  palette: {
    primary: yellow,
    secondary: grey
  }
});

const App = () => (
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <div>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default App;
