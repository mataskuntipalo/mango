import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container } from './styles';
import orderImage from '../../App/images/order.png';
import moment from 'moment';

function Home(): JSX.Element {
  const [weight, setWeight] = useState(0);
  const [recivice, setReciveDate] = useState('2023-03-01');
  // useEffect(() => {}, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const bodyObj = JSON.stringify({
      name: 'นาย มะม่วง',
      slipURL: 'url',
      address: '123 ถนนดำรงรักษ์ แขวงคลองมหานาค เขตป้อมปราบศัตรูพ่าย กรุงเทพ 10100',
      telephone: '083xxxxxxx',
      orderDate: moment().format("yyyy-MM-DD"),
      recevieDate: recivice,
      weight,
      totalPrice: 1000,
    });
    const options = {
      method: 'POST',
      body: bodyObj,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    console.log("bodyObj", bodyObj)

    const result = await fetch(`http://localhost:8080/order`, options);
    console.log("result", result)
    //event.preventDefault();
  }

  return (
    <Container>
      <Helmet></Helmet>
      <div className="home-page">
        <header className="MuiPaper-root MuiPaper-elevation MuiPaper-elevation0 MuiAppBar-root MuiAppBar-colorDefault MuiAppBar-positionStatic css-bolhxy">
          <div className="MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-wlficz">
            <h6 className="MuiTypography-root MuiTypography-h6 MuiTypography-noWrap css-dvpk2h">
              Kanta Mango
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
        <main
          className="MuiContainer-root MuiContainer-maxWidthSm MuiContainer-disableGutters css-vnelm5"
          style={{ padding: '10px' }}
        >
          <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-alignCenter MuiTypography-gutterBottom css-cgrkc2">
            ยินดีต้อนรับ คุณ มะม่วง
          </h1>
          <div>
            <img
              src={orderImage}
              alt="123"
              style={{ height: '300px', width: '300px', display: 'inline-block' }}
            />
            <div style={{ display: 'inline-block', margin: '10px' }}>
              <form onSubmit={handleSubmit}>
                <h1>ชื่อ: นาย มะม่วง </h1>
                <h1>ที่อยู่: 123 ถนนดำรงรักษ์ แขวงคลองมหานาค เขตป้อมปราบศัตรูพ่าย กรุงเทพ 10100</h1>
                <h1>โทร: 083xxxxxxx</h1>
                <h1 style={{ display: 'inline-block' }}>จำนวน/กิโลกรัม:</h1>
                <input type="number" onChange={(e) => setWeight(parseInt(e.target.value))} />
                <h1>ราคาทั้งหมด: xx บาท</h1>
                <h1 style={{ display: 'inline-block' }}>วันที่ต้องการรับมะม่วง:</h1>
                <input type="text" onChange={(e) => setReciveDate(e.target.value)} />
                <br />
                <input type="submit" value="ซื้อ" />
              </form>
            </div>
          </div>
          <hr />
          <div>
            <h1 className="MuiTypography-root MuiTypography-h2 MuiTypography-alignCenter MuiTypography-gutterBottom css-cgrkc2">
              คำสั่งซื้อของคุณ
            </h1>
          </div>
        </main>
      </div>
    </Container>
  );
}

export default Home;
