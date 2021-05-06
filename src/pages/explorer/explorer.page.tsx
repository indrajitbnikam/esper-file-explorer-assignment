import React, { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import FolderList from '../../components/folder-list/folder-list.component';
import './explorer.styles.scss';
import { IFolder } from '../../models/folder.model';
import { folders } from '../../components/folder-list/folder-list.data';
import { getNavLinksFromFullId, traverseToFolder } from '../../services/folder.service';

const Explorer = () => {

  const [currentParentFolder, setCurrentParentFolder] = useState<IFolder | null>(null);
  const [folderList, setFolderList] = useState<IFolder[]>(folders);
  const [navLinks, setNavLinks] = useState<string[]>([]);

  const handleFolderOpen = (folderFullId?: string) => {
    if (!folderFullId) {
      setFolderList(folders);
      setNavLinks([]);
      setCurrentParentFolder(null);
      return;
    } else {
      setNavLinks(getNavLinksFromFullId(folderFullId));
      const currentFolder = traverseToFolder(folders, folderFullId);
      setFolderList(currentFolder.children);
      setCurrentParentFolder(currentFolder);
    }
  }

  const onDragEnd = () => {

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
                      onClick={() => handleFolderOpen(link)}
                      key={link}
                    >
                      {`Folder ${link}`}
                    </Breadcrumb.Item>
                  ))
                ) : null
              }
            </Breadcrumb>
          </div>
          <div className='actions'>
            <Button type='primary'>New folder</Button>
          </div>
        </div>
        <FolderList
          list={folderList}
          onFolderOpen={handleFolderOpen}
        />
      </div>
    </DragDropContext>
  )
}

export default Explorer;
