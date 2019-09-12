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
      newPassword: '',
      confirmPassword: '',
      authCode: 'PasswordChangedSuccessfully'
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async onSubmit(e) {
    e.preventDefault();

    if(this.state.newPassword !== this.state.confirmPassword) {
      this.setState({authCode: "PASSWORD_DO_NOT_MATCH"});
    } else {
      let state = await forgotPasswordSubmit(this.state.email, this.state.code, this.state.newPassword)
      this.setState(state)
    }
  };

  render() {
    const { onChange } = this;

    return (
      <section>
        <HeaderMenu />
        <Head title={`${this.props.t('password-reset')} | Lidbot`} />
        <div>
          <div>
            <If condition={this.state.authCode !== 'PasswordChangedSuccessfully'}>
              <h1>{this.props.t('password-reset')}</h1>
              <p>{this.props.t('new-password-prompt')}</p>

              <div className="alert error">
                {this.props.t(this.state.authCode)}
              </div>

              <form onSubmit={e => this.onSubmit(e)}>
                <label htmlFor="newPassword">
                  {this.props.t('new-password')}
                  <input
                    name="newPassword"
                    id="newPassword"
                    type="password"
                    autoFocus
                    size={40}
                    value={this.state.newPassword}
                    onChange={e => onChange(e)}
                  />
                </label>
              <label htmlFor="confirmPassword">
                {this.props.t('confirm-new-password')}
                <input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={e => onChange(e)}
                />
              </label>
              <button type="submit">{this.props.t('change-password')}</button>
            </form>
            </If>
            <If condition={this.state.authCode === 'PasswordChangedSuccessfully'}>
              <h1>{this.props.t('password-reset-success')}</h1>
              <p>{this.props.t('password-reset-success-sub')}
              <Link href='/'>
                <a className="link-label">{this.props.t('sign-in')}.</a>
              </Link>
              </p>
            </If>
          </div>
        </div>
        <style jsx>
          {`
            @keyframes Enter {
              from {
                -webkit-transform: translateY(28px);
              }
              to {
                -webkit-transform: none;
              }
            }
            .sign-up {
              text-align: center;
              color: #757575;
              text-decoration: none;
              font-size: 12px;
              letter-spacing: 0.02em;
              margin-bottom: 10px;
            }
            a {
              color: #333;
              &:hover {
                color: #00b284;
              }
            }
            .alert {
              border-radius: 4px;
              padding: 10px;
              margin-bottom: 20px;
              font-size: 12px;
              text-align: center;
              font-weight: 100;
              &:empty {
                display: none;
              }
            }
            .error {
              background: #d64242;
              color: #fff;
            }

            section {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background-color: white;

              @media (max-width: 876px) {
                display: block;
              }

              > div {
                width: 640px;
                padding: 50px;

                background: #ffffff;
                box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
                animation: Enter 0.5s forwards;

                @media (max-width: 876px) {
                  width: 100%;
                  padding: 5%;
                  height: unset;
                  box-shadow: none;
                  animation: none;
                }

                > div {
                  &:nth-child(1) {
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

                    form {
                      width: 100%;
                      margin-top: 50px;

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
                  }
                }
              }
            }
          `}
        </style>
      </section>
    );
  }
}

export default withTranslation('public')(ResetPassword)
