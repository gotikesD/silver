# Here I will describe detail info about every  single route, grouped by gategory
# Every previous category of user routes available for the next group

#   UserCategory - USER WITHOUT LOGIN

# Route - http://localhost:3000/
# Type - get
# Requirements - none
# Success return - Array of Objects(Cars Info)

# Route - http://localhost:3000/cars/:id
# Type - get
# Requirements - query param 'id'
# Success return - Object(Car Info)

# Route - http://localhost:3000/auth/sign
# Type - post
# Requirements - req.body : name,surName,email,password
# Not necessary - req.body : dateOfBirth
# Success return -Object(User Info)

# Route - http://localhost:3000/auth/login
# Type - post
# Requirements - req.body : email,password
# Success return -String(token)


#   UserCategory - LOGGED USER(SIMPLE)


# Route - http://localhost:3000/cart/
# Type - post
# Requirements - req.headers : x-access-token
# Requirements - req.body : stockId
# Success return -Object(Cart Id)

# Route - http://localhost:3000/cart/:orderId
# Type - delete
# Requirements - req.headers : x-access-token
# Requirements - req.params : orderId
# Requirements - req.body : stockId
# Success return -Object(Cart Id) 

# Route - http://localhost:3000/cart/:orderId
# Type - put
# Requirements - req.headers : x-access-token
# Requirements - req.params : orderId
# Requirements - req.body : stockId,amount
# Success return -String (How many items updated)

# Route - http://localhost:3000/cart/view/:cartId
# Type - get
# Requirements - req.headers : x-access-token
# Requirements - req.params : orderId
# Success return - Object(Full Order InFo)

# Route - http://localhost:3000/cart/confirm/:cartId
# Type - post
# Requirements - req.headers : x-access-token
# Requirements - req.params : orderId
# Success return -Object(Cart Id) 

# Route - http://localhost:3000/cars/
# Type - post
# Requirements - req.headers : x-access-token
# Requirements - req.body : stockId
# Not necessary - req.body : color,year,mileage,carState,transmissionType,entryDate,cost,dealerId
# Success return -Object(Created Car Full Info) and change current user status from SIMPLE to ADVANCED 



#   UserCategory - LOGGED USER(ADVANCED)

# Route - http://localhost:3000/advanced/cars/
# Type - delete
# Requirements - req.headers : x-access-token
# Requirements - req.body : stockId
# Success return -String(Car deleted..) 

# Route - http://localhost:3000/advanced/cars/
# Type - put
# Requirements - req.headers : x-access-token
# Requirements - req.body : stockId
# Not necessary - req.body : VinCode,make,model,color,year,mileage,carState,transmissionType,entryDate,cost,dealerId,internationalPrice,askPrice,retailPrice
# Success return - Object(Updated Car)


# Route - http://localhost:3000/advanced/cars/
# Type - get
# Requirements - req.headers : x-access-token
# Success return -Array of Objects(User own cars) 

# Route - http://localhost:3000/advanced/cars/:carId
# Type - get
# Requirements - req.headers : x-access-token
# Requirements - req.params : carId
# Success return - Objects(Single car Info) 




#   UserCategory - LOGGED USER(ADMIN)

# Route - http://localhost:3000/admin/users
# Type - get
# Requirements - req.headers : x-access-token
# Success return -Array of Objects(Info about All users) 

# Route - http://localhost:3000/admin/users/:userId
# Type - get
# Requirements - req.headers : x-access-token
# Requirements - req.params : userId
# Success return - Info about single user 

# Route - http://localhost:3000/admin/topCars
# Type - get
# Requirements - req.headers : x-access-token
# Success return -Array of Objects(Info about top 5 sold cars) 

# Route - http://localhost:3000/admin/topUsers
# Type - get
# Requirements - req.headers : x-access-token
# Success return -Array of Objects(Info about top 5 buyers) 

# Route - http://localhost:3000/admin/lastOrders
# Type - get
# Requirements - req.headers : x-access-token
# Success return -Array of Objects(Info about amount of orders per day from last week) 