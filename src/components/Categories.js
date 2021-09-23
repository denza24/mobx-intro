import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import Button from "./Button";
import { ProductsContext } from "../store/ProductsContext";
import CategoriesContext from "../store/CategoriesStore";

const Categories = () => {
  //  const [categories, setCategories] = useState([]);

  // const prodCtx = useContext(ProductsContext);
  const categoriesStore = useContext(CategoriesContext);
  useEffect(() => {
    categoriesStore.getCategoriesAsync();
  }, []);
  //useEffect(() => {
  // const getCategories = async () => {
  //   const categoriesFromServer = await fetchCategories();

  //   setCategories(categoriesFromServer);
  // };
  //  getCategories();
  // categoriesStore.setinitial
  // }, []);
  // useEffect(() => {
  //   if (categories.length > 0) {
  //     //ucitane kategorije
  //     const setInitialCategory = () => {
  //       console.log("Initial category", categories[0]);
  //       prodCtx.onCategorySelect(categories[0].id);
  //     };
  //     setInitialCategory();
  //   }
  // }, [categories]);

  // const fetchCategories = async () => {
  //   const res = await fetch(
  //     "https://api.jsonbin.io/b/6148643b4a82881d6c526efa"
  //   );
  //   const data = await res.json();

  //   return data;
  // };

  return (
    <div>
      {categoriesStore.categories.map((ctg) => (
        <Button
          key={ctg.id}
          text={ctg.name}
          onClick={() => categoriesStore.onSelectCategoryId(ctg.id)}
          active={categoriesStore.selectedCategoryId === ctg.id}
        />
      ))}
    </div>
  );
};

export default observer(Categories);
