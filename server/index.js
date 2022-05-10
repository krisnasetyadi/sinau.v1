const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')

// middleware
app.use(express.json()) //req.body
app.use(cors())

// routes
app.use('/dashboard', require('./routes/dashboard'))

app.use('/auth',require('./routes/jwtAuth'))

app.listen(PORT,()=>console.log(`Server is Running on PORT ${PORT}`))