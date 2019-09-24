import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withRouter } from "next/router";
import { withTranslation } from '../../i18n'

import './SettingLayout.scss'

const SettingLayout = ({ children, router: { pathname }, t }) => {
  return (
    <section>
      <h1>
        {t('settings')}<span>.</span>
      </h1>
      <div className="sub-menu">
        <div>
          <Link href="settings_user_details">
            <a
              className={`${
                pathname === "/settings_user_details" ? "--active" : ""
              }`}
            >
              {t('user-details')}
            </a>
          </Link>
        </div>
        <div>
          <Link href="settings_notifications">
            <a
              className={`${
                pathname === "/settings_notifications" ? "--active" : ""
              }`}
            >
              {t('notifications')}
            </a>
          </Link>
        </div>
        <div>
          <Link href="settings_generals">
            <a
              className={`${
                pathname === "/settings_generals" ? "--active" : ""
              }`}
            >
              {t('language-region')}
            </a>
          </Link>
        </div>
      </div>
      {children}
    </section>
  );
};

SettingLayout.propTypes = {
  t: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};


export default withTranslation('settings')(withRouter(SettingLayout))
