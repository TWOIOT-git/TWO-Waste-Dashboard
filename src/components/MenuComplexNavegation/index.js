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
                  <NavLinkCustom to='/realtime'>
                    Realtime
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
