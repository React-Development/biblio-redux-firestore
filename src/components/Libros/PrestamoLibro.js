import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";
import FichaSuscriptor from "../suscriptores/FichaSuscriptor";
// import Swal from "sweetalert2";

class PrestamoLibro extends Component {
  state = {
    noResultados: false,
    busqueda: "",
    resultado: {}
  };

  // Buscar alumno por codigo
  leerDato = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Almacenar el codigo en el state
  buscarAlumno = e => {
    e.preventDefault();

    // obtener el valor a buscar
    const { busqueda } = this.state;

    // extraer firestore
    const { firestore } = this.props;

    // hacer la  consulta
    const coleccion = firestore.collection("suscriptores");
    const consulta = coleccion.where("codigo", "==", busqueda).get();

    // leer los resultados
    consulta.then(response => {
      if (response.empty) {
        // no hay resultados
        this.setState({
          noResultados: true,
          resultado: {}
        });
      } else {
        const datos = response.docs[0];
        console.log(datos.data());
        this.setState({
          resultado: datos.data(),
          noResultados: false
        });
        // console.log(response);
      }
    });
  };

  render() {
    // Extraer el libro
    const { libro } = this.props;

    if (!libro) return <Spinner />;

    // extraer los  datos del alumno
    const { noResultados, resultado } = this.state;

    let fichaAlumno, btnSolicitar;

    if (resultado.nombre) {
      fichaAlumno = <FichaSuscriptor alumno={resultado} />;
      btnSolicitar = (
        <button
          type="button"
          className="btn btn-primary btn-block mb-3"
          onClick={this.solicitarPrestamo}
        >
          Solicitar Prestamo
        </button>
      );
    } else {
      fichaAlumno = null;
      btnSolicitar = null;
    }

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> {""}
            {""}
            Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> {""}
            Solicitar Prestamo: {libro.titulo}
          </h2>
          <div className="row justify-content-center mt-5">
            <div className="col-md-8">
              <form onSubmit={this.buscarAlumno} className="mb-4">
                <legend className="color-primary text-center">
                  Busca el Suscriptor por Código
                </legend>

                <div className="form-group">
                  <input
                    type="text"
                    name="busqueda"
                    className="form-control"
                    onChange={this.leerDato}
                  />
                </div>
                <input
                  type="submit"
                  value="Buscar Alumno"
                  className="btn btn-success btn-block"
                />
              </form>
              {/* Muestra la ficha del alumno y el boton para solicitar el prestamo */}
              {fichaAlumno}
              {btnSolicitar}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrestamoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(PrestamoLibro);
