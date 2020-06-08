import React from 'react';

export default props => (
  <div className='newEl'>

    <label>ID:&ensp;
    <input type="text" name="id" value={this.state.id} onChange={} />
    </label>
    <label >Name:&ensp;
    <input type="text" name="name" value={this.state.name} onChange={} />
    </label>
    <label>Type:&ensp;
    <input type="text" name="type" value={this.state.type} onChange={} />
    </label>
    <label>Color:&ensp;
    <input type="color" name="color" value={this.state.color} onChange={} />
    </label>

  </div>
)