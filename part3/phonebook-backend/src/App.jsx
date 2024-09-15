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
      const updatedPerson = response.data
      setPersons(persons.map(person => person.name === updatedPerson.name ? updatedPerson : person))
      setNewName('')
      setNewNumber('')
    }).catch(error => {
      console.error('Error adding/updating person:', error)
    })
  }
//     e.preventDefault()
//     if (persons.some(person => person.name === newName)) {
//       return alert(`${newName} is already in phonebook`)
//     }

//     crud
//       .create( {name: newName, number: newNumber, id: strId} )
//       .then(response => {
//         setPersons(persons.concat(response.data))
//       })
//     setNewNumber('')
//     setDone(true)
//     setTimeout(() => {
//       setDone(false)
//       setNewName('')
//     }, 1500);
// }
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
  }

}

  return (
  <>
    <div>

      <h2>Phonebook</h2>

        <Filter handleSearch={handleSearch}/>

      <h2>Add a New Person</h2>

        {done ? <div className='done'>{`Added ${newName}`}</div> : <Form newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleSubmit={handleSubmit} handleChangeNumber={handleChangeNumber}/>}
        

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