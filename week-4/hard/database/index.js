const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB =async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODBURI}/todo`)
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection Failed ",error);
        process.exit(1);
    }
}

export default connectDB
// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here
});

const TodoSchema = new mongoose.Schema(
    // Schema definition here
    {
        name: {
            type: String,
            required: true,
        },
        isCompleted:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}