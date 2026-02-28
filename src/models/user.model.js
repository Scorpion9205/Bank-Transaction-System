import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for creating a user"],
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        "Please enter a valid email address"],
        unique:[true,"Email already exists"]
    },
    name:{
        type:String,
        required:[true,"Name is required for creating an account"]
    },
    password:{
        type:String,
        required:[true,"Password is required for creating an account"],
        minlength:[6,"Password should contain more than 6 character"],
        select: false 
        // select false isliye rakhte hai agar ham future me 
        // jab bhi user ka data mangva rhe honge to password nhi aayega
    }
},{
        timestamps:true
    })

    // hash before saaving 
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ;
  }

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return 
  } catch (error) {
    next(error);
  }
});

// compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
