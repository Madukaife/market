const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
        },
    authentication: {
            password: {
                type: String,
                required: true,
                select : false
            },
            salt: {
                type: String,
                select: false
            },
            sessionToken: {
                type: String,
                select: false
            },
     }
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model('user', userSchema);

export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.find({ email });
export const getUserBySessionToken = (sessionToken: string) => userModel.find({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => userModel.findById(id);
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => userModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => userModel.findbyIdandUpadate({ _id: id, values})
