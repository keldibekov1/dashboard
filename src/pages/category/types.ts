export interface CategoryList {
  data: Category[];
  currentPage: number;
  totalPages: number;
  totalCategories: number;
}

export interface Category {
  id: string;
  name: string;
  typeId: string;
  createdAt: string;
  type: Type;
}

export interface Type {
  id: string;
  name: string;
  createdAt: string;
}

export interface TypeItem {
  id: string;
  name: string;
  createdAt: string;
  categories: Category[];
}
