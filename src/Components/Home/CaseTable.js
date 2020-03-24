import React from "react";
import { Table, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

class CaseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          academic_program: "Ingeniería de Sistemas y Computación",
          date_stamp: "24/03/2019",
          pbm: "15",
          city: "La guajira",
          socioeconomic_support: "Ipad + TV 80'' + MacBookPro"
        },
        {
          academic_program: "Ingeniería Agrícola",
          date_stamp: "23/03/2019",
          pbm: "90",
          city: "Bogotá D.C.",
          socioeconomic_support: "Una mantecada, por favor."
        },
        {
          academic_program: "Ingeniería Mecatrónica",
          date_stamp: "22/03/2019",
          pbm: "30",
          city: "Soacha",
          socioeconomic_support: "Almuerzo durante todos los días"
        },
        {
          academic_program: "Ingeniería Industrial",
          date_stamp: "21/03/2019",
          pbm: "40",
          city: "Tocancipá",
          socioeconomic_support: "Internet."
        }
      ]
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
      { title: "PBM", dataIndex: "pbm", key: "pbm", width: "10%" },
      {
        title: "Ciudad de procedencia",
        dataIndex: "city",
        key: "city"
      },
      {
        title: "Tipo de apoyo solicitado",
        dataIndex: "socioeconomic_support",
        key: "socioeconomic_support"
      },
      {
        title: "Apadrinar",
        key: "edit",
        width: "8%",
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
                    console.log("OK");
                  },
                  onCancel() {
                    console.log("Cancel");
                  }
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
