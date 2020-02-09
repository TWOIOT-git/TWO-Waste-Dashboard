import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withRouter } from "next/router";
import { withTranslation } from '../i18n'
import capabilities from '../utils/capabilities'
const SettingLayout = ({ children, router: { pathname }, t }) => {
  return (
    <section>
      <h1>
        {t('settings')}<span>.</span>
      </h1>
      <div className="sub-menu">
        <div>
          <Link href="profile">
            <a
              className={`${
                pathname === "/profile" ? "--active" : ""
              }`}
            >
              {t('user-details')}
            </a>
          </Link>
        </div>
        {/*<div>*/}
        {/*  <Link href="settings_notifications">*/}
        {/*    <a*/}
        {/*      className={`${*/}
        {/*        pathname === "/settings_notifications" ? "--active" : ""*/}
        {/*      }`}*/}
        {/*    >*/}
        {/*      {t('notifications')}*/}
        {/*    </a>*/}
        {/*  </Link>*/}
        {/*</div>*/}
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
        <div>
          <Link href="team">
            <a
              className={`${
                pathname === "/team" ? "--active" : ""
              }`}
            >
              {t('team.title')}
            </a>
          </Link>
        </div>
        {/*<If condition={capabilities.can_change_bin_full_threshold(this.props.user_attributes['custom:user_role'])}>*/}
        {/*  <div>*/}
        {/*    <Link href="account-management">*/}
        {/*      <a*/}
        {/*        className={`${*/}
        {/*          pathname === "/account-management" ? "--active" : ""*/}
        {/*        }`}*/}
        {/*      >*/}
        {/*        {t('team.account-management')}*/}
        {/*      </a>*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</If>*/}
      </div>
      {children}
      <style jsx>
        {`
        section {
              display: flex;
              flex-direction: column;
              padding: 52px 89px;
              background-color: white;
            }
                    h1 {
              margin: 0 0 30px;
              font-family: Roboto;
              font-style: normal;
              font-weight: bold;
              font-size: 36px;
              line-height: 42px;
              color: #545454;

              span {
                color: #00bf8d;
              }
            }
            .sub-menu {
              margin-top: 43px;
              margin-bottom: 83px;

              div {
                margin-right: 25px;
                display: inline-block
              }

              a {
                text-decoration: none;
                color: rgb(84, 84, 84);

                &.--active {
                  color: rgb(0, 191, 141);
                  padding-bottom: 5px;
                  border-bottom: 2px solid rgb(0, 191, 141);
                }
              }
            }
        `}
      </style>
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
