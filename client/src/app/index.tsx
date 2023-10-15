import { Layout } from 'antd';
import './index.css';
import { withProviders } from './providers';
import { Routing } from 'pages';
import { FC } from 'react';

const App:FC=()=> {
  return (
    <Routing/>
  );
}

export default withProviders(App);
