import { useState } from 'react'

const Statistics = (props) => {
    return (
        <div>
            <h2>Tilastoja</h2>
            <p>Hyvä: {props.good}</p>
            <p>Neutraali: {props.neutral}</p>
            <p>Huono: {props.bad}</p>
            <p>Yhteensä: {props.good+props.neutral+props.bad}</p>
            <p>Keskiarvo: {props.good-props.bad/(props.good+props.neutral+props.bad)}</p>
            <p>Positiivisia: {props.good/(props.good+props.neutral+props.bad)}</p>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Anna palautetta</h1>
            <button onClick={() => setGood(good+1)}>Hyvä</button>
            <button onClick={() => setNeutral(neutral+1)}>Neutraali</button>
            <button onClick={() => setBad(bad+1)}>Huono</button>
            <Statistics good={good} neutral={neutral} bad={bad} />

        </div>
    )
}
export default App