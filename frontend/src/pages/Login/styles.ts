import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const Container = styled.div`
  // display: 'flex';
  // justify-content: 'center';
`;
const Panel = styled.div`
  margin: 30vh 35px 0;
  text-align: center;
`;

const Footer = styled.div`
  width: 100%;
  background-color: #fff;
  font-size: 1.333rem;
  height: 137px;
  left: 0;
  bottom: 0;
  padding: 20px;
  position: fixed;
  text-align: center;
`;
const ColorButtonFooter = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#4C2E85, 100%'),
    backgroundColor: '#6F31CC',
    width: '100%',
    fontSize: '24px',
    lineHeight: '1.45',
  },
}))(Button);

const TextTopic = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  color: #c02715;
  padding: 15px 0 8px;
`;
const TextDetail = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 29px;
  letter-spacing: 0px;
  text-align: center;
  color: #828282;
`;

export { Container, Panel, Footer, ColorButtonFooter, TextTopic, TextDetail };
