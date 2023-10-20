

import React from 'react'

function CarList(props) {

    const editCar = (car) => {
        props.editCar(car)
    }

    return (
        <div>
            {props.cars && props.cars.map(car => {
                return (
                <div key = {car.carID}>
                    <h2>{car.carModel}</h2>
                    <p>{car.mileage}</p>
                    <p>{car.dateMilesEntered}</p>

                    <div className='row'>
                        <div className='col-md-1'>
                            <button className='btn btn-primary'
                            onClick={() => editCar(car)}>Update</button>
                        </div>

                        <div className='col'>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                    <hr/>
                </div>
                )
            })}
        </div>
    )
}

export default CarList