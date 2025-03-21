export const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found || !country.data) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const { name, capital, population, flags } = country.data

  return (
    <div>
      <h3>{name?.common || 'Unknown'}</h3>
      <div>capital: {capital[0] || 'Unknown'}</div>
      <div>population: {population || 'Unknown'}</div>
      <img src={flags?.png || ''} height='100' alt={`flag of ${name?.common || 'Unknown'}`} />
    </div>
  )
}