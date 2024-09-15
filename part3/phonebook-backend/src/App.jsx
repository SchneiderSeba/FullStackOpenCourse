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

  const [done, setDone] = useState(false)

  const [error, setError] = useState('')

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

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    crud.create(newPerson).then(response => {
      const addedPerson = response.data
      setPersons(prevPersons => {
        const existingPerson = prevPersons.find(person => person.name === addedPerson.name)
        if (existingPerson) {
          return prevPersons.map(person => person.name === addedPerson.name ? addedPerson : person)
        } else {
          return [...prevPersons, addedPerson]
        }
      })
      setNewName('')
      setNewNumber('')
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    }).catch(error => {
      setError(error.response.data.error)
      setTimeout(() => setError(''), 2000)
    })
  }
  
const handleSearch = (e) => {
  setSearch(e.target.value)
}

const filterPersons = persons.filter(person =>
  person.name.toLowerCase().includes(search.toLowerCase())
)

const handleDelete = (_id) => {

  console.log('dato de ID:', _id)

  if (window.confirm(`Delete Id ${_id}?`)) {

    crud.deletePerson(_id).then(() => {
      setPersons(persons.filter(person => person._id !== _id));
     
    })
    console.log(persons)
    .catch(error => {
      console.error('Error deleting person:', error)
    })
  }

}

  return (
  <>
    <div>

      <h2>Phonebook</h2>

        <Filter handleSearch={handleSearch}/>

      <h2>Add a New Person</h2>


        {done ? <div className='done'>{`Added ${newName}`}</div> : <Form newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleSubmit={handleSubmit} handleChangeNumber={handleChangeNumber}/>}

        {error ? <div className='error'>{error}</div> : null}
        

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