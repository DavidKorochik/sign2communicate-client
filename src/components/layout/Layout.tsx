import * as React from 'react';
import { Layout, Menu } from 'antd';
import {
  RocketOutlined,
  UploadOutlined,
  HomeOutlined,
  FolderOpenOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

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
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['4']}
          style={{ marginTop: '20px' }}
        >
          <Menu.Item key='1' icon={<HomeOutlined />}>
            בית
          </Menu.Item>
          <Menu.Item key='2' icon={<FolderOpenOutlined />}>
            החתימות שלי
          </Menu.Item>
          <Menu.Item key='3' icon={<UploadOutlined />}>
            בקשת החתמה
          </Menu.Item>
          <Menu.Item key='4' icon={<LoginOutlined />}>
            כנס למערכת
          </Menu.Item>
          <Menu.Item key='5' icon={<UserAddOutlined />}>
            הירשם למרכת
          </Menu.Item>
        </Menu>
        <div
          className='logo'
          style={{
            color: 'white',
            fontSize: '50px',
            position: 'absolute',
            bottom: '10%',
            left: '30%',
          }}
        >
          <RocketOutlined />
        </div>
      </Layout.Sider>
      {children}
    </Layout>
  );
};

export default AppLayout;
