import * as React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { handleAuthenticatedNavbarSelectedKeys } from './keys/auth-keys';
import { handleNotAuthenticatedNavbarSelectedKeys } from './keys/unauth-keys';
import {
  tokenState,
  isAuthenticatedState,
} from '../../recoil/users/atoms/atoms';
import {
  RocketOutlined,
  UploadOutlined,
  HomeOutlined,
  FolderOpenOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import './Navbar.css';

const Navbar: React.FC = () => {
  const token = useRecoilValue(tokenState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);

  return (
    <>
      {isAuthenticated || token ? (
        <>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={handleAuthenticatedNavbarSelectedKeys()}
            style={{ marginTop: '20px', fontSize: '15px' }}
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
              <NavLink to='/login'>צא מהמערכת</NavLink>
            </Menu.Item>
          </Menu>
          <div className='logo'>
            <RocketOutlined />
          </div>
        </>
      ) : (
        <>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={handleNotAuthenticatedNavbarSelectedKeys()}
            style={{ marginTop: '20px', fontSize: '15px' }}
          >
            <Menu.Item key='1' icon={<HomeOutlined />}>
              <NavLink to='/'>בית</NavLink>
            </Menu.Item>

            <Menu.Item key='2' icon={<LoginOutlined />}>
              <NavLink to='/login'>כנס למערכת</NavLink>
            </Menu.Item>

            <Menu.Item key='3' icon={<UserAddOutlined />}>
              <NavLink to='/signup'>הירשם למרכת</NavLink>
            </Menu.Item>
          </Menu>
          <div className='logo'>
            <RocketOutlined />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
