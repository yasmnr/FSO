import { useState, useEffect } from 'react'
import axios from 'axios'

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
                <li key={person.name}>{person.name} {person.number}</li>
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

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(()=>{
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons (response.data)
            })
    }, [])

    const addContact = (event) => {
        event.preventDefault()
        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const contact = {name:newName, number:newNumber}
        setPersons(persons.concat(contact))
        setNewName('')
        setNewNumber('')
        axios
            .post('http://localhost:3001/persons', contact)
            .then(response => {
            })
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
            <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
            <h2>add a new</h2>
            <ContactForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <ContactList persons={searchedPersons}/>
        </div>
    )

}
export default App