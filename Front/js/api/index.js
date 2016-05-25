const jwtDecode = require(`jwt-decode`);
const API_HEADERS = {
  'Accept' : `application/json`,
  'Content-Type' : `application/json`
};


export default {

  getProducts(perPage, page, callbackData) {
    if (!perPage) {
      perPage = 8
    }
    if (!page) {
      page = 1
    }
    fetch(`http://localhost:3000/?perPage=${perPage}&page=${page}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Server response wasn't OK`);
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  getCount(callbackData) {
    fetch(`http://localhost:3000/count`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Server response wasn't OK`);
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  getSingleProduct(_id, callbackData) {
    fetch(`http://localhost:3000/cars/${_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Server response wasn't OK`);
        }
      })
      .then((responseData) => {
        localStorage.setItem(`single`, JSON.stringify(responseData));
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  getTopCars(callbackData) {
    fetch(`http://localhost:3000/cars/top/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Server response wasn't OK`);
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  signUpUser(name, surName, email, password, dateOfBirth, callbackData) {

    const requestBody = {
      name : name,
      surName : surName,
      email : email,
      password : password,
      dateOfBirth : dateOfBirth
    };

    fetch(`http://localhost:3000/auth/sign`, {
      method : `post`,
      mode : `cors`,
      headers : API_HEADERS,
      body : JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  login(email, password, callbackData) {

    const requestBody = {
      email : email,
      password : password
    };

    fetch(`http://localhost:3000/auth/login`, {
      method : `post`,
      mode : `cors`,
      headers : API_HEADERS,
      body : JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  addToCart(stockId, token, callbackData) {
    const requestBody = {
      stockId : stockId
    };

    fetch(`http://localhost:3000/cart`, {
      method : `post`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      },
      body : JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  viewCart(token, orderId, callbackData) {

    fetch(`http://localhost:3000/cart/view/${orderId}`, {
      method : `get`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  changeAmount(stockId, amount, orderId, token, callbackData){
    const requestBody = {
      stockId : stockId,
      amount : amount
    };

    fetch(`http://localhost:3000/cart/${orderId}`, {
      method : `put`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      },
      body : JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  deleteFromCart(stockId, callbackData) {
    const orderId = localStorage.getItem(`orderId`);
    const token = localStorage.getItem(`token`);

    const requestBody = {
      stockId : stockId
    };

    fetch(`http://localhost:3000/cart/${orderId}`, {
      method : `delete`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      },
      body : JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  confirmOrder(callbackData) {
    const token = localStorage.getItem(`token`);
    const orderId = localStorage.getItem(`orderId`);
    fetch(`http://localhost:3000/cart/confirm/${orderId}`, {
      method : `post`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  addCar(car, callbackData) {
    const token = localStorage.getItem(`token`);
    const requestBody = {};
    const carsProperty = Object.keys(car);
    carsProperty.forEach((i) => {
      requestBody[i] = car[i];
    });
    fetch(`http://localhost:3000/cars/`, {
      method : `post`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      },
      body : JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  getYourCars(callbackData) {
    const token = localStorage.getItem(`token`);
    fetch(`http://localhost:3000/advanced/cars/`, {
      method : `get`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  deleteOwnCar(stockId, callbackData) {

    const token = localStorage.getItem(`token`);
    const requestBody = {
      stockId : stockId
    };
    fetch(`http://localhost:3000/advanced/cars/`, {
      method : `delete`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      },
      body : JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  updateOwnCar(stockId, field, callbackData) {


    const token = localStorage.getItem(`token`);

    field.stockId = stockId;

    const requestBody = field;
    fetch(`http://localhost:3000/advanced/cars/`, {
      method : `put`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      },
      body : JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  getAllUsers(callbackData) {
    const token = localStorage.getItem(`token`);
    fetch(`http://localhost:3000/admin/users`, {
      method : `get`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  getSingleUserInfo(id, token, callbackData) {
    fetch(`http://localhost:3000/admin/users/${id}`, {
      method : `get`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        console.log(responseData)
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },


  getTopUsers(callbackData) {
    const token = localStorage.getItem(`token`);
    fetch(`http://localhost:3000/admin/topUsers`, {
      method : `get`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },


  getTopCars(callbackData) {
    const token = localStorage.getItem(`token`);
    fetch(`http://localhost:3000/admin/topCars`, {
      method : `get`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  },

  getLastWeek(callbackData) {
    const token = localStorage.getItem(`token`);
    fetch(`http://localhost:3000/admin/lastOrders`, {
      method : `get`,
      mode : `cors`,
      headers : {
        'x-access-token' : token,
        'Accept' : `application/json`,
        'Content-Type' : `application/json`
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(`Wrong data`)
        }
      })
      .then((responseData) => {
        callbackData(responseData)
      })
      .catch((error) => {
        throw error;
      });
  }

}