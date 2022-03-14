const mongoose = require('mongoose');

const pathDB = process.env.MONGODB_URI

mongoose.connect(pathDB, {
    useNewUrlParser: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err))