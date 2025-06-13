

export interface Category {
  id: string;
  name: string;
  typeId: string;
  createdAt: string;
}



export interface Product {
  id: string;
  name: string;
  price:number;
  description:string;
  count:number
  skidka:number;
  userId:string;
  categoryId: string;
  createdAt: string;
}

