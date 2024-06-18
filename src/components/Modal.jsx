import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import EmployeeForm from './book_form';

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} style={{"backgroundColor":"#101540"}} >
        Add Book
      </Button>
      <Modal
        title="Add Book"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <EmployeeForm/>
      </Modal>
    </>
  );
};
export default App;