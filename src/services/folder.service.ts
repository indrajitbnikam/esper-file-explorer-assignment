import { IFolder } from "../models/folder.model";
import { cloneDeep } from 'lodash';

export const getNavLinksFromFullId = (folderFullId: string): string[] => {
  const links: string[] = [];

  const idArr = folderFullId.split('-');
  idArr.forEach((id, index) => {
    if (index === 0) {
      links.push(''+id);
    } else {
      links.push(`${links[index-1]}-${id}`)
    }
  })

  return links;
}

export const createFolder = (folders: IFolder[], folderName: string, parentFolderFullId?: string) => {
  console.log('Create folder', folders, folderName, parentFolderFullId);
}

export const deleteFolder = (folders: IFolder[], folderFullId: string) => {
  console.log('Delete folder', folders, folderFullId);
}

export const traverseToFolder = (folders: IFolder[], folderFullId: string): IFolder => {
  const tempFolders = cloneDeep(folders);

  const idArr = folderFullId.split('-').map(id => Number(id));

  let currentFolder: IFolder = tempFolders.find(f => f.id === idArr[0]) as IFolder;;
  idArr.forEach((id, index) => {
    if (index > 0) {
      currentFolder = currentFolder.children.find(f => f.id === id) as IFolder;
    }
  })

  return currentFolder;
}