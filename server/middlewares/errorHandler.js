const errorHandler = (err, req, res, next) => {
    const { name, msg } = err
    
    if (name == "JsonWebTokenError") {
        console.log('errorHandler JWT');

        res.status(401).json({
            msg: "Looks like you have not signed in."
        })
    } else if (name == "SequelizeValidationError") {
        console.log('errorHandler ValidationError');

        let msg = err.errors[0].message
        res.status(400).json({
            code: 400,
            type : "Bad Request",
            msg
        })
    } else if (name == "SequelizeUniqueConstraintError") {
        console.log('errorHandler UniqueError');

        res.status(400).json({
            msg: "Email is already registered"
        })
    } else if (name == 'WrongPass') {
        res.status(401).json({
            msg
        })
    } else {
        console.log('errorHandler else');

        res.status(err.code || 500).json({            
            msg: 'Internal server error'
        })
    }
}

module.exports = errorHandler
