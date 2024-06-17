import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { Table, Button, message,Modal } from 'antd';
import { api } from '../api/api';
import { useSearchContext } from '../context/SearchContext';
import EditEmployeeForm from './edit_form';



const DragIndexContext = createContext({
  active: 3,
  over: 3,
});
const dragActiveStyle = (dragState, id) => {
  const { active, over, direction } = dragState;
  // drag active style
  let style = {};
  if (active && active === id) {
    style = {
      backgroundColor: 'red',
      opacity: 0.5,
    };
  }
  // dragover dashed style
  else if (over && id === over && active !== over) {
    style =
      direction === 'right'
        ? {
            borderRight: '1px dashed gray',
          }
        : {
            borderLeft: '1px dashed gray',
          };
  }
  return style;
};
const TableBodyCell = (props) => {
  const dragState = useContext(DragIndexContext);
  return (
    <td
      {...props}
      style={{
        ...props.style,
        ...dragActiveStyle(dragState, props.id),
      }}
    />
  );
};
const TableHeaderCell = (props) => {
  const dragState = useContext(DragIndexContext);
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: props.id,
  });
  const style = {
    ...props.style,
    cursor: 'move',
    ...(isDragging
      ? {
          position: 'relative',
          zIndex: 9999,
          userSelect: 'none',
        }
      : {}),
    ...dragActiveStyle(dragState, props.id),
  };
  return <th {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
}

const handleEdit = async (record) => {
  console.log("Edit", record);
  try {
    const response = await api.put(`http://localhost:9000/update/employee/${record.id}`, record);
    console.log("Edit successful", response.data);
    // Handle the successful edit, such as updating the state or displaying a success message
  } catch (error) {
    console.error("Error editing record", error);
    // Handle the error, such as displaying an error message
  }
};

const handleDelete = async (record) => {
  
  console.log("Delete", record);
  try {
    const response = await api.delete(`http://localhost:9000/delete/employee/${record.id}`);
  message.success("Record deleted successfully, Refresh")
    console.log("Delete successful", response.data);
    // Handle the successful deletion, such as updating the state or displaying a success message
  } catch (error) {
    console.error("Error deleting record", error);
    // Handle the error, such as displaying an error message
  }
};


const EmployeeCard=(props)=>{
  const [open, setOpen] = useState(false);
return <div>
        <Button type="primary" onClick={() =>setOpen(true)} style={{"backgroundColor":"#101540"}} >
          Edit
        </Button>
        <Modal
          title="Edit Employee"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
          
        >
          <EditEmployeeForm record={props.record}/>
        </Modal>
          <Button onClick={() => handleDelete(props.record)} type="danger" style={{ Color:"#101540" }}>Delete</Button>
        </div>
}

const App = () => {

  const baseColumns = [
  
    {
      title: 'FirstName',
      dataIndex: 'firstName',
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
    },
    {
      title: 'NationalID',
      dataIndex: 'nationalId',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Telephone',
      dataIndex: 'telephone',
    },
    {
      title:'Department',
      dataIndex:'department'
    },
    {
      title:'Position',
      dataIndex:'position'
    },
    {
      title:'Manufacturer',
      dataIndex:'laptopManufacturer'
    },
    {
      title:'Model',
      dataIndex:'model'
    },
    {
      title:'SN',
      dataIndex:'serialNumber'
    },
    {
      title:'Action',
      dataIndex:'action',
      render: (text, record) => <EmployeeCard record={record}/>
    }
  ];

  const { query } = useSearchContext();
  const [dragIndex, setDragIndex] = useState({
    active: -1,
    over: -1,
  });

  const [dataInit, setDataInit] = useState([]);
  const [columns, setColumns] = useState(() =>
    baseColumns.map((column, i) => ({
      ...column,
      key: `${i}`,
      onHeaderCell: () => ({
        id: `${i}`,
      }),
      onCell: () => ({
        id: `${i}`,
      }),
    })),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setColumns((prevState) => {
        const activeIndex = prevState.findIndex((i) => i.key === active?.id);
        const overIndex = prevState.findIndex((i) => i.key === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
    setDragIndex({
      active: -1,
      over: -1,
    });
  };

  const onDragOver = ({ active, over }) => {
    const activeIndex = columns.findIndex((i) => i.key === active.id);
    const overIndex = columns.findIndex((i) => i.key === over?.id);
    setDragIndex({
      active: active.id,
      over: over?.id,
      direction: overIndex > activeIndex ? 'right' : 'left',
    });
  };

  const [data, setData] = useState([]);
  
  const getAllEmployees = async () => {
    try {
      const response = await api.get('http://localhost:9000/all/employees');
      setData(response.data);
      setDataInit(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  useEffect(() => {
    if (query) {
      const arr = dataInit.filter(user => 
        user.firstName.toLowerCase().includes(query.toLowerCase()) || 
        user.lastName.toLowerCase().includes(query.toLowerCase()) || 
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      console.log(arr);
      setData(arr);
    } else {
      console.log("no query specified");
    }
  }, [query]);

  console.log(query);
  console.log(data);

  return (
    
    <DndContext
      sensors={sensors}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      collisionDetection={closestCenter}
    >
      <SortableContext items={columns.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
        <DragIndexContext.Provider value={dragIndex}>
          <Table
            rowKey="key"
            columns={columns}
            dataSource={data}
            components={{
              header: {
                cell: TableHeaderCell,
              },
              body: {
                cell: TableBodyCell,
              },
            }}
          />
        </DragIndexContext.Provider>
      </SortableContext>
      <DragOverlay>
        <th
          style={{
            backgroundColor: 'gray',
            padding: 16,
          }}
        >
          {columns[columns.findIndex((i) => i.key === dragIndex.active)]?.title}
        </th>
      </DragOverlay>
    </DndContext>
  );
};

export default App;
