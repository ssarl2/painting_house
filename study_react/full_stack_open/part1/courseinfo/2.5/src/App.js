import Course from './components/Course'

const Sum = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return <p>total of {total} exercises</p>
}

const App = () => {
  const course = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        }, {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      {
        course.map(c => (
          <div key={c.id} >
            <Course course={c} />
            <Sum parts={c.parts} />
          </div>
        ))
      }
    </div>
  )
}

export default App