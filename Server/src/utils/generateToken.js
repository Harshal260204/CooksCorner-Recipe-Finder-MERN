import jwt from 'jsonwebtoken'

const generateToken = () => {
    return jwt.sign({ id }, process.env.SECRETKEY,{
        expiresIn: "1h"
    });
};

export default generateToken;