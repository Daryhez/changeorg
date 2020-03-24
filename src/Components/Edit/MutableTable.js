import React from "react";
import { Form, Input, Table, Popconfirm, Button, Icon } from "antd";
import { withRouter } from "react-router-dom";
import { PrimButton } from "../Home/HomeStyles";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class MutableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      editingKey: "",
      count: 0
    };
    this.columns = [];
    Object.entries(this.props.metadata.fields).forEach(fld => {
      this.columns.push({
        title: fld[1].display,
        dataIndex: fld[0],
        editable: true
      });
    });
    this.columns.push({
      title: "Eliminar",
      dataIndex: "operation",
      width: "7%",
      render: (text, record) =>
        this.state.dataSource.length >= 1 ? (
          <Popconfirm
            title="¿Está seguro?"
            okText="Sí"
            cancelText="No"
            onConfirm={() => this.handleDelete(record.key)}
          >
            {/* eslint-disable-next-line */}
            <Icon type="delete" />
          </Popconfirm>
        ) : null
    });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      code: 32,
      credits: `London, Park Lane no. ${count}`,
      group: 0,
      tipology: "P"
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  };

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
  };

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            zIndex: "1"
          }}
        >
          <PrimButton>
            <Button
              onClick={this.handleAdd}
              type="primary"
              style={{ marginBottom: 16 }}
              icon="plus-circle"
            >
              {`Añadir ${this.props.metadata.display}`}
            </Button>
          </PrimButton>
        </div>
        <Form.Item label={this.props.metadata.display}>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </Form.Item>
      </div>
    );
  }
}

export default withRouter(Form.create({ name: "mutable_table" })(MutableTable));
