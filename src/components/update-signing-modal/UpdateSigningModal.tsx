import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { updateSigning } from '../../utils/signings/recoilFunctions';
import { equipmentData } from '../../utils/equipmentData';
import type { UpdateSigningModalProps } from '../../interfaces/signing/types';
import './UpdateSigningModal.css';
import {
  Modal,
  TimePicker,
  TreeSelect,
  DatePicker,
  Input,
  notification,
} from 'antd';

const { TextArea } = Input;

const format = 'HH:mm';
const dateFormatList = 'DD/MM/YYYY';

const UpdateSigningModal: React.FC<UpdateSigningModalProps> = ({
  setIsUpdateSigningModalVisible,
  updateSigningVisible,
  id,
  setSigningsListState,
  current,
  setCurrent,
  signingsListState,
}) => {
  const [editDescription, setEditDescription] = useState<string>('');
  const [editEquipment, setEditEquipment] = useState<string[]>([]);

  const [editSigningDate, setEditSigningDate] = useState<
    moment.Moment | null | Date
  >(null);

  const [editReturnDate, setEditReturnDate] = useState<
    moment.Moment | null | Date
  >(null);

  const [editSigningTime, setEditSigningTime] = useState<moment.Moment | null>(
    null
  );

  useEffect(() => {
    if (current !== null) {
      setEditDescription(current?.description);
      setEditEquipment(current?.equipment);
      setEditReturnDate(moment(current?.returningDate, 'DD/MM/YYYY'));
      setEditSigningTime(moment(current?.time, 'HH:mm'));
      setEditSigningDate(moment(current?.signingDate, 'DD/MM/YYYY'));
    } else {
      setEditDescription('');
      setEditReturnDate(null);
      setEditSigningDate(null);
      setEditSigningTime(null);
      setEditEquipment([]);
    }
  }, [current]);

  const handleOk = async (): Promise<void> => {
    const res = await updateSigning({
      ...current,
      id,
      description: editDescription,
      signingDate: moment(editSigningDate).toDate(),
      returningDate: moment(editReturnDate).toDate(),
      time: moment(editSigningTime).format('HH:mm'),
      equipment: editEquipment,
    });

    setSigningsListState(
      signingsListState.map((signing) => (signing.id === id ? res : signing))
    );

    setCurrent(null);
    setIsUpdateSigningModalVisible(false);

    notification.success({
      message: `!עדכנת את ההחתמה בהצלחה`,
      description: 'תוכל לראות את ההחתמה המעודכנת בעמוד הנוכחי',
    });
  };

  const handleCancel = (): void => {
    setCurrent(null);
    setIsUpdateSigningModalVisible(false);
  };

  return (
    <Modal
      style={{ textAlign: 'center' }}
      title='עדכן החתמה'
      okText={'עדכן שינויים'}
      cancelText={'בטל שינויים'}
      visible={updateSigningVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className='update-modal-wrapper'>
        <TreeSelect
          onChange={(equipmentData: string[]) =>
            setEditEquipment(equipmentData)
          }
          value={editEquipment}
          showSearch
          style={{ marginBottom: '10px', width: '100%' }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          allowClear
          multiple
          treeDefaultExpandAll
          treeCheckable={true}
          treeData={equipmentData}
        />
        <DatePicker
          onChange={(date): void =>
            setEditSigningDate(moment(date, 'DD/MM/YYYY'))
          }
          value={moment(editSigningDate, 'DD/MM/YYYY')}
          format={dateFormatList}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <DatePicker
          onChange={(date): void =>
            setEditReturnDate(moment(date, 'DD/MM/YYYY'))
          }
          value={moment(editReturnDate, 'DD/MM/YYYY')}
          format={dateFormatList}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <TimePicker
          onChange={(time): void => setEditSigningTime(moment(time, 'HH:mm'))}
          value={moment(editSigningTime, 'HH:mm')}
          format={format}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <TextArea
          dir='rtl'
          onChange={(e) => setEditDescription(e.target.value)}
          value={editDescription}
          rows={4}
          style={{ marginBottom: '10px' }}
        />
      </div>
    </Modal>
  );
};

export default UpdateSigningModal;
