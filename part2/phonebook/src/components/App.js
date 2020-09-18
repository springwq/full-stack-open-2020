import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import personService from '../services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  const hook = () => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setFilterValue(event.target.value.toLowerCase())
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .destroy(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
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
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`
      )
      
      if (confirm) {
        const id = persons
          .filter(persion => persion.name === newName)[0]
          .id

        const newPersionObject = {
          name: newName,
          number: newNumber,
          id: id
        }

        personService
          .update(id, newPersionObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))

            setErrorMessage(
              `Updateed ${newName}`
            )

            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        
      } else { 
        return 
      }
    }
    
    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setErrorMessage(
          `Added ${newName}`
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
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

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
