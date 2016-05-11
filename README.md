# Here I will describe detail info about every  single route, grouped by gategory
# Every previous category of user routes available for the next group

#   UserCategory - USER WITHOUT LOGIN

# Route - http://localhost:3000/
# Type - get
# Requirments - none
# Sucsess return - Array of Objects(Cars Info)

# Route - http://localhost:3000/cars/:id
# Type - get
# Requirments - query param 'id'
# Sucsess return - Array of Objects(Cars Info)

# Route - http://localhost:3000/auth/sign
# Type - post
# Requirments - req.body : name,surName,email,password
# Not necessary - req.body : dateOfBirth
# Sucsess return -Object(User Info)

# Route - http://localhost:3000/auth/login
# Type - post
# Requirments - req.body : email,password
# Sucsess return -String(token)


#   UserCategory - LOGGED USER(SIMPLE)



# Route - http://localhost:3000/cart/
# Type - post
# Requirments - req.headers : x-access-token
# Requirments - req.body : userId,stockId
# Sucsess return -Object(Order Id)

# Route - http://localhost:3000/cart/:orderId
# Type - delete
# Requirments - req.headers : x-access-token
# Requirments - req.params : orderId
# Requirments - req.body : userId,stockId
# Sucsess return -Object(Order Id) 

# Route - http://localhost:3000/cart/:orderId
# Type - put
# Requirments - req.headers : x-access-token
# Requirments - req.params : orderId
# Sucsess return -String (How many items updated)

# Route - http://localhost:3000/cart/view/:orderId
# Type - get
# Requirments - req.headers : x-access-token
# Requirments - req.params : orderId
# Requirments - req.body : userId,stockId,amount
# Success return -String (How many items were updated)

# Route - http://localhost:3000/cart/confirm/:orderId
# Type - get
# Requirements - req.headers : x-access-token
# Requirements - req.params : orderId
# Success return -Object(Order Id) 

# Route - http://localhost:3000/new/
# Type - post
# Requirements - req.headers : x-access-token
# Requirements - req.body : stockId,userId,VinCode,make,model,
# Not necessary - req.body : color,year,mileage,carState,transmissionType,entryDate,cost,dealerId,internationalPrice,askPrice,retailPrice
# Success return -Object(Created Car Full Info) and change current user status from SIMPLE to ADVANCED 



#   UserCategory - LOGGED USER(ADVANCED)

# Route - http://localhost:3000/delete/
# Type - delete
# Requirements - req.headers : x-access-token
# Requirements - req.body : userId,stockId
# Success return -String(Car deleted..) 

# Route - http://localhost:3000/update/
# Type - put
# Requirements - req.headers : x-access-token
# Requirements - req.body : userId,stockId
# Not necessary - req.body : VinCode,make,model,color,year,mileage,carState,transmissionType,entryDate,cost,dealerId,internationalPrice,askPrice,retailPrice
# Success return - Object(Updated Car)


#   UserCategory - LOGGED USER(ADMIN)

# Route - http://localhost:3000/admin/allUsers/:userId
# Type - get
# Requirements - req.headers : x-access-token
# Requirements - req.params : userId
# Success return -Array of Objects(Info about All users) 

# Route - http://localhost:3000/admin/allUsers/:userId
# Type - get
# Requirements - req.headers : x-access-token
# Requirements - req.params : userId
# Requirements - req.body : userId
# Success return - String(Deleted) 

# Route - http://localhost:3000/admin/topCars/:userId
# Type - get
# Requirements - req.headers : x-access-token
# Requirements - req.params : userId
# Success return -Array of Objects(Info about top 5 sold cars) 

# Route - http://localhost:3000/admin/topUsers/:userId
# Type - get
# Requirements - req.headers : x-access-token
# Requirements - req.params : userId
# Success return -Array of Objects(Info about top 5 buyers) 

# Route - http://localhost:3000/admin/lastOrders/:userId
# Type - get
# Requirements - req.headers : x-access-token
# Requirements - req.params : userId
# Success return -Array of Objects(Info about amount of orders per day from last week) 