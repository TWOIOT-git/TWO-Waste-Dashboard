import React, {PureComponent} from 'react';
import './styles.css'

export default class WasteBinInfo extends PureComponent {

  render() {
    
    const {info} = this.props;
    const displayName = `${info.type}`;
    const position = `(${info.latitude}, ${info.longitude})`

    return (
      <div>
        <h3 className="InfoTitle">
          {displayName}
        </h3>
        <p className="InfoPosition">Location: {position}</p>
      </div>
    );
  }
}
