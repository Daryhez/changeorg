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
        width: "15%"
      },
      {
        title: "Fecha de la Solicitud",
        dataIndex: "Fecha",
        key: "Fecha",
        width: "8%",
        render: text => <p>{text.substring(0, 10)}</p>
      },
      { title: "PBM", dataIndex: "PBM", key: "PBM", width: "5%" },
      {
        title: "Departamento de procedencia",
        dataIndex: "Procedencia",
        key: "Procedencia",
        width: "15%"
      },
      {
        title: "Tipo de apoyo solicitado",
        dataIndex: "Apoyo",
        key: "Apoyo",
        width: "20%"
      },
      {
        title: "Justificación",
        key: "Justification",
        width: "9%",
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
                  onOk() {}
                })
              }
            >
              Leer detalladamente
            </a>
          </span>
        )
      },
      {
        title: "Apadrinar",
        key: "edit",
        width: "10%",
        render: (text, record) => (
          <span>
            {/* eslint-disable-next-line */}
            <a
              onClick={() => {
                var updateD = this.props.updateDataSource;
                var push = () => this.props.history.push("/godson");
                Modal.confirm({
                  title: "¿Está seguro que desea apadrinar a este estudiante?",
                  icon: <ExclamationCircleOutlined />,
                  content:
                    "Al apadrinar a un estudiante, tanto a él como a usted les llegará una notificación por correo electrónico confirmando que el apadrinamiento fue efectivo.",
                  okText: "Sí",
                  okType: "primary",
                  cancelText: "No",
                  onOk() {
                    updateD();
                    const key = "updatable";
                    message.success(
                      {
                        content:
                          "Apadrinamiento exitoso! Por favor revise su correo!",
                        key
                      },
                      20
                    );
                    push();
                    Backend.sendRequest("POST", "sponsor", {
                      request_id: record.request_id
                    });
                  },
                  onCancel() {}
                });
              }}
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
        scroll={{ x: 1000 }}
        bordered={true}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          locale: { items_per_page: "por página" },
          pageSizeOptions: ["10", "20", "50", "100"],
          position: "bottom",
          size: "small",
          showTotal: num => `Hay ${num} solicitudes`
        }}
      />
    );
  }
}

export default withRouter(CaseTable);
