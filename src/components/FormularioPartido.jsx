import { useState } from 'react'
import Resultado from './Resultado'

function FormularioPartido({ equipos, agregarPartido }) {
  const [localId, setLocalId] = useState('')
  const [visitanteId, setVisitanteId] = useState('')
  const [golesLocal, setGolesLocal] = useState('')
  const [golesVisitante, setGolesVisitante] = useState('')
  const [error, setError] = useState('')
  const [ultimo, setUltimo] = useState(null)

  // Valida que el texto sea un número entero no negativo
  const esMarcadorValido = (valor) => /^\d+$/.test(valor)

  const registrar = (e) => {
    e.preventDefault()

    if (localId === '' || visitanteId === '') {
      setError('Debes seleccionar el equipo local y el visitante.')
      return
    }
    if (localId === visitanteId) {
      setError('El equipo local y el visitante no pueden ser el mismo.')
      return
    }
    if (!esMarcadorValido(golesLocal) || !esMarcadorValido(golesVisitante)) {
      setError('Los marcadores deben ser números enteros no negativos.')
      return
    }

    const partido = {
      localId: Number(localId),
      visitanteId: Number(visitanteId),
      golesLocal: Number(golesLocal),
      golesVisitante: Number(golesVisitante),
    }

    agregarPartido(partido)
    setUltimo(partido)
    setError('')
    setGolesLocal('')
    setGolesVisitante('')
  }

  return (
    <section className="caja">
      <h2>Registrar partido</h2>
      <form onSubmit={registrar} className="formulario">
        <label>
          Local
          <select value={localId} onChange={(e) => setLocalId(e.target.value)}>
            <option value="">-- Selecciona --</option>
            {equipos.map((eq) => (
              <option key={eq.id} value={eq.id}>{eq.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Goles local
          <input type="number" min="0" value={golesLocal} onChange={(e) => setGolesLocal(e.target.value)} />
        </label>
        <label>
          Visitante
          <select value={visitanteId} onChange={(e) => setVisitanteId(e.target.value)}>
            <option value="">-- Selecciona --</option>
            {equipos.map((eq) => (
              <option key={eq.id} value={eq.id}>{eq.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Goles visitante
          <input type="number" min="0" value={golesVisitante} onChange={(e) => setGolesVisitante(e.target.value)} />
        </label>

        <button type="submit">Registrar</button>
      </form>

      {error && <p className="error">{error}</p>}

      {ultimo && (
        <div>
          <h3>Último resultado registrado</h3>
          <Resultado partido={ultimo} equipos={equipos} />
        </div>
      )}
    </section>
  )
}

export default FormularioPartido
