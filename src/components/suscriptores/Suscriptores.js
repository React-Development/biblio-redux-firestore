import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import Spinner from "../layout/Spinner";

const Suscriptores = ({ suscriptores, firestore }) => {
  if (!suscriptores) return <Spinner />;
  //   console.log(suscriptores);

//   console.log(firestore);
  

  // Eliminar suscriptores
  const eliminarSuscriptor = (id) => {
    // console.log(`Eliminando... ${id}`);
    firestore.delete({
        collection: 'suscriptores',
        doc: id
    });
    // .then(history.push('/suscriptores'));

  };

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to="/suscriptores/nuevo" className="btn btn-primary">
          <i className="fas fa-plus"></i> Nuevo Suscriptor
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-users"></i> Suscriptores
        </h2>
      </div>

      <table className="table table-striped mt-4 text-center">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscriptores.map(suscriptor => (
            <tr key={suscriptor.id}>
              <td>
                {suscriptor.nombre} {suscriptor.apellido}
              </td>
              <td>{suscriptor.carrera}</td>
              <td>
                <Link
                  to={`/suscriptores/mostrar/${suscriptor.id}`}
                  className="btn btn-success btn-block"
                >
                  <i className="fas fa-angle-double-right"></i> Más información
                </Link>
                <button 
                    type="button" 
                    className="btn btn-danger btn-block"
                    onClick={()=> eliminarSuscriptor(suscriptor.id)}    
                >
                  <i className="fas fa-trash-alt"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Suscriptores.propTypes = {
    firestore: PropTypes.object.isRequired,
    suscriptores : PropTypes.array
}

export default compose(
  /* Estos dos son potenciadores del store */

  // Se especifica a que coleccion conectarse
  firestoreConnect([{ collection: "suscriptores" }]),
  // Conecta un componente con el store de redux
  connect((state, props) => ({
    suscriptores: state.firestore.ordered.suscriptores
  }))
)(Suscriptores);
