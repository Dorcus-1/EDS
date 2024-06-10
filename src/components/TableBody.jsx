import React, { createContext, useContext, useState } from 'react';
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
import { Table } from 'antd';


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
};
const dataSource = [
  {
    
  },
  {
        firstName: "John",
        lastName: "Doe",
        nationalId: "A123456789",
        telephone: "+1234567890",
        email: "john.doe@example.com",
        department: "IT",
        position: "Software Engineer",
        manufacturer: "Dell",
        model: "XPS 13",
        SN: "SN1234567890"
  },
  {
    firstName: "John",
    lastName: "Doe",
    nationalId: "A123456789",
    telephone: "+1234567890",
    email: "john.doe@example.com",
    department: "IT",
    position: "Software Engineer",
    manufacturer: "Dell",
    model: "XPS 13",
    SN: "SN1234567890"
  },
  {
    firstName: "John",
    lastName: "Doe",
    nationalId: "A123456789",
    telephone: "+1234567890",
    email: "john.doe@example.com",
    department: "IT",
    position: "Software Engineer",
    manufacturer: "Dell",
    model: "XPS 13",
    SN: "SN1234567890"
  },
  {
    firstName: "John",
    lastName: "Doe",
    nationalId: "A123456789",
    telephone: "+1234567890",
    email: "john.doe@example.com",
    department: "IT",
    position: "Software Engineer",
    manufacturer: "Dell",
    model: "XPS 13",
    SN: "SN1234567890"
  },
  {
    firstName: "John",
    lastName: "Doe",
    nationalId: "A123456789",
    telephone: "+1234567890",
    email: "john.doe@example.com",
    department: "IT",
    position: "Software Engineer",
    manufacturer: "Dell",
    model: "XPS 13",
    SN: "SN1234567890"
  },
  {
    firstName: "John",
    lastName: "Doe",
    nationalId: "A123456789",
    telephone: "+1234567890",
    email: "john.doe@example.com",
    department: "IT",
    position: "Software Engineer",
    manufacturer: "Dell",
    model: "XPS 13",
    SN: "SN1234567890"
  },
  {
    firstName: "John",
    lastName: "Doe",
    nationalId: "A123456789",
    telephone: "+1234567890",
    email: "john.doe@example.com",
    department: "IT",
    position: "Software Engineer",
    manufacturer: "Dell",
    model: "XPS 13",
    SN: "SN1234567890"
  },
];
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
    dataIndex:'manufacturer'
  },
  {
    title:'Model',
    dataIndex:'model'
  },
  {
    title:'SN',
    dataIndex:'SN'
  }
];
const App = () => {
  const [dragIndex, setDragIndex] = useState({
    active: -1,
    over: -1,
  });
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
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
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
            dataSource={dataSource}
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