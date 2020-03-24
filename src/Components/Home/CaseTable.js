import React from "react";
import { Table, Popconfirm, message } from "antd";
import { withRouter } from "react-router-dom";

class CaseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }
  confirmCancel = archiveType => {
    if (archiveType) {
      message.success("Solicitud anulada exitosamente");
    } else {
      message.success("Solicitud desistida exitosamente");
    }
  };
  generateCouncil = (isPre, recordId) => {
    // Backend.sendRequest("GET", `generate?pre=${isPre}&id=${recordId}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     Backend.openLink(data.url);
    //   });
    if (isPre) {
      message.success("Acta de Comité Asesor Generada exitosamente");
    } else {
      message.success("Acta de Consejo de Facultad Generada exitosamente");
    }
  };
  render() {
    var columns = [
      {
        title: "Programa Académico",
        dataIndex: "academic_program",
        key: "academic_program"
      },
      {
        title: "Fecha de la Solicitud",
        dataIndex: "date_stamp",
        key: "date_stamp"
      },
      { title: "PBM", dataIndex: "date", key: "date", width: "10%" },
      {
        title: "Ciudad de procedencia",
        dataIndex: "consecutive_minute",
        key: "consecutive_minute"
      },
      { title: "Tipo de apoyo solicitado", dataIndex: "year", key: "year" },
      {
        title: "Apadrinar",
        key: "edit",
        width: "8%",
        render: (text, record) => (
          <span>
            {/* eslint-disable-next-line */}
            <a
              onClick={() =>
                this.props.history.push({
                  pathname: "/edit/" + record.id,
                  state: { _cls: record._cls }
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
      <Table dataSource={this.state.dataSource} columns={columns} rowKey="id" />
    );
  }
}

export default withRouter(CaseTable);
