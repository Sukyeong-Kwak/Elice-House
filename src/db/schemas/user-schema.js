import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    // 유저 이름
    name: {
      type: String,
      required: true,
    },
    // 유저 이메일
    email: {
      type: String,
      required: true,
    },
    // 유저 비밀번호 (해쉬)
    password: {
      type: String,
      required: true,
    },
    // admin 확인 
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export { userSchema };
