import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({ persons, filterWord }) => {
  return (
    <div>
      {persons.filter(person => person.name.includes(filterWord)).map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

  useEffect(() => {
    axios
      .get('http://192.168.1.99:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some(person => newName === person.name)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterWord={filterWord} setFilterWord={setFilterWord} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterWord={filterWord} />
    </div>
  )
}

export default App