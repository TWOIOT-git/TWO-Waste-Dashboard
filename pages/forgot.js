import React from "react";
import HeaderMenu from "../components/HeaderMenu";
import Head from "../components/Head";
import { forgotPassword } from '../utils/auth'
import { withTranslation } from '../i18n'
import Link from "next/link"


class Forgot extends React.Component {

  static async getInitialProps ({ query: { email } }) {
    return { email: email }
  }
  constructor(props) {
    super(props);

    this.state = {
      email: props.email,
      errorAuthCode: null,
      successAuthCode: null,
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async onSubmit(e) {
    e.preventDefault();

    if(!this.state.email) {
      this.setState({
        errorAuthCode: "NoEmail",
      })
      return
    }

    let state = await forgotPassword(this.state.email)
    this.setState(state)
  };

  render() {
    const { onChange } = this;

    return (
      <section>
        <HeaderMenu />
        <Head title={`${this.props.t('password-reset')} | Lidbot`} />
        <div className="main">
          <div className="content">
            <If condition={this.state.successAuthCode !== 'CodeResentSuccessfully'}>
              <h1>{this.props.t('password-reset')}</h1>
              <p>{this.props.t('password-reset-sub')}</p>

              <If condition={this.state.errorAuthCode}>
                <div className="alert error">
                  {this.props.t(this.state.errorAuthCode)}
                </div>
              </If>

              <form onSubmit={e => this.onSubmit(e)}>
                  <label htmlFor="email">
                    <input
                      name="email"
                      id="email"
                      type="email"
                      value={this.state.email}
                      onChange={e => onChange(e)}
                      placeholder="you@example.com"
                    />
                  </label>
                <button type="submit">{this.props.t('get-reset-link')}</button>
              </form>
            </If>
            <If condition={this.state.successAuthCode === 'CodeResentSuccessfully'}>
              <If condition={this.state.successAuthCode}>
                <div className="alert info">
                  {this.props.t(this.state.successAuthCode)}
                </div>
              </If>
              <h1>{this.props.t('email-sent')}</h1>
              <p>{this.props.t('email-sent-sub')}</p>
            </If>
          </div>
        </div>
        <style jsx>
          {`
          section {
              margin-top: 70px;
              
              > div {
                width: 640px;
                background: #ffffff;
                border-radius: 5px;
                padding: 50px;
              }
              .main {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
            }
            
            @keyframes Enter {
              from {
                -webkit-transform: translateY(28px);
              }
              to {
                -webkit-transform: none;
              }
            }
            form {
                      width: 100%;

                      label {
                        width: 100%;
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 12px;
                        line-height: normal;
                        margin-top: 20px;
                        display: block;
                        color: #00b284;
                      }

                      input {
                        width: 100%;
                        border: none;
                        padding: 20px 20px 20px 0;
                        font-family: Roboto;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 16px;
                        line-height: normal;
                        border-bottom: 1px solid #00b284;
                        height: 40px;
                        color: #000000;
                        outline: none;
                        transition: 1s all ease;

                        &:focus {
                          border-bottom: 1px solid #0af1b5;
                        }

                        &::placeholder {
                          font-family: Roboto;
                          font-style: normal;
                          font-weight: normal;
                          font-size: 12px;
                          line-height: normal;

                          color: #000000;
                        }
                      }

                      button {
                        background: #00b284;
                        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
                        border: none;
                        color: white;
                        width: 100%;
                        height: 50px;
                        margin-top: 50px;
                        cursor: pointer;
                        transition: 0.2s all ease;
                        outline: none;
                        border-radius: 3px;

                        &:active,
                        &:hover,
                        &:focus {
                          background-color: #0af1b5;
                        }

                        @media (max-width: 876px) {
                          margin-bottom: 0;
                        }
                      }
                    }
              h1 {
                      font-family: Roboto;
                      font-style: normal;
                      font-weight: 900;
                      font-size: 32px;
                      line-height: normal;
                      color: #000000;
                    }

                    p {
                      font-family: Roboto;
                      font-style: normal;
                      font-weight: 300;
                      font-size: 18px;
                      line-height: 25px;
                      color: #757575;
                    }
            .sign-up {
              text-align: center;
              color: #757575;
              text-decoration: none;
              font-size: 12px;
              letter-spacing: 0.02em;
              margin-bottom: 10px;
            }
            .alert {
                border-radius: 3px;
                padding: 15px;
                font-size: 14px;
                font-weight: 400;
                &.error {
                  border: 1px solid #d64242;
                  color: #d64242;
                }
                &.info {
                  border: 1px solid #00b284;
                  color: #00b284;
                }
              }
          `}
        </style>
      </section>
    );
  }
}

export default withTranslation('public')(Forgot)
