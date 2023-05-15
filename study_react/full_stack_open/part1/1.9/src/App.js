import { useState } from 'react'

const DisplayTitle = ({ text }) => <h1>{text}</h1>

const Statistics = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const DisplayContent = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {(props.good + props.bad * -1) / props.all}</p>
      <p>positive {props.good / props.all * 100} %</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    const increasedGood = good + 1
    setGood(increasedGood)
    setAll(all + 1)
  }

  const handleNeutral = () => {
    const increasedNeutral = neutral + 1
    setNeutral(increasedNeutral)
    setAll(all + 1)
  }
  const handleBad = () => {
    const increasedBad = bad + 1
    setBad(increasedBad)
    setAll(all + 1)
  }

  return (
    <div>
      <DisplayTitle text="give feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics text="statistics" />
      <DisplayContent good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App