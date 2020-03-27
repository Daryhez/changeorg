import React from "react";
import { withRouter } from "react-router-dom";
import CaseTable from "./CaseTable";
import { Row, Divider, Col } from "antd";
import Backend from "../../serviceBackend";
import {
  CardWrapper,
  TextResponsive,
  ButtonResponsive
} from "../Godson/GodsonStyled";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
    this.updateDataSource = this.updateDataSource.bind(this);
    Backend.sendRequest("GET", "valid")
      .then(r => r.json())
      .then(r => {
        if (r.valid === "no") {
          this.props.history.push("/");
        }
      });
  }
  updateDataSource = () => {
    Backend.sendRequest("GET", "prequest")
      .then(response => response.json())
      .then(data => {
        this.setState({ dataSource: data.rows });
      });
  };
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
              <TextResponsive>Solicitudes de estudiantes</TextResponsive>
            </Col>
            <ButtonResponsive
              type="primary"
              onClick={e => {
                e.preventDefault();
                this.props.history.push("/godson");
              }}
            >
              Mis estudiantes apadrinados
            </ButtonResponsive>
          </CardWrapper>
        </Row>
        <Row>
          <CaseTable
            dataSource={this.state.dataSource}
            updateDataSource={this.updateDataSource}
          />
        </Row>
        <Divider style={{ background: "#ffffff00" }} />
      </div>
    );
  }
  componentDidMount() {
    this.updateDataSource();
  }
}

export default withRouter(Home);
