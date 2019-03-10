import React, {PureComponent} from 'react';
import './styles.css'
import trash_can_img from '../../assets/images/double_trash_can.png'


const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

export default class WasteBinPin extends PureComponent {

  render() {
    const {size = 20, onClick} = this.props;

    return (
      <img
        src={trash_can_img}
        height="48px"
        viewBox="0 0 100 100"
        style={{...pinStyle}}
        onClick={onClick}
      >
      </img>
    );
  }
}
