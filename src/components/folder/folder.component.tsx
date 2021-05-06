import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FolderTwoTone } from '@ant-design/icons';
import './folder.styles.scss';

const Folder = ({ folderId, index }: any) => {
  return (
    <Draggable
      draggableId={folderId}
      index={index}
    >
      {
        (provided) => (
          <div
            className='folder'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='folder-icon'>
              <FolderTwoTone />
            </div>
            <span className='folder-name'>
              Folder-{folderId}
            </span>
            <span className='folder-last-updated'>
              Just Now
            </span>
          </div>
        )
      }
    </Draggable>
  )
}

export default Folder;
