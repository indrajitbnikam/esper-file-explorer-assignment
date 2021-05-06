import React, { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Modal } from 'antd';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import FolderList from '../../components/folder-list/folder-list.component';
import './explorer.styles.scss';
import { IFolder, Link } from '../../models/folder.model';
import { folders } from '../../components/folder-list/folder-list.data';
import { createFolder, deleteFolder, getNavLinksFromFullId, moveFolder, rearrangeFolder, renameFolder, traverseToFolder } from '../../services/folder.service';

const Explorer = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFolderNameText, setNewFolderNameText] = useState<string>('');

  const [currentParentFolder, setCurrentParentFolder] = useState<IFolder | null>(null);
  const [localFolders, setLocalFolders] = useState<IFolder[]>(folders);
  const [folderList, setFolderList] = useState<IFolder[]>(folders);
  const [navLinks, setNavLinks] = useState<Link[]>([]);

  const handleFolderOpen = (folderFullId?: string) => {
    if (!folderFullId) {
      setFolderList(localFolders);
      setNavLinks([]);
      setCurrentParentFolder(null);
      return;
    } else {
      setNavLinks(getNavLinksFromFullId(localFolders, folderFullId));
      const currentFolder = traverseToFolder(localFolders, folderFullId);
      setFolderList(currentFolder.children);
      setCurrentParentFolder(currentFolder);
    }
  }

  const handleCreateFolder = () => {
    if (!currentParentFolder) {
      const tempLocalFolders = createFolder(localFolders, newFolderNameText);
      setNewFolderNameText('');
      setLocalFolders(tempLocalFolders);
      setFolderList(tempLocalFolders);
    } else {
      const tempLocalFolders = createFolder(localFolders, newFolderNameText, currentParentFolder.fullId);
      setNewFolderNameText('');
      setLocalFolders(tempLocalFolders);
      setFolderList(traverseToFolder(tempLocalFolders, currentParentFolder.fullId).children)
    }
  };

  const handleDeleteFolder = (folderFullId: string) => {
    const tempLocalFolders = deleteFolder(localFolders, folderFullId);
    setLocalFolders(tempLocalFolders);

    if (!currentParentFolder) {
      setFolderList(tempLocalFolders);
    } else {
      setFolderList(traverseToFolder(tempLocalFolders, currentParentFolder.fullId).children)
    }
  }

  const handleRenameFolder = (folderFullId: string, newName: string) => {
    const tempLocalFolders = renameFolder(localFolders, folderFullId, newName);
    setLocalFolders(tempLocalFolders);

    if (!currentParentFolder) {
      setFolderList(tempLocalFolders);
    } else {
      setFolderList(traverseToFolder(tempLocalFolders, currentParentFolder.fullId).children)
    }
  }

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    let tempLocalFolders: IFolder[] = localFolders;
    if (!result.combine && result.destination) {
      // rearrange workflow
      if (result.destination?.index === result.source.index) return;
      tempLocalFolders = rearrangeFolder(localFolders, result.draggableId, result.source.index, result.destination.index);
    } else if (result.combine && !result.destination) {
      // Move inside workflow
      tempLocalFolders = moveFolder(localFolders, result.draggableId, result.combine.draggableId);
    }

    setLocalFolders(tempLocalFolders);
    if (!currentParentFolder) {
      setFolderList(tempLocalFolders);
    } else {
      setFolderList(traverseToFolder(tempLocalFolders, currentParentFolder.fullId).children)
    }
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className='explorer'>
        <div className='toolbar'>
          <div className='navigation'>
            <Breadcrumb>
              <Breadcrumb.Item className='link' onClick={() => handleFolderOpen()}>
                <HomeOutlined />
              </Breadcrumb.Item>
              {
                navLinks.length ? (
                  navLinks.map(link => (
                    <Breadcrumb.Item
                      className='link'
                      onClick={() => handleFolderOpen(link.id)}
                      key={link.id}
                    >
                      {link.name}
                    </Breadcrumb.Item>
                  ))
                ) : null
              }
            </Breadcrumb>
          </div>
          <div className='actions'>
            <Button
              type='primary'
              onClick={() => setIsModalVisible(true)}
            >
              New folder
            </Button>
            <Modal
              title='Create new folder'
              visible={isModalVisible}
              destroyOnClose
              onOk={() => {
                handleCreateFolder();
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
        </div>
        <FolderList
          list={folderList}
          onFolderOpen={handleFolderOpen}
          onFolderDelete={handleDeleteFolder}
          onFolderRename={handleRenameFolder}
        />
      </div>
    </DragDropContext>
  )
}

export default Explorer;
