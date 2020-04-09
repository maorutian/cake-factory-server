Host: https://cakefactoryserver.herokuapp.com/

# API

## List：
	1.1) get all categories
	1.2) insert a new category
	1.3) delete category by id
	1.4) update category by id
	  2) get info of the category by id
	3.1) get all products
	3.2) insert a new product
	3.3) delete product by id
	3.4) update product by id
	  4) get info of the product by id
	  5) search product by name or desc
	  6) change product status(in stock/out of stock)
	7.1) upload a image
	7.2) delete a image
	8.1) get all roles
	8.2) add a now role
	8.3) delete a role by id
	8.4) update a role
	9.1) get all users
	9.2) add a new user
	9.3) delete user by id
	9.4) update user by id
	 10) login



## 1. URL  ```/api/categories```
### Test:  https://cakefactoryserver.herokuapp.com/api/categories
### 1.1 Request method： ```GET```
### 1.1 Description: get all categories
### 1.1 Success Example：
	[
  	  {
   	      "_id": "5e65a7f179b1dd61ce218f84",
   	      "name": "cake",
   	      "__v": 0
 	   },
	   {
  	      "_id": "5e65a9c079b1dd61ce218f85",
   	      "name": "cookie",
  	      "__v": 0
 	  }
	]
   
### 1.2 Request method： ```POST```
### 1.2 Description: insert a new category
### 1.2 Parameters
	|Parameter   |Required  |Type     |Description
	|name        |Y         |string   |category name


### 1.2 Success Example：
	{
	  "_id": "5e680ff7fc27415c203230b1",
	  "name": "bread",
	  "__v": 0
	}     
### 1.2 Failure：
	400: Category exists
	422: Data validation error
	 
### 1.3 Request method： ```DELETE```
### 1.3 Description: delete category by id
### 1.3 Parameters
	|Parameter	 |Required  |Type     |Description
	|id              |Y         |string   |category id


### 1.3 Success Example：
	{
 	 "msg": "Category deleted"
	}
      
### 1.3 Failure：
	404: Category does not exist
### 1.4 Request method： ```PUT```
### 1.4 Description: update category by id
### 1.4 Parameters
	|Parameter   |Required  |Type     |Description
	|id          |Y         |string   |category id
	|name        |Y         |string   |category name, unique

### 1.4 Success Example：
	{
	  "_id": "5e680f8272c20e5bf4ea2068",
	  "name": "drink",
	  "__v": 0
	}

### 1.4 Failure：
	404: Category does not exist
	422: Data validation error
	???- miss 1 dig-Cast to ObjectId failed for value "5e65ad0255001363650c022" at path "_id" for model "category"

## 2. URL  ```/api/category/:id```
### Test:  https://cakefactoryserver.herokuapp.com/api/category/5e65a9c079b1dd61ce218f85
### 2 Request method： ```GET```
### 2 Description: get info of the category by id
### 2 Success Example：
	{
 	   "_id": "5e65ad0255001363650c0228",
 	   "name": "cup cake",
 	   "__v": 0
	}
### 2 Failure：
	404: Category does not exist
 	???? id is not 11, server error

	
## 3. URL  ```/api/products```
### Test:  https://cakefactoryserver.herokuapp.com/api/products?pageNum=1&pageSize=5
### 3.1 Request method： ```GET```
### 3.1 Description: get all products
### 3.1 Parameters
	|Parameter  |Required  |Type     |Description
	|pageNum    |Y         |Number   |how many page we have
	|pageSize   |Y         |Number   |the number of records in each page
### 3.1 Success Example：
	/products?pageNum=1&pageSize=2
	{
  	  "pageNum": 1,
  	  "total": 2,
  	  "pages": 1,
  	  "pageSize": 2,
  	  "list": [
		    {
		      "status": 1,
		      "imgs": [],
		      "_id": "5e66f8851f92d322df8d4d8d",
		      "name": "baked blueberry cheesecake",
		      "category": "5e65a7f179b1dd61ce218f84",
		      "price": 100,
		      "__v": 0
  		    },
		    {
		      "status": 1,
		      "imgs": [],
		      "_id": "5e67dc6e1f92d322df8d4d90",
		      "name": "Buttercream flower cake2",
		      "category": "5e65a7f179b1dd61ce218f84",
		      "price": 98,
		      "__v": 0
		    }
  		]
	}
   
