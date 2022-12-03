import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useTranslator } from '../../hooks/useTranslator';
import { Container, Panel, TextTopic, TextDetail } from './styles';

function Login(): JSX.Element {
  const { t } = useTranslator(['ServerError']);

  return (
    <Container>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img
              src="https://assets.materialup.com/uploads/a6a09679-07e0-492e-8309-04621344712a/preview.jpg?q=80&auto=format%2Ccompress&h=700"
              alt="Login"
            />
          </div>
          {/* <input type="text" className="form-control" placeholder="Username" /> */}
          {/* <div className="ant-row ant-form-item">
            <div className="ant-col ant-form-item-control">
              <div className="ant-form-item-control-input">
                <div className="ant-form-item-control-input-content">
                  <input
                    placeholder="Username"
                    type="text"
                    id="login-form_username"
                    className="ant-input"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div> */}
          {/* <input type="text" className="form-control" placeholder="Password" /> */}
          <form id="login-form" className="ant-form ant-form-horizontal">
            <p className="form-title">Welcome back</p>
            <p>Login to the Dashboard</p>
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
                    <button type="submit" className="ant-btn login-form-button ant-btn-primary">
                      <span>LOGIN</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p>
              Don&apos;t have an account yet? <a href="https://www.google.com">Sign up</a>
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

export default Login;
