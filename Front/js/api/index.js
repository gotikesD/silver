
const API_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};


export default  {

    getProducts(callback) {
        fetch('http://localhost:3000/')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    },

    getSingleProduct(_id,callback) {
        fetch(`http://localhost:3000/cars/${_id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    },

    getTopCars(callback) {
        fetch('http://localhost:3000/cars/top/')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    },

    signUpUser(name,surName,email,password,dateOfBirth, callback) {

        let requestBody = {
            name : name,
            surName : surName,
            email: email,
            password: password,
            dateOfBirth : dateOfBirth
        };

        fetch('http://localhost:3000/auth/sign', {
            method: 'post',
            mode: 'cors',
            headers: API_HEADERS,
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Wrong data')
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    } ,

    login(email,password,callback) {

        let requestBody = {
            email: email,
            password: password
        };

        fetch('http://localhost:3000/auth/login', {
            method: 'post',
            mode: 'cors',
            headers: API_HEADERS,
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Wrong data')
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    } ,

    addToCart(stockId,token,callback) {
        let requestBody = {
            stockId: stockId
        };

        fetch('http://localhost:3000/cart', {
            method: 'post',
            mode: 'cors',
            headers: {'x-access-token' : token,
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Wrong data')
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    },

    viewCart(token,orderId,callback) {

        fetch('http://localhost:3000/cart/view/'+ orderId, {
            method: 'get',
            mode: 'cors',
            headers: {'x-access-token' : token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Wrong data')
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    },

    changeAmount(stockId,amount,orderId,token, callback){
        let requestBody = {
            stockId: stockId,
            amount : amount
        };

        fetch(`http://localhost:3000/cart/${orderId}`, {
            method: 'put',
            mode: 'cors',
            headers: {'x-access-token' : token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Wrong data')
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    } ,

    deleteFromCart(stockId,callback) {
        let orderId = localStorage.getItem('orderId');
        let token = localStorage.getItem('token');

        let requestBody = {
            stockId: stockId
        };

        fetch(`http://localhost:3000/cart/${orderId}`, {
            method: 'delete',
            mode: 'cors',
            headers: {'x-access-token' : token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Wrong data')
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    } ,

    confirmOrder(callback) {
        let token = localStorage.getItem('token');
        let orderId = localStorage.getItem('orderId');
        fetch(`http://localhost:3000/cart/confirm/${orderId}`, {
            method: 'post',
            mode: 'cors',
            headers: {'x-access-token' : token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Wrong data')
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    }

}