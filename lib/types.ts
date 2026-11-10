export type DrugStatus =
  | 'In Development'
  | 'Approved'
  | 'Clinical Trial'
  | 'On Hold';
export interface Drug {
  id: string;
  name: string;
  status: DrugStatus;
  description: string;
  mechanismOfAction: string;
  sideEffects: string[];
  therapeuticArea: string;
  phase: string;
  updatedAt: string;
}
export interface DrugPage {
  items: Drug[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
