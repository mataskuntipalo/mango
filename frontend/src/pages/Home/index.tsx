import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useTranslator } from '../../hooks/useTranslator';
import { Container, Panel, TextTopic, TextDetail } from './styles';

function Home(): JSX.Element {
  const { t } = useTranslator(['ServerError']);
  return (
    <Container>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <div className="home-page">
        <header className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation0 MuiAppBar-root MuiAppBar-colorDefault MuiAppBar-positionStatic css-bolhxy">
          <div className="MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-wlficz">
            <h6 className="MuiTypography-root MuiTypography-h6 MuiTypography-noWrap css-dvpk2h">
              Mamuang
            </h6>
            <nav>
              <a
                className="MuiTypography-root MuiTypography-button MuiLink-root MuiLink-underlineNone css-1veaz3z"
                href="#"
              >
                Home
              </a>
              <a
                className="MuiTypography-root MuiTypography-button MuiLink-root MuiLink-underlineNone css-1veaz3z"
                href="#"
              >
                Test
              </a>
              <a
                className="MuiTypography-root MuiTypography-button MuiLink-root MuiLink-underlineNone css-1veaz3z"
                href="#"
              >
                Support
              </a>
            </nav>
          </div>
        </header>
        <main className="MuiContainer-root MuiContainer-maxWidthSm MuiContainer-disableGutters css-vnelm5">
          <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-alignCenter MuiTypography-gutterBottom css-cgrkc2">
            Welcome Mamuang
          </h1>
        </main>
      </div>
    </Container>
  );
}

export default Home;
