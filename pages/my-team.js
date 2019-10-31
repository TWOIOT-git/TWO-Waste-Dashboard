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
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import capabilities from '../utils/capabilities'

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
      user_role: {},
      showAddUserModal: false
    }

    this.onChange = this.onChange.bind(this)
    this.addUser = this.addUser.bind(this)
    this.roleChange = this.roleChange.bind(this)
    this.setShow = this.setShow.bind(this)
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
  async disableUser(e, email) {
    e.preventDefault()

    let url = `${process.env.DEVICE_API}/users/${email}/disable`
    console.log('disabling user: ', url)
    const response = await fetch(url, {
      method: 'POST'
    })
    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()

    this.getUsers()

    toast(this.props.t('user-disabled'), {
      className: 'notification success'
    })


    console.log(json)
  }
  async enableUser(e, email) {
    e.preventDefault()

    let url = `${process.env.DEVICE_API}/users/${email}/enable`
    console.log('enabling user: ', url)
    const response = await fetch(url, {
      method: 'POST'
    })
    if (!response.ok) {
      throw Error(response.statusText)
    }

    const json = await response.json()

    this.getUsers()

    toast(this.props.t('user-enabled'), {
      className: 'notification success'
    })

    console.log(json)
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

    toast(this.props.t('user-deleted'), {
      className: 'notification success'
    })

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
      email: '',
      showAddUserModal: false
    }))

    this.getUsers()

    toast(this.props.t('user-added'), {
      className: 'notification success'
    })

    console.log(json)
  }

  roleChange = selectedOption => {
    this.setState({
      user_role: selectedOption
    })
  }
  setShow = show => {
    console.log('calling setShow: ', show)
    this.setState({
      showAddUserModal: show
    })
  }

  render() {
    return (
      <LayoutMenuNavegation>
        <Head title={`${this.props.t('team.title')} | Lidbot`}/>
        <SettingLayout>
          <div className="user-table">
            <UserTable
              items={this.state.users}
              onDelete={(e, email) => this.deleteUser(e, email)}
              onDisable={(e, email) => this.disableUser(e, email)}
              onEnable={(e, email) => this.enableUser(e, email)}
            />
          </div>
          <If condition={capabilities.can_add_user(this.props.user_attributes['custom:user_role'])}>
            <div className="button-section">
              <div className="add-user-button" onClick={() => this.setShow(true)}>Add user</div>
            </div>
          </If>
          <Modal
            show={this.state.showAddUserModal}
            onHide={() => this.setShow(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form action="">
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
              </form>
            </Modal.Body>

            <Modal.Footer>
              <div className="add-user-button" onClick={() => this.setShow(false)}>{this.props.t('cancel')}</div>
              <div className="add-user-button" onClick={(e) => this.addUser(e)}>{this.props.t('team.add-user')}</div>
            </Modal.Footer>
          </Modal>
        </SettingLayout>
        <style jsx>
          {
            `
              .user-table {
                margin-bottom: 40px;
              }
              form {
                label {
                  margin-bottom: 20px
                }
              }
              .SelectItem {
                margin: 0
              }
              .div-inputs {
                margin-top: 30px;
                margin-bottom: 30px;
                
                > div {
                  flex: 0 1 20%;
                }
              }
              .button-section {
                position: relative;
                margin-bottom: 30px;
                
                .add-user-button {
                  position: absolute;
                  right: 0;
                }
              }
              .add-user-button {
                font-size: 16px;
                font-weight: 400;
                cursor: pointer;
                border: 1px solid #757575;
                text-align: center;
                border-radius: 3px;
                padding: 10px 20px;
                color: #545454;
              }
            `
          }
        </style>
      </LayoutMenuNavegation>
    )
  }
}

export default withTranslation('settings')(withAuthSync(Team))
