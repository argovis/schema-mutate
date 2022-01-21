var mongoose = require('mongoose');

// mongodb config and connection //////////////////
mongoose.Promise = global.Promise;
const mongoDB = "mongodb://database/argo"
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: 1,
  connectTimeoutMS: 30000,
  maxPoolSize: 2
};

mongoose.connect(mongoDB, mongooseOptions)
.catch(error => { console.log('mongoose connect error: ', error.message); });

let db = mongoose.connection;
//////////////// end mongo config //////////////////

const Profile = require('./models/profile');
const Profilex = require('./models/profile-mutate');
writes = []
async function traverse(){
  for await (const profile of Profile.find({date: {$gte: new Date('2021-01-01T00:00:00Z'), $lt: new Date('2021-01-02T00:00:00Z')}}).limit(42)) {
    p = profile.toObject()
    dx = new Date(p.date)
    dx.setFullYear(9999)
    p.date = dx
    writes.push(Profilex.insertMany([p]))
  }

  Promise.all(writes).then((values) => {
    console.log(values)
    process.exit(0)
  })
}
traverse()
