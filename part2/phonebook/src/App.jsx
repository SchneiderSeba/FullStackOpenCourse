import './App.css'
import { useState } from 'react'
import { Persons } from './Persons'
import { Form } from './Form'
import { Filter } from './Filter'


const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('debug')

  const [newNumber, setNewNumber] = useState('debug')

  const [search, setSearch] = useState('')

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

    setPersons(prevPersons => [...prevPersons, {name: newName, number: newNumber, id: newId}])
    setNewName('')
    setNewNumber('')
}

const handleSearch = (e) => {
  setSearch(e.target.value)
}

const filterPersons = persons.filter(person =>
  person.name.toLowerCase().includes(search.toLocaleLowerCase())
)

  return (
  <>
    <div>

      <h2>Phonebook</h2>

        <Filter handleSearch={handleSearch}/>

      <h2>Add a New Person</h2>

        <Form newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleSubmit={handleSubmit} handleChangeNumber={handleChangeNumber}/>

      <h2>Numbers</h2>

      { persons ? <Persons persons={filterPersons}/> : '...' }

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