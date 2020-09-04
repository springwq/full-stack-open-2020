import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const zeroFilledArray = Array.apply(
  null, 
  new Array(anecdotes.length)
).map(
  Number.prototype.valueOf,
  0
)

const getRandomInt = (max) => {
  return Math.floor(
    Math.random() * Math.floor(max)
  );
}

const Title = (props) => {
  return (
    <h1>
      {props.title}
    </h1>
  )
}

const Anecdote = (props) => {
  return (
    <p>
      {props.text}
    </p>
  )
}

const VoteCount = (props) => {
  return (
    <p>
      has {props.count} votes
    </p>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(zeroFilledArray)

  const updatePoints = () => {                            
    const copy = [...points]

    copy[selected] += 1

    return copy
  }

  const maxPointSelected = () => {
    const maxPoint = Math.max.apply(null, points)

    return points.findIndex((point) => point === maxPoint)
  }

  return (
    <div>
      <Title text='Anecdote of the day' />
      <Anecdote text={props.anecdotes[selected]} />
      <VoteCount count={points[selected]} />
      <Button text='vote' handleClick={() => { setPoints(updatePoints()) }} />
      <Button text='next anecdote' handleClick={() => { setSelected(getRandomInt(anecdotes.length - 1))}}/>
      <Title text='Anecdote with most votes' />
      <Anecdote text={props.anecdotes[maxPointSelected()]} />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);

