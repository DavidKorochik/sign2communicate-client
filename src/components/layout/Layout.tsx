import { Layout, Menu } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout>
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
        <div className='logo' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']}>
          <Menu.Item key='1' icon={<UserOutlined />}>
            בית
          </Menu.Item>
          <Menu.Item key='2' icon={<SettingOutlined />}>
            החתימות שלי
          </Menu.Item>
          <Menu.Item key='3' icon={<UploadOutlined />}>
            בקשת החתמה
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      {children}
    </Layout>
  );
};

export default AppLayout;
