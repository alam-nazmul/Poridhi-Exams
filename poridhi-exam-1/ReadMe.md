## Required packages ##
 - mysql-server
 - mysql-client
 - nodejs-server(version 18)
 - react-lib
 - npm

## MYSQL

### Install mysql package with all dependencies ###

```
dnf install mysql* -y
```

### Enable and restart the mysql service
```
systemctl enable mysqld --now
```

### Secure mysql installation ###
```
mysql_secure_installation
```

### Access to the mysql server with "root" user
```
mysql -u root -p
```

### Show databases list
```
show databases;
```

### Create a database
```
create database agdum;
```

### Enter the newly created db
```
use agdum;
```

### Create a table with requried elements
```
CREATE TABLE agdum.books (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    description VARCHAR(255) NOT NULL,
    cover VARCHAR(45),
    price INT NOT NULL,
    PRIMARY KEY (id)
);
```

### Insert data in the table
```
INSERT INTO agdum.books (title, description, cover, price) VALUES ('Harry play', 'Porter Book', 'Wizard world', 25);
```

### Check the data on table
```
select * from books
```



## Install NodeJs version 18

### Install NPM
```
dnf install npm* -y
```

### Install epel latest packages
```
dnf install epel-release -y
```

### Update the packages
```
dnf update --nobest -y
```

### Show the module list
```
dnf module list
```

### Install NodeJS version 18
```
dnf module install nodejs:18
```

### Check the installed nodejs version
```
node --version
```

## Devlop the backend application 

### Create a directory name as "backend"
```
mkdir backend
cd backend
```

### Initilized npm server
```
npm init -y
```

### Install nessceary libraries
```
npm i express mysql nodemon 
```
// nodemon will provide the hard reload when we make any changes on main application file 

### Create our main js file
```
vim root,js

    import express from "express";
    const app = express();

    app.listen(8899, ()=>{
        console.log("connected to backend")
    });
```

### Edit "package.json" file
```
  "main": "root.js",    // Coustomize main file 
  "type": "module",     // Enable to add modules 

  "start": "nodemon root.js"    // to clear the current session when we make any changes in main file
```



## Devlop frontend application

### Create a directory name as "frontend"
```
mkdir frontend
cd frontend
```

### Creating React app inside the frontend directory
```
npx create-react-app .
```

### Lets start our app from client side
```
npm start
```

### Install react router dom
```
npm i react-router-dom
```


