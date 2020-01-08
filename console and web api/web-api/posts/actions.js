const fs = require('fs');
const path = require('path');
const { emailValidator } = require('../helper');
const con = require('../database');

getAllPostsQuery = () => {
    const query = 'SELECT * FROM post';
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

getAllPosts = async(req, res) => {
    try {
        const users = await getAllPostsQuery();
        res.status(200).send(users);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificPostQuery = (userId) => {
    const query = 'SELECT * FROM post WHERE id = ? AND likes = 44';
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

getSpecificPosts = async(req, res, next) => {
    const userId = req.params.id;

    if (userId <= 0) {
        var error = new Error("Id can not be less than 1!");
        error.status = 401;
        return next(error);
    }
    
    try {
        const user = await getSpecificPostQuery(userId);
        res.status(200).send(user[0]);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

 createPostQuery = () => {
    var date = new Date(); 
    myDate = Date.parse(date.toISOString().slice(0, 19).replace('T', ' ')); 
    console.log(typeof myDate);
  //myDate =  moment(data.myTime.format('YYYY/MM/DD HH:mm:ss')).format("YYYY-MM-DD HH:mm:ss");  
   const query = 'INSERT INTO post (id, text, likes, createdOn) VALUES (1, "Ova e mojot TRET testen post", 88, NOW())';
   //"2019-10-28 15:55:37")';
   //' + myDate + ')';
   console.log(query);
 //const query = 'INSERT INTO post (id, text, likes, createdOn) VALUES (?, ?, ?, ?)';
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

createPost = async(req, res, next) => {
  // isVali vraka validacijata vo helperot
    let isValid = true;
    if (!isValid) {
        var error = new Error("Email is not valid!");
        error.status = 401;
        return next(error);
    }
   
    try{
        const user = await createPostQuery();
        res.status(201).send("Post has been created!");

    }catch (error) {
        res.status(500).send(error.message);
    }

}; 

deletePostsQuery = () => {
    const query = 'DELETE FROM post';
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

deletePosts = async(req, res, next) => {
    
     try{
         const user = await deletePostsQuery();
         res.status(201).send("All posts has been deleted!");
 
     }catch (error) {
         res.status(500).send(error.message);
     }
 
}; 


deleteUserPostsQuery = (userId) => {
    const query = 'DELETE FROM post WHERE Id = ?'
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

deleteUserPosts = async(req, res, next) => {
    const userId = req.params.id;
     try{
         const user = await deleteUserPostsQuery(userId);
         res.status(201).send("User posts have been deleted!");
 
     }catch (error) {
         res.status(500).send(error.message);
     }
 
}; 

module.exports = {
    getAllPosts,
    getSpecificPosts,
    createPost,
    deletePosts,
    deleteUserPosts
}