### 3.2 Request method： ```POST```
### 3.2 Description: insert a new product
### 3.2 Parameters
    |Parameter   |Required  |Type     |Description
    |name        |Y         |string   |product name, unique
    |category    |Y         |string   |category id
    |price       |Y         |string   |product price (0.10-1000.00)
    |desc        |N         |string   |product description
    |detail      |N         |string   |product detail
    |imgs        |N         |array    |product imags array


### 3.2 Success Example：
	{
	  "status": 1,
	  "imgs": [],
	  "_id": "5e68123b3601475d2d607273",
	  "name": "Greek Yogurt Cheesecake",
	  "category": "5e65a9c079b1dd61ce218f85",
	  "price": 80,
	  "__v": 0
	}     
### 3.2 Failure：
	400: Product exists
	422: Data validation error

	 
### 3.3 Request method： ```DELETE```
### 3.3 Description: delete product by id
### 3.3 Parameters
	|Parameter   |Required  |Type     |Description
	|id          |Y         |string   |product id


### 3.3 Success Example：
	{
 	 "msg": "product deleted"
	}
      
### 3.3 Failure：
	404: Product does not exist
### 3.4 Request method： ```PUT```
### 3.4 Description: update product by id
### 3.4 Parameters
    |Parameter   |Required  |Type     |Description
    |id          |Y         |string   |product id
    |name        |Y         |string   |product name, unique
    |category    |Y         |string   |category id
    |price       |Y         |string   |product price (0.10-1000.00)
    |desc        |N         |string   |product description
    |detail      |N         |string   |product detail
    |imgs        |N         |array    |product imags array

### 3.4 Success Example：
	{
	  "_id": "5e6812103601475d2d607272",
	  "name": "Buttercream flower cake777",
	  "category": "5e65a7f179b1dd61ce218f84",
	  "price": 98
	}     
### 3.4 Failure：
	404: Product does not exist
	422: Data validation error


## 4. URL  ```/api/product/:id```
### Test:  https://cakefactoryserver.herokuapp.com/api/product/5e66f8851f92d322df8d4d8d
### 4 Request method： ```GET```
### 4 Description: get info of the product by id
### 4 Success Example：
	{
  	  "status": 1,
   	   "imgs": [],
  	   "_id": "5e66f8851f92d322df8d4d8d",
  	   "name": "baked blueberry cheesecake",
  	   "category": "5e65a7f179b1dd61ce218f84",
  	   "price": 100,
  	   "__v": 0
	}	
### 4 Failure：
	404: Product does not exist
 	???? id is not 11, server error
 	
 	
## 5. URL  ```/api/productsearch```
### Test:  https://cakefactoryserver.herokuapp.com/api/productsearch?pageNum=1&pageSize=3&productName=cake
### 5 Request method： ```GET```
### 5 Description: search product by name or desc
### 5 Parameters
    |Parameter     |Required  |Type     |Description
    |pageNum       |Y         |Number   |how many page we have
    |pageSize      |Y         |Number   |the number of records in each page
    |productName   |N         |String   |product name search key word
    |productDesc   |N         |String   |product desc search key word
### 5 Success Example：
	/productsearch?pageNum=1&pageSize=2&productName=cake
	{
	  "pageNum": 1,
	  "total": 2,
	  "pages": 1,
	  "pageSize": 2,
	  "list": [
	    {
	      "status": 1,
	      "imgs": [],
	      "_id": "5e66f8851f92d322df8d4d8d",
	      "name": "baked blueberry cheesecake",
	      "category": "5e65a7f179b1dd61ce218f84",
	      "price": 100,
	      "__v": 0
	    },
	    {
	      "status": 1,
	      "imgs": [],
	      "_id": "5e67dc6e1f92d322df8d4d90",
	      "name": "Buttercream flower cake2",
	      "category": "5e65a7f179b1dd61ce218f84",
	      "price": 98,
	      "__v": 0
	    }
	  ]
	}

