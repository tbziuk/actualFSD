import React from "react";
import './Form.css';

const Form = (p) => {


    return (
        <form method="POST" onSubmit={p.signupMtd}>
            <label htmlFor="name">Imię i nazwisko:</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="course">Kurs:</label>
            <select name="course" id="course">
                <option value="-" default></option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Front End Developer">Front End Developer</option>
                <option value="Back End Developer">Back End Developer</option>
            </select>
            <label htmlFor="city">Miasto:</label>
            <select name="city" id="city">
                <option value="-" default></option>
                <option value="Warszawa">Warszawa</option>
                <option value="Kraków">Kraków</option>
                <option value="Online">Online</option>
            </select>
            <div id="messagebox">
            </div>
            <button type="submit">Zapisz się</button>
        </form>
    )
}

export default Form;