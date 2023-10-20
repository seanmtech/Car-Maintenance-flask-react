import React from 'react'

function Form(props) {
  return (
    <div>
        {props.car ? (
            <div className = 'mb-3'>
                <label htmlForm = 'title' className='form-label'>Car Model</label>
                <input type='text' className='form-control'
                placeholder='Please enter Car Model'
                />

                <label htmlForm = 'body' className='form-label'>Car Mileage</label>
                <textarea
                rows = '1'   
                className='form-control'
                placeholder='Please enter car mileage'
                />
                </div>
        ):null}
    </div>
  )
}

export default Form