## 6. URL  ```/productstatus ```
### 6 Request method： ```PUT```
### 6 Description: change product status
### 6 Parameters
	|Parameter   |Required  |Type     |Description
	|id          |Y         |string   |category id
	|status      |Y         |number   |product status (1:in stock;0:out of stack)

### 6 Success Example：
	{
	  "id": "5e67dc6e1f92d322df8d4d90",
	  "status": "0"
	}  

	
## 7. URL  ```/images ```
### 7.1 Request method： ```POST```
### 7.1 Description: change product status
### 7.1 Parameters
	|Parameter   |Required  |Type        |Description
	|image       |Y         |media-type  |image file
### 7.1 Success Example：
	{
       "name": "image-1559466841118.jpg",
       "url": "http://localhost:5678/upload/image-1559466841118.jpg"
    }  
	 
### 7.2 Request method： ```DELETE```
### 7.2 Description: delete a image
### 7.2 Parameters
	|Parameter   |Required  |Type     |Description
	|name        |Y         |string   |image name, unique
### 7.2 Success Example：
	{
      "status": 0
    }

## 8. URL  ```/api/roles```
### 8.1 Request method： ```GET```
### 8.1 Description: get all roles
### 8.1 Success Example：
	[
	  {
			"menus": [
				"all",
				"/home",
				"/products",
				"/category",
				"/product",
				"/user",
				"/role",
				"/statistic",
				"/statistic/bar",
				"/statistic/line",
				"/statistic/pie"
				],
			"_id": "5e8d449d5f72b4b209fa42c7",
			"name": "Sales",
			"created_name": "admin",
			"created_time": 1586316445238,
			"__v": 0,
			"auth_name": "admin",
			"auth_time": 1586318136359
		},
		{
			"menus": [],
			"_id": "5e8d44bf5f72b4b209fa42c8",
			"name": "customer service",
			"created_name": "admin",
			"created_time": 1586316479470,
			"__v": 0
		}
	]  
### 8.2 Request method： ```POST```
### 8.2 Description: add a new role
### 8.2 Parameters
	|Parameter      |Required  |Type     |Description
	|id             |Y         |string   |role id
	|name           |Y         |string   |role name, unique
	|created_name   |Y         |string   |username who created the role
	|created_time   |Y         |string   |time when role is created
   
### 8.2 Success Example：
	{
	    "_id": "5e684787f85c3e73e55120b2",
	    "name": "Employee",
	    "create_name": "admin",
	    "created_time": 1582069504634,
	    "__v": 0
	}
### 8.2 Failure：
	400: Role exists
	422: Data validation error
	
### 8.3 Request method： ```DELETE```
### 8.3 Description: delete role by id
### 8.3 Parameters
	|Parameter   |Required  |Type     |Description
	|id          |Y         |string   |role id


### 8.3 Success Example：
	{
 	 "msg": "Role deleted"
	}
      
### 8.3 Failure：
	404: Role does not exist
### 8.4 Request method： ```PUT```
### 8.4 Description: Authorized role by id
### 8.4 Parameters
	|Parameter    |Required  |Type     |Description
	|id           |Y         |string   |role id
	|menus        |Y         |array    |menu items can be visited by this role
	|auth_name    |Y         |string   |username who authorized the role
	|auth_time    |Y         |string   |time when role is authorized

