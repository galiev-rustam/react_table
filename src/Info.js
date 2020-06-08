import React from 'react';


export default props => {
  console.log(props);

  return (
    <div className='info'>
      <b>Вы выбрали:</b>
      <p><b>ID:&ensp;</b>{props.info.id}</p>
      <p><b>Name:&ensp;</b>{props.info.name}</p>
      <p><b>Type:&ensp;</b>{props.info.type}</p>
      <p><b>Color:&ensp;</b>{props.info.color}</p>
    </div>
  )
}