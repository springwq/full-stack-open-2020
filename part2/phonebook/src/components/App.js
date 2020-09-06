import React, { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , number: '1111', id: 1}
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setFilterValue(event.target.value.toLowerCase())
  }

  const filteredPersons = () => {
    if (filterValue !== '') {
      return persons.filter(
        person => person.name.toLowerCase().includes(filterValue)
      )
    } 
      
    return persons
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} id already added to phonebook`)
      return
    }
    
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterValue} onChange={handleSearch} />

      <h3>add a new</h3>

      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson}
      />
     
      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} />
    </div>
  );
}

export default App;
