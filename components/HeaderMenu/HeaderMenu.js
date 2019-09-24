import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withRouter } from "next/router";
import { withTranslation } from '../../i18n'

import './HeaderMenu.scss'

const Item = ({
  children,
                link,
                className
}) => {

  return (
    <Link href={link}>
      <a className={className}>
        {children}
        <style jsx>
          {`
            a {
              display: block;
              font-family: Roboto;
              font-style: normal;
              font-weight: normal;
              font-size: 16px;
              line-height: normal;
              text-decoration: none;
              padding: 10px 20px;
              color: #757575;
              margin-left: 15px;

              &:focus,
              &:hover {
                color: #00b284;
              }
              
              &.button {
                color: #333333;
                font-weight: bold;
                border: 1px solid #666;
                border-radius: 3px;
                
                &:hover {
                  color: #00b284;
                  border: 1px solid #00b284;
                }
              }
            }
          `}
        </style>
      </a>
    </Link>
  );
};

Item.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

const tryAddActiveColor = (pathname, href) => {
  if (Array.isArray(href)) {
    return href.includes(pathname) ? "#00B284" : "#333333";
  }
  return pathname === href ? "#00B284" : "#333333";
};
const HeaderMenu = ({
                      router: {pathname},
                      t
                    }) => (
  <div className="HeaderMenu">
    <div>
      <Item pathname={pathname} link="/get-started">
        {t('sign-up')}
      </Item>
      <Item pathname={pathname} className="button" link="/">
        {t('sign-in')}
      </Item>
    </div>
  </div>
);

HeaderMenu.propTypes = {
};

export default withTranslation('public')(withRouter(HeaderMenu))
