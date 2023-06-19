import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message, inlineStyle }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification' style={inlineStyle}>
      {message}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={(event) => props.setNewName(event.target.value)} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={(event) => props.setNewNumber(event.target.value)} />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

const Filter = ({ filterWord, setFilterWord }) => {
  return (
    <div>
      filter shown with <input value={filterWord} onChange={(event) => setFilterWord(event.target.value)} />
    </div>
  )
}

const Persons = ({ persons, setPersons, filterWord }) => {

  const handleClick = (id, name) => {
    if (window.confirm(`Delete ${name} ?`))
      personService
        .deletePerson(id, name)
        .then(() => { return personService.getAll() })
        .then(currentPersons => setPersons(currentPersons))
  }

  return (
    <div>
      {persons.filter(person => person.name.includes(filterWord)).map(person =>
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleClick(person.id, person.name)}>delete</button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('Notification')
  const [inlineStyle, setInlineStyle] = useState({ color: 'black' })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some(person => newName === person.name)

    if (nameExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const targetPerson = persons.find(person => newName === person.name)
        const updatedPerson = { ...targetPerson, number: newNumber }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setInlineStyle({ color: 'green' })
            setNotificationMessage(`The number ${updatedPerson.number} is changed`)
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch(error => {
            setInlineStyle({ color: 'red' })
            if (error.response.data.name === 'ValidationError') {
              setNotificationMessage(error.response.data.message)
            } else {
              setNotificationMessage(`Information of ${targetPerson.name} has already been removed from server`)
            }
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)

          })
      }
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setInlineStyle({ color: 'green' })
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      })
      .catch(error => {
        setInlineStyle({ color: 'red' })
        setNotificationMessage(error.response.data.message)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} inlineStyle={inlineStyle} />
      <Filter filterWord={filterWord} setFilterWord={setFilterWord} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} filterWord={filterWord} />
    </div>
  )
}

export default App