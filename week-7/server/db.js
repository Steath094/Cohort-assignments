const mongoose = require('mongoose');
// Define mongoose schemas
const userSchema = new mongoose.Schema({
  // userSchema here
  email: {
    type: String,
    required : true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullName : {
    type : String,
    required: true,
    trim: true, 
    index: true
  },
  password: {
    type: String,
    required : true,
  }
},{timestamps: true});

const adminSchema = new mongoose.Schema({
// adminSchema here
email: {
    type: String,
    required : true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullName : {
    type : String,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required : true,
  }
},{timestamps: true});

const courseSchema = new mongoose.Schema({
// courseSchema here
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    title: {
        type: String,
        required : true
    },
    description : {
        type : String,
        required: true
    },
    price: Number,
    imageUrl: String,
},{timestamps: true});

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }
},{timestamps: true})


// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const Purchase = new mongoose.model("Purchase", purchaseSchema)

module.exports = {
    User,
    Admin,
    Course,
    Purchase
}