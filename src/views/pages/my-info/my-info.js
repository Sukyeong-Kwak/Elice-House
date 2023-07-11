import { drawHeader } from "../../components/header/header.js";
import { insertHeaderData } from "../../components/header/header.js";
import { drawFooter } from "../../components/footer/footer.js";
import { drawMyNav } from "../../components/my-nav/my-nav.js";
// import * as Api from "../../api.js";

// Header, Footer 템플릿 삽입
drawHeader();
insertHeaderData();
drawFooter();

// 마이페이지 사이드메뉴 템플릿 삽입
drawMyNav();

getUserData();

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const password2Input = document.querySelector("#password2");
const saveInfoChangeBtn = document.querySelector("#save-info-change-btn");
const deleteInfoBtn = document.querySelector("#delete-info-btn");

// let userData;
async function getUserData() {
  // userData = await Api.get("/api/users/",  _id);
  fetch("/api/users/64a7db93072b8881f32b5d56")
    .then((response) => response.json())
    .then((userData) => {
      const { name, email } = userData;
      userData.password = "";

      nameInput.value = name;
      emailInput.value = email;

      //정보 수정
      saveInfoChangeBtn.addEventListener("click", saveInfoChange);
      async function saveInfoChange(e) {
        e.preventDefault();

        const changedData = {};
        const name = nameInput.value;
        const password = passwordInput.value;
        const password2 = password2Input.value;

        if (name !== userData.name) {
          if (name === "") {
            return alert("이름을 입력해주세요.");
          } else {
            changedData.name = name;
          }
        }

        if (password !== "" || password2 !== "") {
          if (password !== password2) {
            return alert("비밀번호와 비밀번호 재확인이 일치하지 않습니다.");
          } else {
            changedData.password = password;
          }
        }

        if (Object.keys(changedData).length === 0) {
          return alert("수정된 정보가 없습니다");
        }

        // 수정 사항 업데이트
        // try {
        //   await Api.patch("/api/users", _id, changedData);
        //   alert("수정된 정보가 저장되었습니다.");
        // } catch (err) {
        //   alert(`오류가 발생하였습니다: ${err}`);
        // }

        try {
          await fetch("/api/users/64a7db93072b8881f32b5d56", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(changedData),
          })
            .then((response) => response.json())
            .then((userData) => {
              console.log(userData);
              alert("수정된 정보가 저장되었습니다.");
            });
        } catch (err) {
          alert(`오류가 발생하였습니다: ${err}`);
        }
      }

      //탈퇴
      // deleteInfoBtn.addEventListener("click", deleteInfo);
      // async function deleteInfo(e) {
      //   e.preventDefault();

      //   try {
      //     await Api.delete("/api/users", _id);

      //     // 삭제 성공
      //     alert("탈퇴되었습니다.");
      //     sessionStorage.removeItem("token");
      //     window.location.href = "/";

      //   } catch (err) {
      //     alert(`오류가 발생하였습니다: ${err}`);
      //   }
      // }
    });
}
