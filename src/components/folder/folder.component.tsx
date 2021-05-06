import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FolderAddTwoTone, FolderTwoTone } from '@ant-design/icons';
import './folder.styles.scss';
import { IFolder } from '../../models/folder.model';
import { Dropdown, Input, Menu, Modal } from 'antd';

const Folder = (
  {
    data,
    index,
    onFolderOpen,
    onFolderDelete,
    onFolderRename
  }: {
    data: IFolder,
    index: number,
    onFolderOpen: (folderFullId: string) => void,
    onFolderDelete: (folderFullId: string) => void,
    onFolderRename: (folderFullId: string, newName: string) => void
  }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFolderNameText, setNewFolderNameText] = useState<string>(data.name);

  const handleRenameFolder = () => {
    onFolderRename(data.fullId, newFolderNameText);
    setNewFolderNameText(data.name);
  }

  const folderMenu = (fullId: string) => (
    <Menu>
      <Menu.Item key="1" onClick={() => setIsModalVisible(true)}>Rename</Menu.Item>
      {/* <Menu.Item key="2" onClick={() => console.log('Duplicate ', fullId)}>Duplicate</Menu.Item> */}
      <Menu.Item key="3" onClick={() => onFolderDelete(data.fullId)}>
        Delete
      </Menu.Item>
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

              <Modal
                title='Rename folder'
                visible={isModalVisible}
                destroyOnClose
                onOk={() => {
                  handleRenameFolder();
                  setIsModalVisible(false);
                }}
                onCancel={() => {
                  setIsModalVisible(false);
                  setNewFolderNameText('');
                }}
                maskClosable
              >
                <Input
                  value={newFolderNameText}
                  onChange={e => setNewFolderNameText(e.target.value)}
                  placeholder='Enter folder name'
                />
              </Modal>
            </div>
          </Dropdown>
        )
      }
    </Draggable>
  )
}

export default Folder;
