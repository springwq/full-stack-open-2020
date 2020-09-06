import React from 'react'

const Part = ({part}) => {
  return (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  )
}

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Footer = ({parts}) => {
  return (
    <strong>
      total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises
    </strong>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />

      {
        course.parts.map(part => 
          <Part part={part} key={part.id}/>
        )
      }
      
      <Footer parts={course.parts} />
    </div>
  )
}

export default Course
