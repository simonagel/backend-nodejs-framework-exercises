const fs = require('fs');
const path = require('path');
const { emailValidator } = require('../helper');
const con = require('../database');

getAllUsersQuery = () => {
    const query = 'SELECT * FROM user';
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

getAllUsers = async(req, res) => {
    try {
        const users = await getAllUsersQuery();
        res.status(200).send(users);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificUserQuery = (userId) => {
    const query = 'SELECT * FROM user WHERE id = ?';
    return new Promise((resolve, reject) => {
        con.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

getSpecificUser = async(req, res, next) => {
    const userId = req.params.id;

    if (userId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const user = await getSpecificUserQuery(userId);
        res.status(200).send(user[0]);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createUserQuery = () => {
  // const query = 'INSERT INTO user (Name, Surname, Email, Age, isActive) VALUES ("Nikola", "Stojkovski", "nikola@gmail.com", 24, true)';
 const query = 'INSERT INTO user (Name, Surname, Email, Age, isActive) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        con.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
          });
    });
};

createUser = async(req, res, next) => {
   // console.log(req.body.email);
    //let isValid = emailValidator(req.body.email);
    let isValid = true;
    if (!isValid) {
        var error = new Error("Email is not valid!");
        error.status = 401;
        return next(error);
    }
   
    try{
        const user = await createUserQuery();
        res.status(201).send("User has been created!");

    }catch (error) {
        res.status(500).send(error.message);
    }

}; 


createUsersQuery = () => {
  const query = 'INSERT INTO user (Name, Surname, Email, Age, isActive) VALUES ?';
  let usersIns = [
      ["Martin", "Martinovski", "martin@gmail.com", 20,  false],
      ["Filip", "Filipovski", "filip@gmail.com", 31, true],
      ["Jovana", "Jovanovska", "jovan@gmail.com", 18, true],
    ];
     return new Promise((resolve, reject) => {
         con.query(query, [usersIns], (error, results, fields) => {
             if (error) {
                 reject(error);
             } else {
                 resolve(results);
             }
           });
     });
};
 
createUsers = async(req, res, next) => {
    // console.log(req.body.email);
     //let isValid = emailValidator(req.body.email);
     let isValid = true;
     if (!isValid) {
         var error = new Error("Email is not valid!");
         error.status = 401;
         return next(error);
     }
    
     try{
         const user = await createUsersQuery();
         res.status(201).send("Users has been created!");
 
     }catch (error) {
         res.status(500).send(error.message);
     }
 
}; 
 

deleteUsersQuery = () => {
    const query = 'DELETE FROM user WHERE Id > 2'
     return new Promise((resolve, reject) => {
         con.query(query, (error, results, fields) => {
             if (error) {
                 reject(error);
             } else {
                 resolve(results);
             }
           });
     });
};

deleteUsers = async(req, res, next) => {
    
     try{
         const user = await deleteUsersQuery();
         res.status(201).send("Users has been deleted!");
 
     }catch (error) {
         res.status(500).send(error.message);
     }
 
}; 


deleteUserQuery = (userId) => {
    const query = 'DELETE FROM user WHERE Id = ?'
     return new Promise((resolve, reject) => {
         con.query(query,[userId], (error, results, fields) => {
             if (error) {
                 reject(error);
             } else {
                 resolve(results);
             }
           });
     });
};

deleteUser = async(req, res, next) => {
    const userId = req.params.id;
     try{
         const user = await deleteUserQuery(userId);
         res.status(201).send("User has been deleted!");
 
     }catch (error) {
         res.status(500).send(error.message);
     }
 
}; 

module.exports = {
    getAllUsers,
    getSpecificUser,
    createUser,
    createUsers,
    deleteUsers,
    deleteUser
}