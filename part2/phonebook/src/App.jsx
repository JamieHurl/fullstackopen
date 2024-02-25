import { useState, useEffect } from 'react'

import Person from './components/person'
import Filter from './components/filter'
import PersonForm from './components/personform'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('error')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const userWasDeleted = (id, name) => {
    if(window.confirm(`Do you really want to delete ${name}?`))  {
      personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const updatePhoneNumber = (person) => {
    personService
      .updateNumber(person)
      .then(
        response => {
          setPersons(persons.map(person => 
            person.id !== response.data.id 
              ? person
              : response.data
            ))
        }
      )
      .catch(error => {
        setNotificationType('error')
        setNotificationMessage(
          `Note '${person.name}' was already removed from server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== person.id))
      })
    }

  const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  const personsToShow = filterText === ""
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(filterText.toUpperCase()))

  const addName = (event) => {
    event.preventDefault()
    var personExists = false
    for (let x = 0; x < persons.length; x++) {
        if (newName === persons[x].name) {
          personExists = true
          if (newNumber === persons[x].number){
            alert(`${newName} is already in the phonebook with this number`)
          } else {
            if(window.confirm(`${newName} is already in the phonebook, would you like to replace their number?`)){
              const personObject = {
                id: persons[x].id,
                name: newName,
                number: newNumber
              }
              updatePhoneNumber(personObject)
            }
          }
          setNewName('')
          setNewNumber('')
          break;
        }
    }
    if (!personExists){
      const personObject = {
        name: newName,
        number: newNumber
      }
      //console.log(personObject)
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotificationType('notification')
          setNotificationMessage(
            `User ${newName} added successfully`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
    personExists = false
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} type={notificationType}/>
      <Filter text={filterText} onChange={handleFilterChange}/>

      <PersonForm onSubmit={addName} nameEntry={newName} onChangeName={handleNameChange} numberEntry={newNumber} onChangeNumber={handleNumberChange}/>

      <h2>Numbers</h2>
      {personsToShow.map(person =>
        //console.log(person.id)
        <Person key={person.id} 
                id={person.id}
                name={person.name}
                number={person.number}
                deleteUser={() => userWasDeleted(person.id, person.name)}
                updateNumber={() => updatePhoneNumber(person)}
              />
      )}
    </div>
  )
}

export default App