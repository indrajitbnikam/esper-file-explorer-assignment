import React from 'react';
import './folder-list.styles.scss';
import Folder from '../folder/folder.component';
import { Droppable } from 'react-beautiful-dnd';
import { folders } from './folder-list.data';

const FolderList = () => {

  const handleFolderOpen = (folderFullId: string) => {
    console.log(folderFullId);
  }

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
            {
              folders.length ? (
                folders.map((fd, index) => (
                  <Folder
                    key={fd.fullId}
                    data={fd}
                    index={index}
                    onFolderOpen={handleFolderOpen}
                  />
                ))
              ) : null
            }
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>
  )
}

export default FolderList;
