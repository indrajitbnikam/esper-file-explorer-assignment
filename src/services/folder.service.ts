import { IFolder, Link } from "../models/folder.model";
import { cloneDeep } from 'lodash';

export const getNavLinksFromFullId = (folders: IFolder[],folderFullId: string): Link[] => {
  const links: Link[] = [];
  const idArr = folderFullId.split('-').map(id => Number(id));

  let tempFolders = cloneDeep(folders);
  idArr.forEach((id, index) => {
    const tempFolder = tempFolders.find(f => f.id === id) as IFolder;
    links.push({
      id: tempFolder.fullId,
      name: tempFolder.name
    });
    if (index < idArr.length - 1) {
      tempFolders = tempFolder.children;
    }
  })

  return links;
}

export const createFolder = (folders: IFolder[], folderName: string, parentFolderFullId?: string): IFolder[] => {
  const tempFolders = cloneDeep(folders);
  if (!parentFolderFullId) {
    const newFolderId = folders.length ? Math.max(...folders.map(f => f.id)) + 1 : 1;
    const newFolder: IFolder = {
      id: newFolderId,
      fullId: ''+newFolderId,
      name: folderName,
      lastUpdated: new Date().toUTCString(),
      children:[]
    }
    tempFolders.push(newFolder);
  } else {
    const idArr = parentFolderFullId.split('-').map(id => Number(id));
    let parentFolder: IFolder = tempFolders.find(f => f.id === idArr[0]) as IFolder;
    idArr.forEach((id, index) => {
      if (index > 0) {
        parentFolder = parentFolder.children.find(f => f.id === id) as IFolder;
      }
    })

    const newFolderId = parentFolder.children.length ? Math.max(...parentFolder.children.map(f => f.id)) + 1 : 1;
    const newFolder: IFolder = {
      id: newFolderId,
      fullId: `${parentFolder.fullId}-${newFolderId}`,
      name: folderName,
      lastUpdated: new Date().toUTCString(),
      children:[]
    }
    parentFolder.children.push(newFolder);
  }

  return tempFolders;
}

export const deleteFolder = (folders: IFolder[], folderFullId: string): IFolder[] => {
  let tempFolders = cloneDeep(folders);

  const idArr = folderFullId.split('-').map(id => Number(id));
  if (idArr.length === 1) {
    tempFolders = tempFolders.filter(f => f.fullId !== folderFullId);
  } else {
    let parentFolder: IFolder = tempFolders.find(f => f.id === idArr[0]) as IFolder;
    idArr.forEach((id, index) => {
      if (index > 0 && (index < idArr.length - 1)) {
        parentFolder = parentFolder.children.find(f => f.id === id) as IFolder;
      }
    })
    parentFolder.children = parentFolder.children.filter(f => f.fullId !== folderFullId);
  }

  return tempFolders;
}

export const renameFolder = (folders: IFolder[], folderFullId: string, newFolderName: string): IFolder[] => {
  const tempFolders = cloneDeep(folders);

  const idArr = folderFullId.split('-').map(id => Number(id));

  let currentFolder: IFolder = tempFolders.find(f => f.id === idArr[0]) as IFolder;;
  idArr.forEach((id, index) => {
    if (index > 0) {
      currentFolder = currentFolder.children.find(f => f.id === id) as IFolder;
    }
  })

  currentFolder.name = newFolderName;

  return tempFolders;
}

export const traverseToFolder = (folders: IFolder[], folderFullId: string): IFolder => {
  const tempFolders = cloneDeep(folders);

  const idArr = folderFullId.split('-').map(id => Number(id));

  let currentFolder: IFolder = tempFolders.find(f => f.id === idArr[0]) as IFolder;
  idArr.forEach((id, index) => {
    if (index > 0) {
      currentFolder = currentFolder.children.find(f => f.id === id) as IFolder;
    }
  })

  return currentFolder;
}

export const rearrangeFolder = (
  folders: IFolder[],
  folderFullId: string,
  currentIndex: number,
  destinationIndex: number): IFolder[] =>
  {
    let tempFolders = cloneDeep(folders);
    const idArr = folderFullId.split('-').map(id => Number(id));

    if (idArr.length === 1) {
      tempFolders = changeFolderPositionInCollection(tempFolders, currentIndex, destinationIndex);
    } else {
      let parentFolder: IFolder = tempFolders.find(f => f.id === idArr[0]) as IFolder;
      idArr.forEach((id, index) => {
        if (index > 0 && (index < idArr.length - 1)) {
          parentFolder = parentFolder.children.find(f => f.id === id) as IFolder;
        }
      })

      parentFolder.children = changeFolderPositionInCollection(parentFolder.children, currentIndex, destinationIndex);
    }

    return tempFolders;
}

