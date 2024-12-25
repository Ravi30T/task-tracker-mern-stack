import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login';
import Signup from './components/Signup'
import Home from './components/Home';

import './App.css';

const App = () => {
  return(
    <Switch>
      <Route exact path = "/login" component={Login} />
      <Route exact path = "/signup" component={Signup} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  )
}

export default App;
