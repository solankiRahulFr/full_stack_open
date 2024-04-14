import { useState, useEffect } from 'react';
import personService from './services/personService.js';
import Filter from './components/Filter.jsx';
import PersonForm from './components/PersonForm.jsx';
import Persons from './components/Persons.jsx';
import Notification from './components/Notification.jsx';
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [pattern, setPattern] = useState('')

  // Getting all the persons
  useEffect(() => {
    personService.getAllPerson().then(res => setPersons(res))
  }, [])

  // Handling the input event and binding it with the state
  const handleInputs = (event) => {
    if (event.target.id === "name") setNewName(event.target.value)
    if (event.target.id === "number") setNewNumber(event.target.value)
  }

  // Grabing the filter value for searching person
  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }


  // Submit button handler, with condition for empty input, number/ name already present
  const onSubmitHandler = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    if (!newName || !newNumber) {
      setMessage(`Please enter name and number to add`)
      setPattern('error')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    else if ((persons.map((per) => per.name.toLowerCase())).includes(newName.toLowerCase()) && (persons.map(per => per.number)).includes(newNumber)) {
      setMessage(`Person with name ${newName} and number ${newNumber} already exist`)
      setPattern('error')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    else if ((persons.map(per => per.number)).includes(newNumber)) {
      setMessage(`Person with number ${newNumber} already exist`)
      setPattern('error')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
    else if ((persons.map((per) => per.name.toLowerCase())).includes(newName.toLowerCase()) && !(persons.map(per => per.number)).includes(newNumber)) {
      const personDetails = persons.find(props => props.name.toLowerCase() === newPerson.name.toLowerCase())
      if (confirm(`A Person with ${newName} already exist want to change the number ?`)) {
        personService.updatePerson(personDetails.id, { ...personDetails, number: newNumber })
          .then(res => {
            personService.getAllPerson().then(res => setPersons(res));
            setNewName('');
            setNewNumber('');
            setMessage(`Success: Person ${personDetails.name} Number changed`)
            setPattern('success')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          }).catch(err => {
            setMessage(`Person with name ${personDetails.name} does not exist or is already removed`)
            setPattern('error')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          }
          )
      }
    }
    else {
      personService.createPerson(newPerson)
        .then(res => {
          setMessage(`Success : A person with name ${newName} and number ${newNumber} has been created`)
          setPattern('success')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          personService.getAllPerson().then(res => setPersons(res))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setMessage(`Error : Unable to create a new person. ${error}`)
          setPattern('error')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }

  }

  // Deleting the preson and updating the list on the UI
  const handleDelete = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePreson(id)
        .then(res => {
          setNewName('');
          setNewNumber('');
          setMessage(`Success: Person deleted`)
          setPattern('success')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          setPersons(persons.filter(persons => persons.id !== id))
        }).catch((err) => {
          setMessage(`Unable to delete the person or person doesn't exist or already removed. ${err}`)
          setPattern('success')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          personService.getAllPerson().then(res => setPersons(res))
        })

    }
  }

  // filter the person list
  const filterPerson = persons.map(props => props.name.toLowerCase().includes(filterName.toLowerCase())) ?
    persons.filter(props => props.name.toLowerCase().includes(filterName.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={message} pattren={pattern} />

      <Filter handleFilter={handleFilter} filterValue={filterName} />

      <h3>Add a new</h3>

      <PersonForm onSubmitHandler={onSubmitHandler} handleInputs={handleInputs} valName={newName} valNumber={newNumber} />

      <h2>Numbers</h2>

      <div>
        {
          filterPerson.map((per) => <Persons key={per.id} id={per.id} name={per.name} number={per.number} handleDelete={handleDelete} />)
        }
      </div>

    </div>
  )
}

export default App
