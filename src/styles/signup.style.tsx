import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SignUpContainer = styled.div`
  box-sizing: content-box;
  padding: 0 30px;
  width: 650px;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

export const SignUpDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 45px;

  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 42px;
    margin-bottom: 20px;
  }
  p {
    color: #8e8e8e;
    font-weight: 500;
    font-size: 17px;
    line-height: 27px;
  }
`;

export const SubmitNicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 44px;
`;

export const NicknameTitle = styled.div`
  font-weight: 800;
  font-size: 19px;
  line-height: 27px;
  padding-bottom: 12px;

  span {
    color: #ff3838;
  }
`;

export const InputBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NicknameInput = styled.input`
  width: 80%;
  height: 45px;
  border: 2px solid #f4f4f4;
  border-radius: 15px;
  padding: 0 24px;
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  margin-right: 19px;
`;

export const CheckNicknameBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 132px;
  height: 45px;

  font-weight: 600;
  font-size: 15px;
  line-height: 24px;

  color: #7b7b7b;
  background: #f4f4f4;
  border-radius: 15px;
  cursor: pointer;
`;

// 카테고리 선택
export const CategoryTitle = styled.h2`
  font-weight: 800;
  font-size: 19px;
  line-height: 27px;
  padding-bottom: 12px;
`;

// TODO: nav 등 semantic tag로 변경하기
export const CategoryContainer = styled.div`
  border: 2px solid #f4f4f4;
  border-radius: 20px;
  /* height: 250px; */
  padding: 24px 28px;
  margin-bottom: 44px;
`;

export const CategoryBtn = styled.button<CategoryBtnStyledProps>`
  padding: 0 17px;
  height: 35px;
  background-color: ${(props) => props.bg};
  border: 2px solid ${(props) => props.border};
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => props.text};
  margin-bottom: 12px;
  margin-right: 13px;
`;

export const SignUpBtnContainer = styled.div`
padding-bottom: 60px;
`

export const SignUpBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #3d7fff;
  border-radius: 20px;
  color: white;
  font-weight: 700;
  font-size: 19px;
  line-height: 140%;
  cursor: pointer;
`;
