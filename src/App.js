import React, { useState } from 'react'
import Filter from './components/Filter.js'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '000-000-0000' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newNumber, setNewNumber ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {name: newName, number: newNumber}
    if(persons.some(person => person.name === newPerson.name)) {
      alert(`${newName} is already added to phonebook`)
    }
    else setPersons(persons.concat(newPerson))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
    console.log(searchName)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <Filter name={searchName} searchFn={handleSearchNameChange} />
      <h2>Search Results: </h2>


      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/*  ? person.name.toLowerCase().includes(searchName.toLowerCase()) : '' */}
      {persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())).map(person => <div key={person.name}>{person.name}: {person.number}</div>)}
    </div>
  )
}

export default App