import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withRouter } from "next/router";
import breakpoints from "../utils/breakpoints";
import { withTranslation } from '../i18n'

const SettingLayout = ({ children, router: { pathname }, t }) => {
  return (
    <section>
      <h1>
        {t('settings')}<span>.</span>
      </h1>
      <div>
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
      <style jsx>
        {`
          section {
            background-color: white;
            min-height: 100vh;
            padding: 52px 89px;

            @media (max-width: ${breakpoints.phone}) {
              padding: 10px;
              min-height: unset
            }

            h1 {
              margin: 0;
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

            > div {
              margin-top: 43px;
              margin-bottom: 83px;
              max-width: 400px;
              width: 100%;
              display: flex;
              justify-content: space-between;

              @media (max-width: ${breakpoints.phone}) {
                flex-direction: column;
                margin-top: 0;
                margin-bottom: 43px;

                > div {
                  margin-top: 2rem;
                }
              }

              > div {
                > a {
                  font-family: Roboto;
                  font-style: normal;
                  font-weight: normal;
                  font-size: 16px;
                  line-height: 19px;
                  color: #545454;
                  text-decoration: none;

                  &.--active {
                    color: #00bf8d;
                    padding-bottom: 5px;
                    border-bottom: 2px solid #00bf8d;
                  }
                }
              }
            }
          }
        `}
      </style>
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
