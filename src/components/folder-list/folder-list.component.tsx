import React from 'react';
import './folder-list.styles.scss';
import Folder from '../folder/folder.component';
import { Droppable } from 'react-beautiful-dnd';

const FolderList = () => {
  return (
    <Droppable
      droppableId={'folder-list'}
      isCombineEnabled
    >
      {
        (provided) => (
          <div
            className='folder-list-view'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Folder folderId={'1'} index={1} />
            <Folder folderId={'2'} index={2} />
            <Folder folderId={'3'} index={3} />
            <Folder folderId={'4'} index={4} />
            <Folder folderId={'5'} index={5} />
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>
  )
}

export default FolderList;
