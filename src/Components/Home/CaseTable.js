import React from "react";
import { Table, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import Backend from "../../serviceBackend";

class CaseTable extends React.Component {
  render() {
    var columns = [
      {
        title: "Programa Académico",
        dataIndex: "Programa",
        key: "Programa",
      },
      {
        title: "Fecha de la Solicitud",
        dataIndex: "Fecha",
        key: "Fecha"
      },
      { title: "PBM", dataIndex: "PBM", key: "PBM", width: "10%" },
      {
        title: "Ciudad de procedencia",
        dataIndex: "Procedencia",
        key: "Procedencia"
      },
      {
        title: "Tipo de apoyo solicitado",
        dataIndex: "Apoyo",
        key: "Apoyo"
      },
      {
        title: "Justificación",
        key: "Justification",
        width: "11%",
        render: (text, record) => (
          <span>
            {/* eslint-disable-next-line */}
            <a
              onClick={() =>
                Modal.info({
                  title: "Justificación del estudiante",
                  content: (
                    <div>
                      <p>{record.Descripcion}</p>
                    </div>
                  ),
                  onOk() { }
                })
              }
            >
              Leer detalladamente
            </a>
          </span>
        )
      },
      {
        title: "Descripción",
        key: "edit",
        width: "10%",
        render: (text, record) => (
          <span>
            {/* eslint-disable-next-line */}
            <a
              onClick={() =>
                Modal.confirm({
                  title: "¿Está seguro que desea apadrinar a este estudiante?",
                  icon: <ExclamationCircleOutlined />,
                  content:
                    "Al apadrinar a un estudiante, tanto a él como a usted les llegará una notificación por correo electrónico confirmando que el apadrinamiento fue efectivo.",
                  okText: "Sí",
                  okType: "primary",
                  cancelText: "No",
                  onOk() {
                    Backend.sendRequest("POST", "sponsor", {
                      request_id: record.request_id
                    });
                    window.location.reload(false);
                    const key = "updatable";
                    message.success({
                      content: "Inicio de sesión exitoso",
                      key
                    });
                  },
                  onCancel() { }
                })
              }
            >
              Apadrinar
            </a>
          </span>
        )
      }
    ];
    return (
      <Table
        dataSource={this.props.dataSource}
        columns={columns}
        rowKey="request_id"
        scroll={{ x: 1300 }}
      />
    );
  }
}

export default withRouter(CaseTable);
