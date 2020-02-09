import React from "react";
import Head from "../components/Head";
import HeaderMenu from "../components/HeaderMenu";
import { completeNewPassword, signIn } from '../utils/auth'
import { i18n, withTranslation } from '../i18n'
import Alert from "../components/Alert";


import './main.scss'

class Verify extends React.Component {
  static async getInitialProps ({ query: { email, password, language } }) {
    return { email: email, password: password, language: language }
  }

  constructor(props) {
    super(props)

    i18n.changeLanguage(props.language)

    this.state = {
      password: '',
      error: null,
      user: null
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.signIn()
  }

  async signIn() {
    let result = await signIn(this.props.email, this.props.password)

    if(result.user) {
      this.setState({
        user: result.user
      })
    } else if(result.error) {
      this.setState({
        error: result.error
      })
    }
  }

  async onSubmit(e) {
    e.preventDefault();

    if(this.state.user) {
      let result = await completeNewPassword(this.state.user, this.state.password)

      if(result.error) {
        this.setState({
          error: result.error
        })
      } else {
        await signIn(this.props.email, this.state.password)
      }
    }
  }

  render() {
    const { onChange } = this;

    return (
      <section>
        <HeaderMenu />
        <Head title={`${this.props.t('confirm.title')} | Lidbot`} />
        <div className="main">
          <div className="content">
            <h1>{this.props.t('confirm.title')}</h1>
            <p>{this.props.t('confirm.prompt')}</p>
            <ul>
              <li>{this.props.t('confirm.password-length')}</li>
              <li>{this.props.t('confirm.require-uppercase')}</li>
              <li>{this.props.t('confirm.require-lowercase')}</li>
              <li>{this.props.t('confirm.require-number')}</li>
            </ul>
            <Alert error={this.state.error}></Alert>
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
              <button type="submit">{this.props.t('confirm.button')}</button>
            </form>
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
            ul {
              color: #999;
              font-weight: 100;
              font-size: 12px;
              list-style-type:none;
              padding: 0;
            }
          `}
        </style>
      </section>
    );
  }
}

export default withTranslation('reset-password')(Verify)
