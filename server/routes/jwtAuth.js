const router = require('express').Router()
const pool = require('../db')
const bcrypt =  require('bcrypt')
const jwtGenerator = require('../utils/jwtGenerator')
const validInfo = require('../handler/validation')
const authorization = require('../handler/authorization')

// register

router.post('/register',validInfo,async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const student_users = await pool.query(
            "SELECT * FROM sinau_student_users WHERE student_email = $1",[
                email
            ])
            // res.json(user.rows)
            if(student_users.rows.length !== 0 ){
                return res.status(401).json("User already exist")
            }
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound)
            const bcryptPassword = await bcrypt.hash(password,salt);
            const newStudent = await pool.query(
                "INSERT INTO sinau_student_users(student_name,student_email,student_password)VALUES($1,$2,$3) RETURNING *",
                [name,email,bcryptPassword]
            )
            const token = jwtGenerator(newStudent.rows[0].student_id)
            res.json({token})
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Eror')
    }
})

// login route

router.post('/login',validInfo,async(req,res)=>{
    try {
        const {email,password}=req.body;
        const student_user = await pool.query(
            "SELECT * FROM sinau_student_users WHERE student_email = $1",
            [email]
        )
        if(student_user.rows.length === 0){
            return res.status(401).json('Password or Email is incorrect!')
        }
        const validPassword =  await bcrypt.compare(password,student_user.rows[0].student_password);
        if(!validPassword){
            return res.status(401).json('Password or Email is incorrect')
        }
        const token = jwtGenerator(student_user.rows[0].student_id)
        res.json({token})
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.get('/is-verify',authorization,async(req,res)=>{
    try {
        res.json(true)
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error!')
    }
})
module.exports = router