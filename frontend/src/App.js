import './App.css';
import {useState, useEffect} from 'react';


function App() {

  const [cars, setCars] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))
  },[])

  return (
    <div className="App">
      <h1>Flask and ReactJS Car Maintenance App</h1>
    </div>
  );
}

export default App;