### 8.4 Success Example：
	
	{
		"menus": [
			"all",
			"/home",
			"/productskey",
			"/category",
			"/product",
			"/user",
			"/role",
			"/statistickey",
			"/statistic/bar",
			"/statistic/line",
			"/statistic/pie"
			],
		"_id": "5e8d444d5f72b4b209fa42c5",
		"name": "CEO",
		"created_name": "admin",
		"created_time": 1586316365443,
		"__v": 0,
		"auth_name": "admin",
		"auth_time": 1586316504043
	},
### 8.4 Failure：
	404: Role does not exist
	422: Data validation error

## 9. URL  ```/api/users```
### Test:  https://cakefactoryserver.herokuapp.com/api/users
### 9.1 Request method： ```GET```
### 9.1 Description: get all users
### 9.1 Success Example：
	[
	  {
	    "_id": "5e69330aba0d5ac9e8b74be5",
	    "username": "lily",
	    "role": "5e68427122205c720c463545",
	    "role_name": "CEO",
	    "create_time": 1583952650191,
	    "__v": 0
	  },
	  {
	    "_id": "5e6933851dfb54ca1f589e25",
	    "username": "lily2",
	    "role": "5e68427122205c720c463545",
	    "role_name": "CEO",
	    "email": "lily@gmail.com",
	    "create_time": 1583952773760,
	    "__v": 0
	  },
	  {
	    "_id": "5e693425be4a42ca3196e3ed",
	    "username": "jack",
	    "role": "5e68427122205c720c463545",
	    "role_name": "CEO",
	    "email": "jack@gmail.com",
	    "phone": "6574937554",
	    "create_time": 1583952933607,
	    "__v": 0
	  }
	]
### 9.2 Request method： ```POST```
### 9.2 Description: add a new user
### 9.2 Parameters
	|Parameter   |Required  |Type     |Description
	|username    |Y         |string   |username, unique
	|password    |Y         |string   |password
	|role        |Y         |string   |role id
	|phone       |N         |string   |phone
	|email       |N         |string   |email,unique

### 9.2 Success Example：
	{
	  "_id": "5e693c8657065cce93c35b54",
	  "username": "mia",
	  "password": "$2b$10$Kc91O5D3Qly2SkLjZLJnB.S6Wwxqw9l5WQkIdpf4xTj0hKxgJQjj.",
	  "role": "5e684787f85c3e73e55120b2",
	  "create_time": 1583955078302,
	  "__v": 0
	}
### 9.2 Failure：
	400: Username exists/ Email exists
	422: Data validation error
	
### 9.3 Request method： ```DELETE```
### 9.3 Description: delete user by id
### 9.3 Parameters
	|Parameter	 |Required  |Type     |Description
	|id              |Y         |string   |user id


### 9.3 Success Example：
	{
 	 "msg": "User deleted"
	}
      
### 9.3 Failure：
	404: User does not exist
### 9.4 Request method： ```PUT```
### 9.4 Description: update user by id
### 9.4 Parameters
	|Parameter   |Required  |Type     |Description
	|id          |Y         |string   |user id
	|username    |N         |string   |username, unique
	|password    |N         |string   |password
	|role        |N         |string   |role id
	|phone       |N         |string   |phone
	|email       |N         |string   |email,unique
  
### 9.4 Success Example：
	{
	  "_id": "5e693c8657065cce93c35b54",
	  "username": "mia",
	  "password": "$2b$10$Kc91O5D3Qly2SkLjZLJnB.S6Wwxqw9l5WQkIdpf4xTj0hKxgJQjj.",
	  "role": "5e684787f85c3e73e55120b2",
	  "create_time": 1583955078302,
	  "__v": 0
	}

### 9.4 Failure：
	404: User does not exist
	422: Data validation error


## 10 URL  ```/api/login```
### 10 Request method： ```POST```
### 10 Description: login
### 10 Parameters
	|Parameter       |Required  |Type     |Description
	|username        |Y         |string   |username	
	|password        |Y         |string   |password


### 10 Success Example：
	{
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU4YjZjMDZmM2I4Njc3ODE5ZDI0ZGQzIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJpYXQfszA"
	}

### 10 Failure：
	400: username does not exist/ password is wrong

