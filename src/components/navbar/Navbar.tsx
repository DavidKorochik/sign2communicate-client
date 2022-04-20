import React, { useEffect, useLayoutEffect } from 'react';
import { Menu } from 'antd';
import { Location, NavLink, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loadUser, logoutUser } from '../../utils/users/recoilFunctions';
import {
  isAuthenticatedState,
  userState,
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
  let location: Location = useLocation();

  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);
  const [user, setUser] = useRecoilState(userState);

  useLayoutEffect(() => {
    if (!localStorage.getItem('auth-token')) {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const res = await loadUser();
      setUser(res);
    })();
  }, []);

  const handleLogoutUser = () => {
    logoutUser();
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated || localStorage.getItem('auth-token') ? (
        <>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['/signings']}
            selectedKeys={[location.pathname]}
            style={{ marginTop: '20px', fontSize: '15px' }}
          >
            <Menu.Item key='/' icon={<HomeOutlined />}>
              <NavLink to='/'>בית</NavLink>
            </Menu.Item>

            <Menu.Item key='/signings' icon={<FolderOpenOutlined />}>
              <NavLink to='/signings'>
                {user?.role === 'Admin' ? 'החתמות כלליות' : 'החתימות שלי'}
              </NavLink>
            </Menu.Item>

            <Menu.Item key='/create' icon={<UploadOutlined />}>
              <NavLink to='/create'>בקשת החתמה</NavLink>
            </Menu.Item>

            <Menu.Item key='3' icon={<LoginOutlined />}>
              <NavLink onClick={handleLogoutUser} to='/login'>
                צא מהמערכת
              </NavLink>
            </Menu.Item>
          </Menu>
          <div className='avatar' dir='rtl'>
            <h3>
              ברוכים הבאים, {user !== null ? user?.name?.split(' ')[0] : ''}
            </h3>
          </div>
          <div className='logo'>
            <RocketOutlined />
          </div>
        </>
      ) : (
        <>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['/login']}
            selectedKeys={[location.pathname]}
            style={{ marginTop: '20px', fontSize: '15px' }}
          >
            <Menu.Item key='/' icon={<HomeOutlined />}>
              <NavLink to='/'>בית</NavLink>
            </Menu.Item>

            <Menu.Item key='/login' icon={<LoginOutlined />}>
              <NavLink to='/login'>כנס למערכת</NavLink>
            </Menu.Item>

            <Menu.Item key='/signup' icon={<UserAddOutlined />}>
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
