import React from 'react'
import LoginForm from '../../components/Forms/LoginForm'
import { checkValidity } from '../../shared/checkValidity'
import { updateObject } from '../../shared/updateObject'
import { Container, Row, Col } from 'react-grid-system';
import LoginWrapper from '../../components/LoginWrapper';

class LoginContainer extends React.Component {
  state = {
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
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginWrapper>
        <Container fluid>
          <Row>
            <Col md={4}>
              <LoginForm
                onSubmit={this.processForm}
                onChange={this.inputChangedHandler}
                controls={this.state.controls}
                clickedSwitchForm={this.props.clickedSwitchForm}
                disabled={
                  (this.state.controls.password.errors.message || this.state.controls.email.errors.message)
                    ? true
                    : (this.state.controls.password.value.length === 0 || this.state.controls.email.value.length === 0)
                      ? true
                      : false
                }
              />
            </Col>
            <Col md={7}>
              <h1>"TAC TICS WITHOUT<br />STRATEGY, IS THE<br />NOISE BEFORE DEFEAT</h1>
              <h2>Sun Tzu,<br />The Art of War</h2>
            </Col>
          </Row>
        </Container>
      </LoginWrapper>
    )
  }
}

export default LoginContainer