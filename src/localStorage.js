import React from 'react';


export default props => {
  console.log(props);

  return (
    <div className='localStorage'>
      <div className="exportData" onClick={props.exportData.bind(null, '')}>
        <button>Сохранить таблицу в localStorage</button>
      </div>
      <div className="importData" onClick={props.importData.bind(null, '')} >
        <button>Выгрузить данные из localStorage</button>
      </div>
      <div className="clearData" onClick={props.clearData.bind(null, '')} >
        <button>Очистить localStorage</button>
      </div>
    </div>
  )
};