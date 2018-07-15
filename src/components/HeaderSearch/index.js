import React, { Component } from 'react'
import './styles.css'

export class HeaderSearch extends Component {
  state = {
    value: ''
  }

  handleInput = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    const { value } = this.state
    const { handleInput } = this

    return (
      <header className="HeaderSearch-wrapper">
        <input
          placeholder="Search for ..."
          value={value}
          onChange={handleInput}
          className="HeaderSearch-input"
        />
      </header>
    )
  }
}

export default HeaderSearch
