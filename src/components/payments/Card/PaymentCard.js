import { Form, Input, NumberKeyboard, PasscodeInput } from "antd-mobile";
import { DateInput } from "../../DateInput";

export const PaymentCard = ({ form }) => {
  const onCardNumberChange = (cardNumber) => {
    var v = cardNumber.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    var matches = v.match(/\d{4,16}/g);
    var match = (matches && matches[0]) || "";
    var parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) cardNumber = parts.join("-");
    form.setFieldsValue({ cardNumber });
  };

  return (
    <Form form={form}>
      <Form.Item
        required
        name="cardNumber"
        label="카드 번호"
        rules={[{ required: true, message: "카드 번호를 입력해주세요." }]}
      >
        <Input
          type="text"
          pattern="[0-9]"
          placeholder="XXXX-XXXX-XXXX-XXXX"
          onChange={onCardNumberChange}
        />
      </Form.Item>
      <Form.Item
        required
        name="expiry"
        label="카드 만료일"
        rules={[{ required: true, message: "만료일을 선택해주세요." }]}
      >
        <DateInput format="YYYY년 MM월" precision="month" min={new Date()} />
      </Form.Item>
      <Form.Item
        required
        name="password"
        label="카드 비밀번호(앞 2자리)"
        rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
      >
        <PasscodeInput length={2} keyboard={<NumberKeyboard />} seperated />
      </Form.Item>
      <Form.Item
        required
        name="birthday"
        label="생년월일"
        rules={[{ required: true, message: "생년월일을 입력해주세요." }]}
      >
        <DateInput
          format="YYYY년 MM월 DD일"
          precision="day"
          min={new Date(0)}
          max={new Date()}
        />
      </Form.Item>
    </Form>
  );
};
