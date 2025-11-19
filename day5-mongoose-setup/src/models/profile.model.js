const { Schema, model, Types } = require('mongoose');

const profileSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  age: { type: Number },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  address: { type: String }
}, { timestamps: true });

const Profile = model('Profile', profileSchema);
module.exports = Profile;
