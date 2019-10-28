import React from "react"
import LayoutMenuNavegation from "../components/LayoutMenuNavegation"
import Head from "../components/Head"
import SettingLayout from "../components/SettingLayout"
import UserTable from "../components/UserTable"
import { withAuthSync, ClientContext } from '../utils/auth'
import { i18n, withTranslation } from '../i18n'
import fetch from "isomorphic-unfetch"
import SelectItem from "../components/SelectItem"
import './main.scss'
import { getUserImage } from '../utils/auth'

const roles = [
  { value: 'SUPER_ADMIN', label: 'Super admin'},
  { value: 'ADMIN', label: 'Admin'},
  { value: 'USER', label: 'User'}
]


class Team extends React.Component {
  static contextType = ClientContext

  getInitialProps = async () => ({
    namespacesRequired: ['settings'],
  })

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      users: [
      ],
      given_name: '',
      family_name: '',
      email: '',
      user_role: {}
    }

    this.onChange = this.onChange.bind(this)
    this.addUser = this.addUser.bind(this)
    this.roleChange = this.roleChange.bind(this)
  }

  componentDidMount() {
    let that = this
    this.getUsers()
      .then(function (users) {
        console.log(users)
      })
      .catch(function (e) {
        console.log(e)
      })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async getUsers() {
    let url = process.env.DEVICE_API + "customers/" + this.context.user.attributes['custom:client_id'] + "/users/limit/50"
    console.log('fetching users: ', url)
    const response = await fetch(url)
    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()
    let users = []
    for (let user of json.results) {
      let picture = user.Attributes.find(x => x.Name === 'picture')
      let src

      if(picture) {
        let key = picture.Value

        if(key) {
          src = await getUserImage(key)
        }
      }

      users.push({
        given_name: user.Attributes.find(x => x.Name === 'given_name').Value,
        family_name: user.Attributes.find(x => x.Name === 'family_name').Value,
        email: user.Attributes.find(x => x.Name === 'email').Value,
        user_role: user.Attributes.find(x => x.Name === 'custom:user_role').Value,
        src: src,
        enabled: user.Enabled,
        user_status: user.UserStatus
      })
    }

    this.setState({
      users: users,
      loading: false
    })

    return users
  }

  async deleteUser(e, email) {
    e.preventDefault()

    let url = process.env.DEVICE_API + "customers/" + this.context.user.attributes['custom:client_id'] + "/users/" + email
    console.log('deleting user: ', url)
    const response = await fetch(url, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()

    this.getUsers()

    console.log(json)
  }

  async addUser(e) {
    e.preventDefault()

    let url = process.env.DEVICE_API + "customers/" + this.context.user.attributes['custom:client_id'] + "/users/" + this.state.email
    console.log('adding user: ', url)
    let options = {
      method: 'POST',
      body: JSON.stringify({
        given_name: this.state.given_name,
        family_name: this.state.family_name,
        picture: this.state.picture,
        language: this.props.user_attributes['custom:language'],
        email: this.state.email,
        user_role: this.state.user_role.value,
      })
    }
    console.log('options: ', options)

    const response = await fetch(url, options)

    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()

    this.setState(prevState => ({
      ...prevState,
      given_name: '',
      family_name: '',
      user_role: {},
      email: ''
    }))

    this.getUsers()

    console.log(json)
  }

  roleChange = selectedOption => {
    this.setState({
      user_role: selectedOption
    })
  }

  render() {
    return (
      <LayoutMenuNavegation>
        <Head title={`${this.props.t('team.title')} | Lidbot`}/>
        <SettingLayout>
          <div>
            <UserTable
              items={this.state.users}
              onDelete={(e, email) => this.deleteUser(e, email)}
            />
          </div>
          <If condition={this.props.user_attributes['custom:user_role'] === 'SUPER_ADMIN' || this.props.user_attributes['custom:user_role'] === 'ADMIN'}>
            <form onSubmit={this.addUser}>
              <div className="div-inputs">
                <div>
                  <label htmlFor="given_name">
                    {this.props.t('first-name')}
                    <input
                      name="given_name"
                      id="given_name"
                      value={this.state.given_name}
                      onChange={this.onChange}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="family_name">
                    {this.props.t('last-name')}
                    <input
                      name="family_name"
                      id="family_name"
                      value={this.state.family_name}
                      onChange={this.onChange}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="email">
                    {this.props.t('email')}
                    <input
                      name="email"
                      id="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </label>
                </div>
                <div>
                  <SelectItem
                    label={this.props.t('team.role')}
                    value={this.state.user_role}
                    onChange={this.roleChange}
                    options={roles}
                  />
                </div>
              </div>
              <div className="button">
                <button type="submit">{this.props.t('team.add-user')}</button>
              </div>
            </form>
          </If>
        </SettingLayout>
        <style jsx>
          {
            `
              form {
                label {
                  margin: 0
                }
              }
              .SelectItem {
                margin: 0
              }
              .div-inputs {
                margin-top: 30px;
                margin-bottom: 30px;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                
                > div {
                  flex: 0 1 20%;
                }
              }
              .button {
                text-align: right;
                
                button {
                  width: 200px;
                }
              }
            `
          }
        </style>
      </LayoutMenuNavegation>
    )
  }
}

export default withTranslation('settings')(withAuthSync(Team))
