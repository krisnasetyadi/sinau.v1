const router = require('express').Router();
const pool = require('../db');
const authorization = require('../handler/authorization')
router.get('/',authorization,async(req,res)=>{
    try {   
        const student_user = await pool.query(
            "SELECT student_name FROM sinau_student_users WHERE student_id = $1",[req.user]
        )
        res.json(student_user.rows[0])
    } catch (error) {
        console.error(err.message);
        res.status(500).json('Server Error!')
    }
})
module.exports=router;