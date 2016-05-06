const User = require('../models/user');
const Cars = require('../models/carsItem');

module.exports = {

  getAllUsers : (req,res,next) => {
      User.find({},{ _id : 1 , dateOfBirth: 1, name: 1 , email : 1})
          .then((data) => {
              res.json(data)
          })
            .catch((err)=> {
                next(new Error(err))
            })
  },

  deleteUser : (req,res,next) => {
      let userId = req.body.userId;
      if(!userId) {
          next(new Error('User Id required'))
      }
      User.remove({ _id : userId } , (err,removedUser) => {
            if(err) next(new Error(err))
              Cars.remove({ userId : userId } , (err,removedCars) => {
                  if(err) next(new Error(err))
                  res.end('Deleted from UsersDB and CarsDB')
              })
      })

  }
};