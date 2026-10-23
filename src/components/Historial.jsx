import { useState } from 'react'
import Resultado from './Resultado'

function Historial({ equipos, partidos, eliminarPartido }) {
  const [filtro, setFiltro] = useState('') // id del equipo a filtrar

  const partidosFiltrados = partidos.filter(
    (p) => filtro === '' || p.localId === Number(filtro) || p.visitanteId === Number(filtro)
  )

  return (
    <section className="caja">
      <h2>Historial de resultados</h2>

      <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
        <option value="">Todos los equipos</option>
        {equipos.map((eq) => (
          <option key={eq.id} value={eq.id}>{eq.nombre}</option>
        ))}
      </select>

      {partidosFiltrados.length === 0 ? (
        <p className="vacio">No hay partidos registrados.</p>
      ) : (
        partidosFiltrados.map((p) => (
          <div key={p.id} className="fila-historial">
            <Resultado partido={p} equipos={equipos} />
            <button className="eliminar" onClick={() => eliminarPartido(p.id)}>Eliminar</button>
          </div>
        ))
      )}
    </section>
  )
}

export default Historial
