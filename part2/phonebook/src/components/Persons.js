import React from 'react';
import Person from './Person'

const Persons = ({filteredPersons}) => {
  return (
    <div>
      {  
        filteredPersons().map(person => 
          <Person person={person} key={person.id} />
        )
      }  
    </div>
  )
}

export default Persons
