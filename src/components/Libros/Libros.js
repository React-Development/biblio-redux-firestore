import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";
import Swal from "sweetalert2";

const Libros = ({ libros, firestore }) => {
  if (!libros) return <Spinner />;

  // Eliminar libro
  const eliminarLibro = id => {
    Swal.fire({
      title: "Estás seguro/a?",
      text: "No podrás revertir este cambio!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimínalo!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
        firestore.delete({
          collection: "libros",
          doc: id
        });
      }
    });
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/libros/nuevo" className="btn btn-success">
          <i className="fas fa-plus"></i> {""}
          Nuevo Libro
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-book"></i> {""}
          Libros
        </h2>
      </div>
      <table className="table table-striped mt-4 text-center">
        <thead className="text-light bg-primary">
          <tr>
            <th>Titulo</th>
            <th>ISBN</th>
            <th>Editorial</th>
            <th>Existencia</th>
            <th>Disponibles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro.id}>
              <td>{libro.titulo}</td>
              <td>{libro.ISBN}</td>
              <td>{libro.editorial}</td>
              <td>{libro.existencia}</td>
              <td>{libro.existencia - libro.prestados.length}</td>
              <td>
                <Link
                  to={`/libros/mostrar/${libro.id}`}
                  className="btn btn-success btn-block"
                >
                  <i className="fas fa-angle-double-right"></i> &nbsp; Más
                  información
                </Link>
                <button
                  type="button"
                  className="btn btn-danger btn-block"
                  onClick={eliminarLibro.bind(this, libro.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                  &nbsp;&nbsp;Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Libros.propTypes = {
  firestore: PropTypes.object.isRequired,
  libros: PropTypes.array
};

export default compose(
  /* Estos dos son potenciadores del store */

  // Se especifica a que coleccion conectarse
  firestoreConnect([{ collection: "libros" }]),
  // Conecta un componente con el store de redux
  connect((state, props) => ({
    libros: state.firestore.ordered.libros
  }))
)(Libros);
