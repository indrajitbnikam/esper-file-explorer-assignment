// Recurssive Model

export interface IFolder {
  id: string;
  fullId: string; //  Absolute location in file explorer
  name: string;
  lastUpdated: string;
  children: IFolder[];
}