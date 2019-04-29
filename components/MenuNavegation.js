import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { withRouter } from "next/router";

const Item = ({ children, text, link, numberNews, pathname }) => {
  const active = pathname === link;
  return (
    <Link href={link}>
      <a>
        {children}
        <span className="text">{text}</span>
        <If condition={numberNews}>
          <span className="news">{numberNews}</span>
        </If>
        <style jsx>
          {`
            a {
              margin-top: 28px;
              display: block;
              font-family: Roboto;
              font-style: normal;
              font-weight: bold;
              font-size: 16px;
              line-height: normal;
              text-decoration: none;

              .text {
                color: ${active ? "#00b284" : "#333333"};
              }

              .news {
                background-color: #da6464;
                width: 20px;
                height: 20px;
                display: inline-flex;
                margin-left: 10px;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                font-family: Roboto;
                font-style: normal;
                font-weight: bold;
                font-size: 10px;
                line-height: normal;
                text-align: center;

                color: #ffffff;
              }

              &:focus,
              &:hover {
                .text {
                  color: #00b284;
                }
              }

              .text {
                margin-left: 9px;
              }
            }
          `}
        </style>
      </a>
    </Link>
  );
};

Item.defaultProps = {
  numberNews: 0
};

Item.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  numberNews: PropTypes.number,
  link: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired
};

const tryAddActiveColor = (pathname, href) =>
  pathname === href ? "#00B284" : "#333333";

