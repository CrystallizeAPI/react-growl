import styled from "styled-components";

export const Outer = styled.div`
  position: fixed;
  z-index: 999;
  top: 15px;
  right: 15px;
  min-width: 100px;
  max-width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Growl = styled.div`
  padding: 10px 20px;
  background: #fff;
  box-shadow: 0 0 5px #000;
  cursor: pointer;
  color: #333;
  border-radius: 20px;

  transition: transform 100ms, opacity 100ms;
  transform: ${p => (p.animatedIn ? "none" : "scale(.75)")};
  opacity: ${p => (p.animatedIn ? "1" : "0")};

  &:not(:first-child) {
    margin-top: 5px;
  }
`;
