import React, { useState, component, useEffect } from "react";

import "./App.css";
import axios from "axios";
import ExportExcel from "react-export-excel";

const ExcelFile = ExportExcel.ExcelFile;
const Excelsheet = ExportExcel.Excelsheet;
const Excelcol = ExportExcel.Excelcol;

function App() {
  const [lista, setLista] = useState([]);

  const listar = async () => {
    let vector = [];
    try {
      const snapshot = await axios.get("http://localhost:3020/clientes/");
      console.log(snapshot.data.data);

      snapshot.data.data.forEach((doc) => {
        //console.log(doc.data().Nombres)
        console.log("entra");
        let obj = {
          id: doc.codigo,
          TipoID: doc.TipoID,
          Identificacion: doc.Identificacion,
          Email: doc.Email,
          Nombres: doc.Nombres,
          Apellidos: doc.Apellidos,
          Fecha: doc.Fecha,
        };
        vector.push(obj);
        //console.log(obj)
        /*  setIdentificador(doc.id);
          setTelefono(doc.data().Telefono);
          setEmail(doc.data().Correo);
          setNombre(doc.data().Nombre); */
      });
      setLista(vector);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        crossorigin="anonymous"
      ></link>
      <header className="App-header">
        <img
          src="https://lh3.googleusercontent.com/proxy/D5LX74CSwix0S7YO2WkPTfTi_33M7ojTnt2yvwPTwE1gRHFqpYB7Gm2Df6JTnMLU_9yisq9rLutJfA1coEBjHEap6w2iBzp7zMl0LqBgAl3bX8kVLw"
          className="App-logo"
          alt="logo"
        />
      </header>
      <div className="col"></div>
      <div className="tabla">
        <table class="table">
          <center>
            <thead>
              <tr>
                <th scope="col">Tipo de Identificacion</th>
                <th scope="col">Identificacion</th>
                <th scope="col">Nombres</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Correo</th>
                <th scope="col">Fecha de registro</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((cliente) => (
                <tr>
                  <td>{cliente.TipoID}</td>
                  <td>{cliente.Identificacion}</td>
                  <td>{cliente.Nombres}</td>
                  <td>{cliente.Apellidos}</td>
                  <td>{cliente.Email}</td>
                  <td>{cliente.Fecha}</td>
                </tr>
              ))}
            </tbody>
          </center>
        </table>
      </div>
      <ExcelFile element={<center><button class="btn btn-primary">Exportar a excel</button></center>} filename="Clientes">
                <Excelsheet data={lista} name="Clientes">

                <Excelcol label="Tipo de Identificacion" value="TipoID"/>
                <Excelcol label="Identificacion" value="Identificacion"/>
                <Excelcol label="Nombres" value="Nombres"/>
                <Excelcol label="Apellidos" value="Apellidos"/>
                <Excelcol label="Email" value="Email"/>
                <Excelcol label="Fecha" value="Fecha"/>
                 
                </Excelsheet>

      </ExcelFile>
    </div>
  );
}

export default App;
