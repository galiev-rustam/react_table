import React from 'react';
import './style.css';
import Table from './Table';
import rowsData from './rowsData';
import _ from 'lodash';
import Info from './Info';
import { CompactPicker } from 'react-color';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      rows: rowsData,
      sort: 'asc', //desc
      sortField: 'id',
      id: '',
      name: '',
      type: '',
      color: '',
      newRow: '',
      info: null,
    };

    this.addRow = this.addRow.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }


  addRow(e) {
    e.preventDefault();
    if (this.state.id === '' || this.state.name === "" || this.state.type === "" || this.state.color === "") {
      alert('Заполните все поля');
      return;
    }
    let newArr = this.state.rows;
    newArr.push({
      id: this.state.id,
      name: this.state.name,
      type: this.state.type,
      color: this.state.color,
    })
    console.log(newArr);
    this.setState({
      rows: newArr,
    })

  };

  handleChange(event) {
    const { name, value, type, checked } = event.target
    type === "checkbox" ?
      this.setState({
        [name]: checked
      })
      :
      this.setState({
        [name]: value
      })
  };

  onSort = sortField => {
    const clonedData = this.state.rows.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';

    const orderedData = _.orderBy(clonedData, sortField, sortType);

    this.setState({
      rows: orderedData,
      sort: sortType,
      sortField: sortField,
    })
  }

  onRowSelect = info => {
    this.setState({ info })
  }

  onRowDelete = elem => {
    // console.log(elem);
    let newArr = []
    for (let i = 0; i < this.state.rows.length; i++) {
      if (elem !== this.state.rows[i]) {
        newArr.push(this.state.rows[i])
      }
    }
    // console.log(newArr);
    this.setState({ rows: newArr })
  }

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
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

        <div className='newEl'>

          <label>ID:&ensp;
            <input type="number" name="id" value={this.state.id} onChange={this.handleChange} />
          </label>
          <label >Name:&ensp;
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>Type:&ensp;
            <input type="text" name="type" value={this.state.type} onChange={this.handleChange} />
          </label>
          <div className='color'>
            <span className="colorLabel">Color:&ensp;</span>
            <CompactPicker color={this.state.color} onChangeComplete={this.handleChangeComplete} />

          </div>

        </div>
        <div className="button">
          <a href="#" className='addEl' onClick={this.addRow}>Добавить новый элемент в таблицу</a>
        </div>

        {
          this.state.info ? <Info info={this.state.info} /> : null
        }


      </div>
    );
  }
}


/* <input type="color" name="color" value={this.state.color} onChange={this.handleChange} /> */


export default App;