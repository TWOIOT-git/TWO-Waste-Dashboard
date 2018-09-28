import React from 'react'
import LoginForm from '../../components/Forms/LoginForm'
import { checkValidity } from '../../shared/checkValidity'
import { updateObject } from '../../shared/updateObject'
import { Container, Row, Col, Hidden } from 'react-grid-system';
import LoginWrapper from '../../components/LoginWrapper';
import LoginText from '../../components/LoginText';
import withUserInformation from '../../hoc/withUserInformation';

class LoginContainer extends React.Component {
  state = {
    quote: null,
    author: null,
    loadingQuote: true,
    errorQuote: false,
    loadingAuth: false,
    controls: {
      email: {
        value: '',
        validation: {
          required: true,
          isEmail: true,
          minLength: 3
        },
        valid: false,
        touched: false,
        errors: {
          message: null
        }
      },
      password: {
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        errors: {
          message: null
        }
      }
    }
  }

  /**
   * Validate a set input value in the state
   *
   * @param {object} event - the JavaScript event object
   * @param {string} controlName - then name of the field to search in controls state e.g: email
   */
  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation)[0],
        touched: true,
        errors: {
          message: checkValidity(event.target.value, this.state.controls[controlName].validation)[0]
            ? null
            : checkValidity(event.target.value, this.state.controls[controlName].validation)[1]
        }
      })
    })

    this.setState({ controls: updatedControls })
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = async (event) => {
    event.preventDefault()

    this.setState({ loadingAuth: true })

    const tryAuth = await this.props.user.authentication({
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    })

    this.setState({ loadingAuth: false })

    console.log(tryAuth)
  }

  componentDidMount = () => {
    fetch('https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1', {
      headers: {
        'X-Mashape-Key': 'yvOwNAb6Bnmsh6AcPnjVYFaSCoIAp18qEyRjsnKcGcVYjww6UO',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => this.setState({
        loadingQuote: false,
        author: res[0].author,
        quote: res[0].quote
      }))
      .catch(err => this.setState({
        errorQuote: true,
        loadingQuote: false,
      }))
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <LoginWrapper>
        <Container fluid>
          <Row>
            <Col md={5} sm={8}>
              <LoginForm
                loading={this.state.loadingAuth}
                onSubmit={this.processForm}
                onChange={this.inputChangedHandler}
                controls={this.state.controls}
                disabled={
                  (this.state.controls.password.errors.message || this.state.controls.email.errors.message)
                    ? true
                    : (this.state.controls.password.value.length === 0 || this.state.controls.email.value.length === 0)
                      ? true
                      : false
                }
              />
            </Col>
            <Col md={6} sm={4}>
              <Hidden xs={true}>
                <LoginText
                  loading={this.state.loadingQuote || this.state.errorQuote}
                  quote={this.state.errorQuote || this.state.quote}
                  author={this.state.errorQuote || this.state.author}
                />
              </Hidden>
            </Col>
          </Row>
        </Container>
      </LoginWrapper>
    )
  }
}

export default withUserInformation(LoginContainer)