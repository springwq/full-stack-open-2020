import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Title = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  ) 

}

const Statistics = ({good, neutral, bad}) => {
  let all = good  + neutral + bad
  let average = (good - bad) / all
  let positive = good * 100 / all

  if (all > 0) {
    return (
      <div>
        <table>
          <tbody>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={all} />
            <Statistic text='average' value={average} />
            <Statistic text='positive' value={positive} />
          </tbody>
        </table>
      </div>
    ) 
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title="give feedback" />
      <div>
        <Button text='good' handleClick={() => { setGood(good + 1)}}/>
        <Button text='neutral' handleClick={() => { setNeutral(neutral + 1)}}/>
        <Button text='bad' handleClick={() => { setBad(bad + 1)}}/>
      </div>
      <Title title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

