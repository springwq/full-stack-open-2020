import React from 'react';
import Person from './Person'

const Persons = ({filteredPersons, handleDelete}) => {
  return (
    <div>
      {  
        filteredPersons().map(person => 
          <Person person={person} key={person.id} handleDelete={handleDelete} />
        )
      }  
    </div>
  )
}

export default Persons
