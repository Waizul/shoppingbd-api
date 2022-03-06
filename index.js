const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL)
.then(console.log('mongodb connected'))
.catch(err=>console.log(err))

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('shoppingbd api running')
})

app.listen(port,()=>console.log('api is running on ', port))

