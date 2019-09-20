import React from "react";
import Head from "../components/Head";
import HeaderMenu from "../components/HeaderMenu";
import { forgotPasswordSubmit } from '../utils/auth'
import { withTranslation } from '../i18n'
import Link from "next/link"


class ResetPassword extends React.Component {
  static async getInitialProps ({ query: { email, code } }) {
    return { email: email, code: code }
  }
  constructor(props) {
    super(props);

    this.state = {
      code: props.code,
      email: props.email,
      password: '',
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

    if(!this.state.password) {
      this.setState({
        errorAuthCode: "NoPassword",
      })
      return
    }

    let state = await forgotPasswordSubmit(this.state.email, this.state.code, this.state.password)
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
            <If condition={this.state.successAuthCode !== 'PasswordChangedSuccessfully'}>
              <h1>{this.props.t('password-reset')}</h1>
              <p>{this.props.t('new-password-prompt')}</p>
              <If condition={this.state.errorAuthCode}>
                <div className="alert error">
                  {this.props.t(this.state.errorAuthCode)}
                </div>
              </If>
              <form onSubmit={e => this.onSubmit(e)}>
                <label htmlFor="password">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    autoFocus
                    size={40}
                    value={this.state.password}
                    onChange={e => onChange(e)}
                    placeholder={this.props.t('password')}
                  />
                </label>
              <button type="submit">{this.props.t('change-password')}</button>
            </form>
            </If>
            <If condition={this.state.successAuthCode === 'PasswordChangedSuccessfully'}>
              <h1 className="success">{this.props.t('h1')}</h1>
              <p>{this.props.t('p')}
              <Link href='/'>
                <a className="link-label">{this.props.t('sign-in')}.</a>
              </Link>
              </p>
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
                      margin: 0;
                      line-height: 1;
                      
                      &.success {
                        color: #00b284;
                      }
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
              }
          `}
        </style>
      </section>
    );
  }
}

export default withTranslation('reset-password')(ResetPassword)
