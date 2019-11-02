import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

import Libros from './components/Libros/Libros';
import MostrarLibro from './components/Libros/MostrarLibro';
import EditarLibro from './components/Libros/EditarLibro';
import NuevoLibro from './components/Libros/NuevoLibro';
import PrestamoLibro from './components/Libros/PrestamoLibro';


import Suscriptores from "./components/suscriptores/Suscriptores";
import MostrarSuscriptor from "./components/suscriptores/MostrarSuscriptor";
import NuevoSuscriptor from "./components/suscriptores/NuevoSuscriptor";
import EditarSuscriptor from "./components/suscriptores/EditarSuscriptor";

import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>

            <Route exact path="/" component={Libros} />
            <Route exact path="/libros/mostrar/:id" component={MostrarLibro}/>
            <Route exact path="/libros/nuevo" component={NuevoLibro} />
            <Route exact path="/libros/editar/:id" component={EditarLibro} />
            <Route exact path="/libros/prestamo/:id" component={PrestamoLibro} />

            <Route exact path="/suscriptores" component={Suscriptores} />
            <Route
              exact
              path="/suscriptores/nuevo"
              component={NuevoSuscriptor}
            />
            <Route
              exact
              path="/suscriptores/mostrar/:id"
              component={MostrarSuscriptor}
            />
            <Route
              exact
              path="/suscriptores/editar/:id"
              component={EditarSuscriptor}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
