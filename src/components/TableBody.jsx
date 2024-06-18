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
import { Table, message } from 'antd';
import { api } from '../api/api';
import { useSearchContext } from '../context/SearchContext';



// Create a context to manage the drag index state
const DragIndexContext = createContext({
  active: 3,
  over: 3,
});
// Function to style the table cells during drag operations
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
// Component to render the table body cells with drag styles
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
// Component to render the table header cells with sortable and drag styles
const TableHeaderCell = (props) => {
  const dragState = useContext(DragIndexContext);
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: props.id,
  });
  const style = {
    ...props.style,
    cursor: 'move',
    fontWeight: 'bold',
    textTransform: 'uppercase',

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



// Define the columns for the table
const baseColumns = [

  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Author',
    dataIndex: 'author',
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
  },
  {
    title: 'Publication Year',
    dataIndex: 'publicationYear',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
  },
];
const App = () => {



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
  // Define the sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );
  // Handle the end of the drag operation
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
  // Handle the drag over operati
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
  // Fetch all employees (books) from the API
  const getAllEmployees = async () => {
    try {
      const response = await api.get('http://localhost:9000/all/books');
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

  // Filter the data based on the search query
  useEffect(() => {
    if (query) {
      const arr = dataInit.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
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
