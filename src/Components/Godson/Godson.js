import React, { Component } from "react";
import { Row, Divider, Col } from "antd";
import GodsonTable from "./GodsonTable";
import { withRouter } from "react-router-dom";
import Backend from "../../serviceBackend";
import { CardWrapper, ButtonResponsive, TextResponsive } from "./GodsonStyled";

class Godson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
    Backend.sendRequest("GET", "valid")
      .then(r => r.json())
      .then(r => {
        if (r.valid === "no") {
          this.props.history.push("/");
          localStorage.removeItem("jwt");
          window.location.reload();
        }
      });
  }
  render() {
    return (
      <div style={{ marginHorizontal: "50px" }}>
        <Divider style={{ background: "#ffffff00" }} />
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px"
          }}
        >
          <CardWrapper>
            <Col>
              <TextResponsive>
                Estudiantes que cuentan com mi apoyo
              </TextResponsive>
            </Col>
            <ButtonResponsive
              type="primary"
              onClick={e => {
                e.preventDefault();
                this.props.history.push("/home");
              }}
            >
              Solicitudes de estudiantes
            </ButtonResponsive>
          </CardWrapper>
        </Row>
        <Row>
          <GodsonTable dataSource={this.state.dataSource} />
        </Row>
        <Divider style={{ background: "#ffffff00" }} />
      </div>
    );
  }
  componentDidMount() {
    Backend.sendRequest("GET", "sponsor")
      .then(response => response.json())
      .then(data => {
        this.setState({ dataSource: data.rows });
      });
  }
}

export default withRouter(Godson);
