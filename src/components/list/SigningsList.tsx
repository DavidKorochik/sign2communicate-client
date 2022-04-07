import * as React from 'react';
import { SelectorCallbackInterface, useRecoilValue } from 'recoil';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { loadingState } from '../../recoil/signings/atoms/atoms';
import { getSignings } from '../../recoil/signings/selectors/selectors';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const SigningsList: React.FC = () => {
  const loading = useRecoilValue<boolean>(loadingState);
  const signings = useRecoilValue<SelectorCallbackInterface>(getSignings);

  return (
    <>
      <Switch checked={!loading} />

      <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
        <Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title='Card title'
          description='This is the description'
        />
      </Card>

      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <SettingOutlined key='setting' />,
          <EditOutlined key='edit' />,
          <EllipsisOutlined key='ellipsis' />,
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
            title='Card title'
            description='This is the description'
          />
        </Skeleton>
      </Card>
    </>
  );
};

export default SigningsList;
