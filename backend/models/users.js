const mongoose = require('mongoose');
/**
 * User Schema
 */
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const webUserSchema = new Schema(

  {
    fName: { type: String, default: '' },
    lName: { type: String, default: '' },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false }, 
  } 


);

webUserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('webUser', webUserSchema);