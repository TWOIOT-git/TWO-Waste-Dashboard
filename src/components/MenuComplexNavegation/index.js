import React, { Component } from 'react'
import NavLinkCustom from '../NavLinkCustom';
import './styles.css'
import twoiot_logo from '../../assets/images/twoiot_logo.jpg'
import icon_dashboard from '../../assets/images/icon-dashboard.svg'
import icon_bin from '../../assets/images/icon-bin.svg'

class MenuComplexNavegation extends Component {
  render() {
    return (
      <nav className="MenuComplexNavegation-wrapper">
        <section className="MenuComplexNavegation-header__div">
          <img src={twoiot_logo} alt="twoiot logo" />
          <p className="logo-typo">IOT Waste Management</p>
        </section>
        <div>
          <section className="MenuComplexNavegation-sections-wrapper__div">
            <div className="MenuComplexNavegation-section-wrapper__div">
              <ul className="MenuComplexNavegation-section-options__ul">
                <li>
                  <NavLinkCustom to='/' exact>
                    <img className="nav-img" src={icon_dashboard} alt="dashboard icon" />
                    Dashboard
                  </NavLinkCustom>
                </li>
                <li>
                  <NavLinkCustom to='/realtime'>
                    <img className="nav-img" src={icon_bin} alt="realtime icon" />
                    Realtime
                  </NavLinkCustom>
                </li>
                {/*
                <li>
                  <NavLinkCustom to='/demo'>
                    Asia World Expo 2018
                  </NavLinkCustom>
                </li>
                */}
              </ul>
            </div>
          </section>
        </div>
      </nav>
    )
  }
}

export default MenuComplexNavegation
