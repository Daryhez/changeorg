import React from "react";
import { withRouter } from "react-router-dom";
import CaseTable from "./CaseTable";
import { Typography, Row, Divider, Col } from "antd";
// import Search from "antd/lib/input/Search";
// import DrawerDownload from "./DrawerDownload";
// import DrawerCreate from "./DrawerCreate";
import Backend from "../../serviceBackend";
// import { PrimButton } from "./HomeStyles";

const { Title } = Typography;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.state = {
      dataSource: [],
      dataMatches: [],
      searchTerm: "",
      downloadDrawerVisible: false,
      createDrawerVisible: false,
      filterByMinute: false,
      minuteSearch: 1,
      yearSearch: 2020
    };
  }
  performSearch = keyTerm => {
    this.setState({ searchTerm: keyTerm });
    this.setState({ filterByMinute: false });
    let matches = [];
    this.state.dataSource.forEach(i => {
      if (i.student_dni.includes(keyTerm)) {
        matches.push(i);
      }
    });
    this.setState({ dataMatches: matches });
  };
  filerByMinute = (checked, minute, year) => {
    this.setState({ filterByMinute: checked });
    this.setState({ minuteSearch: minute });
    this.setState({ yearSearch: year });
    this.setState({ searchTerm: "" });
    let newMatches = [];
    if (checked) {
      this.state.dataSource.forEach(i => {
        if (
          // eslint-disable-next-line
          i.consecutive_minute == minute &&
          // eslint-disable-next-line
          i.year == year
        ) {
          newMatches.push(i);
        }
      });
      this.setState({ dataMatches: newMatches });
    }
  };
  showDrawer = (e, drw) => {
    e.preventDefault();
    if (drw === "Create") {
      this.setState({
        createDrawerVisible: true
      });
    } else if (drw === "Download") {
      this.setState({
        downloadDrawerVisible: true
      });
    }
  };
  closeDrawer = (e, drw) => {
    e.preventDefault();
    if (drw === "Create") {
      this.setState({
        createDrawerVisible: false
      });
    } else if (drw === "Download") {
      this.setState({
        downloadDrawerVisible: false
      });
    }
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
          <Col span={12}>
            <Title style={{ marginBottom: "0px" }}>
              Solicitudes de apadrinamiento
            </Title>
          </Col>
        </Row>
        <Row>
          <CaseTable
            dataSource={
              this.state.searchTerm === "" && !this.state.filterByMinute
                ? this.state.dataSource
                : this.state.dataMatches
            }
          />
        </Row>
        <Divider style={{ background: "#ffffff00" }} />
      </div>
    );
  }
  componentDidMount() {
    Backend.sendRequest("GET", "case")
      .then(response => response.json())
      .then(data => {
        this.setState({ dataSource: data["cases"] });
      });
  }
}

export default withRouter(Home);
