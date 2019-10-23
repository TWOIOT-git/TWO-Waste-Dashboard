import React from "react";
import LayoutMenuNavegation from "../components/LayoutMenuNavegation";
import Head from "../components/Head";
import SettingLayout from "../components/SettingLayout";
import UserTable from "../components/UserTable"
import { withAuthSync, updateUserAttributes, ClientContext } from '../utils/auth'
import { i18n, withTranslation } from '../i18n'
import fetch from "isomorphic-unfetch";



class Team extends React.Component {
  static contextType = ClientContext;

  getInitialProps = async () => ({
    namespacesRequired: ['settings'],
  })

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      users: [
      ]
    }
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

  async getUsers() {
    let url = process.env.DEVICE_API + "customers/" + this.context.user.attributes['custom:client_id'] + "/users/limit/10";
    console.log('fetching users: ', url)
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    let users = [];
    for (let user of json.results) {
      users.push({
        ...user
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
      throw Error(response.statusText);
    }

    const json = await response.json();

    this.getUsers()

    console.log(json)
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
        </SettingLayout>
      </LayoutMenuNavegation>
    )
  }
};

export default withTranslation('settings')(withAuthSync(Team))
