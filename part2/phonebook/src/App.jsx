import './App.css'
import { useState, useEffect } from 'react'
import { Persons } from './Persons'
import { Form } from './Form'
import { Filter } from './Filter'
import crud from './crud'



const App = () => {

  

  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('debug')

  const [newNumber, setNewNumber] = useState('debug')

  const [search, setSearch] = useState('')

  useEffect(() => {
    crud
      .getAll()
      .then(response => {setPersons(response.data)})
  }, [])


  const handleChangeName = (e) => {
    setNewName(e.target.value)
}

const handleChangeNumber = (e) => {
  setNewNumber(e.target.value)
}


const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      return alert(`${newName} is already in phonebook`)
    }

    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
    const newId = maxId + 1
    const strId = newId.toString()

    crud
      .create( {name: newName, number: newNumber, id: strId} )
      .then(response => {
        setPersons(persons.concat(response.data))
      })
    setNewName('')
    setNewNumber('')
}
const handleSearch = (e) => {
  setSearch(e.target.value)
}

const filterPersons = persons.filter(person =>
  person.name.toLowerCase().includes(search.toLowerCase())
)

const handleDelete = (id) => {

  console.log('dato de ID:', id)

  if (window.confirm(`Delete Id ${id}?`)) {

    crud.deletePerson(id).then(() => {
      setPersons(persons.filter(person => person.id !== id));
     
    })
    console.log(persons)
  }

}

  return (
  <>
    <div>

      <h2>Phonebook</h2>

        <Filter handleSearch={handleSearch}/>

      <h2>Add a New Person</h2>

        <Form newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleSubmit={handleSubmit} handleChangeNumber={handleChangeNumber}/>

      <h2>Numbers</h2>

      { persons ? <Persons persons={filterPersons} handleDelete={handleDelete} /> : '...' }

    </div>

    <div style={{margin: '50px'}}>
      <code>persons : {JSON.stringify(persons)}</code>
      <code>newName : {newName}</code>
      <code>newNumber : {newNumber}</code>
      <code>search : {search}</code>
    </div>
    

</>
    
  )
}

export default App