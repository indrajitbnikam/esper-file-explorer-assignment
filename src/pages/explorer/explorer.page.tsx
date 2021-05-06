import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import FolderList from '../../components/folder-list/folder-list.component';
import './explorer.styles.scss';

const Explorer = () => {

  const onDragEnd = () => {

  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className='explorer'>
        <div className='navigation'>
          navigation
        </div>
        <FolderList />
      </div>
    </DragDropContext>
  )
}

export default Explorer;
