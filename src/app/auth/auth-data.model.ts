export interface User {
  email?: string;
  name?: string;
  // password: string;
  date?: Date;
}

// BAKEND
  // const userSchema = mongoose.Schema({
  //   email: { type: String, required: false, unique: false },
  //   // email: { type: String, required: true, unique: true },
  //   name: { type: String, required: true, unique: true },
  //   password: { type: String, required: true },
  //   pref: { type: String },
  //   date: {
  //     type: Date,
  //     default: Date.now
  //   }
  // });

  // userSchema.plugin(uniqueValidator);

  // module.exports = mongoose.model("User", userSchema);
