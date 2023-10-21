import './App.css';
import {useState, useEffect} from 'react';
import CarList from './components/CarList';
import Form from './components/Form';


function App() {

  const [cars, setCars] = useState([])
  const [editedCar, setEditedCar] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(res => setCars(res))
    .catch(error => console.log(error))
  },[])

  const editCar = (car) => {
    setEditedCar(car)
  }

  const updatedData = (carModel) => {
    const new_carModel = cars.map(my_car => {
      if(my_car.carID === carModel.carID){
        return carModel
      }
      else {
        return my_car
      }
    })
  }

  return (
    <div className="App">
      <h1>Flask and ReactJS Car Maintenance App</h1>
        <CarList cars = {cars} editCar = {editCar}/>
        {editedCar ? <Form car = {editedCar}/> : null}
    </div>
  );
}

export default App;