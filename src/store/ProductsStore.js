// export function createProductsStore() {
//   return {
//     products: [],
//     categories: [],
//     subCategories: [],
//     selectedCategory,
//     selectedSubCategory,
//   };
// }
import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import ProductService from "../services/ProductService";

class ProductsStore {
  products = [];
  constructor() {
    makeAutoObservable(this);
    this.productsService = new ProductService();
  }
  getProductsAsync = async () => {
    try {
      const data = await this.productsService.get();
      runInAction(() => {
        this.products = data;
      });
    } catch (err) {
      runInAction(() => {
        console.log(err);
      });
    }
  };
}

const ProductsContext = React.createContext(new ProductsStore());
export default ProductsContext;
