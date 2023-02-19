import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  height: 200px;
  width: 800px;
  background-color: white;
  padding: 20px;
`;

export const CloseIcon = styled.div`
  cursor: pointer;
  position: relative;
  top: 5px;
  right: 5px;
`
