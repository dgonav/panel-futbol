// Calcula las estadísticas de un equipo recorriendo los partidos con reduce()
function calcularEstadisticas(equipo, partidos) {
  const inicial = { pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0 }

  const est = partidos.reduce((acc, p) => {
    let favor, contra
    if (p.localId === equipo.id) {
      favor = p.golesLocal
      contra = p.golesVisitante
    } else if (p.visitanteId === equipo.id) {
      favor = p.golesVisitante
      contra = p.golesLocal
    } else {
      return acc // el equipo no jugó este partido
    }

    return {
      pj: acc.pj + 1,
      pg: acc.pg + (favor > contra ? 1 : 0),
      pe: acc.pe + (favor === contra ? 1 : 0),
      pp: acc.pp + (favor < contra ? 1 : 0),
      gf: acc.gf + favor,
      gc: acc.gc + contra,
    }
  }, inicial)

  return {
    ...equipo,
    ...est,
    dg: est.gf - est.gc,
    pts: est.pg * 3 + est.pe * 1, // 3 por victoria, 1 por empate, 0 por derrota
  }
}

function TablaPosiciones({ equipos, partidos }) {
  // Ordena por puntos, luego diferencia de goles y luego goles a favor
  const tabla = equipos
    .map((eq) => calcularEstadisticas(eq, partidos))
    .sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf)

  return (
    <section className="caja">
      <h2>Tabla de posiciones</h2>
      {partidos.length === 0 && <p className="vacio">Aún no hay partidos registrados.</p>}
      <div className="tabla-contenedor">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Equipo</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((eq, i) => (
              <tr key={eq.id}>
                <td>{i + 1}</td>
                <td className="nombre-tabla">
                  <img src={eq.escudo} alt={eq.nombre} />
                  {eq.nombre}
                </td>
                <td>{eq.pj}</td>
                <td>{eq.pg}</td>
                <td>{eq.pe}</td>
                <td>{eq.pp}</td>
                <td>{eq.gf}</td>
                <td>{eq.gc}</td>
                <td>{eq.dg}</td>
                <td><b>{eq.pts}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TablaPosiciones
