import * as React from 'react';
import { Layout } from 'antd';
import Navbar from '../navbar/Navbar';
interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Navbar />
      </Layout.Sider>
      {children}
    </Layout>
  );
};

export default AppLayout;
