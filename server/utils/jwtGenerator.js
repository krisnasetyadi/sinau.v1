const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(student_id){
    const payload = {
        user:student_id
    }
    return jwt.sign(payload,process.env.jwtSecret,{expiresIn:'1h'})
}
module.exports = jwtGenerator;