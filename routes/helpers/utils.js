const jwt = require('jsonwebtoken');

/* GENERATE user token */
function generateUserToken(user){
    return jwt.sign(
        {
            _id: user._id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
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

module.exports = {
    generateUserToken,
    verifyUserToken,
}