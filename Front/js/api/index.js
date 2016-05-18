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

    signUpUser(name,surName,email,password,dateOfBirth) {

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
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                console.log(responseData)
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
                    throw new Error("Server response wasn't OK");
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