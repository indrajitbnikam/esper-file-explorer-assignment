import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FolderAddTwoTone, FolderTwoTone } from '@ant-design/icons';
import './folder.styles.scss';
import { IFolder } from '../../models/folder.model';

const Folder = (
  {
    data,
    index,
    onFolderOpen
  }: {
    data: IFolder,
    index: number,
    onFolderOpen: (folderFullId: string) => void
  }) => {
  return (
    <Draggable
      draggableId={data.fullId}
      index={index}
    >
      {
        (provided, snapshot) => (
          <div
            className='folder'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='folder-icon'>
              {
                snapshot.isDragging ? (
                  <FolderAddTwoTone />
                ) : (
                  <FolderTwoTone />
                )
              }
            </div>
            <span
              className='folder-name'
              onClick={() => onFolderOpen(data.fullId)}
            >
              {
                data.name
              }
            </span>
            <span className='folder-last-updated'>
              {
                data.lastUpdated
              }
            </span>
          </div>
        )
      }
    </Draggable>
  )
}

export default Folder;
