const mongoose = require("mongoose");
const bcrypt = require("bcrypt");  

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Developer", "Admin"],
  },
  username: {   // UI accept username or emp id
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  //tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  //bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bug" }],
});

UserSchema.pre("save", function (next) {
  //normal func cause we need "this" keyword
  if (!this.isModified("password"))
    // Only hash if password is modified (created or changed)
    return next();

  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  // campare text vs hashed pwd in db
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch); // null is err obj
      return cb(null, this); // this is User obj
    }
  });
};

module.exports = mongoose.model("User", UserSchema);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
