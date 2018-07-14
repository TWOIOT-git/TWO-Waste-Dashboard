import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

class MenuComplexNavegation extends Component {
  render() {
    return (
      <nav className="MenuComplexNavegation-wrapper">
        <section className="MenuComplexNavegation-header__div">
          {/* <img src={logo} alt="Logo"/> */}
        </section>
        <div>
          <section className="MenuComplexNavegation-sections-wrapper__div">
            <div className="MenuComplexNavegation-section-wrapper__div">
              <div className="MenuComplexNavegation-section-title__div">
                {/* <span>
                  <MaterialIcon icon="security" size={18} />
                </span> */}
                <span>
                  <Link to="/portfolio">
                    Portfolio
                  </Link>
                </span>
              </div>
              <ul className="MenuComplexNavegation-section-options__ul">
                <li>
                  Overview
                </li>
                <li>
                  Omega Status
                </li>
                <li>
                  Transaction History
                </li>
                <li className="--disabled">
                  Perfomance Report
                </li>
                <li className="--disabled">
                  Taxes
                </li>
              </ul>
            </div>
            <div className="MenuComplexNavegation-section-wrapper__div">
              <div className="MenuComplexNavegation-section-title__div">
                {/* <span>
                  <MaterialIcon icon="domain" size={18} />
                </span> */}
                <span>
                  <Link to="/markets">
                    Markets
                  </Link>
                </span>
              </div>
              <ul className="MenuComplexNavegation-section-options__ul">
                <li>
                  Overview
                </li>
              </ul>
            </div>
            <div className="MenuComplexNavegation-section-wrapper__div">
              <div className="MenuComplexNavegation-section-title__div">
                {/* <span>
                  <MaterialIcon icon="comment" size={18} />
                </span> */}
                <span>
                  Forum
                </span>
              </div>
              <ul className="MenuComplexNavegation-section-options__ul">
                <li>
                  Bronze Forum
                </li>
                <li>
                  Silver Forum
                </li>
                <li>
                  Gold Forum
                </li>
              </ul>
            </div>
            <div className="MenuComplexNavegation-section-wrapper__div">
              <div className="MenuComplexNavegation-section-title__div">
                {/* <span>
                  <MaterialIcon icon="settings" size={18} />
                </span> */}
                <span>
                  Account
                </span>
              </div>
              <ul className="MenuComplexNavegation-section-options__ul">
                <li>
                  Profile
                </li>
                <li>
                  Security
                </li>
                <li>
                  Payment Details
                </li>
                <li>
                  Verification
                </li>
                <li>
                  UI Preferences
                </li>
              </ul>
            </div>
          </section>
        </div>
        <section className="MenuComplexNavegation-footer__div">
          <div>
            {/* <span>
              <MaterialIcon icon="expand" size={18} />
            </span> */}
            <span>
              Collapse Menu
            </span>
          </div>
        </section>
      </nav>
    )
  }
}

export default MenuComplexNavegation
