var express = require('express');
var router = express.Router();
require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

router.post('/postVis', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  const { body } = req;
  const {
    spec,
    data,
    titulo,
    autor,
    ratings
  } =body;
  const newVis = {
    spec:spec,
    data:data,
    titulo:titulo,
    autor:autor,
    ratings:ratings
  };
  console.log(newVis);
  MongoClient.connect(url, function (err,db) {
    if(err) throw err;
    const dbo = db.db(dbName);
    dbo.collection('vis').insertOne(newVis, function(err,res){
      if (err) throw err;
      console.log('1 document inserted');
      db.close();
    });
  });
  res.send(JSON.stringify({success:true}));
});

router.get('/getVis', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  getData((data) =>
    res.send(data)
  );
});

function getData(callback){
  MongoClient.connect(url, function(err, client) {
    console.log('Connected successfully to server');
    
    const db = client.db(dbName);

    db.collection('vis').find({}).toArray(function(err, docs) {
      console.log('Found founded objects', docs.length);
      //console.log(docs);
      callback(docs);
      client.close();
    });
  });
}

module.exports = router;
