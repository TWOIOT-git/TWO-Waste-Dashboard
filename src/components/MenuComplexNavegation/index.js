import React, { Component } from 'react'
import NavLinkCustom from '../NavLinkCustom';
import './styles.css'
import twoiot_logo from '../../assets/images/twoiot_logo.jpg'

class MenuComplexNavegation extends Component {
  render() {
    return (
      <nav className="MenuComplexNavegation-wrapper">
        <section className="MenuComplexNavegation-header__div">
          <img src={twoiot_logo} alt="twoiot logo" />
          <p>IOT Waste Management </p>
        </section>
        <div>
          <section className="MenuComplexNavegation-sections-wrapper__div">
            <div className="MenuComplexNavegation-section-wrapper__div">
              <ul className="MenuComplexNavegation-section-options__ul">
                <li>
                  Main Navegation
                </li>
                <li>
                  <NavLinkCustom to='/' exact>
                    Dashboard
                  </NavLinkCustom>
                </li>
                <li>
                  <NavLinkCustom to='/realtime'>
                    Realtime
                  </NavLinkCustom>
                </li>
                <li>
                  <NavLinkCustom to='/demo'>
                    Asia World Expo 2018
                  </NavLinkCustom>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </nav>
    )
  }
}

export default MenuComplexNavegation
