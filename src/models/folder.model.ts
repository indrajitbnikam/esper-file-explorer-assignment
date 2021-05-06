// Recurssive Model

export interface IFolder {
  id: number;
  fullId: string; //  Absolute location in file explorer
  name: string;
  lastUpdated: string;
  children: IFolder[];
}

export interface Link {
  id: string;
  name: string;
}