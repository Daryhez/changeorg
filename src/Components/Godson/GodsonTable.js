import React from "react";
import { Table, Modal } from "antd";
import { withRouter } from "react-router-dom";
// import Backend from "../../serviceBackend";

class GodsonTable extends React.Component {
  render() {
    var columns = [
      {
        title: "Fecha de la Solicitud",
        dataIndex: "Fecha",
        key: "Fecha"
      },
      {
        title: "Programa",
        dataIndex: "Programa",
        key: "Programa"
      },
      {
        title: "Documento",
        dataIndex: "Documento",
        key: "Documento"
      },
      {
        title: "Nombre",
        dataIndex: "Nombre",
        key: "Nombre"
      },
      {
        title: "Correo",
        dataIndex: "Correo",
        key: "Correo"
      },
      {
        title: "Celular",
        dataIndex: "Celular",
        key: "Celular"
      },
      {
        title: "Direccion",
        dataIndex: "Direccion",
        key: "Dirección"
      },
      { title: "PBM", dataIndex: "PBM", key: "PBM" },
      {
        title: "Departamento de procedencia",
        dataIndex: "Procedencia",
        key: "Procedencia"
      },
      {
        title: "¿Se encuentra en Bogotá?",
        dataIndex: "Bogota",
        key: "Bogota"
      },
      {
        title: "Justificación",
        key: "Justification",
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
      }
    ];
    return (
      <Table
        dataSource={this.props.dataSource}
        columns={columns}
        rowKey="request_id"
        scroll={{ x: 2200 }}
        bordered={true}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          locale: { items_per_page: "por página" },
          pageSizeOptions: ["10", "20", "50", "100"],
          position: "bottom",
          size: "small",
          showTotal: num => `Total: ${num} estudiantes`
        }}
      />
    );
  }
}

export default withRouter(GodsonTable);
