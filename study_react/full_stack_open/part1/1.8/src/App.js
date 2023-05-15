import { useState } from 'react'

const DisplayTitle = ({ text }) => <h1>{text}</h1>

const Statistics = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const DisplayContent = ({ text, value, addition }) => <p>{text} {value} {addition}</p>

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
      <DisplayContent text="good" value={good} />
      <DisplayContent text="neutral" value={neutral} />
      <DisplayContent text="bad" value={bad} />
      <DisplayContent text="all" value={all} />
      <DisplayContent text="average" value={(good + bad * -1) / all} />
      <DisplayContent text="positive" value={good / all * 100 ? good / all * 100 : 0} addition="%" />
    </div>
  )
}

export default App