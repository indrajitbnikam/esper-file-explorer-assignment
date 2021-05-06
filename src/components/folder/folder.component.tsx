import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FolderAddTwoTone, FolderTwoTone } from '@ant-design/icons';
import './folder.styles.scss';
import { IFolder } from '../../models/folder.model';
import { Dropdown, Menu } from 'antd';

const Folder = (
  {
    data,
    index,
    onFolderOpen,
  }: {
    data: IFolder,
    index: number,
    onFolderOpen: (folderFullId: string) => void
  }) => {

  const folderMenu = (fullId: string) => (
    <Menu>
      <Menu.Item key="1" onClick={() => console.log('Rename ', fullId)}>Rename</Menu.Item>
      <Menu.Item key="2" onClick={() => console.log('Duplicate ', fullId)}>Duplicate</Menu.Item>
      <Menu.Item key="3" onClick={() => console.log('Delete ', fullId)}>Delete</Menu.Item>
    </Menu>
  );

  return (
    <Draggable
      draggableId={data.fullId}
      index={index}
    >
      {
        (provided, snapshot) => (
          <Dropdown
            overlay={folderMenu(data.fullId)}
            trigger={['contextMenu']}
          >
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
          </Dropdown>
        )
      }
    </Draggable>
  )
}

export default Folder;
