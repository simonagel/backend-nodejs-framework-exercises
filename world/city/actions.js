const conn = require('../database');

const { populationValidator } = require('../helper');

const pp = require('../helper');


getAllCityQuery = () => {
    const query = 'SELECT * FROM city';
    return new Promise ((resolve, reject) => {
        conn.query(query, (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve(results);
            }    
        });
    });
};


getAllCity = async(req, res) => {
    try{
        const cities = await getAllCityQuery();
        res.status(200).send(cities);
    }catch{
        res.status(500).send(error);
    }
};


getSpecCityQuery = (id) => {
    const query = 'SELECT * FROM city WHERE ID = ?';
    return new Promise ((resolve, reject) => {
        conn.query(query, [id], (error, results, fields) => {
            if(error){
             reject(error);
            }else{
             resolve(results);
            };
        });
    });
};

getSpecCity = async(req, res, next) => {
    try{
        const id = req.params.id;
        const cityId = await getSpecCityQuery(id);
        res.status(200).send(cityId[0]);

    }catch{
        res.status(500).send(error);
    }
   
}

createCityQuery = (city) => {
    const query = 'INSERT INTO city(Name, CountryCode, District, Population) VALUE(?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        conn.query(query, [city.Name, city.CountryCode, city.District, city.Population], (error, results, next) => {
            if(error){
                reject(error);
            }else{
                resolve(results);
            }

        });
    });
}

createCity = async(req, res, next) => {
    let validCity = populationValidator(req.body.Population);
    if(!validCity){
        var error = new Error("This is not a city!");
        error.status = 401;
        next(error);
    }
    try{
        const city = req.body;
        const createdCity = await createCityQuery(city);
        res.status(201).send(`City has been created! insertId/${createdCity.insertId}`);
    }catch{
        res.status(500).send(error.message);
    }
}


updCityQuery = (city, id) => {
    const query = 'UPDATE city SET Name = ?, CountryCode = ? , District = ? , Population = ? WHERE ID = ?'
    return new Promise((resolve, reject) => {
        conn.query(query, [city.Name, city.CountryCode, city.District, city.Population, id], (error, results, fields) => {
            if(error){
                reject(error);
            }else{

                resolve(results);
            }
        });
    });
}

updCity = async(req, res) => {
    let city = req.body;
    let id = req.params.id;
    //validacija ako e potrebna
    try{
        const updCity = await updCityQuery (city, id);
        res.status(201).send("User has been updated!");
    }catch{
        res.status(500).send(error);
    }
    
}


updSomeCityQuery = (city, id) => {
    const query = 'UPDATE city SET Population = ? WHERE ID = ?'
    return new Promise((resolve, reject) => {
        conn.query(query, [city.Population, id], (error, results, fields) => {
            if(error){
                reject(error);
            }else{

                resolve(results);
            }
        });
    });
}

updSomeCity = async(req, res) => {
    let city = req.body;
    let id = req.params.id;
    //validacija ako e potrebna
    try{
        const updCity = await updSomeCityQuery (city, id);
        res.status(201).send("User has been updated!");
    }catch{
        res.status(500).send(error);
    }
    
}

deleteCityQuery = (id) => {
    const query = 'DELETE FROM city WHERE ID = ?';
    return new Promise((resolve, reject) => {
        conn.query(query, [id], (error, results, field) => {
            if(error){
                reject(error);
            }else{
                resolve(results);
            }
        });

    });
}

deleteCity = async(req, res) => {
    let id = req.params.id;
    try{
        const delCity = await deleteCityQuery(id);
        res.status(202).send(`ID ${id} is deleted !!!`);
    }catch{
        res.status(500).send(error.message);
    }
}


module.exports = {
    getAllCity,
    getSpecCity,
    createCity,
    updCity,
    updSomeCity,
    deleteCity
}
