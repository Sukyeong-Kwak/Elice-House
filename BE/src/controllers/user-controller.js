import { userService } from "../services/user-service.js";

const UserController = {
  async createUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const newUser = await userService.addUser({
        name,
        email,
        password,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
      // throw new Error("회원가입 중 에러 발생");
    }
  },

  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      console.log(email, password);

      // 이메일 패스워드 일치 여부 확인 및 JWT 토큰 생성
      const checkUser = await userService.giveToken({ email, password });

      console.log(checkUser);

      res.status(201).json(checkUser);
    } catch (error) {
      next(error);
    }
  },

  // 사용자가 User 정보 조회
  async getInfo(req, res, next) {
    try{
      const userId = req.params.userId;
      console.log(`유저 아이디 ${userId}`);

      const findUserOne = await userService.findByUserId({_id: userId});

      const { name, email } = findUserOne;

      res.json({ name, email })

    }catch(error) {
      next(error);
    }
  },

  //회원 삭제 
  async deleteUser(req, res, next) {
    try {
      const userId = req.params.userId;
      console.log(`유저 아이디 ${userId}`);

      const deleteUserInfo = await userService.deleteById({ _id: userId });

      res.status(200).json(deleteUserInfo);
    } catch(error) {
      next(error);
    }
  },

  //관리자 모드 
  //회원정보 조회
  async getAllUser(req, res, next) {
    try{
      const getAllUserInfo = await userService.getAllUserInfo();

      res.status(200).json(getAllUserInfo);
    }catch(error) {
      next(error);
    }
  }


};

export { UserController };
