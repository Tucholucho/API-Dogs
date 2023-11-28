/*import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
    </div>
  );
}

export default App;
*/

import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home"
//import DogDetails from "./components/DogDetails/DogDetails";
//import FormAddDog from "./components/FormAddDog/FormAddDog";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
