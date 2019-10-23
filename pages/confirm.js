import React from "react";
import HeaderMenu from "../components/HeaderMenu";
import Head from "../components/Head";
import { confirmSignUp } from '../utils/auth'
import { i18n, withTranslation } from '../i18n'
import Link from "next/link"

class Confirm extends React.Component {

  static async getInitialProps ({ query: { email, code, language } }) {
    return { email: email, code: code, language: language }
  }

  constructor(props) {
    super(props);

    i18n.changeLanguage(props.language)

    this.state = {
      email: props.email,
      code: props.code,
      errorAuthCode: null,
      successAuthCode: null,
    };
  }

  async componentDidMount() {
    let state = await confirmSignUp(this.state.email, this.state.code)
    this.setState(state)
  }

  render() {
    const { onChange } = this;

    return (
      <section>
        <HeaderMenu />
        <Head title={`${this.props.t('confirm-account')} | Lidbot`} />
        <div className="main">
          <div className="content">
            <If condition={this.state.successAuthCode}>
              <h1 className="success">{this.props.t('h1--success')}</h1>
              <p>{this.props.t('p--success')}
                <Link href='/'>
                  <a className="link-label">{this.props.t('sign-in')}.</a>
                </Link>
              </p>
            </If>
            <If condition={this.state.errorAuthCode}>
              <div className="alert error">
                {this.props.t('error')}
              </div>
              <h1>{this.props.t('h1--error')}</h1>
              <p>{this.props.t('p--error')}</p>
            </If>
          </div>
        </div>
        <style jsx>
          {`
            section {
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: white;
              padding-top: 70px;
            }
            .main {
              display: flex;
              box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
              animation: Enter 0.5s forwards;
              padding: 50px;
              width: 600px;
            }
          `}
        </style>
      </section>
    );
  }
}

export default withTranslation('confirm')(Confirm)
