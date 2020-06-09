import React from "react";
import "./style.css";
import Table from "./Table";
import rowsData from "./rowsData";
import _ from "lodash";
import Info from "./Info";
import { CompactPicker } from "react-color";
import LocalStorage from "./localStorage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: rowsData,
      sort: "asc", //desc
      sortField: "id",
      id: "",
      name: "",
      type: "",
      color: "",
      newRow: "",
      info: null,
    };
  }

  addRow = (e) => {
    e.preventDefault();
    if (
      this.state.id === "" ||
      this.state.name === "" ||
      this.state.type === "" ||
      this.state.color === ""
    ) {
      alert("Заполните все поля");
      return;
    }
    let newArr = this.state.rows;
    newArr.push({
      id: this.state.id,
      name: this.state.name,
      type: this.state.type,
      color: this.state.color,
    });
    // console.log(newArr);

    this.setState({
      rows: this.removeDuplicates(newArr),
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  onSort = (sortField) => {
    const clonedData = this.state.rows.concat();
    const sortType = this.state.sort === "asc" ? "desc" : "asc";

    const orderedData = _.orderBy(clonedData, sortField, sortType);

    this.setState({
      rows: orderedData,
      sort: sortType,
      sortField: sortField,
    });
  };

  onRowSelect = (info) => {
    this.setState({ info });
  };

  onRowDelete = (elem) => {
    // console.log(elem);
    let newArr = [];
    for (let i = 0; i < this.state.rows.length; i++) {
      if (elem !== this.state.rows[i]) {
        newArr.push(this.state.rows[i]);
      }
    }
    // console.log(newArr);
    this.setState({ rows: newArr });
  };

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  exportData = () => {
    localStorage.setItem("data", JSON.stringify(this.state.rows));
  };

  importData = () => {
    if (localStorage.length === 0)
      return alert("LocalStorage пуст либо данные уже есть в таблице");

    let localArr = JSON.parse(localStorage.getItem("data"));

    this.setState({
      rows: this.removeDuplicates(localArr),
    });
  };
  //очищаем localStorage при клике
  clearData = () => {
    if (localStorage.length === 0) return alert("LocalStorage уже пуст");
    localStorage.clear();
  };

  //поиск дубликатов и их удаление
  removeDuplicates = (arr) => {
    const result = [];
    const duplicatesIndices = [];

    // Перебираем каждый элемент в исходном массиве
    arr.forEach((current, index) => {
      if (duplicatesIndices.includes(index)) return;

      result.push(current);

      // Сравниваем каждый элемент в массиве после текущего
      for (
        let comparisonIndex = index + 1;
        comparisonIndex < arr.length;
        comparisonIndex++
      ) {
        const comparison = arr[comparisonIndex];
        const currentKeys = Object.keys(current);
        const comparisonKeys = Object.keys(comparison);

        if (currentKeys.length !== comparisonKeys.length) continue;

        const currentKeysString = currentKeys.sort().join("").toLowerCase();
        const comparisonKeysString = comparisonKeys
          .sort()
          .join("")
          .toLowerCase();
        if (currentKeysString !== comparisonKeysString) continue;

        // Проверяем индексы ключей
        let valuesEqual = true;
        for (let i = 0; i < currentKeys.length; i++) {
          const key = currentKeys[i];
          if (current[key] !== comparison[key]) {
            valuesEqual = false;
            break;
          }
        }
        if (valuesEqual) duplicatesIndices.push(comparisonIndex);
      }
    });
    return result;
  };

  render() {
    return (
      <div className="App">
        <Table
          data={this.state.rows}
          onSort={this.onSort}
          sortField={this.state.sortField}
          sort={this.state.sort}
          onRowSelect={this.onRowSelect}
          onRowDelete={this.onRowDelete}
        />

        <div className="newEl">
          <label>
            ID:&ensp;
            <input
              type="number"
              name="id"
              value={this.state.id}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Name:&ensp;
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Type:&ensp;
            <input
              type="text"
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
            />
          </label>
          <div className="color">
            <span className="colorLabel">Color:&ensp;</span>
            <CompactPicker
              color={this.state.color}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
        </div>
        <div className="button">
          <button className="addEl" onClick={this.addRow}>
            Добавить новый элемент в таблицу
          </button>
        </div>

        {this.state.info ? <Info info={this.state.info} /> : null}

        <LocalStorage
          exportData={this.exportData}
          importData={this.importData}
          clearData={this.clearData}
        />
      </div>
    );
  }
}

export default App;
