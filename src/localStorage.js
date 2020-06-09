import React from "react";

export default (props) => {
  // console.log(props);

  return (
    <div className="localStorage">
      <div className="exportData" onClick={() => props.exportData()}>
        <button>Сохранить таблицу в localStorage</button>
      </div>
      <div className="importData" onClick={() => props.importData()}>
        <button>Выгрузить данные из localStorage</button>
      </div>
      <div className="clearData" onClick={() => props.clearData()}>
        <button>Очистить localStorage</button>
      </div>
    </div>
  );
};
