import React, { useState } from 'react'
import APIService from './APIService'

function Form(props) {

    const [carModel, setCarModel] = useState(props.car.carModel)
    const [mileage, setMileage] = useState(props.car.mileage)
    const [email, setEmail] = useState(''); 

    const updateCar = () => {
        const previousMileage = props.car.mileage;
        const numMileage = Number(mileage);
        
        // console.log("previousMileage var: ", previousMileage)
        // console.log("mileage prop/var: ", mileage)
        // console.log("numMileage prop/var: ", numMileage)
        // console.log('mileage type: ', typeof mileage);
        // console.log('numMileage type: ', typeof numMileage);
        // console.log('previousMileage type: ', typeof previousMileage);
        // console.log('mileage - previousMileage: ', mileage - previousMileage);

        return APIService.updateCar(props.car.carID, carModel, mileage)  
          .then(res => {
            props.updatedData();
            if (numMileage - previousMileage >= 5000) {
               sendEmail();  
            }
          })
          .catch(error => {
            console.log('Error updating car or sending email', error);
          });
      };
      
    // OLD (but was working)
    // const sendEmail = () => {
    //     APIService.sendEmail(email)
    //       .then(res => console.log('Email sent!'))
    //       .catch(error => console.log(error));
    // };

    const sendEmail = () => {
        return new Promise((resolve, reject) => {
            APIService.sendEmail(email)
                .then(res => {
                    console.log('Email sent!');
                    resolve(res);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    };
    
        
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
                    onChange={(e) => setMileage(e.target.value)}
                    />

                    <label htmlFor='email' className='form-label'>Email Address</label>
                    <input
                        type='email'
                        className='form-control'
                        value={email}
                        placeholder='Please enter email address'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                    onClick={updateCar}
                    className='btn btn-success mt-3'
                    >Update</button>
                    <button
                    onClick={sendEmail}
                    className='btn btn-primary mt-3'
                    >Send Email</button>
                </div>
            ):null}
        </div>
    )
}

export default Form








