import { useState } from 'react'
import equipos from './datos'
import ListaEquipos from './components/ListaEquipos'
import FormularioPartido from './components/FormularioPartido'
import Historial from './components/Historial'
import TablaPosiciones from './components/TablaPosiciones'

function App() {
  // Lista de partidos registrados (se guarda en memoria)
  const [partidos, setPartidos] = useState([])

  const agregarPartido = (partido) => {
    setPartidos([...partidos, { ...partido, id: Date.now() }])
  }

  const eliminarPartido = (id) => {
    setPartidos(partidos.filter((p) => p.id !== id))
  }

  return (
    <div className="app">
      <h1>⚽ Panel de Resultados del Torneo</h1>

      <ListaEquipos equipos={equipos} />

      <div className="columnas">
        <FormularioPartido equipos={equipos} agregarPartido={agregarPartido} />
        <TablaPosiciones equipos={equipos} partidos={partidos} />
      </div>

      <Historial equipos={equipos} partidos={partidos} eliminarPartido={eliminarPartido} />
    </div>
  )
}

export default App
