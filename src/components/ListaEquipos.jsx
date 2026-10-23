function ListaEquipos({ equipos }) {
  return (
    <section className="caja">
      <h2>Equipos</h2>
      <div className="equipos">
        {equipos.map((equipo) => (
          <div key={equipo.id} className="equipo">
            <img src={equipo.escudo} alt={equipo.nombre} />
            <p>{equipo.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ListaEquipos
