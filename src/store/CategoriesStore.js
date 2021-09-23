import React from "react";
import { makeAutoObservable, runInAction, when } from "mobx";
import CategoriesService from "../services/CategoriesService";

class CategoriesStore {
  categories = [];
  subCategories = [];
  selectedCategoryId = 0;
  selectedSubCategoryId = 0;

  constructor() {
    makeAutoObservable(this);
    this.categoriesService = new CategoriesService();
    when(
      () => this.categories.length > 0 && this.subCategories.length > 0,
      () => this.setInitialCategory()
    );
  }
  setInitialCategory = () => {
    const firstCategoryId = this.categories[0].id;

    this.onSelectCategoryId(firstCategoryId);
  };
  onSelectCategoryId = (id) => {
    this.selectedCategoryId = id;
    //set first subcategory for select category
    const subCategories = this.subCategories.filter(
      (subCtg) => subCtg.categoryId === id
    );

    const firstSubCategoryId = subCategories[0].id;
    this.onSelectSubCategoryId(firstSubCategoryId);
  };
  onSelectSubCategoryId = (id) => {
    this.selectedSubCategoryId = id;
  };
  getCategoriesAsync = async () => {
    try {
      const data = await this.categoriesService.getCategories();
      runInAction(() => {
        this.categories = data;
        //   this.setInitialCategory();
      });
    } catch (err) {
      runInAction(() => {
        console.log(err);
      });
    }
  };
  getSubCategoriesAsync = async () => {
    try {
      const data = await this.categoriesService.getSubCategories();
      runInAction(() => {
        this.subCategories = data;
      });
    } catch (err) {
      runInAction(() => {
        console.log(err);
      });
    }
  };
}

const CategoriesContext = React.createContext(new CategoriesStore());
export default CategoriesContext;
