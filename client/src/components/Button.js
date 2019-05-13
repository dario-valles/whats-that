import styled, { css } from "styled-components/macro";

const Button = styled.button`
  background-color: #472c81;
  border-radius: 40px;
  border: transparent;
  color: white;
  cursor: pointer;
  font-size: 14px;
  margin: 0 0.5em;
  min-width: 140 px;
  padding: 1em 3em;
  text-shadow: 0 1px 0px rgba(0, 0, 0, 0.05);
  text-transform: uppercase;
  :hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.05), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
  :focus {
    outline: none;
  }
  :active {
    box-shadow: 0 1px 7px rgba(255, 255, 255, 0.3),
      0 3px 6px rgba(0, 0, 0, 0.16);
  }

  ${props =>
    props.primary &&
    css`
      background: #ff87ad;
    `};

  ${props =>
    props.gradient &&
    css`
      background-color: #fa709a;
      background-image: linear-gradient(90deg, #fa709a 0%, #f5c964 87%);
      border-color: pink;
    `};

  ${props =>
    props.marginTop &&
    css`
      margin-top: 2vh;
    `};

  ${props =>
    props.marginBottom &&
    css`
      margin-bottom: 2vh;
    `};

  ${props =>
    props.formButton &&
    css`
      margin-left: 0;
      align-self: center;
    `};

  ${props =>
    props.back &&
    css`
      margin-top: 4vh;
      text-transform: none;
    `};

  ${props =>
    props.clear &&
    css`
      font-size: 0.8rem;
      text-transform: none;
      margin: 0;
    `};

  ${props =>
    props.small &&
    css`
      background-color: #fff;
      color: #472c81;
      font-size: 10px;
      font-weight: bold;

      :hover {
        background-color: rgba(200, 200, 200, 1);
        transform: none;
      }
    `};
`;

export default Button;
