const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URL,
        {
            useUnifiedTopology:true,
        }).then((data) => {
            console.log(`MongoDB connected with server`);
        })
}

module.exports = connectDatabase;