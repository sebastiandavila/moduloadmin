import React, { useState, component, useEffect } from "react";

import "./App.css";
import axios from "axios";
import ExportExcel from "react-export-excel";
import Filtro from "./filtro"

const ExcelFile = ExportExcel.ExcelFile;
const Excelsheet = ExportExcel.Excelsheet;
const Excelcol = ExportExcel.Excelcol;

function App() {


  const [lista, setLista] = useState([]);

  const listar = async () => {
    let vector = [];
    try {
      const snapshot = await axios.get("http://localhost:3020/clientes/");
      

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
          src="http://obvio.com.co/contenidos/uploads/2017/03/logo-obvio.png"
          className="App-logo"
          alt="logo"
        />
      </header>
      
      <div className="tabla">
        <table className="flatTable">
          <center>
            <thead>
              <tr class="headingTr">
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
      <br></br>
      <ExcelFile element={<center><button class="btn btn-outline-success" >Exportar a excel</button></center>} filename="Clientes">
                <Excelsheet data={lista} name="Clientes">

                <Excelcol label="Tipo de Identificacion" value="TipoID"/>
                <Excelcol label="Identificacion" value="Identificacion"/>
                <Excelcol label="Nombres" value="Nombres"/>
                <Excelcol label="Apellidos" value="Apellidos"/>
                <Excelcol label="Email" value="Email"/>
                <Excelcol label="Fecha" value="Fecha"/>
                 
                </Excelsheet>

      </ExcelFile>

      <div className="col">
        <Filtro lista={lista}/>
      </div>
    </div>
  );
}

export default App;
