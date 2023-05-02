import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  isAlive: {
    type: Boolean,
    required: true,
  },
  img: {
    type: String,
    required: true,
    minlength: 5,
  },
});

schema.plugin(uniqueValidator);

export default mongoose.model("Character", schema);
