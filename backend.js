module.exports = async function (context, req) {
    context.res = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
    };
  
    require('dotenv').config()
    const MongoClient = require('mongodb').MongoClient
    const client = new MongoClient(process.env.MONGO_CONNECTION_STRING)
  
    await client.connect();
    const db = client.db('event');
    const collection = db.collection('attendees');
    if (req.method === "POST") {
      if (req.query.name || (req.query.email)) {
        const indexResult = await collection.createIndex({ name: 1 });
        const attendee = {
          name: req.query.name,
          email: req.query.email
        };
        const query = { name: attendee.name };
        const update = { $set: attendee };
        const options = { upsert: true, new: true };
  
        const upsertResult1 = await collection.updateOne(query, update, options);
        context.res.status= 201;
      }
    }
    if (req.method === "GET") {
      const attendees = await collection
        .find()
        .sort({ name: 1 })
        .toArray();
      attendees.map((attendee, i) => console.log(${++i} ${JSON.stringify(attendee)}));
      context.res.body= attendees
      };
  }

 