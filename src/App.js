import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// Pages
import Navbar from './components/Navbar'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#64b5f6',
      main: '#1976d2',
      dark: '#0d47a1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffe082',
      main: '#ffe57f',
      dark: '#ffd740',
      contrastText: '#000',
    },
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
