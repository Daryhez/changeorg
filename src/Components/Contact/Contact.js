import React from "react";
import { Form, Icon, Input, Button, Radio, Divider, message } from "antd";
import { Row, Col } from "antd";
import Backend from "../../serviceBackend";

import { withRouter } from "react-router-dom";

const { TextArea } = Input;

class Contact extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Backend.sendRequest("POST", "recommend", values)
          .then(r => r.json())
          .then(r => {
            if (r.status === "Confirmed") {
              this.props.history.push("/home");
              message.success("PQR enviada correctamente");
            }
          });
      }
    });
  };

  state = {
    value: ""
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Divider style={{ background: "#ffffff00" }} />
        <Row className="contact-general">
          <Col xs={4} sm={4} md={6} lg={6} xl={6}></Col>
          <Col xs={16} sm={16} md={12} lg={12} xl={12}>
            <div className="contact-welcome">
              <h1>Contáctenos</h1>
            </div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item label="Nombre completo">
                {getFieldDecorator("name", {
                  rules: [
                    { required: true, message: "Por favor ingrese su nombre." }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Escriba su nombre completo"
                  />
                )}
              </Form.Item>
              <Form.Item label="Correo electrónico">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Por favor ingrese su correo electrónico."
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Escriba su dirección de correo electrónico"
                  />
                )}
              </Form.Item>
              <Form.Item label="Tipo de mensaje">
                {getFieldDecorator("type", { initialValue: "Duda" })(
                  <Radio.Group
                    buttonStyle="solid"
                    onChange={this.handleFormLayoutChange}
                  >
                    <Radio.Button value="Duda">Duda</Radio.Button>
                    <Radio.Button value="Sugerencia">Sugerencia</Radio.Button>
                    <Radio.Button value="Petición">Petición</Radio.Button>
                    <Radio.Button value="Queja">Queja</Radio.Button>
                    <Radio.Button value="Reclamo">Reclamo</Radio.Button>
                    <Radio.Button value="Otro">Otro</Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("msg", {
                  rules: [
                    { required: true, message: "Por favor ingrese su mensaje." }
                  ]
                })(
                  <TextArea
                    onChange={this.onChange}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    placeholder="Escriba aquí su mensaje"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={4} sm={4} md={6} lg={6} xl={6}></Col>
        </Row>
      </>
    );
  }
}

const WrappedContact = Form.create({ name: "contact" })(Contact);

export default withRouter(Form.create()(WrappedContact));
