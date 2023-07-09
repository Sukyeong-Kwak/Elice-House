import * as API from "../../api.js";

const INPUT_EMAIL = document.getElementById("input-email");
const INPUT_PW = document.getElementById("input-password");
const LOGIN_SUBMIT = document.getElementById("login-submit");
const LOGIN_FORM = document.getElementById("login-form");

// // 주소창 url의 params를 객체로 만드는 함수
// // user/:userId -- ?userId 방식으로 다시 생각해보기
// const getUrlParams = () => {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);

//   const result = {};

//   for (const [key, value] of urlParams) {
//     result[key] = value;
//   }

//   return result;
// };

// 로그인
LOGIN_FORM.addEventListener("submit", async (event) => {
  // 이벤트 기본값(효과) 제거
  event.preventDefault();

  try {
    // 코드리뷰 반영 -- 유효성 체크 필드가 늘어나는 경우 생각하기
    const validateList = [
      { elem: INPUT_EMAIL, label: "이메일" },
      { elem: INPUT_PW, label: "비밀번호" },
    ];
    // 유효성 검사 - 빈칸 불가
    const notValidFieldIndex = validateList.findIndex(
      (field) => !field.elem.value.trim()
    );
    if (notValidFieldIndex !== -1) {
      alert(`${validateList[notValidFieldIndex].label}를 입력해주세요.`);
      validateList[notValidFieldIndex].elem.focus();
      return;
    }

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      alert(`로그인 성공! 환영합니다 :)`);
    } else {
      const errorData = await response.json();
      alert(`로그인 실패: ${errorData.error}`);
    }

    // 관리자(admin)인 경우, 로컬스토리지에 기록
    if (isAdmin) {
      localStorage.setItem("admin", "admin");
    }

    // 메인 페이지 외 다른 페이지(예: 상품 상세페이지)에서 로그인 페이지로 온 경우, 해당 페이지로 복귀
    const { previouspage } = getUrlParams();

    if (previouspage) {
      window.location.href = previouspage;
      return;
    }

    // 메인 페이지에서 로그인한 경우, 메인 페이지로 이동
    window.location.href = "/";
  } catch (error) {
    console.error(error.stack);
    alert(`로그인 실패 :: 입력하신 내용을 다시 확인해 주세요.`);
  }
});
