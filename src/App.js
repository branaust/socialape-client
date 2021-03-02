import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import styles from './styles/MuiThemeStyles'
import jwtDecode from 'jwt-decode'

// Componenets
import Navbar from './components/Navbar'
import AuthRoute from './components/AuthRoute'

// Pages
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'

const theme = createMuiTheme(styles)

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute path="/signup" component={Signup} authenticated={authenticated} />
              <AuthRoute path="/login" component={Login} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
