const jwt = require('jsonwebtoken');
const User = require('../models/user-model');


/* GENERATE user token */
function generateUserToken(user){
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            contactNumber: user.contactNumber,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,

            is_admin: user.is_admin,
        },
        process.env.SECRET,
        {
            expiresIn : '30d',
        }
    );
}

/* Verify if user token is valid */
function verifyUserToken(req, res, next){
    const authorization = req.headers.authorization;
    
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX

        jwt.verify(
            token,
            process.env.SECRET,

            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: "Invalid Token" });
                } else {
                    req.user = decode;
                    next();
                }
            }
        );
    } else {
        res.status(401).send({ message: "No Token" });
    }
}

/* Verify if user is admin */
function verifyAdmin(req, res, next){
    if(req.user && req.user.is_admin){
        next();
    }else{
        res.status(401).send({ message: 'Invalid Admin Token' });
    }
}

/* Validate if user is existing */
async function verifyIfUserIsExistingInDatabase(req, res, next){
    const user = await User.findById(req.user._id);
    if(user){
        req.user = user;
        next();
    }else{
        res.status(401).send({ message: 'Error User does not exist...' });
    }
}



module.exports = {
    verifyIfUserIsExistingInDatabase,
    generateUserToken,
    verifyUserToken,
    verifyAdmin,
}

/** Validate if user is existing in database */