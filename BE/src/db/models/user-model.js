import { model } from "mongoose";
import { userSchema } from "../schemas/user-schema.js";

const User = model("users", userSchema);

class UserModel {
  // 이메일로 유저 찾기 
  async findByEmail(email) {
    const user = await User.findOne(email);
    return user;
  }
  //DB 생성
  async create(userInfo) {
    const createUser = await User.create(userInfo);
    return createUser;
  }
  //userID로 유저 찾기
  async findByUserId(userId) {
    const user = await User.findById(userId);
    return user;
  }

}

const userModel = new UserModel();

export { userModel };
