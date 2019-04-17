import React from "react";

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.valueu
    });
  };

  render() {
    const { email, password } = this.state;
    const { onChange } = this;
    return (
      <section>
        <div>
          <div />
          <div>
            <form>
              <label htmlFor="email">
                Email
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  name="password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => onChange(e)}
                />
              </label>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
        <style jsx>
          {`
            section {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;

              > div {
                width: 840px;
                height: 560px;
                left: 294px;
                top: 170px;

                background: #ffffff;
                box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
              }
            }
          `}
        </style>
      </section>
    );
  }
}
