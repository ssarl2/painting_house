const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {
        props.parts.map(part => (
          <p>
            {part.name} {part.exercises}
          </p>
        ))
      }
    </div>
  )
}

const Total = (props) => {
  let exercises = 0
  props.parts.forEach(part => {
    exercises = exercises + part.exercises
  })
  return (
    <p>Number of exercises {exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
