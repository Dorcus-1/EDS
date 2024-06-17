import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  message,
} from 'antd';
import { api } from '../api/api';

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

const EditEmployeeForm = (props) => {
  console.log("props passed : ",props);
  const [form] = Form.useForm();

  const onFinish = async (record) => {
    try {
      const response = await api.patch(`http://localhost:9000/employee/${props.record.id}`, record);
      console.log('Hereee');
   
      message.success('Employee data edited successfully');
      console.log('Response:', response.data);
    } catch (error) {
      message.error('Failed to submit employee data');
      console.error('Error:', error);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      initialValues={{
        firstName: props.record.firstName,
        lastName: props.record.lastName,
        nationalId: props.record.nationalId,
        telephone: props.record.telephone,
        email: props.record.email,
        department: props.record.department,
        position: props.record.position,
        laptopManufacturer: props.record.laptopManufacturer,
        model: props.record.model,
        serialNumber: props.record.serialNumber,
        
        
    }}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        
        rules={[
          { required: true, message: 'Please input!' },
        ]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          { required: true, message: 'Please input!' },
        ]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label="National Id"
        name="nationalId"
        rules={[
          { required: true, message: 'Please input!' },
        ]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label="Telephone"
        name="telephone"
        rules={[
          { required: true, message: 'Please input!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Department"
        name="department"
        rules={[
          { required: true, message: 'Please input!' },
        ]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label="Position"
        name="position"
        rules={[
          { required: true, message: 'Please input!' },
        ]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label="Manufacturer"
        name="laptopManufacturer"
        rules={[
          { required: true, message: 'Please input!' },
        ]}
      >
        <Input  />
      </Form.Item>

      <Form.Item
        label="Model"
        name="model"
        rules={[
          { required: true, message: 'Please input!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Serial Number"
        name="serialNumber"
        rules={[
          { required: true, message: 'Please input!' },
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
        <Button type="primary" htmlType="submit" className='bg-[#101540]'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditEmployeeForm;
