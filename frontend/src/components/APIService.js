
export default class APIService {

    static updateCar(carID, carModel, mileage){
        const carData = {
            carModel: carModel,
            mileage: mileage,
        };
        return fetch(`http://127.0.0.1:5000/update/${carID}/`, {
            'method':'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(carData)
          })
          .then(res => res.json())
    }

    static sendEmail(email){
        return fetch('http://127.0.0.1:5000/sendEmail', {
          'method':'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({email})
        })
        .then(res => res.json())
      }
}