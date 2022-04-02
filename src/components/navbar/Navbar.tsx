import * as React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import {
  RocketOutlined,
  UploadOutlined,
  HomeOutlined,
  FolderOpenOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

const Navbar: React.FC = () => {
  return (
    <>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        style={{ marginTop: '20px' }}
      >
        <Menu.Item key='1' icon={<HomeOutlined />}>
          <NavLink to='/'>בית</NavLink>
        </Menu.Item>

        <Menu.Item key='2' icon={<FolderOpenOutlined />}>
          <NavLink to='/signings'>החתימות שלי</NavLink>
        </Menu.Item>

        <Menu.Item key='3' icon={<UploadOutlined />}>
          <NavLink to='/create'>בקשת החתמה</NavLink>
        </Menu.Item>

        <Menu.Item key='4' icon={<LoginOutlined />}>
          <NavLink to='/login'>כנס למערכת</NavLink>
        </Menu.Item>

        <Menu.Item key='5' icon={<UserAddOutlined />}>
          <NavLink to='/signup'>הירשם למרכת</NavLink>
        </Menu.Item>
      </Menu>
      <div className='logo'>
        <RocketOutlined />
      </div>
    </>
  );
};

export default Navbar;
