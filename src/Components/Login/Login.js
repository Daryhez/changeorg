import React from "react";
import { Form, Icon, Input, Button, Typography, message, Image } from "antd";
import BannerApoyo from "./../../images/apoyo.jfif";
import { Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { PrimButton } from "../Home/HomeStyles";
import {
  LoginFormForgot,
  LoginGeneral,
  LoginWelcome,
  FormLink
} from "./LoginStyled";
import Backend from "../../serviceBackend";

const { Title, Text } = Typography;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
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
          } else if (res.error === err[1]) {
            message.error({ content: "Usuario o contraseña incorrectos", key });
          }
        } else if (response.status === 200) {
          message.success({ content: "Inicio de sesión exitoso", key });
          let res = await response.json();
          localStorage.setItem("jwt", res.token);
          window.location.href = "/home";
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
        <Row>
          <Col xs={1} sm={1} md={1} lg={1} xl={1}></Col>
          <Col xs={10} sm={10} md={10} lg={10} xl={10}>
            <LoginGeneral>
              <LoginWelcome>
                <Title>Ingreso docente al portal UN Apoyo de Ingeniería</Title>
                <p>
                  <Text>
                    Bienvenido al formulario de apadrinamiento para estudiantes
                    activos de pregrado de la Facultad de Ingeniería.
                  </Text>
                </p>
                <p>
                  <Text>
                    Para continuar, por favor, ingrese su usuario y contraseña
                    institucional. Recuerde que este formulario es exclusivo
                    para docentes.
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
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2}></Col>
          <Col xs={10} sm={10} md={10} lg={10} xl={10}>
            <LoginGeneral>
              <LoginWelcome>
                <Title>
                  Ingreso estudiante al portal UN Apoyo de Ingeniería
                </Title>
                <p>
                  <Text>
                    El formulario que se dispone acontinuación es de uso
                    exclusivo para estudiantes (activos, de la facultad de
                    ingeniería y de pregrado) en condiciones de vulnerabilidad
                    socioeconómica. Haga click en la imagen para acceder al
                    formulario.
                  </Text>
                </p>
              </LoginWelcome>
              <FormLink>
                <a href="https://forms.gle/PqUTz9RgB544VKRA9">
                  <img src={BannerApoyo} width={450} height={200} />
                </a>
              </FormLink>
              <LoginWelcome>
                <p>
                  <br />
                </p>
                <p>
                  <Text>
                    Recuerde que toda la información que usted registre en este
                    formulario está sujeta a verificación por parte de la
                    universidad; y el hecho de llenar el formulario no obliga a
                    la universidad, a la facultad ni a ningún docente a brindar
                    el apoyo solicitado.
                  </Text>
                </p>
                <p>
                  <br />
                </p>
              </LoginWelcome>
            </LoginGeneral>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

export default withRouter(Form.create()(WrappedNormalLoginForm));
