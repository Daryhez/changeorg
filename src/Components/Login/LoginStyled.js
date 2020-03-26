import styled from "styled-components";

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

export { LoginGeneral, LoginWelcome, LoginFormForgot, FormLink };
