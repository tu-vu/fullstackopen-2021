import React, { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>

            <Button name="good" count={good} setCounter={setGood} />
            <Button name="neutral" count={neutral} setCounter={setNeutral} />
            <Button name="bad" count={bad} setCounter={setBad} />

            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
