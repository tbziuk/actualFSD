import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';
import List from "./components/List";
import Form from "./components/Form";

const App = () => {

  const [data, setData] = useState([]);


  const handleSignup = (event) => {
    event.preventDefault();

    const name = event.target.name.value
    const course = event.target.course.value;
    const city = event.target.city.value;

    const validateForm = () => {
      const messageBox = document.getElementById("messagebox");
      messageBox.innerHTML = "";
      let isValid = true;

      if (name.trim() === "") {
        messageBox.innerHTML += "<p>Wpisz imię i nazwisko!</p>";
        isValid = false;
      }
      if (course === "-") {
        messageBox.innerHTML += "<p>Wybierz kurs!</p>";
        isValid = false;
      }
      if (city === "-") {
        messageBox.innerHTML += "<p>Wybierz miasto!</p>";
        isValid = false;
      }

      if (isValid) {
        messageBox.style.display = 'none';
      } else {
        messageBox.style.display = 'block';
      }

      return isValid;
    }

    if (validateForm()) {
      axios.post('http://localhost:8300/', {
        name,
        course,
        city
      })
        .then(() => {
          axios.get("http://localhost:8300/")
            .then(res => setData(res.data))
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err));

      event.target.name.value = '';
      event.target.course.value = '-';
      event.target.city.value = '-';
    }
  }



  const handleDelete = (item) => {
    if (window.confirm("Napewno chcesz usunąć ten zapis?")) {
      axios.delete(`http://localhost:8300/${item._id}`)
        .then(() => setData(data.filter(d => d._id !== item._id)))
        .catch(err => console.log(err));
    } else { return }
  };



  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8300/");
      setData(result.data);
    };

    fetchData();
  }, []);


  return (
    <div className="App" >
      <h2>Zapisy na kursy IT!</h2>

      <Form signupMtd={handleSignup} />
      <List dataPar={data} setDataMtd={setData} deleteMtd={handleDelete} />
    </div>
  );
}

export default App;
