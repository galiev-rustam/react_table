import React from 'react';
import up from './img/up.svg'
import down from './img/down.svg'


export default props => (

  <table>
    <thead>
      <tr>
        <th data-type="numeric" onClick={props.onSort.bind(null, 'id')}>ID
          &ensp; {props.sortField === 'id' ? <img src={props.sort === 'asc' ? up : down} alt="user" className="button-icon" width="16px" height="16px" /> : null}
          <span className="resize-handle"></span>
        </th>
        <th data-type="text-short" onClick={props.onSort.bind(null, 'name')}>Name
        &ensp;{props.sortField === 'name' ? <img src={props.sort === 'asc' ? up : down} alt="user" className="button-icon" width="16px" height="16px" /> : null}
          <span className="resize-handle"></span>
        </th>
        <th data-type="text-short" onClick={props.onSort.bind(null, 'type')}>Type
        &ensp;{props.sortField === 'type' ? <img src={props.sort === 'asc' ? up : down} alt="user" className="button-icon" width="16px" height="16px" /> : null}
          <span className="resize-handle"></span></th>
        <th data-type="text-short">Color <span className="resize-handle"></span></th>

      </tr>
    </thead>

    <tbody>
      {props.data.map(item => (
        <tr key={item.id} onClick={props.onRowSelect.bind(null, item)} onDoubleClick={props.onRowDelete.bind(null, item)}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>{item.color}</td>
        </tr>
      ))}
    </tbody>

  </table >

);