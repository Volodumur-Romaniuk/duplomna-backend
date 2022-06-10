const express = require('express');
const { getDb } = require('../db/connection');
const dbo = require('../db/connection')
const routes = express.Router();

class ProductService{
   constructor() {
       this.db = dbo.getDb();
       this.products = this.db.collection('Product')
   }
    getProducts(){

       return new Promise(resolve => {
           this.products.find({}).toArray().then((result) => {

               resolve(result);
            })

      });
   }
   updateReservation(query){
    //  let resobj = {$set:{name:}}
    // let resobj = {$set:{date:'2022-08-17T00:00:00.000+00:00'}}
      this.products.updateOne(query, resobj, function(err, res) {
          if (err) throw err;
        });
  }
   setProductsone(){

   }
}
module.exports = ProductService;