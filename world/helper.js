
populationValidator = (population) => {
      console.log(`population : ${population}`);
     if (population < 10000) {
         return false;
     }else{
         return true;
     }
};

emailValidator = (email) => {
    if (email.length < 5) {
        return false;
    }
    else {
        return true;
    }
};

module.exports = {
    emailValidator,
    populationValidator
}

