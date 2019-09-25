import React from "react";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import Head from "../components/Head";
import { forgotPassword } from '../utils/auth'
import { withTranslation } from '../i18n'


class Forgot extends React.Component {

  static async getInitialProps ({ query: { email } }) {
    return { email: email }
  }
  constructor(props) {
    super(props);

    this.state = {
      email: props.email ? props.email : '',
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

    let state = await forgotPassword(this.state.email)
    this.setState(state)
  };

  render() {
    const { onChange } = this;

    return (
      <section>
        <HeaderMenu />
        <Head title={`${this.props.t('password-reset')} | Lidbot`} />
        <div className="main main--small">
          <div className="content">
            <If condition={this.state.successAuthCode !== 'CodeResentSuccessfully'}>
              <h1>{this.props.t('password-reset')}</h1>
              <p>{this.props.t('password-reset-sub')}</p>

              <form onSubmit={e => this.onSubmit(e)}>
                <If condition={this.state.errorAuthCode}>
                  <div className="notification error">
                    {this.props.t(this.state.errorAuthCode)}
                  </div>
                </If>
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
              <h1>{this.props.t('email-sent')}</h1>
              <p>{this.props.t('email-sent-sub')}</p>
            </If>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation('public')(Forgot)
