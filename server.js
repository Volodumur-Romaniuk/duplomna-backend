const express = require('express');
const cors = require('cors')
// get MongoDB driver connection
const dbo = require('./db/connection');
const Reservation = require('./entity/Reservation');
const ProductService = require('./controlers/ProductsServices')
const ReservationService = require('./controlers/ReservationServices')
const nodemailer = require('nodemailer');
const path = require("path");



const PORT = process.env.PORT || 5002;
const app = express();

app.use(cors());
app.use(express.json());
//app.use(require('./controlers/ProductsController'));

// Global error handling
const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port: 587,
  auth:{
    user: 'romaniuk.volodymyr.clg@chnu.edu.ua',
    pass: '2003vova1504',
  },
});
transporter.verify().then(console.log).catch(console.error)




// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) { 
    console.error(err);
    return ;
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});

app.get("/product", (req, res) => {
  let reserv = new Reservation(1,2022)
  res.json({name:'chiburda'});
  
  console.log(reserv);

})

app.get("/products/all", async  (req,res) =>{
    var productall = new ProductService();
   const result = await productall.getProducts()
   console.log(result[0].name)
  res.json(result);
})

app.get("/reservation/all", async  (req,res) =>{
  var reservall = new ReservationService();
  const result = await reservall.getReservation()
  res.json(result);
})
app.post("/reservation/retid", async  (req,res) =>{
  var reservall = new ReservationService();
  const result = await reservall.getIDtoData(req.body)
  res.json(result);
})
app.post("/reservation/insert", async (req,res) =>{
  let reservall = new ReservationService();
  const result = await reservall.setProductsOne(req.body)
    res.json(result);

})
app.post("/reservation/update/:id/:button_id",(req,res) =>{
  let reserv = new ReservationService();
  let id = req.params.id;
  let button_id = req.params.button_id;

    res.json(reserv.updateReservation(id,button_id,req.body));

})

app.post("/reservation/sendmailRes",(req,res) =>{

    transporter.sendMail({
      from:'"Vova"romaniuk.volodymyr.clg@chnu.edu.ua',
      to:`${req.body.to},${req.body.to}`,
      subject:req.body.subject,
      text:req.body.text,
      html:req.body.html
    }).then(info =>{
      console.log(info);
    }).catch(console.error)

  res.json()
})

app.get("/reservation/getpas/:id/:button_id",(req,res) =>{
  let reserv = new ReservationService();
  let id = req.params.id;
  let button_id = req.params.button_id;
   reserv.getPassword(id,button_id).then((result)=>{
     res.send({password:result})
   })
})