// TODO: Add tryAddActiveColor in all fills of icons
const MenuNavegation = ({ userImage, userName, router: { pathname } }) => (
  <div className="MenuNavegation">
    <div>
      <img src={userImage} alt="lidbot user" />
      <h1>
        Morning, <strong>{userName}</strong>!
      </h1>
    </div>
    <div>
      <h2>Main Navigation</h2>
      <Item pathname={pathname} text="Dashboard" link="/analytics">
        <svg
          width="19"
          height="14"
          viewBox="0 0 19 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.6146 13.014C2.5047 13.014 3.2289 12.2901 3.2289 11.4C3.2289 11.0244 3.0948 10.683 2.8791 10.4085L4.6455 8.3661C4.8834 8.5041 5.1558 8.589 5.4501 8.589C5.8818 8.589 6.2724 8.4165 6.5625 8.1393L9.387 10.1607C9.2922 10.3662 9.2355 10.5927 9.2355 10.8336C9.2355 11.7237 9.96 12.4479 10.8498 12.4479C11.7396 12.4479 12.4641 11.7237 12.4641 10.8336C12.4641 10.3716 12.2667 9.9573 11.9547 9.6627L16.1235 3.1113C16.3086 3.1857 16.5096 3.2289 16.7208 3.2289C17.6109 3.2289 18.3351 2.5044 18.3351 1.6143C18.3351 0.7242 17.6109 0 16.7208 0C15.8307 0 15.1065 0.7242 15.1065 1.6143C15.1065 2.0763 15.3039 2.4903 15.6156 2.7849L11.4462 9.3369C11.2614 9.2628 11.0607 9.2193 10.8495 9.2193C10.4181 9.2193 10.0272 9.3918 9.7371 9.669L6.9129 7.6479C7.0077 7.4424 7.0644 7.2159 7.0644 6.9747C7.0644 6.0846 6.3402 5.3604 5.4501 5.3604C4.5597 5.3604 3.8355 6.0846 3.8355 6.9747C3.8355 7.3524 3.9711 7.6953 4.1892 7.9707L2.4243 10.0113C2.1852 9.8712 1.911 9.7854 1.6146 9.7854C0.7245 9.7854 0 10.5096 0 11.4C0 12.2901 0.7242 13.014 1.6146 13.014ZM16.7205 0.6042C17.2776 0.6042 17.7312 1.0575 17.7312 1.6149C17.7312 2.1723 17.2776 2.6256 16.7205 2.6256C16.1634 2.6256 15.7098 2.1723 15.7098 1.6149C15.7098 1.0575 16.1631 0.6042 16.7205 0.6042ZM10.8492 9.8229C11.4063 9.8229 11.8599 10.2765 11.8599 10.8339C11.8599 11.391 11.4063 11.8446 10.8492 11.8446C10.2921 11.8446 9.8385 11.391 9.8385 10.8339C9.8385 10.2765 10.2921 9.8229 10.8492 9.8229ZM5.4498 5.9643C6.0069 5.9643 6.4605 6.4176 6.4605 6.975C6.4605 7.5324 6.0072 7.9857 5.4498 7.9857C4.8924 7.9857 4.4391 7.5324 4.4391 6.975C4.4391 6.4176 4.8924 5.9643 5.4498 5.9643ZM1.6146 10.389C2.1717 10.389 2.625 10.8426 2.625 11.4C2.625 11.9571 2.1717 12.4104 1.6146 12.4104C1.0572 12.4104 0.6039 11.9571 0.6039 11.4C0.6039 10.8426 1.0572 10.389 1.6146 10.389Z"
            fill={tryAddActiveColor(pathname, "/analytics")}
          />
        </svg>
      </Item>
      <Item pathname={pathname} text="Map Data" link="/map">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.6 0C12.2427 0 14.6517 1.07865 16.3775 2.80449C18.1213 4.54831 19.2 6.93933 19.2 9.6C19.2 12.2427 18.1213 14.6517 16.3775 16.3775C14.6517 18.1213 12.2427 19.2 9.6 19.2C6.93933 19.2 4.54831 18.1213 2.80449 16.3775C1.07865 14.6517 0 12.2427 0 9.6C0 6.93933 1.07865 4.54831 2.80449 2.80449C4.54831 1.07865 6.93933 0 9.6 0V0ZM9.6 3.0382C11.3978 3.0382 13.0337 3.77528 14.2202 4.9618C15.4067 6.14831 16.1438 7.78427 16.1438 9.6C16.1438 11.1101 15.6404 12.4944 14.7775 13.609C14.7955 13.6989 14.8135 13.8067 14.8135 13.8966C14.8135 14.4 14.4 14.8135 13.8966 14.8135C13.8067 14.8135 13.6989 14.7955 13.609 14.7775C12.4944 15.6404 11.1101 16.1438 9.6 16.1438C7.78427 16.1438 6.14831 15.4067 4.9618 14.2202C3.95506 13.2315 3.28989 11.9011 3.09213 10.409C2.80449 10.2652 2.58876 9.95955 2.58876 9.6C2.58876 9.24045 2.80449 8.93483 3.09213 8.77303C3.28989 7.29888 3.95506 5.96854 4.9618 4.9618C6.14831 3.77528 7.78427 3.0382 9.6 3.0382ZM13.2494 5.30337C12.2607 4.45843 10.9843 3.95506 9.6 3.95506C8.03595 3.95506 6.63371 4.58427 5.60899 5.60899C4.76404 6.45393 4.18876 7.58652 4.00899 8.84494C4.26067 9.00674 4.42247 9.2764 4.42247 9.6C4.42247 9.90562 4.26067 10.1933 4.00899 10.3551C4.18876 11.6135 4.76404 12.7281 5.60899 13.573C6.63371 14.5978 8.03595 15.227 9.6 15.227C10.8764 15.227 12.0629 14.7955 13.0157 14.0764C12.9978 14.0225 12.9978 13.9685 12.9978 13.8966C12.9978 13.3933 13.3933 12.9978 13.8966 12.9978C13.9685 12.9978 14.0225 12.9978 14.0764 13.0157C14.7955 12.0629 15.227 10.8764 15.227 9.6C15.227 8.19775 14.7236 6.92135 13.8966 5.95056L11.164 8.66517C11.3258 8.93483 11.4157 9.25843 11.4157 9.6C11.4157 10.1034 11.218 10.5528 10.8944 10.8944C10.5528 11.218 10.1034 11.4157 9.6 11.4157C8.59326 11.4157 7.76629 10.6067 7.76629 9.6C7.76629 9.09663 7.96405 8.62921 8.30562 8.30562C8.62921 7.96405 9.09663 7.76629 9.6 7.76629C9.94157 7.76629 10.2472 7.85618 10.5169 8.01798L13.2494 5.30337ZM10.2472 8.95281C10.0674 8.79101 9.83371 8.68315 9.6 8.68315C9.34831 8.68315 9.11461 8.79101 8.95281 8.95281C8.79101 9.11461 8.68315 9.34831 8.68315 9.6C8.68315 10.1034 9.09663 10.5169 9.6 10.5169C9.85168 10.5169 10.0854 10.409 10.2472 10.2472C10.409 10.0854 10.5169 9.85168 10.5169 9.6C10.5169 9.36629 10.409 9.11461 10.2472 8.95281ZM15.7303 3.45169C14.1663 1.88764 11.991 0.916854 9.6 0.916854C7.19101 0.916854 5.03371 1.88764 3.45169 3.45169C1.88764 5.03371 0.916854 7.19101 0.916854 9.6C0.916854 11.991 1.88764 14.1663 3.45169 15.7303C5.03371 17.3124 7.19101 18.2831 9.6 18.2831C11.991 18.2831 14.1663 17.3124 15.7303 15.7303C17.3124 14.1663 18.2831 11.991 18.2831 9.6C18.2831 7.19101 17.3124 5.03371 15.7303 3.45169Z"
            fill={tryAddActiveColor(pathname, "/map")}
          />
        </svg>
      </Item>
      <Item pathname={pathname} text="Sensors" link="/sensors">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.081 14.0377C12.1963 14.0377 12.3069 13.9918 12.3884 13.9103C12.4699 13.8288 12.5157 13.7182 12.5158 13.6029V6.39425C12.5157 6.27895 12.4699 6.16836 12.3884 6.08682C12.3069 6.00529 12.1963 5.95948 12.081 5.95947H7.92209C7.80678 5.95948 7.69619 6.00529 7.61466 6.08682C7.53312 6.16836 7.48731 6.27895 7.4873 6.39425V13.6029C7.48731 13.7182 7.53312 13.8288 7.61466 13.9103C7.69619 13.9918 7.80678 14.0377 7.92209 14.0377H12.081ZM8.35687 6.82904H11.6462V13.1681H8.35687V6.82904Z"
            fill={tryAddActiveColor(pathname, "/sensors")}
          />
          <path
            d="M13.4418 4.04313C12.3957 3.4377 11.2084 3.1189 9.99967 3.1189C8.79096 3.1189 7.60364 3.4377 6.55749 4.04313C6.50818 4.0719 6.46501 4.1101 6.43045 4.15556C6.3959 4.20101 6.37064 4.25283 6.35611 4.30805C6.34158 4.36326 6.33807 4.4208 6.34578 4.47738C6.35349 4.53395 6.37226 4.58845 6.40103 4.63777C6.4298 4.68709 6.46801 4.73026 6.51346 4.76481C6.55892 4.79937 6.61073 4.82463 6.66595 4.83916C6.72117 4.85369 6.77871 4.8572 6.83528 4.84949C6.89185 4.84178 6.94636 4.82301 6.99567 4.79423C7.90882 4.26638 8.94493 3.98846 9.99967 3.98846C11.0544 3.98846 12.0905 4.26638 13.0037 4.79423C13.1033 4.85234 13.2219 4.8685 13.3334 4.83916C13.4449 4.80981 13.5402 4.73737 13.5983 4.63777C13.6564 4.53817 13.6726 4.41956 13.6432 4.30805C13.6139 4.19653 13.5414 4.10124 13.4418 4.04313H13.4418Z"
            fill={tryAddActiveColor(pathname, "/sensors")}
          />
          <path
            d="M6.40103 15.3619C6.37226 15.4112 6.35349 15.4658 6.34578 15.5223C6.33807 15.5789 6.34158 15.6364 6.35611 15.6917C6.37064 15.7469 6.3959 15.7987 6.43045 15.8441C6.46501 15.8896 6.50818 15.9278 6.5575 15.9566C7.60364 16.562 8.79096 16.8808 9.99967 16.8808C11.2084 16.8808 12.3957 16.562 13.4418 15.9566C13.4912 15.9278 13.5343 15.8896 13.5689 15.8441C13.6034 15.7987 13.6287 15.7469 13.6432 15.6917C13.6578 15.6364 13.6613 15.5789 13.6536 15.5223C13.6459 15.4658 13.6271 15.4112 13.5983 15.3619C13.5695 15.3126 13.5313 15.2694 13.4859 15.2349C13.4404 15.2003 13.3886 15.1751 13.3334 15.1605C13.2782 15.146 13.2206 15.1425 13.1641 15.1502C13.1075 15.1579 13.053 15.1767 13.0037 15.2055C12.0905 15.7333 11.0544 16.0112 9.99967 16.0112C8.94494 16.0112 7.90883 15.7333 6.99568 15.2055C6.94638 15.1766 6.89187 15.1578 6.83529 15.1501C6.7787 15.1424 6.72114 15.1459 6.66591 15.1604C6.61068 15.1749 6.55886 15.2002 6.5134 15.2348C6.46795 15.2694 6.42977 15.3126 6.40103 15.3619Z"
            fill={tryAddActiveColor(pathname, "/sensors")}
          />
          <path
            d="M14.7827 2.15056C14.8784 2.15066 14.9715 2.11919 15.0474 2.06103C15.1234 2.00287 15.1781 1.92126 15.203 1.82887C15.2279 1.73647 15.2216 1.63844 15.1851 1.54998C15.1486 1.46152 15.084 1.38757 15.0012 1.33959C13.4807 0.462001 11.7561 0 10.0005 0C8.24498 0 6.52035 0.462001 4.99989 1.33959C4.90015 1.39741 4.82746 1.49249 4.79782 1.60391C4.76818 1.71533 4.78401 1.83396 4.84183 1.9337C4.89966 2.03345 4.99474 2.10614 5.10616 2.13578C5.21757 2.16542 5.3362 2.14959 5.43595 2.09176C6.82395 1.29107 8.39814 0.869574 10.0005 0.869574C11.6029 0.869574 13.1771 1.29107 14.5651 2.09176C14.6312 2.13027 14.7063 2.15056 14.7827 2.15056Z"
            fill={tryAddActiveColor(pathname, "/sensors")}
          />
          <path
            d="M4.99989 18.6603C6.52032 19.538 8.24497 20 10.0005 20C11.7561 20 13.4807 19.538 15.0012 18.6603C15.0506 18.6317 15.0938 18.5936 15.1285 18.5483C15.1632 18.5029 15.1886 18.4512 15.2032 18.396C15.2179 18.3408 15.2216 18.2833 15.214 18.2267C15.2065 18.1701 15.1879 18.1156 15.1592 18.0662C15.1306 18.0168 15.0925 17.9736 15.0472 17.9389C15.0018 17.9042 14.9501 17.8788 14.8949 17.8641C14.8397 17.8495 14.7822 17.8458 14.7256 17.8533C14.669 17.8609 14.6145 17.8795 14.5651 17.9081C13.1771 18.7089 11.6029 19.1304 10.0005 19.1304C8.39813 19.1304 6.82392 18.7089 5.43595 17.9081C5.38656 17.8795 5.33201 17.8609 5.27543 17.8533C5.21884 17.8458 5.16132 17.8495 5.10615 17.8641C5.05099 17.8788 4.99925 17.9042 4.9539 17.9389C4.90854 17.9736 4.87046 18.0168 4.84183 18.0662C4.8132 18.1156 4.79458 18.1701 4.78702 18.2267C4.77947 18.2833 4.78314 18.3408 4.79782 18.396C4.81249 18.4512 4.83789 18.5029 4.87256 18.5483C4.90724 18.5936 4.9505 18.6317 4.99989 18.6603Z"
            fill={tryAddActiveColor(pathname, "/sensors")}
          />
          <path
            d="M4.63812 6.4012C4.5888 6.37243 4.5343 6.35364 4.47772 6.34593C4.42115 6.33822 4.36361 6.34173 4.30839 6.35626C4.25317 6.37079 4.20135 6.39605 4.1559 6.43061C4.11045 6.46517 4.07224 6.50834 4.04348 6.55767C3.43798 7.60377 3.11914 8.79108 3.11914 9.99978C3.11914 11.2085 3.43798 12.3958 4.04348 13.4419C4.07225 13.4912 4.11045 13.5344 4.15591 13.5689C4.20136 13.6035 4.25318 13.6288 4.30839 13.6433C4.36361 13.6578 4.42115 13.6613 4.47772 13.6536C4.5343 13.6459 4.5888 13.6271 4.63812 13.5984C4.68744 13.5696 4.73061 13.5314 4.76516 13.4859C4.79971 13.4405 4.82498 13.3887 4.83951 13.3334C4.85403 13.2782 4.85755 13.2207 4.84984 13.1641C4.84213 13.1075 4.82335 13.053 4.79458 13.0037C4.26667 12.0906 3.98871 11.0545 3.98871 9.99978C3.98871 8.94505 4.26667 7.90895 4.79458 6.99585C4.82335 6.94653 4.84213 6.89203 4.84984 6.83545C4.85755 6.77888 4.85404 6.72134 4.83951 6.66612C4.82498 6.6109 4.79972 6.55909 4.76516 6.51363C4.73061 6.46818 4.68744 6.42997 4.63812 6.4012Z"
            fill={tryAddActiveColor(pathname, "/sensors")}
          />
          <path
            d="M15.3622 13.5983C15.4115 13.6272 15.466 13.646 15.5226 13.6537C15.5792 13.6614 15.6367 13.6579 15.6919 13.6434C15.7472 13.6288 15.799 13.6036 15.8444 13.569C15.8899 13.5344 15.9281 13.4912 15.9568 13.4419C16.5623 12.3958 16.8812 11.2085 16.8812 9.99976C16.8812 8.79106 16.5623 7.60375 15.9568 6.55765C15.8987 6.45804 15.8034 6.3856 15.6919 6.35626C15.5804 6.32692 15.4618 6.34308 15.3622 6.40119C15.2626 6.45929 15.1901 6.55459 15.1608 6.6661C15.1315 6.77762 15.1476 6.89623 15.2057 6.99583C15.7336 7.90893 16.0116 8.94504 16.0116 9.99977C16.0116 11.0545 15.7336 12.0906 15.2057 13.0037C15.1769 13.053 15.1582 13.1075 15.1505 13.1641C15.1428 13.2207 15.1463 13.2782 15.1608 13.3334C15.1753 13.3886 15.2006 13.4405 15.2351 13.4859C15.2697 13.5314 15.3129 13.5696 15.3622 13.5983Z"
            fill={tryAddActiveColor(pathname, "/sensors")}
          />
          <path
            d="M1.7162 15.2173C1.79254 15.2171 1.8675 15.1969 1.93355 15.1586C1.9996 15.1203 2.05442 15.0654 2.09249 14.9992C2.13057 14.933 2.15057 14.858 2.15047 14.7817C2.15038 14.7053 2.1302 14.6303 2.09197 14.5643C1.29114 13.1763 0.869566 11.6022 0.869566 9.99978C0.869566 8.3974 1.29114 6.82323 2.09197 5.43531C2.14982 5.33554 2.16567 5.21687 2.13603 5.10542C2.10639 4.99396 2.03368 4.89884 1.93391 4.84099C1.83414 4.78313 1.71547 4.76729 1.60402 4.79693C1.49256 4.82657 1.39744 4.89927 1.33959 4.99904C0.462001 6.51954 0 8.2442 0 9.99978C0 11.7554 0.462001 13.48 1.33959 15.0005C1.37785 15.0665 1.43278 15.1213 1.49889 15.1593C1.56499 15.1974 1.63993 15.2173 1.7162 15.2173Z"
            fill={tryAddActiveColor(pathname, "/sensors")}
          />
          <path
            d="M18.0662 4.84142C18.0168 4.87005 17.9735 4.90813 17.9388 4.95349C17.9041 4.99885 17.8787 5.05059 17.864 5.10577C17.8494 5.16095 17.8457 5.21848 17.8532 5.27508C17.8608 5.33168 17.8794 5.38624 17.908 5.43564C18.7089 6.82355 19.1304 8.39773 19.1304 10.0001C19.1304 11.6025 18.7089 13.1767 17.908 14.5646C17.8792 14.614 17.8603 14.6686 17.8526 14.7253C17.8449 14.782 17.8484 14.8397 17.8631 14.895C17.8777 14.9504 17.9031 15.0023 17.9378 15.0478C17.9725 15.0933 18.0158 15.1314 18.0654 15.1602C18.1149 15.1889 18.1695 15.2075 18.2263 15.215C18.283 15.2226 18.3407 15.2188 18.3959 15.204C18.4512 15.1892 18.503 15.1637 18.5484 15.1288C18.5938 15.0939 18.6319 15.0505 18.6604 15.0009C19.538 13.4804 20 11.7557 20 10.0001C20 8.24453 19.538 6.51986 18.6604 4.99937C18.6318 4.94997 18.5937 4.90671 18.5483 4.87203C18.5029 4.83736 18.4512 4.81197 18.396 4.7973C18.3408 4.78264 18.2833 4.77898 18.2267 4.78655C18.1701 4.79412 18.1156 4.81277 18.0662 4.84142Z"
            fill={tryAddActiveColor(pathname, "/sensors")}
          />
        </svg>
      </Item>
      <Item pathname={pathname} text="Alerts" link="/alerts" numberNews={23}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 15 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.4347 13.5306H12.8059V6.48104C12.8059 6.46584 12.8053 6.45064 12.804 6.43565C12.5281 3.17019 10.1315 0.799988 7.10526 0.799988C4.06771 0.799988 1.67089 3.17084 1.40654 6.43739C1.40545 6.45194 1.40479 6.46649 1.40479 6.48104V13.5306H0.775841C0.348039 13.5306 0 13.8775 0 14.3038V16.6236C0 17.05 0.348039 17.3968 0.775841 17.3968H4.56918V18.2725C4.56918 19.6663 5.70679 20.8 7.10526 20.8C8.50374 20.8 9.64135 19.6663 9.64135 18.2725V17.3968H13.4347C13.8625 17.3968 14.2105 17.05 14.2105 16.6236V14.3038C14.2105 13.8775 13.8625 13.5306 13.4347 13.5306ZM2.49446 6.50341C2.72045 3.82632 4.65657 1.88594 7.10526 1.88594C9.54415 1.88594 11.4803 3.82676 11.7161 6.5045V13.5308H2.49446V6.50341ZM8.55168 18.2723C8.55168 19.0672 7.90268 19.7138 7.10526 19.7138C6.30785 19.7138 5.65884 19.0672 5.65884 18.2723V17.3966H8.55146L8.55168 18.2723ZM13.1209 16.3107H1.08988V14.6166H13.1209V16.3107Z"
            fill="#545454"
          />
        </svg>
      </Item>
    </div>
    <div>
      <h2>Admin</h2>
      <Item pathname={pathname} text="Locations" link="/locations">
        <svg
          width="20"
          height="20"
          viewBox="0 0 15 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.0161 20C6.83175 20 6.6578 19.916 6.54288 19.7719C6.27578 19.4363 0 11.5006 0 7.0161C0 3.14757 3.14757 0 7.0161 0C10.8846 0 14.0322 3.14757 14.0322 7.0161C14.0322 11.4902 7.7569 19.4356 7.48957 19.7716C7.37489 19.9158 7.2007 20 7.0161 20ZM7.0161 1.20967C3.81458 1.20967 1.20967 3.81458 1.20967 7.0161C1.20967 10.4126 5.55336 16.462 7.01586 18.4023C8.47811 16.4605 12.8225 10.4049 12.8225 7.0161C12.8225 3.81434 10.2179 1.20967 7.0161 1.20967ZM7.0161 10.1141C5.30756 10.1141 3.91789 8.7244 3.91789 7.01586C3.91789 5.30732 5.3078 3.91789 7.0161 3.91789C8.7244 3.91789 10.1143 5.30756 10.1143 7.0161C10.1143 8.72464 8.72464 10.1141 7.0161 10.1141ZM7.0161 5.12756C5.97481 5.12756 5.12756 5.97481 5.12756 7.0161C5.12756 8.05739 5.97481 8.90464 7.0161 8.90464C8.05739 8.90464 8.90464 8.05739 8.90464 7.0161C8.90464 5.97481 8.05739 5.12756 7.0161 5.12756Z"
            fill="black"
          />
        </svg>
      </Item>
      <Item pathname={pathname} text="Settings" link="/settings">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9896 9.2C19.9896 8.94244 19.8887 8.70067 19.7053 8.51911C19.5362 8.35133 19.316 8.25422 19.0807 8.24244L17.2176 7.91111C17.1147 7.556 16.9849 7.20689 16.8296 6.86867C16.8442 6.85222 16.8578 6.83489 16.8702 6.81667L18.0151 5.14911C18.1722 4.97244 18.2573 4.74689 18.256 4.508C18.2547 4.24978 18.1522 4.00844 17.9711 3.832L16.4945 2.36489C16.1305 2.00889 15.5518 2 15.1789 2.33511L13.626 3.41844C13.3018 3.23956 12.9631 3.084 12.614 2.95422C12.6127 2.93311 12.61 2.91178 12.6062 2.89089L12.238 0.897555C12.2047 0.397555 11.7844 0 11.2758 0C11.2753 0 11.2747 0 11.2742 0L9.99756 0.00555558L9.19223 0.00777774C8.68534 0.0142222 8.26934 0.416222 8.24067 0.915556L7.91134 2.78156C7.55556 2.88467 7.20645 3.014 6.86845 3.168C6.85201 3.15311 6.83423 3.13933 6.81601 3.12689L5.14578 1.98133C4.76801 1.65156 4.18978 1.66711 3.83112 2.02689L2.36801 3.50222C2.18712 3.68333 2.08801 3.92422 2.08867 4.18067C2.08934 4.41911 2.17623 4.64422 2.33445 4.82022L3.41778 6.37133C3.23845 6.69644 3.08289 7.03556 2.95356 7.38422C2.93178 7.38556 2.91023 7.38822 2.88889 7.39222L0.902228 7.76222C0.66645 7.776 0.447117 7.87422 0.279561 8.04245C0.0984503 8.22422 -0.000882975 8.46578 5.9144e-06 8.72333L0.00778366 10.8049C0.0124503 11.3127 0.41445 11.7293 0.914895 11.758L2.78001 12.0878C2.88178 12.4396 3.01178 12.7893 3.16845 13.1322C3.15423 13.1482 3.14112 13.1651 3.12889 13.1827L1.98223 14.8511C1.82601 15.0264 1.74134 15.2507 1.74223 15.4889C1.74334 15.748 1.84534 15.99 2.02689 16.168L3.50223 17.634C3.68356 17.8124 3.92312 17.9104 4.17756 17.9104C4.17889 17.9104 4.18023 17.9104 4.18178 17.9104C4.42023 17.9093 4.64467 17.8224 4.81978 17.6642L6.37201 16.5811C6.69756 16.7611 7.03645 16.9162 7.38401 17.044C7.38534 17.0658 7.38801 17.0873 7.39201 17.1087L7.76089 19.1C7.79267 19.6013 8.21245 20 8.72289 20L10.0022 19.9944L10.8025 19.992C11.312 19.9882 11.7287 19.5858 11.756 19.0838L12.0869 17.218C12.4511 17.1133 12.8011 16.9838 13.1322 16.8313C13.1487 16.8458 13.1658 16.8591 13.1836 16.8716L14.8507 18.0158C15.0253 18.1716 15.2484 18.2571 15.4849 18.2573C15.4853 18.2573 15.4858 18.2573 15.4862 18.2573C15.7429 18.2573 15.9845 18.1571 16.1682 17.9736L17.6298 16.4984C17.8111 16.3173 17.9104 16.0762 17.91 15.8198C17.9096 15.5811 17.8229 15.3562 17.6647 15.1802L16.5798 13.6282C16.7584 13.3044 16.9144 12.9653 17.0453 12.6158C17.0665 12.6144 17.0878 12.6118 17.1087 12.6078L19.0971 12.2373C19.3342 12.2236 19.5544 12.1242 19.7225 11.9542C19.9031 11.7718 20.0011 11.53 19.9982 11.2771L19.9896 9.2ZM18.9429 11.1951L16.952 11.566C16.644 11.586 16.3551 11.7451 16.1711 11.9984C16.1413 12.0396 16.1178 12.0844 16.1009 12.132C15.9467 12.5673 15.7482 12.9844 15.5109 13.3718C15.424 13.5136 15.4093 13.688 15.4711 13.8424C15.5162 13.9553 15.582 14.0618 15.6622 14.1531L16.8233 15.8144C16.8236 15.8149 16.824 15.8153 16.8242 15.8156L15.4807 17.1713C15.4802 17.1711 15.4796 17.1707 15.4791 17.1702L13.8091 16.0238C13.5747 15.8184 13.2658 15.7282 12.954 15.7753C12.9013 15.7833 12.8505 15.7991 12.8027 15.8224C12.4045 16.016 11.9702 16.1704 11.5116 16.2813C11.3464 16.3213 11.2107 16.4387 11.1471 16.5962C11.0993 16.7149 11.0729 16.8296 11.0665 16.9449L10.7133 18.9371C10.7131 18.9378 10.7131 18.9384 10.7129 18.9393L9.99867 18.9416C9.99845 18.9416 9.99823 18.9416 9.99801 18.9416L8.80289 18.9469C8.80289 18.9464 8.80267 18.9458 8.80267 18.9451L8.43401 16.9544C8.41534 16.6453 8.26223 16.3631 8.00823 16.1738C7.96467 16.1413 7.91645 16.116 7.86534 16.0982C7.43489 15.9498 7.01845 15.7524 6.62801 15.512C6.48534 15.424 6.30934 15.4096 6.15445 15.4724C6.03823 15.5193 5.93401 15.5844 5.84401 15.6662L4.18534 16.8238C4.18423 16.8244 4.18334 16.8251 4.18245 16.8258L2.82801 15.4798L3.97645 13.8087C4.18045 13.5756 4.27245 13.2589 4.22356 12.9511C4.21556 12.9009 4.20045 12.8522 4.17845 12.8067C3.97645 12.384 3.82134 11.9498 3.71778 11.516C3.67978 11.3567 3.56978 11.2244 3.42045 11.1576C3.30156 11.1044 3.17867 11.074 3.05512 11.0671L1.06112 10.7149C1.06067 10.7149 1.06001 10.7147 1.05956 10.7147L1.05245 8.80511C1.05356 8.80489 1.05467 8.80467 1.05578 8.80444L3.04467 8.434C3.35423 8.414 3.64378 8.25511 3.82756 8.00178C3.85778 7.96044 3.88156 7.91467 3.89845 7.86622C4.04978 7.43333 4.24756 7.01622 4.48667 6.62667C4.57334 6.48533 4.58845 6.31133 4.52734 6.15733C4.48067 6.03978 4.41534 5.93467 4.33289 5.84356L3.17556 4.18622C3.17512 4.18556 3.17467 4.18489 3.17423 4.18444L4.51912 2.82822C4.51934 2.82844 4.51956 2.82844 4.52001 2.82867L6.18801 3.97267C6.42001 4.17956 6.7369 4.27222 7.04778 4.22356C7.09801 4.21556 7.14667 4.20022 7.19245 4.17844C7.60689 3.98 8.04223 3.82511 8.48601 3.71778C8.64267 3.68 8.77312 3.57244 8.84045 3.42622C8.89356 3.31089 8.92467 3.18378 8.93178 3.05556L9.28356 1.062C9.28356 1.06133 9.28378 1.06089 9.28378 1.06022L10.0011 1.05822C10.0013 1.05822 10.0013 1.05822 10.0016 1.05822C10.0018 1.05822 10.0018 1.05822 10.002 1.05822L11.1965 1.05289L11.5647 3.046C11.5849 3.35733 11.7445 3.64733 11.9987 3.82978C12.0396 3.85911 12.0842 3.88244 12.1318 3.89911C12.5662 4.05111 12.9833 4.24933 13.3716 4.488C13.5167 4.57711 13.6956 4.59067 13.8522 4.52422C13.9633 4.47733 14.0642 4.41333 14.1529 4.33422L15.8129 3.17622C15.8138 3.17556 15.8147 3.17489 15.8156 3.17422L17.17 4.52C17.17 4.52022 17.1698 4.52067 17.1696 4.52089L16.024 6.18933C15.8196 6.41933 15.7282 6.72644 15.7727 7.04044C15.7802 7.09422 15.7962 7.14667 15.8198 7.19578C16.0196 7.60978 16.1747 8.04378 16.2807 8.48578C16.3184 8.64267 16.426 8.77378 16.5729 8.84133C16.6896 8.89489 16.8142 8.92533 16.944 8.932L18.9349 9.286C18.9356 9.286 18.9362 9.28622 18.9369 9.28622L18.9449 11.1947C18.9445 11.1947 18.9438 11.1949 18.9429 11.1951Z"
            fill="black"
          />
          <path
            d="M9.99948 6.48795C9.05593 6.48795 8.1697 6.85706 7.50348 7.52773C6.1417 8.90306 6.15081 11.1311 7.52548 12.4957C8.19059 13.1515 9.06926 13.5126 9.9997 13.5126C10.9453 13.5126 11.8308 13.1428 12.4917 12.4726C13.8553 11.1 13.8468 8.87195 12.4728 7.50551C11.8117 6.84929 10.9335 6.48795 9.99948 6.48795ZM11.7435 11.7322C11.2806 12.2015 10.661 12.4602 9.99948 12.4602C9.34748 12.4602 8.73126 12.2066 8.2657 11.7475C7.30393 10.7926 7.29748 9.23195 8.25081 8.26906C8.71748 7.79929 9.33859 7.54062 9.99948 7.54062C10.6537 7.54062 11.2686 7.79329 11.7306 8.25218C12.693 9.20929 12.6993 10.7697 11.7435 11.7322Z"
            fill="black"
          />
        </svg>
      </Item>
      <Item pathname={pathname} text="OTA Updates" link="/ota">
        <svg
          width="20"
          height="20"
          viewBox="0 0 27 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.3469 6.40353C23.8587 2.74214 20.7842 0 17.1176 0C14.604 0 12.2773 1.31394 10.9426 3.46404C10.2623 3.15762 9.5196 2.99662 8.77175 2.99662C6.94365 2.99662 5.22981 3.96261 4.25863 5.53103C1.85406 5.82706 0 7.92521 0 10.4077C0 13.1187 2.17086 15.3207 4.84549 15.3207H7.37471C7.96157 17.9953 10.3454 20 13.1914 20C16.0374 20 18.4212 17.9901 19.008 15.3207H21.5373C24.2067 15.3207 26.3828 13.1135 26.3828 10.4077C26.3828 8.8081 25.6245 7.32797 24.3469 6.40353ZM13.1914 19.1535C10.3765 19.1535 8.08621 16.8632 8.08621 14.0483C8.08621 11.2334 10.3765 8.94313 13.1914 8.94313C16.0062 8.94313 18.2965 11.2334 18.2965 14.0483C18.2965 16.8632 16.0062 19.1535 13.1914 19.1535ZM21.5373 14.469H19.1275C19.1379 14.3287 19.1483 14.1885 19.1483 14.0431C19.1483 10.7556 16.4736 8.08621 13.1914 8.08621C9.90911 8.08621 7.23448 10.7608 7.23448 14.0431C7.23448 14.1885 7.24487 14.3287 7.25526 14.469H4.84549C2.64347 14.469 0.851727 12.6461 0.851727 10.4025C0.851727 8.28876 2.47728 6.5074 4.54947 6.3516L4.77798 6.33602L4.89224 6.13867C5.69203 4.72085 7.18255 3.84316 8.77694 3.84316C9.51961 3.84316 10.2571 4.03532 10.9115 4.39366L11.2854 4.6014L11.4879 4.22747C12.6253 2.1449 14.7858 0.851727 17.1228 0.851727C20.4155 0.851727 23.1732 3.36017 23.5316 6.68917L23.5523 6.88652L23.7185 6.99559C24.8559 7.74864 25.5362 9.02623 25.5362 10.4025C25.531 12.6461 23.7393 14.469 21.5373 14.469Z"
            fill="black"
          />
          <path
            d="M13.1914 16.5983C11.6697 16.5983 10.4129 15.4297 10.2727 13.9444L10.5375 14.2093L11.14 13.6068L9.83121 12.2981L8.52246 13.6068L9.1249 14.2093L9.42093 13.9133C9.55076 15.8816 11.1919 17.4448 13.1914 17.4448C14.3391 17.4448 15.4142 16.9307 16.1361 16.0374L15.4765 15.5077C14.9156 16.1984 14.0795 16.5983 13.1914 16.5983Z"
            fill="black"
          />
          <path
            d="M13.1918 10.2155C12.044 10.2155 10.969 10.7297 10.2471 11.623L10.9066 12.1579C11.4675 11.462 12.2985 11.0673 13.1918 11.0673C14.7134 11.0673 15.9703 12.2358 16.1105 13.7211L15.8456 13.4563L15.2432 14.0535L16.5519 15.3623L17.8607 14.0535L17.2582 13.4511L16.9622 13.7471C16.8324 11.7788 15.1912 10.2155 13.1918 10.2155Z"
            fill="black"
          />
        </svg>
      </Item>
    </div>
    <div>
      <Item pathname={pathname} text="Logout" link="/logout">
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.33923 1.36101V0H0V20H7.33923V18.639H1.36101V1.36101H7.33923Z"
            fill="black"
          />
          <path
            d="M10.7591 4.8554L9.75873 5.78088L13.0388 9.3195H3.61719V10.6805H13.0388L9.75873 14.2191L10.7591 15.1446L15.526 10L10.7591 4.8554Z"
            fill="black"
          />
        </svg>
      </Item>
    </div>
    <style jsx>
      {`
        .MenuNavegation {
          height: 100vh;
          width: 200px;
          background: #ffffff;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
          position: fixed;

          > div {
            padding-top: 34px;
            padding-bottom: 34px;

            &:not(:last-child) {
              border-bottom: 2px solid rgba(216, 216, 216, 0.2);
            }

            &:nth-child(1) {
              text-align: center;

              img {
                border: 2px solid #00b284;
                border-radius: 50%;
                width: 84px;
                height: 84px;
              }

              h1 {
                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: normal;

                color: #333333;
              }
            }

            &:nth-child(2),
            &:nth-child(3),
            &:nth-child(4) {
              margin-left: 28px;
            }

            h2 {
              font-family: Roboto;
              font-style: normal;
              font-weight: bold;
              font-size: 16px;
              line-height: normal;
              margin: 0 0 0 0;
              color: rgba(130, 130, 130, 0.25);
            }
          }
        }
      `}
    </style>
  </div>
);

MenuNavegation.propTypes = {
  userImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(MenuNavegation);
