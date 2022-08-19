const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors')

const customerAPI=require('./routes/customer')
const vendorAPI=require('./routes/vendoor');
const employeeAPI=require('./routes/employee');


const app=express()

const PORT = process.env.PORT ||3000;


app.use(bodyParser.json())
app.use(cors())

app.use(customerAPI);
app.use(vendorAPI);
app.use(employeeAPI)

app.get('/',(req,res)=>{
    res.send('Hello from server')
})




app.listen(PORT,()=>{
    console.log('Server is running on  port :'+ PORT);
})


