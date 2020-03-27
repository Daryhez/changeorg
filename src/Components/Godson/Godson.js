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
              <TextResponsive>Mis estudiantes apadrinados</TextResponsive>
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
    this.setState({
      dataSource: [
        {
          request_id: "1",
          Fecha: "26/03/2020",
          Programa: "Ingeniería Civil",
          Documento: "1013678335",
          Nombre: "Daniel Escobar",
          Correo: "daescobarp@unal.edu.co",
          Celular: "3016233441",
          Dirección: "Calle Falsa 123",
          PBM: "15",
          Procedencia: "Bogotá D.C.",
          Apoyo: "Comida, tengo hambresita.",
          Descripcion:
            "Hace 5 años que mis padres no tienen empleo, vendía dulces en la U, pero ahora no puedo pagar mi arriendo."
        },
        {
          request_id: "2",
          Fecha: "27/03/2020",
          Programa: "Ingeniería Industrial",
          Documento: "1015987321",
          Nombre: "Toño Fortich",
          Correo: "ajsuarezf@unal.edu.co",
          Celular: "3019517896",
          Dirección: "Calle Falsa 321",
          PBM: "40",
          Procedencia: "De la costa",
          Apoyo: "Ya comí pero necesito Internet para LOL",
          Descripcion:
            "Me cortaron el recibo del internet y ahora no puedo jugar LOL"
        }
      ]
    });
  }
}

export default withRouter(Godson);
