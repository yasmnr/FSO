import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addContact = (event) => {
        event.preventDefault()
        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const contact = {name:newName}
        setPersons(persons.concat(contact))
        setNewName('')
    }

    const handleContactChange = (event) => {
        setNewName(event.target.value)
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={handleContactChange} />
                    <br></br>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => (
                    <li key={person.id}>{person.name}</li>
                ))}
            </ul>
        </div>
    )

}
export default App