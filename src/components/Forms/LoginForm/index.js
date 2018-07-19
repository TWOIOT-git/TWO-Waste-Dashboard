import React from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl, FormHelperText, Input, InputLabel, Card, CardContent, withStyles } from '@material-ui/core'
import red from '@material-ui/core/colors/red';
import stylesBase from './styles'

const LoginForm = ({ onSubmit, onChange, controls, classes, clickedSwitchForm, disabled }) => (
  <Card className={classes.Card}>
    <CardContent className={classes.cardContent}>
      <form action="/" onSubmit={onSubmit} className={classes.form}>

        <FormControl>
          <p>TWOIOT</p>
          <p>WASTES</p>
        </FormControl>

        <FormControl>
          <p>Welcome back!<br />Login to continue your smart waste management.</p>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email-input">Email</InputLabel>
          <Input
            id="email-input"
            name="email"
            value={controls.email.value}
            onChange={(event) => onChange(event, 'email')}
            type="email" />
          {controls.email.errors.message && (
            <FormHelperText id="email-input-text" style={{ color: red[500] }}>
              {controls.email.errors.message}
            </FormHelperText>
          )
          }
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <Input
            id="password-input"
            name="password"
            value={controls.password.value}
            onChange={(event) => onChange(event, 'password')}
            type="password" />
          {controls.password.errors.message && (
            <FormHelperText id="password-input-text" style={{ color: red[500] }}>
              {controls.password.errors.message}
            </FormHelperText>
          )
          }
        </FormControl>

        <div className={classes.boxMarginTop}>
          <Button raised color="primary" type="submit" disabled={disabled}>
            LOGIN
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  controls: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default withStyles(stylesBase)(LoginForm)