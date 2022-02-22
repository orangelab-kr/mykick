import { DatePicker } from "antd-mobile";
import dayjs from "dayjs";
import { useState } from "react";

export const DateInput = ({ format, value, onChange, ...props }) => {
  const [visible, setVisible] = useState(false);
  const [draftDate, setDraftDate] = useState(value);

  const onConfirm = () => {
    onChange(draftDate);
    setVisible(false);
  };

  const onCancel = () => {
    setDraftDate(value);
    setVisible(false);
  };

  return (
    <div onClick={() => setVisible(true)}>
      {draftDate ? dayjs(draftDate).format(format) : "날짜 입력하기"}
      <DatePicker
        visible={visible}
        value={draftDate}
        onSelect={setDraftDate}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmText="확인"
        cancelText="취소"
        {...props}
      />
    </div>
  );
};
