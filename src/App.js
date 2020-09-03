import React, { useState, useEffect} from 'react'
import Filter from './components/Filter.js'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newNumber, setNewNumber ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ searchName, setSearchName ] = useState('')


  useEffect(() => {
    personService.getAll()
      .then(people => {
        setPersons(people)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {name: newName, number: newNumber}
    if(persons.some(person => person.name === newPerson.name)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      personService.create(newPerson)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            // setNewName('')
            // setNewNumber('')
          }
        )
    }
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
      {persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())).map(person => <div key={person.name}>{person.name}: {person.number}</div>)}
    </div>
  )
}

export default App