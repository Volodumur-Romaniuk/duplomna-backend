const { ObjectId } = require('bson');
const express = require('express');
const { ConnectionClosedEvent } = require('mongodb');
const dbo = require('../db/connection');
const Reservation = require('../entity/Reservation');
const moment = require('moment')

class ReservationServices{
    constructor() {
        this.db = dbo.getDb();
        this.products = this.db.collection('Reservation')
    } 

    getReservation(){
         
      return new Promise(resolve => {
          this.products.find({}).toArray().then((result) => {
             resolve(result);
             
           })
        })
    }
   
    async setProductsOne(obj){
        
       const getres =  await this.getReservation();    
        let res = new Date(obj.date)   
          let ob1 = new Reservation(obj.date);
          console.log(res)
          if(getres.length ===0){

             await this.products.insertOne(ob1, function(err, res) {
              if (err) throw err;
                
            });
            return ob1; 
          }else {
            console.log(getres.length)
            for(let i =0 ;i<getres.length;i++){
              console.log(getres[i].date)
              console.log(ob1.date)
              if(getres[i].date == ob1.date){
                console.log("already recorded")
                return getres[i];
              
              }
            }
            await this.products.insertOne(ob1, function(err, res) {
              if (err) throw err;
            });
            return ob1;
          }
            
    }
    /*else {
                  
                
              }*/
   async updateReservation(id,button_id,ob){
        let data = await this.products.findOne({_id:ObjectId(id)})
      data.objectbutton[+button_id] = {
         id:button_id,
         countPerson:ob.countPerson,
         name:ob.name,
         email:ob.email,
         isReserved:ob.isReserved,
         password:ob.password
      }
      
        this.products.updateOne({_id:ObjectId(id)}, {$set: data}, function(err, res) {
            if (err) throw err;
          });
    }

    async getPassword(id,button_id){
     let data = await this.products.findOne({_id:ObjectId(id)})
      console.log(data.objectbutton.filter(x=>x.id == button_id))
      return data.objectbutton.filter(x=>x.id == button_id)[0].password  

  }

}
module.exports = ReservationServices;
