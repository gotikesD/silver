define({ "api": [
  {
    "type": "delete",
    "url": "/delete",
    "title": "Deleting Single Car",
    "name": "deleteSingleCar",
    "group": "Advanced",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "stockId",
            "description": "<p>Send it in the body of the request. Field name - stockId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "String",
            "description": "<p>Return String</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Deleted from cars DB and user DB",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFind",
            "description": "<p>Cars with this stockId not Found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Cars with this stockId not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cars.js",
    "groupTitle": "Advanced"
  },
  {
    "type": "update",
    "url": "/update",
    "title": "Request for updating car",
    "name": "updateCar",
    "group": "Advanced",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "stockId",
            "description": "<p>Send it in the body of the request. Field name - stockId</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "userId",
            "description": "<p>Send it in the body of the request. Field name - userId</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "VinCode",
            "description": "<p>Send it in the body of the request. Field name - userId</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "make",
            "description": "<p>Send it in the body of the request. Field name - make</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "model",
            "description": "<p>Send it in the body of the request. Field name - model</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "color",
            "description": "<p>Send it in the body of the request. Field name - color</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "year",
            "description": "<p>Send it in the body of the request. Field name - year</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "mileage",
            "description": "<p>Send it in the body of the request. Field name - mileage</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "carState",
            "description": "<p>Send it in the body of the request. Field name - carState</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "transmissionType",
            "description": "<p>Send it in the body of the request. Field name - transmissionType</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "entryDate",
            "description": "<p>Send it in the body of the request. Field name - entryDate</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "cost",
            "description": "<p>Send it in the body of the request. Field name - cost</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "dealerId",
            "description": "<p>Send it in the body of the request. Field name - dealerId</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "internationalPrice",
            "description": "<p>Send it in the body of the request. Field name - internationalPrice</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "askPrice",
            "description": "<p>Send it in the body of the request. Field name - askPrice</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "retailPrice",
            "description": "<p>Send it in the body of the request. Field name - retailPrice</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"__v\": 0,\n \"stockId\": \"1020301\",\n \"available\": true,\n \"make\": \"NewFake\",\n \"model\": \"NewFake V-Power\",\n \"color\": \"Red\",\n \"year\": 2000,\n \"mileage\": 999,\n \"carState\": \"Used\",\n \"transmissionType\": \"Manual\",\n \"entryDate\": \"2015-10-09T21:00:00.000Z\",\n\"cost\": 125000,\n \"dealerId\": 222,\n\"_id\": \"5731e71fe0be1da6445201df\",\n \"bought\": 0,\n \"amount\": 1,\n \"internationalPrice\": 125000,\n \"askPrice\": 125000,\n \"retailPrice\": 125000,\n \"createdAt\": \"2016-05-10T13:50:21.775Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFind",
            "description": "<p>Cars with this stockId not Found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Cars with this stockId not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cars.js",
    "groupTitle": "Advanced"
  },
  {
    "type": "post",
    "url": "/cart",
    "title": "Add Car into basket",
    "name": "addToOrder",
    "group": "Basket",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "stockId",
            "description": "<p>Send it in the body of the request. Field name - stockId</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "userId",
            "description": "<p>Send it in the body of the request. Field name - userId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "String",
            "description": "<p>Return order ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "5731ed3de0be1da6445201e1",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissFields",
            "description": "<p>UserId,StockId are required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "UserId,StockId are required",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cart.js",
    "groupTitle": "Basket"
  },
  {
    "type": "get",
    "url": "'/confirm/:orderId'",
    "title": "Confirm Order",
    "name": "confirmOrder",
    "group": "Basket",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "orderId",
            "description": "<p>Send it as the query param of the request.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "String",
            "description": "<p>Return confirmed order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "5731ed3de0be1da6445201e1",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissField",
            "description": "<p>OrderId required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "OrderId required",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cart.js",
    "groupTitle": "Basket"
  },
  {
    "type": "delete",
    "url": "/cart",
    "title": "Delete the Car from the basket",
    "name": "deleteFromOrder",
    "group": "Basket",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "stockId",
            "description": "<p>Send it in the body of the request. Field name - stockId</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "orderId",
            "description": "<p>Send it in the body of the request. Field name - orderId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "String",
            "description": "<p>Return order ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "5731ed3de0be1da6445201e1",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissFields",
            "description": "<p>OrderId,StockId are required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "OrderId,StockId are required",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cart.js",
    "groupTitle": "Basket"
  },
  {
    "type": "put",
    "url": "/cart",
    "title": "Update car amount in the order",
    "name": "updateOrder",
    "group": "Basket",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "stockId",
            "description": "<p>Send it in the body of the request. Field name - stockId</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "orderId",
            "description": "<p>Send it in the body of the request. Field name - orderId</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "amount",
            "description": "<p>Send it in the body of the request. Field name - amount</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "String",
            "description": "<p>Return amount of updated items</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Modifed 0 items",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissFields",
            "description": "<p>OrderId,StockId,amount are required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "OrderId,StockId,amount are required",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cart.js",
    "groupTitle": "Basket"
  },
  {
    "type": "get",
    "url": "'/view/:orderId'",
    "title": "View Order Info",
    "name": "viewOrder",
    "group": "Basket",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "orderId",
            "description": "<p>Send it as the query param of the request.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Return",
            "description": "<p>info about order</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\"_id\": \"572c5278cad95edf18ac9a19\",\n\"userId\": \"572b3ed33baead6c02a18c8a\",\n\"__v\": 0,\n\"createdAt\": \"2016-05-10T14:25:30.044Z\",\n\"status\": \"pending\",\n\"items\": [\n  {\n    \"stockId\": \"111\",\n    \"_id\": \"572c5278cad95edf18ac9a1a\",\n    \"amount\": 1\n  },\n  {\n    \"stockId\": \"111\",\n    \"_id\": \"572c5286cad95edf18ac9a1b\",\n    \"amount\": 1\n  }\n]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissField",
            "description": "<p>OrderId required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "OrderID required",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cart.js",
    "groupTitle": "Basket"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Request for home page",
    "name": "getAllCars",
    "group": "Home",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": true,
            "field": "Array",
            "description": "<p>Return info about all cars(_id,color,model,retailPrice)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " [\n{\n \"_id\": \"5731afcbc2eaafe41f4e26c5\",\n \"model\": \"G55\",\n \"color\": \"BLACK\",\n \"retailPrice\": 0\n},\n{\n \"_id\": \"5731afcbc2eaafe41f4e26c6\",\n \"model\": \"C300W4\",\n \"color\": \"\",\n \"retailPrice\": 5159000\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cars.js",
    "groupTitle": "Home"
  },
  {
    "type": "get",
    "url": "/cars/:id",
    "title": "Request for get single car info",
    "name": "getSingleCar",
    "group": "Home",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "carId",
            "description": "<p>Sends as the query param</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "carInfo",
            "description": "<p>Return info about single car</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"_id\": \"5731afcbc2eaafe41f4e26c6\",\n \"stockId\": \"112\",\n \"VINCode\": \"55SWF4KB1FU091383\",\n \"make\": \"MERCEDES-BENZ\",\n \"model\": \"C300W4\",\n \"color\": \"\",\n \"year\": 2015,\n \"mileage\": 10,\n \"carState\": \"New\",\n \"transmissionType\": \"Manual\",\n \"cost\": 18500,\n \"__v\": 0,\n \"bought\": 0,\n \"amount\": 1,\n \"internationalPrice\": 0,\n \"askPrice\": 5159000,\n \"retailPrice\": 5159000,\n \"createdAt\": \"2016-05-10T09:54:19.245Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFind",
            "description": "<p>Car with current carId not find</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Not Find",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cars.js",
    "groupTitle": "Home"
  },
  {
    "type": "post",
    "url": "/new",
    "title": "Request for writing new car into DB",
    "name": "newCar",
    "group": "Home",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "stockId",
            "description": "<p>Send it in the body of the request. Field name - stockId</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "userId",
            "description": "<p>Send it in the body of the request. Field name - userId</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "VinCode",
            "description": "<p>Send it in the body of the request. Field name - userId</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "make",
            "description": "<p>Send it in the body of the request. Field name - make</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "model",
            "description": "<p>Send it in the body of the request. Field name - model</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "color",
            "description": "<p>Send it in the body of the request. Field name - color</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "year",
            "description": "<p>Send it in the body of the request. Field name - year</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "mileage",
            "description": "<p>Send it in the body of the request. Field name - mileage</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "carState",
            "description": "<p>Send it in the body of the request. Field name - carState</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "transmissionType",
            "description": "<p>Send it in the body of the request. Field name - transmissionType</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "entryDate",
            "description": "<p>Send it in the body of the request. Field name - entryDate</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "cost",
            "description": "<p>Send it in the body of the request. Field name - cost</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "dealerId",
            "description": "<p>Send it in the body of the request. Field name - dealerId</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "internationalPrice",
            "description": "<p>Send it in the body of the request. Field name - internationalPrice</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "askPrice",
            "description": "<p>Send it in the body of the request. Field name - askPrice</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "retailPrice",
            "description": "<p>Send it in the body of the request. Field name - retailPrice</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"__v\": 0,\n \"stockId\": \"1020301\",\n \"available\": true,\n \"make\": \"Fake\",\n \"model\": \"Fake V-Power\",\n \"color\": \"Red\",\n \"year\": 2000,\n \"mileage\": 999,\n \"carState\": \"Used\",\n \"transmissionType\": \"Manual\",\n \"entryDate\": \"2015-10-09T21:00:00.000Z\",\n\"cost\": 125000,\n \"dealerId\": 222,\n\"_id\": \"5731e71fe0be1da6445201df\",\n \"bought\": 0,\n \"amount\": 1,\n \"internationalPrice\": 125000,\n \"askPrice\": 125000,\n \"retailPrice\": 125000,\n \"createdAt\": \"2016-05-10T13:50:21.775Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/cars.js",
    "groupTitle": "Home"
  },
  {
    "type": "get",
    "url": "/admin/allUsers/:userId",
    "title": "Request for All of users information",
    "name": "allUsers",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "userId",
            "description": "<p>Only if user is an admin , he can research this route</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": true,
            "field": "Array",
            "description": "<p>Users Info(_id,email,dateOfBirth,name).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n {\n  \"_id\": \"1234567891321\",\n  \"email\": \"docs@mail.ru\",\n  \"dateOfBirth : \"10-10-1990\",\n  \"name\" : \"Name\"\n },\n {\n  \"_id\": \"12345678913221\",\n  \"email\": \"docs2@mail.ru\",\n  \"dateOfBirth : \"10-10-1990\",\n  \"name\" : \"Name\"\n }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission",
            "description": "<p>Current user is not a Admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Permission Denied",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "delete",
    "url": "/admin/delete/:userId",
    "title": "Request for deleting user from DB",
    "name": "deleteUser",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "userId",
            "description": "<p>Only if user is an admin , he can research this route( sends as a query param  )</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "deletingUser",
            "description": "<p>Id of user which will be delete(sends in the body of the request. Field name - userId)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "String",
            "description": "<p>Delete user from DB and return the string.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"Deleted!\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission",
            "description": "<p>Current user is not a Admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Permission Denied",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/admin/lastOrders/:userId",
    "title": "Request for last week orders",
    "name": "lastOrders",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "userId",
            "description": "<p>Only if user is an admin , he can research this route</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": true,
            "field": "Array",
            "description": "<p>Return array of orders not later last week.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n \"Sunday 0\",\n \"Monday 0\",\n \"Tuesday 1\",\n \"Wednesday 0\",\n  \"Thursday 0\",\n \"Friday 0\",\n \"Saturday 0\"\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission",
            "description": "<p>Current user is not a Admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Permission Denied",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/admin/topCars/:userId",
    "title": "Request for top five sold cars",
    "name": "topCars",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "userId",
            "description": "<p>Only if user is an admin , he can research this route</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": true,
            "field": "Array",
            "description": "<p>Cars Info for top 5 sold cars .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n {\n  \"_id\": \"5731afcbc2eaafe41f4e26c5\",\n  \"stockId\": \"111\",\n  \"VINCode\": \"WDCYC7BF3BX190255\",\n  \"make\": \"MERCEDES-BENZ\",\"model\": \"G55\",\n  \"color\": \"BLACK\",\n  \"year\": 2011,\n  \"mileage\": 18234,\n  \"carState\": \"Used\",\n  \"transmissionType\": \"Manual\",\n  \"cost\": 9425000,\n  \"__v\": 0,\n  \"bought\": 0,\n  \"amount\": 1,\n  \"internationalPrice\": 0,\n  \"askPrice\": 0,\n  \"retailPrice\": 0,\n  \"createdAt\": \"2016-05-10T09:54:19.245Z\"\n },\n     {\n  \"_id\": \"5731afcbc2ef4e23423c5\",\n  \"stockId\": \"112\",\n  \"VINCode\": \"WDCYC7BF3BX190255\",\n  \"make\": \"MERCEDES-BENZ\",\"model\": \"G55\",\n  \"color\": \"BLACK\",\n  \"year\": 2011,\n  \"mileage\": 18234,\n  \"carState\": \"Used\",\n  \"transmissionType\": \"Manual\",\n  \"cost\": 9425000,\n  \"__v\": 0,\n  \"bought\": 0,\n  \"amount\": 1,\n  \"internationalPrice\": 0,\n  \"askPrice\": 0,\n  \"retailPrice\": 0,\n  \"createdAt\": \"2016-05-10T09:54:19.245Z\"\n },\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission",
            "description": "<p>Current user is not a Admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Permission Denied",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/admin/topCars/:userId",
    "title": "Request for top five sold cars",
    "name": "topCars",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "userId",
            "description": "<p>Only if user is an admin , he can research this route</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": true,
            "field": "Array",
            "description": "<p>Cars Info for top 5 sold cars .</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n {\n  \"_id\": \"5731afcbc2eaafe41f4e26c5\",\n  \"stockId\": \"111\",\n  \"VINCode\": \"WDCYC7BF3BX190255\",\n  \"make\": \"MERCEDES-BENZ\",\"model\": \"G55\",\n  \"color\": \"BLACK\",\n  \"year\": 2011,\n  \"mileage\": 18234,\n  \"carState\": \"Used\",\n  \"transmissionType\": \"Manual\",\n  \"cost\": 9425000,\n  \"__v\": 0,\n  \"bought\": 0,\n  \"amount\": 1,\n  \"internationalPrice\": 0,\n  \"askPrice\": 0,\n  \"retailPrice\": 0,\n  \"createdAt\": \"2016-05-10T09:54:19.245Z\"\n },\n     {\n  \"_id\": \"5731afcbc2ef4e23423c5\",\n  \"stockId\": \"112\",\n  \"VINCode\": \"WDCYC7BF3BX190255\",\n  \"make\": \"MERCEDES-BENZ\",\"model\": \"G55\",\n  \"color\": \"BLACK\",\n  \"year\": 2011,\n  \"mileage\": 18234,\n  \"carState\": \"Used\",\n  \"transmissionType\": \"Manual\",\n  \"cost\": 9425000,\n  \"__v\": 0,\n  \"bought\": 0,\n  \"amount\": 1,\n  \"internationalPrice\": 0,\n  \"askPrice\": 0,\n  \"retailPrice\": 0,\n  \"createdAt\": \"2016-05-10T09:54:19.245Z\"\n },\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission",
            "description": "<p>Current user is not a Admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Permission Denied",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "get",
    "url": "/admin/topUsers/:userId",
    "title": "Request for top five users",
    "name": "topUsers",
    "group": "admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "userId",
            "description": "<p>Only if user is an admin , he can research this route</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": true,
            "field": "Array",
            "description": "<p>Info for 5 users with higher field 'sendOrders'.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n{\n\"_id\": \"573194ccd146638f11967807\",\n \"name\": \"Test3\",\n \"surName\": \"Test3\",\n \"email\": \"test3@mail.ru\",\n \"password\": \"$2a$10$L7khGg/v9Qps2spOKxtTrei/axhviivf.714PJZd1icDLXXXUqVNa\",\n \"__v\": 0,\n \"ownCars\": [],\n \"sendOrders\": 0,\n \"rules\": \"Simple\",\n \"createdAt\": \"2016-05-10T07:58:20.079Z\"\n},\n{\n \"_id\": \"5731aca0802e70481efa7acb\",\n \"name\": \"Test4\",\n \"surName\": \"Test4\",\n \"email\": \"test5@mail.ru\",\n \"password\": \"$2a$10$YNfJ/Uf5L1SLFyf72F2o9./O/g3R/DQ.D8uoeh7xB4.vnognJSvHS\",\n \"__v\": 0,\n \"ownCars\": [\n   \"5244556\",\n   \"5244556\",\n   \"5244556\"\n ],\n \"sendOrders\": 0,\n \"rules\": \"Advanced\",\n \"createdAt\": \"2016-05-10T09:40:46.840Z\"\n}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission",
            "description": "<p>Current user is not a Admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Permission Denied",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/auth/login/",
    "title": "Request for logging in",
    "name": "login",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "email",
            "description": "<p>Send it in the body of the request. Field name - email</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "password",
            "description": "<p>Send it in the body of the request. Field name - password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "String",
            "description": "<p>Returns token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"asfsdkpkpo23k4p23okfpsdock23po4k23opk2fopk423pokvp212234\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFind",
            "description": "<p>Current user not find in the DB</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Not Find",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/auth/sign/",
    "title": "Request for sign in",
    "name": "sign",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "name",
            "description": "<p>Send it in the body of the request. Field name - name</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "surName",
            "description": "<p>Send it in the body of the request. Field name - surName</p>"
          },
          {
            "group": "Parameter",
            "type": "NotRequired",
            "optional": false,
            "field": "dateOfBirth",
            "description": "<p>Send it in the body of the request. Format - 10-10-1990 , field name - dateOfBirth</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "email",
            "description": "<p>Send it in the body of the request. Field name - email</p>"
          },
          {
            "group": "Parameter",
            "type": "Required",
            "optional": false,
            "field": "password",
            "description": "<p>Send it in the body of the request. Field name - password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "String",
            "description": "<p>Returns token with user info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"asfsdkpkpo23k4p23okfpsdock23po4k23opk2fopk423pokvp212234\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFind",
            "description": "<p>Current user not find in the DB</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Not Find",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/auth.js",
    "groupTitle": "auth"
  }
] });
