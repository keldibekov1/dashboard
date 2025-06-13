import { Home } from "../pages/home/Home";
import Category from "../pages/category/Category";
import Product from "../pages/products/Product";

export default [
  {
    element: Home,
  },
  {
    path: "category",
    element: Category,
  },
  {
    path: "products",
    element: Product,
  },
  
];
