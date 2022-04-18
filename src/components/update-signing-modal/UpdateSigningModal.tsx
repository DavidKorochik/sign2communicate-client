import React, { useEffect } from 'react';
import moment from 'moment';
import { updateSigning } from '../../utils/signings/recoilFunctions';
import { equipmentData } from '../../utils/equipmentData';
import type { ISigning } from '../../interfaces/signing/types';
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
const dateFormatList = ['DD/MM/YYYY'];

interface Props {
  setIsUpdateSigningModalVisible: (bool: boolean) => void;
  updateSigningVisible: boolean;
  current: ISigning | null;
  setCurrent: (signing: ISigning | null) => void;
  editDescription: string;
  editEquipment: string[];
  editSigningDate: string | null | moment.Moment;
  editReturnDate: string | null | moment.Moment;
  editSigningTime: string | null | moment.Moment;
  setEditDescription: (description: string) => void;
  setEditEquipment: (equipment: string[]) => void;
  setEditSigningDate: (date: string | moment.Moment | null) => void;
  setEditReturnDate: (date: string | moment.Moment | null) => void;
  setEditSigningTime: (date: string | moment.Moment | null) => void;
  id: string | undefined;
  setSigningsListState: (signings: ISigning[]) => void;
  signingsListState: ISigning[];
}

const UpdateSigningModal: React.FC<Props> = ({
  setIsUpdateSigningModalVisible,
  updateSigningVisible,
  current,
  setCurrent,
  editEquipment,
  editDescription,
  editReturnDate,
  editSigningDate,
  editSigningTime,
  setEditDescription,
  setEditEquipment,
  setEditReturnDate,
  setEditSigningDate,
  setEditSigningTime,
  id,
  setSigningsListState,
  signingsListState,
}) => {
  useEffect(() => {
    if (current !== null) {
      setEditDescription(current?.description);
      setEditEquipment(current?.equipment);
      setEditReturnDate(current?.returningDate);
      setEditSigningTime(current?.time);
      setEditSigningDate(current?.signingDate);
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
      signingDate: moment(editSigningDate),
      returningDate: moment(editReturnDate),
      time: moment(editSigningTime),
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
          onChange={(date: moment.Moment | null): void =>
            setEditSigningDate(date)
          }
          value={moment(editSigningDate)}
          format={dateFormatList}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <DatePicker
          onChange={(date: moment.Moment | null): void =>
            setEditReturnDate(date)
          }
          value={moment(editReturnDate)}
          format={dateFormatList}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <TimePicker
          onChange={(time: moment.Moment | null): void =>
            setEditSigningTime(time)
          }
          value={moment(editSigningTime)}
          format={format}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <TextArea
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
