import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Suscriptores from "./components/suscriptores/Suscriptores";
import MostrarSuscriptor from "./components/suscriptores/MostrarSuscriptor";
import NuevoSuscriptor from "./components/suscriptores/NuevoSuscriptor";
import EditarSuscriptor from "./components/suscriptores/EditarSuscriptor";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/suscriptores" component={Suscriptores} />
        <Route exact path="/suscriptores/nuevo" component={NuevoSuscriptor} />
        <Route exact path="/suscriptores/mostrar/:id" component={MostrarSuscriptor} />
        <Route
          exact
          path="/suscriptores/editar/:id"
          component={EditarSuscriptor}
        />
      </Switch>
    </Router>
  );
}

export default App;
