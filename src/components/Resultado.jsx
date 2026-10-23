// Muestra un partido con escudos, nombres y marcador
function Resultado({ partido, equipos }) {
  const local = equipos.find((e) => e.id === partido.localId)
  const visitante = equipos.find((e) => e.id === partido.visitanteId)

  return (
    <div className="resultado">
      <div className="lado">
        <img src={local.escudo} alt={local.nombre} />
        <span>{local.nombre}</span>
      </div>
      <strong className="marcador">
        {partido.golesLocal} - {partido.golesVisitante}
      </strong>
      <div className="lado">
        <img src={visitante.escudo} alt={visitante.nombre} />
        <span>{visitante.nombre}</span>
      </div>
    </div>
  )
}

export default Resultado
