import React, { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";

class filtro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Tipo: "Tipo de filtro",

      Valor: "",

      listas: this.props.lista,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.Tipo == "Tipo de filtro" || this.state.Valor == "") {
      alert("Rellene todos los campos para enviar la informacion");
    } else {
      var lista = document.getElementById("filtro");

      lista.insertAdjacentHTML(
        "beforeend",
        "<th><b>Tipo de Identificacion</b></th>" +
          "-----" +
          "<th><b>Identificacion</b></th>" +
          "-----" +
          "<th><b>Nombres</b></th>" +
          "-----" +
          "<th><b>Apellidos</b></th>" +
          "-----" +
          "<th><b>Correo</b></th>" +
          "-----" +
          "<th><b>Fecha de registro</b></th><br>"
      );
      console.log(this.state.Tipo);
      this.props.lista.map((cliente) => {
        if (cliente[this.state.Tipo] == this.state.Valor) {
          console.log(cliente.Nombres);

          lista.insertAdjacentHTML(
            "beforeend",
            "<td>" +
              cliente.TipoID +
              "</td>-----<td>" +
              cliente.Identificacion +
              "</td>-----<td>" +
              cliente.Nombres +
              "</td>-----<td>" +
              cliente.Apellidos +
              "</td>-----<td>" +
              cliente.Email +
              "</td>-----<td>" +
              cliente.Fecha +
              "</td><br>"
          );
        }
      });

      window.scrollTo(100, 1090);
    }
  }

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossorigin="anonymous"
        ></link>
        <body>
          <center>
            <div className="filtro" id="filtro">
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label for="Tipo">Tipo de filtro</label>
                  <select
                    id="Tipo"
                    class="form-control"
                    name="Tipo"
                    value={this.state.Tipo}
                    onChange={this.handleChange}
                  >
                    <option disabled selected>
                      Tipo de filtro
                    </option>
                    <option>Nombres</option>
                    <option>TipoID</option>
                    <option>Identificacion</option>
                    <option>Apellidos</option>
                    <option>Email</option>
                    <option>Fecha</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="Valor">Valor a filtrar</label>
                  <input
                    type="text"
                    class="form-control"
                    id="Valor"
                    maxlength="30"
                    name="Valor"
                    placeholder="Valor"
                    value={this.state.Valor}
                    onChange={this.handleChange}
                  ></input>
                </div>

                <button type="submit" class="btn btn-primary mb-2">
                  Enviar
                </button>
              </form>
            </div>
          </center>
          <script
            src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
            integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
            integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
            crossorigin="anonymous"
          ></script>
        </body>
      </>
    );
  }
}
export default filtro;
