import './App.css';
import { Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import styles from './styles/MuiThemeStyles'

// Contexts
import { AuthProvider } from './contexts/AuthContext'
import history from './history'

// Componenets
import Navbar from './components/Navbar'
import PrivateRoute from './util/PrivateRoute'
import AuthRoute from './util/AuthRoute'

// Pages
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'


const theme = createMuiTheme(styles)


function App() {
  return (
    <AuthProvider>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute path="/signup" component={Signup} />
              <AuthRoute path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </AuthProvider>
  );
}

export default App;
