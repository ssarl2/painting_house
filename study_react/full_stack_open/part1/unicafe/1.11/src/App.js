import { useState } from 'react'

const DisplayTitle = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
        <td>%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={(props.good + props.bad * -1) / props.all} />
          <StatisticLine text="positive" value={props.good / props.all * 100} />
        </tbody>
      </table>
    </div>
  )
}

const DisplayContent = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <Statistics {...props} />
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
      <DisplayContent good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App