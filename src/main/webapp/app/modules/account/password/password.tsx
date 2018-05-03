import * as React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';

export interface IUserPasswordProps {
  account: any;
  getSession: Function;
  savePassword: Function;
  reset: Function;
}

export interface IUserPasswordState {
  password: string;
}

export class PasswordPage extends React.Component<IUserPasswordProps, IUserPasswordState> {
  state: IUserPasswordState = {
    password: ''
  };

  componentDidMount() {
    this.props.reset();
    this.props.getSession();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.savePassword(values.currentPassword, values.newPassword);
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    const { account } = this.props;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2>
              <Translate contentKey="password.title" interpolate={{ username: account.login }}>
                Password for {account.login}
              </Translate>
            </h2>
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="currentPassword"
                label={translate('global.form.currentpassword')}
                placeholder={translate('global.form.currentpassword.placeholder')}
                type="password"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') }
                }}
              />
              <AvField
                name="newPassword"
                label={translate('global.form.newpassword')}
                placeholder={translate('global.form.newpassword.placeholder')}
                type="password"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                  minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                  maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                }}
                onChange={this.updatePassword}
              />
              <PasswordStrengthBar password={this.state.password} />
              <AvField
                name="confirmPassword"
                label={translate('global.form.confirmpassword')}
                placeholder={translate('global.form.confirmpassword.placeholder')}
                type="password"
                validate={{
                  required: {
                    value: true,
                    errorMessage: translate('global.messages.validate.confirmpassword.required')
                  },
                  minLength: {
                    value: 4,
                    errorMessage: translate('global.messages.validate.confirmpassword.minlength')
                  },
                  maxLength: {
                    value: 50,
                    errorMessage: translate('global.messages.validate.confirmpassword.maxlength')
                  },
                  match: {
                    value: 'newPassword',
                    errorMessage: translate('global.messages.error.dontmatch')
                  }
                }}
              />
              <Button color="success" type="submit">
                <Translate contentKey="password.form.button">Save</Translate>
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, savePassword, reset };

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPage);
