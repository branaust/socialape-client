import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


// Pages
import Navbar from './components/Navbar'
import home from './pages/home'
import signup from './pages/signup'
import login from './pages/login'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <Route path="/signup" component={signup} />
            <Route path="/login" component={login} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
