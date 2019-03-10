import React, {PureComponent} from 'react';

export default class WasteBinInfo extends PureComponent {

  render() {
    const {info} = this.props;
    const displayName = `${info.type}`;
    const position = `(${info.latitude}, ${info.longitude})`

    return (
      <div>
        <h3>
          {displayName}
        </h3>
        <p>{position}</p>
      </div>
    );
  }
}
