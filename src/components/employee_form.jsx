import React from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,

} from 'antd';
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const EmployeeForm = () => (

    
  <Form
    {...formItemLayout}
    variant="filled"
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="First Name"
      name="firstName"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Last Name"
      name="LastName"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="National Id"
      name="nationalId"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Telephone"
      name="telephone"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Department"
      name="department"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Position"
      name="position"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input/>
    </Form.Item>

    <Form.Item
      label="Manufacturer"
      name="manufacturer"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Model"
      name="model"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Serial Number"
      name="SN"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input />
    </Form.Item>  
    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default EmployeeForm;