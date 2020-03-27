import styled from "styled-components";
import { Row, Col } from "antd";

const StyledRow = styled(Row)`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledCol = styled(Col)`
  @media (min-width: 768px) {
    margin-left: 2%;
    margin-right: 2%;
  }
`;

const FormLink = styled.div`
  font-size: 3em;
  text-align: center;
`;

const LoginGeneral = styled.div`
  padding: 1em;
  padding-bottom: 0;
  margin-top: 1.5em;
  background-color: lightgrey;
  border-radius: 15px;
`;

const LoginWelcome = styled.div`
  text-align: center;
  margin-bottom: 1.5em;
`;

const LoginFormForgot = styled.a`
  float: right;
`;

export {
  LoginGeneral,
  LoginWelcome,
  LoginFormForgot,
  FormLink,
  StyledRow,
  StyledCol
};
