import React, { useState } from 'react'
const myFunc = () => {
    let [name, setName] = useState("Tolu");
    let [age, setAge] = useState(56);
    const ChangeName = () => {
        setName("Tayo");
    }
    return (<div>
        <div>My Name is {name}, my age is {age}</div>
        <div>my school number {Math.random()}</div>
        <button onClick={ChangeName}>resetname</button>
        <button onClick={() => setAge(age + 10)}>add age</button>
    </div>);
};

