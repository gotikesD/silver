var jwtDecode = require('jwt-decode');
const API_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};


export default  {

    getProducts(perPage,page,callback) {

        if(!perPage) {
            perPage = 8
        }
        if(!page) {
            page = 1
        }
        fetch(`http://localhost:3000/?perPage=${perPage}&page=${page}`)
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

    getCount(callback) {
        fetch(`http://localhost:3000/count`)
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
                localStorage.setItem('single', JSON.stringify(responseData));
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
    } ,

    addCar(car, callback) {
        let token = localStorage.getItem('token');
        let requestBody = {};
        let carsProperty = Object.keys(car);
        carsProperty.forEach((i)=> {
            requestBody[i] = car[i];
        });
        fetch(`http://localhost:3000/cars/`, {
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
    } ,

    getYourCars(callback) {
        console.log('here');
        let token = localStorage.getItem('token');
        fetch('http://localhost:3000/advanced/cars/', {
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
    } ,

    deleteOwnCar(stockId, callback) {

        let token = localStorage.getItem('token');
        let requestBody = {
            stockId : stockId
        };
        fetch(`http://localhost:3000/advanced/cars/`, {
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
    },

    updateOwnCar(stockId,field, callback) {


        let token = localStorage.getItem('token');

        field.stockId = stockId;

        let requestBody = field;
        fetch(`http://localhost:3000/advanced/cars/`, {
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

    getAllUsers(callback) {
        let token = localStorage.getItem('token');
        fetch('http://localhost:3000/admin/users', {
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
    } ,

    getSingleUserInfo(id, token , callback) {
        fetch(`http://localhost:3000/admin/users/${id}`, {
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
                console.log(responseData)
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    } ,


    getTopUsers(callback) {
        let token = localStorage.getItem('token');
        fetch('http://localhost:3000/admin/topUsers', {
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
    } ,


    getTopCars(callback) {
        let token = localStorage.getItem('token');
        fetch('http://localhost:3000/admin/topCars', {
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
    } ,

    getLastWeek(callback) {
        let token = localStorage.getItem('token');
        fetch('http://localhost:3000/admin/lastOrders', {
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
    }

}