import styled from 'styled-components';

// 검색 결과가 없을 때
export const NoResultTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  margin-top: 18px;
`;

export const NoResultText = styled(NoResultTitle)`
  font-weight: 500;
  font-size: 15px;
  line-height: 21px;
  color: #8e8e8e;
  margin-top: 8px;
`;
