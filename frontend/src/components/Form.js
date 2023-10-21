import React, { useState } from 'react'
import APIService from './APIService'

function Form(props) {

    const [carModel, setCarModel] = useState(props.car.carModel)
    const [mileage, setMileage] = useState(props.car.mileage)

    const updateCar = () => {
        APIService.updateCar(props.car.carID, {carModel, mileage})
        .then(res => props.updatedData())
        .catch(error => console.log(error))
    }
        
    return (
        <div>
            {props.car ? (
                <div className = 'mb-3'>
                    <label htmlFor = 'title' className='form-label'>Car Model</label>
                    <input type='text' className='form-control'
                    value={carModel}
                    placeholder='Please enter Car Model'
                    onChange={(e) => setCarModel(e.target.value)}
                    />

                    <label htmlFor = 'body' className='form-label'>Car Mileage</label>
                    <textarea
                    rows = '1'   
                    className='form-control'
                    value={mileage}
                    placeholder='Please enter car mileage'
                    onChange={(e) => setMileage(e.target.mileage)}
                    />
                    <button
                    onClick={updateCar}
                    className='btn btn-success mt-3'
                    >Update</button>
                    </div>
            ):null}
        </div>
    )
}

export default Form