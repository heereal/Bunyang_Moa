import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1178px;
  /* border: 1px solid lightgray; */
  margin-left: 70px;
`;

export const TabContainer = styled.div`
  display: flex;
`;

export const TabBtn = styled.div<{ font: string; line: string }>`
  font-weight: 700;
  font-size: 16px;
  padding: 15px;
  border-bottom: 5px solid ${(props) => props.line};
  color: ${(props) => props.font};
  cursor: pointer;
`;

export const Line = styled.div`
  background-color: #f4f4f4;
  height: 5px;
  /* position: absolute; */
  top: -5px;
`;

export const TabContentContainer = styled.div`
  padding: 28px 0;
`;

export const BookmarkListContainer = styled.div`
  display: flex;
`;

export const BookmarkInfoContainer = styled.div`
  width: 250px;
  height: 350px;
  background: #ffffff;
  border: 1px solid lightgray;
  border-radius: 20px;
  padding: 20px;
  margin-right: 10px;
`;
