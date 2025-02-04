import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Squid Game', number: '86504006' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

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
            <form>
                <div>
                    filter shown with <input value={searchTerm} onChange={handleSearchChange} />
                </div>
            </form>
            <h2>add a new</h2>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>number: <input value={newNumber} onChange={handleNumberChange} />
                    <br></br>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {searchedPersons.map(person => (
                    <li key={person.name}>{person.name} {person.number}</li>
                ))}
            </ul>
        </div>
    )

}
export default App