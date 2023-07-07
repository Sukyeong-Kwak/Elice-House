import { userModel } from "../db/models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { error } from "console";

class UserService {
  async addUser(userRegist) {
    const name = userRegist.name;
    const email = userRegist.email;
    const password = userRegist.password;

    // 이메일 중복 확인
    const user = await userModel.findByEmail({ email });
    if (user) {
      throw new Error("이미 존재된 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const UserInfo = { name, email, password: hashedPassword };
    const addNewUser = await userModel.create(UserInfo);

    return addNewUser;
  }

  // 로그인 아이디 비밀번호 확인 및 jwt 토큰 생성
  async giveToken(userIdPass) {
    const email = userIdPass.email;
    const password = userIdPass.password;

    const user = await userModel.findByEmail({ email });

    if (!user) {
      throw new Error("아이디 확인 필요");
    }

    const hashedPassword = user.password;
    const checkPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkPassword) {
      throw new Error("비밀번호 확인 필요");
    }

    const key = process.env.KEY;
    const token = jwt.sign({ email, userId: user._id }, key);

    return { token, isAdmin: user.isAdmin };
  }

  // UserId를 통해 DB에서 user객체를 찾고 삭제
  async deleteById(userId) {
    const deleteData = await userModel.deleteByUserId(userId);

    console.log(userId);

    const deleteCount = deleteData.deletedCount;
    if (deleteCount === 0) {
      throw new Error('userId에 해당하는 User정보가 없습니다.');
    }

    return { result: "Deleted Data" }
  }

  // 사용자 정보 수정 
  async updateInfo(userInfo) {
    const userId = userInfo.userId;
    const name = userInfo.name;
    const password = userInfo.password;

    const toUpdate = {};

    if (name) {
      toUpdate.name = name;
    }

    const updateName = await userModel.updateName({ userId, name });

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatePassword = await userModel.updatePassword({
      userId,
      hashedPassword,
    });

    return { name: updateName, password: updatePassword };
  }

  // 사용자가 User 정보 조회
  async getAllUserInfo(userId) {
    const allUserInfo = await userModel.findByUserId(userId);

    return allUserInfo;
  }

  async findByUserId(userId) {
    const userInfo = await userModel.findByUserId(userId);
    
    return userInfo;
  }
}

const userService = new UserService();

export { userService };
