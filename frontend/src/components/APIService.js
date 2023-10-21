
export default class APIService {

    static updateCar(carID, carModel){
        return fetch(`http://127.0.0.1:5000/update/${carID}/`, {
            'method':'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(carModel)
          })
          .then(res => res.json())
    }
}