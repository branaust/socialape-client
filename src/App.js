import './App.css';
import { Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import styles from './styles/MuiThemeStyles'
import history from './util/history'
import axios from 'axios';

// Contexts
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'


// Componenets
import Navbar from './components/layout/Navbar'
import AuthRoute from './util/AuthRoute'

// Pages
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import User from './pages/user'



const theme = createMuiTheme(styles)

axios.defaults.baseURL = "https://us-central1-socialape-12f18.cloudfunctions.net/api"

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute path="/signup" component={Signup} />
                <AuthRoute path="/login" component={Login} />
                <Route exact path="/users/:handle" component={User} />
                <Route exact path="/users/:handle/scream/:screamId" component={User} />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
