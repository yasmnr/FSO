import { useState } from 'react'

const Statistics = (props) => {
    const total = props.good+props.neutral+props.bad;
    if (total == 0){
        return <p>Ei annettuja palautteita</p>;
    }
    return (
        <table>
        <div>
            <StatisticLine text="Hyvä:" value ={props.good} />
            <StatisticLine text="Neutraali:" value ={props.neutral} />
            <StatisticLine text="Huono:" value ={props.bad} />
            <StatisticLine text="Yhteensä:" value ={total} />
            <StatisticLine text="Keskiarvo:" value ={props.good-props.bad/(props.good+props.neutral+props.bad)} />
            <StatisticLine text="Positiivisia:" value ={(props.good/(props.good+props.neutral+props.bad)*100)} />
        </div>
            </table>
    )
}

const Button = (props) => {
    return (
        <div>
            <button onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

const StatisticLine = (props) => {
    return (
            <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
                </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Anna palautetta</h1>
            <Button text="Hyvä" onClick={() => setGood(good+1)} />
            <Button text="Neutraali" onClick={() => setNeutral(neutral+1)} />
            <Button text="Huono" onClick={() => setBad(bad+1)} />
            <h2>Tilastoja</h2>
            <Statistics good={good} neutral={neutral} bad={bad} />

        </div>
    )
}
export default App