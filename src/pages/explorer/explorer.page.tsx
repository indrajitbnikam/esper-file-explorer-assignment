import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
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
          <Breadcrumb>
            <Breadcrumb.Item href="">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Folder 1</Breadcrumb.Item>
            <Breadcrumb.Item>Folder 1-2</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <FolderList />
      </div>
    </DragDropContext>
  )
}

export default Explorer;
