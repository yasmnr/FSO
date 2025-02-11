import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const ContactForm = (props) => {
    return (
        <form onSubmit={props.addContact}>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>number: <input value={props.newNumber} onChange={props.handleNumberChange} />
                <br></br>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const ContactList = (props) =>{
    return (
        <ul>
            {props.persons.map(person => (
                <li key={person.name}>{person.name} {person.number}
                    <button onClick={() => props.removeContact(person.id, person.name)}>delete</button>
                </li>
            ))}
        </ul>
    )
}

const SearchBar = (props) => {
    return (
        <form>
            <div>
                filter shown with <input value={props.searchTerm} onChange={props.handleSearchChange} />
            </div>
        </form>
    )
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="announcement">
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [announcement, setAnnouncement] = useState(null)



    useEffect(()=>{
        personService
            .getAll()
            .then(resPersons => {
                setPersons(resPersons)
            })
    }, [])

    const addContact = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(person => person.name === newName)
        if (persons.some((person) => person.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const updatedPerson = { ...existingPerson, number: newNumber }
                personService
                    .update(existingPerson.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person =>
                            person.id !== existingPerson.id ? person : returnedPerson
                        ))
                        setNewName('')
                        setNewNumber('')
                        setAnnouncement(
                            `Contact ${updatedPerson.name} updated`
                        )
                        setTimeout(() => {
                            setAnnouncement(null)
                        }, 5000)
                    })
            }
        } else {
            const contact = {name: newName, number: newNumber}
            personService
                .create(contact)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setAnnouncement(
                        `Contact ${returnedPerson.name} added to phonebook`
                    )
                    setTimeout(() => {
                        setAnnouncement(null)
                    }, 5000)
                })
        }
    }

    const removeContact = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            setAnnouncement(
                `Contact ${name} removed from phonebook`
            )
            setTimeout(() => {
                setAnnouncement(null)
            }, 5000)
            personService.remove(id).then(() => {
                setPersons(persons.filter(person => person.id !== id))

            })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }
    const searchedPersons = persons.filter((person) => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={announcement} />
            <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <h2>add a new</h2>
            <ContactForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <ContactList persons={searchedPersons} removeContact={removeContact} />
        </div>
    )

}
export default App