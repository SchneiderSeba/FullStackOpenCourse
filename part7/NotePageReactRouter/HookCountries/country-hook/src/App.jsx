import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Country } from './Country'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState()

  useEffect(() => {
    if (name === '') {
      setCountry(null) // Asegúrate de limpiar el estado si no hay nombre
      return
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        if (response.data) {
          setCountry({ data: response.data, found: true })
        } else {
          setCountry({ data: null, found: false }) // Maneja el caso en que no haya datos
        }
      })
      .catch(() => {
        setCountry({ data: null, found: false }) // Maneja errores de la API
      })
  }, [name])

  return country
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App