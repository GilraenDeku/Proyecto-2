import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import Register from './Administrator/Register';
import Country from './Administrator/Country';
import Learning from './Administrator/Learning';
import Teaching from './Administrator/Teaching';
import WelcomePage from './Administrator/WelcomePage';
import SignInPage from './SignInPage';
import IntroPage from './IntroPage';
import WelcomeClient from './Client/WelcomeClient';
import Consulta1Page from './Client/Consulta1Page';
import Consulta2Page from './Client/Consulta2Page';
import Consulta3Page from './Client/Consulta3Page';
import Consulta4Page from './Client/Consulta4Page';
import Consulta5Page from './Client/Consulta5Page';

function App() {
  return (
      <Router>
        <Switch>
            <Route path="/Register">
                <Register />
            </Route>
            <Route path="/Country">
                <Country />
            </Route>
            <Route path="/Learning">
                <Learning />
            </Route>
            <Route path="/Teaching">
                <Teaching />
            </Route>
            <Route path="/WelcomePage">
                <WelcomePage />
            </Route>
            <Route path="/WelcomeClient">
                <WelcomeClient />
            </Route>
            <Route path="/Consulta1Page">
                <Consulta1Page />
            </Route>
            <Route path="/Consulta2Page">
                <Consulta2Page />
            </Route>
            <Route path="/Consulta3Page">
                <Consulta3Page />
            </Route>
            <Route path="/Consulta4Page">
                <Consulta4Page />
            </Route>
            <Route path="/Consulta5Page">
                <Consulta5Page />
            </Route>
            <Route path="/SignInPage">
                <SignInPage />
            </Route>
            <Route path="/">
                <IntroPage />
            </Route>
            <Route path="/IntroPage">
                <IntroPage />
            </Route>
        </Switch>
      </Router>
  );
}

export default App;
