import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useTranslator } from '../../hooks/useTranslator';
import { Container, Panel, TextTopic, TextDetail } from './styles';

function Register(): JSX.Element {
  const { t } = useTranslator(['ServerError']);
  return (
    <Container>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper"></div>
          <form id="register-form" className="ant-form ant-form-horizontal">
            <p className="form-title">Create an account</p>
            <div className="ant-row ant-form-item">
              <div className="ant-col ant-form-item-control">
                <div className="ant-form-item-control-input">
                  <div className="ant-form-item-control-input-content">
                    <input
                      placeholder="Username"
                      type="text"
                      id="login-form_username"
                      className="ant-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ant-row ant-form-item">
              <div className="ant-col ant-form-item-control">
                <div className="ant-form-item-control-input">
                  <div className="ant-form-item-control-input-content">
                    <input
                      placeholder="Phone Number"
                      type="text"
                      id="login-form_username"
                      className="ant-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="ant-row ant-form-item">
              <div className="ant-col ant-form-item-control">
                <div className="ant-form-item-control-input">
                  <div className="ant-form-item-control-input-content">
                    <span className="ant-input-password ant-input-affix-wrapper"></span>
                    <input
                      placeholder="Password"
                      id="login-form_password"
                      type="password"
                      className="ant-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ant-row ant-form-item">
              <div className="ant-col ant-form-item-control">
                <div className="ant-form-item-control-input">
                  <div className="ant-form-item-control-input-content">
                    <span className="ant-input-password ant-input-affix-wrapper"></span>
                    <input
                      placeholder="Repeat your password"
                      id="login-form_password"
                      type="password"
                      className="ant-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="ant-row ant-form-item">
              <div className="ant-col ant-form-item-control">
                <div className="ant-form-item-control-input">
                  <div className="ant-form-item-control-input-content">
                    <button type="submit" className="ant-btn login-form-button ant-btn-primary">
                      <span>REGISTER</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Have already an account? <a href="https://www.google.com">Login here</a>
            </p>
          </form>
          {/* <button type="button" className="btn btn-secondary btn-block">
            LOGIN
          </button> */}
        </div>
      </div>{' '}
    </Container>
  );
}

export default Register;
