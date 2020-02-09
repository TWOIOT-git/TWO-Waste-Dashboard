import React from "react";
import HeaderMenu from "../components/HeaderMenu";
import Head from "../components/Head";
import { forgotPassword } from '../utils/auth'
import { withTranslation } from '../i18n'
import Alert from "../components/Alert";

import './main.scss'

class Forgot extends React.Component {

  static async getInitialProps ({ query: { email } }) {
    return { email: email }
  }
  constructor(props) {
    super(props);

    this.state = {
      email: props.email ? props.email : '',
      error: null,
      success: null,
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async onSubmit(e) {
    e.preventDefault();

    let result = await forgotPassword(this.state.email)

    if(result) {
      this.setState({
        error: result.error,
        success: result.success,
      })
    }
  };

  render() {
    const { onChange } = this;

    return (
      <section>
        <HeaderMenu />
        <Head title={`${this.props.t('password-reset')} | Lidbot`} />
        <div className="main main--small">
          <div className="content">
            <If condition={!this.state.success}>
              <h1>{this.props.t('password-reset')}</h1>
              <p>{this.props.t('password-reset-sub')}</p>

              <Alert error={this.state.error}></Alert>
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
            <If condition={this.state.success}>
              <h1>{this.props.t('email-sent')}</h1>
              <p>{this.props.t('email-sent-sub')}</p>
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

export default withTranslation('forgot')(Forgot)
