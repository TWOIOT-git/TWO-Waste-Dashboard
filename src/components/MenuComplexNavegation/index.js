import React, { Component } from 'react'
import NavLinkCustom from '../NavLinkCustom';
import './styles.css'

const MOCK_URL_IMAGE = 'http://www.maltratoinfantil.org/wp-content/uploads/2015/12/John-Lennon.jpg'

class MenuComplexNavegation extends Component {
  render() {
    return (
      <nav className="MenuComplexNavegation-wrapper">
        <section className="MenuComplexNavegation-header__div">
          <img src={MOCK_URL_IMAGE} alt="User profile" />
          <p>
            Welcome, <strong>Alex!</strong>
          </p>
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
                  <NavLinkCustom to='/map-data'>
                    Map Data
                  </NavLinkCustom>
                </li>
                <li>
                  <NavLinkCustom to='/realtime'>
                    Realtime
                </NavLinkCustom>
                </li>
                <li>
                  <NavLinkCustom to='/alerts'>
                    Alerts
                  </NavLinkCustom>
                </li>
                <li>
                  <NavLinkCustom to='/tech'>
                    TechCruch 2019
                  </NavLinkCustom>
                </li>
              </ul>
            </div>
            <div className="MenuComplexNavegation-section-wrapper__div">
              <ul className="MenuComplexNavegation-section-options__ul">
                <li>
                  Admin
                </li>
                <li>
                  <NavLinkCustom to='/locations'>
                    Locations
                  </NavLinkCustom>
                </li>
                <li>
                  <NavLinkCustom to='/settings'>
                    Settings
                  </NavLinkCustom>
                </li>
                <li>
                  <NavLinkCustom to='/ota'>
                    OTA Updates
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
