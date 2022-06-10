const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
const url = "mongodb+srv://root:12345@restaurant.mybk5.mongodb.net/Restaurant?retryWrites=true&w=majority";

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

let dbConnection;


module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("Restaurant");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};







































    /*async function main() {
	
    await client.connect();

    const db = client.db('Restaurant');
    
    const products = db.collection('Product');

     console.log(products);

    
    mongoose.connect(url, { useNewUrlParser : true, 
        useUnifiedTopology: true }, function(error) {
            if (error) {
                console.log("Error!" + error);
            }
        });

    try {
        await client.connect();
    
       // console.log(client);
     
    } catch (e) {
        console.error(e);
    }finally {
        await client.close();
    }


    
}

main().catch(console.error);

var ProductSchema = new mongoose.Schema({
    StudentId:Number,
    Name:String,
    Roll:Number,
    Birthday:Date,
    Address:String
});
  
module.exports = mongoose.model (
    'product', ProductSchema, 'Product');
    


/*const doc = { name: "Neapolitan pizza", shape: "round" };
const result = await collection.insertOne(doc);
console.log(
   `A document was inserted with the _id: ${result.insertedId}`,
);

products.insertOne(
        { id: 1, login: 'login1', name: 'name1', gender: 'male' },
        (err, result) => {
          if (err) {
            console.log('Unable insert user: ', err)
            throw err
          }
        }
      ) 
      */


/*await createListing(client,
    {
        name: "Lovely Loft",
        summary: "A charming loft in Paris",
        bedrooms: 1,
        bathrooms: 1
    }
);*/

/*
const product = db.
console.log(db);*/

/**/