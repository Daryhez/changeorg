import React from "react";
import { Form, Icon, Input, Button, Typography, message, Modal } from "antd";
import BannerApoyo from "./../../images/apoyo.jfif";
import { withRouter } from "react-router-dom";
import { PrimButton } from "../Home/HomeStyles";
import {
  LoginFormForgot,
  LoginGeneral,
  LoginWelcome,
  FormLink,
  StyledRow,
  StyledCol
} from "./LoginStyled";
import Backend from "../../serviceBackend";

const { Title, Text } = Typography;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    Backend.sendRequest("GET", "valid")
      .then(r => r.json())
      .then(r => {
        if (r.valid === "yes") {
          this.props.history.push("/home");
        }
      });
    this.state = {
      username: "",
      password: ""
    };
  }
  infocase;
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.performLogin();
      }
    });
  };

  performLogin = () => {
    const key = "updatable";
    message.loading({ content: "Iniciando sesión", key });
    let err = ["Unauthorized, not proffesor.", "Wrong user or password"];
    Backend.sendLogin(this.state.username, this.state.password)
      .then(async response => {
        if (response.status === 401) {
          let res = await response.json();
          if (res.error === err[0]) {
            message.error({ content: "Acceso restringido", key });
            Modal.info({
              title: 'Acceso restringido',
              content: (
                <div>
                  <p>Por favor, envíe una petición a través de contáctenos.</p>
                </div>
              ),
              onOk() {},
            });
          } else if (res.error === err[1]) {
            message.error({ content: "Usuario o contraseña incorrectos", key });
          }
        } else if (response.status === 200) {
          message.success({ content: "Inicio de sesión exitoso", key });
          let res = await response.json();
          localStorage.setItem("jwt", res.token);
          window.location.href = "/apoyo/home";
        } else {
          message.error({
            content: "Error en Login",
            key
          });
          console.log("Login Error: Backend HTTP code " + response.status);
        }
      })
      .catch(error => {
        message.error({
          content: "Error en Login",
          key
        });
        console.log("Login Error: " + error);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="breadcrumb-class">
          Está en:
          <a href="/" target="_self" title="Inicio">
            Inicio
          </a>
        </div>
        <StyledRow>
          <StyledCol>
            <LoginGeneral>
              <LoginWelcome>
                <Title>Ingreso docente al portal UN Apoyo de Ingeniería</Title>
                <p>
                  <Text>
                    Bienvenido al portal de apoyos para estudiantes activos de
                    pregrado de la Facultad de Ingeniería. Para iniciar sesión
                    como Docente ingresa tu usuario y contraseña institucional:
                  </Text>
                </p>
              </LoginWelcome>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, ingrese su usuario."
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Usuario SIA"
                      onChange={text => {
                        this.setState({ username: text.target.value });
                      }}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Por favor, ingrese su contraseña."
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Contraseña"
                      onChange={text => {
                        this.setState({ password: text.target.value });
                      }}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <PrimButton>
                    <Button type="primary" htmlType="submit" block>
                      Ingresar
                    </Button>
                  </PrimButton>
                  <LoginFormForgot
                    className="login-form-forgot"
                    href="https://cuenta.unal.edu.co/index.php?p=recoverPassword"
                  >
                    Olvidé mi contraseña
                  </LoginFormForgot>
                </Form.Item>
              </Form>
            </LoginGeneral>
          </StyledCol>
          <StyledCol>
            <LoginGeneral>
              <LoginWelcome>
                <Title>
                  Ingreso estudiante al portal UN Apoyo de Ingeniería
                </Title>
                <p>
                  <Text>
                    El formulario que se encuentra acontinuación es de uso
                    exclusivo para estudiantes de pregrado activos de la
                    Facultad de Ingeniería en condiciones de vulnerabilidad
                    socioeconómica.
                  </Text>
                </p>
              </LoginWelcome>
              <FormLink>
                <a href="https://forms.gle/PqUTz9RgB544VKRA9">
                  <img
                    src={BannerApoyo}
                    width="90%"
                    height="60%"
                    alt="Banner Estudiante"
                  />
                </a>
              </FormLink>
              <LoginWelcome>
                <p>
                  <br />
                </p>
              </LoginWelcome>
            </LoginGeneral>
          </StyledCol>
        </StyledRow>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default withRouter(Form.create()(WrappedNormalLoginForm));
