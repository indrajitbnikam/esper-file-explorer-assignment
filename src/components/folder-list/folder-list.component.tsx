import React from 'react';
import './folder-list.styles.scss';
import Folder from '../folder/folder.component';
import { Droppable } from 'react-beautiful-dnd';
import { IFolder } from '../../models/folder.model';

const FolderList = ({
  list,
  onFolderOpen,
  onFolderDelete,
  onFolderRename
}: {
  list: IFolder[],
  onFolderOpen: (folderFullId: string) => void,
  onFolderDelete: (folderFullId: string) => void,
  onFolderRename: (folderFullId: string, newName: string) => void
}) => {

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
              list.length ? (
                list.map((fd, index) => (
                  <Folder
                    key={fd.fullId}
                    data={fd}
                    index={index}
                    onFolderOpen={onFolderOpen}
                    onFolderDelete={onFolderDelete}
                    onFolderRename={onFolderRename}
                  />
                ))
              ) : (
                <span>Folder is empty</span>
              )
            }
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>
  )
}

export default FolderList;
