import React, { Component } from "react";
import { Link } from "react-router-dom";

class NuevoLibro extends Component {
  state = {
    titulo: "",
    ISBN: "",
    editorial: "",
    existencia: ""
  };

  // Extrae los valores del input y los coloca en el state
  leerDato = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i>
            &nbsp;&nbsp; Volver al listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i>
            &nbsp;&nbsp; Nuevo Libro
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form>
                <div className="form-group">
                  <label>Titulo: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Titulo o Nombre de Libro"
                    required
                    value={this.state.titulo}
                    onChange={this.leerDato}
                  />
                </div>
                <div className="form-group">
                  <label>ISBN: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN del Libro"
                    required
                    value={this.state.ISBN}
                    onChange={this.leerDato}
                  />
                </div>
                <div className="form-group">
                  <label>Editorial: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial del Libro"
                    required
                    value={this.state.editorial}
                    onChange={this.leerDato}
                  />
                </div>
                <div className="form-group">
                  <label>Existencia: </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="existencia"
                    placeholder="Cantidad en Existencia"
                    required
                    value={this.state.existencia}
                    onChange={this.leerDato}
                  />
                </div>

                <input type="submit" value="Agregar Libro" className="btn btn-success" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NuevoLibro;
