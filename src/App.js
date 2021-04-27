import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function App() {
  const baseUrl = 'http://localhost:8080'
  const [funcionarios, setFuncionarios] = useState([])
  const toCSV = () => {
    let text = '';
    funcionarios.map(funcionario => {
      if (funcionario.cuenta.banco === 'Banco Continental S.A.E.C.A.') {
        text += `${funcionario.cedula}, ${funcionario.cuenta.cuenta}, SALARIO MES DE ${(new Date()
        ).toLocaleString('es', { month: 'long' }).toUpperCase()} ${(new Date()).getFullYear()} ${funcionario.salarioACobrar}.00, NO\n`
      }
    })
    console.log(text)
    return text
  }
  const download = (event) => {
    event.preventDefault();
    // Prepare the file
    let output;
    output = toCSV()
    // Download it
    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = fileDownloadUrl;
    a.download = 'continental.txt';
    a.click();
  }
  useEffect(async () => {
    axios.get(`${baseUrl}/api/test/read`).then(res => setFuncionarios(res.data))
  }, [])
  console.log(funcionarios)
  return (
    <div className="App">
      <ExcelFile element={<button onClick={download}>Descargar Datos</button>} filename="sudameris">
        <ExcelSheet data={funcionarios.filter(funcionario => funcionario.cuenta.banco === "Sudameris Bank S.A.E.C.A.")} name='funcionarios'>
          <ExcelColumn
            value="cedula"
          />
          <ExcelColumn
            value="salarioACobrar"
          />
        </ExcelSheet>
      </ExcelFile>
    </div>
  );
}

export default App;