const changeFolderPositionInCollection = (folders: IFolder[], currentIndex: number, destinationIndex: number): IFolder[] => {
  const tempFolders: IFolder[] = [];
  if (destinationIndex === 0) {
    tempFolders.push(folders[currentIndex]);
    for (let i=0; i<folders.length; i++) {
      if(i !== currentIndex) tempFolders.push(folders[i])
    }
  } else if (destinationIndex === folders.length - 1) {
    for (let i=0; i<folders.length; i++) {
      if(i !== currentIndex) tempFolders.push(folders[i])
    }
    tempFolders.push(folders[currentIndex]);
  } else if (currentIndex < destinationIndex) {
    for (let i=0; i<=destinationIndex; i++) {
      if (i !== currentIndex) tempFolders.push(folders[i]);
    }
    tempFolders.push(folders[currentIndex]);
    for (let i=destinationIndex+1; i<folders.length; i++) {
      tempFolders.push(folders[i]);
    }
  } else {
    for (let i=0; i<destinationIndex; i++) {
      tempFolders.push(folders[i]);
    }
    tempFolders.push(folders[currentIndex]);
    for (let i=destinationIndex; i<folders.length; i++) {
      if (i !== currentIndex) tempFolders.push(folders[i]);
    }
  }

  return tempFolders;
}

export const moveFolder = (
  folders: IFolder[],
  currentFolderFullId: string,
  desitinationFolderFullId: string): IFolder[] =>
  {
    let tempFolders = cloneDeep(folders);
    const idArr = desitinationFolderFullId.split('-').map(id => Number(id));

    if (idArr.length === 1) {
      const destinationFolder = tempFolders.find(f => f.fullId === desitinationFolderFullId) as IFolder;
      const currentFolder = tempFolders.find(f => f.fullId === currentFolderFullId) as IFolder;

      const newFolderId = destinationFolder.children.length ? Math.max(...destinationFolder.children.map(f => f.id)) + 1 : 1;

      const newFolder = createFolderRecurssively(currentFolder, `${destinationFolder.fullId}-${newFolderId}`);
      destinationFolder.children.push(newFolder);
      tempFolders = tempFolders.filter(f => f.id !== currentFolder.id);
    } else {
      let parentFolder: IFolder = tempFolders.find(f => f.id === idArr[0]) as IFolder;
      idArr.forEach((id, index) => {
        if (index > 0 && (index < idArr.length - 1)) {
          parentFolder = parentFolder.children.find(f => f.id === id) as IFolder;
        }
      })

      const destinationFolder = parentFolder.children.find(f => f.fullId === desitinationFolderFullId) as IFolder;
      const currentFolder = parentFolder.children.find(f => f.fullId === currentFolderFullId) as IFolder;

      const newFolderId = destinationFolder.children.length ? Math.max(...destinationFolder.children.map(f => f.id)) + 1 : 1;

      const newFolder = createFolderRecurssively(currentFolder, `${destinationFolder.fullId}-${newFolderId}`);
      destinationFolder.children.push(newFolder);
      parentFolder.children = parentFolder.children.filter(f => f.id !== currentFolder.id);
    }

    return tempFolders;
}

const createFolderRecurssively = (oldFolder: IFolder, newFolderFullId: string): IFolder => {
  const tempFolder: IFolder = {
    id: Number(newFolderFullId.split('-').pop()),
    fullId: newFolderFullId,
    name: oldFolder.name,
    lastUpdated: oldFolder.lastUpdated,
    children: []
  };

  if (oldFolder.children.length > 0) {
    oldFolder.children.forEach(childFolder => {
      const newChildFolderId = tempFolder.children.length ? Math.max(...tempFolder.children.map(f => f.id)) + 1 : 1;
      tempFolder.children.push(createFolderRecurssively(childFolder, `${tempFolder.fullId}-${newChildFolderId}`))
    })
  }

  return tempFolder;
}
