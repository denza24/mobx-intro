import React, { useState, useEffect, useContext } from "react";
import Button from "./Button";
import { ProductsContext } from "../store/ProductsContext";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  // const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const productsContext = useContext(ProductsContext);

  useEffect(() => {
    const getCategories = async () => {
      const subCategoriesFromServer = await fetchSubCategories();

      setSubCategories(subCategoriesFromServer);
    };

    getCategories();
  }, []);

  const fetchSubCategories = async () => {
    const res = await fetch(
      "https://api.jsonbin.io/b/61486531aa02be1d444bb3bc"
    );
    const data = await res.json();

    return data;
  };

  const ctgId = productsContext.selectedCategoryId;
  let subCategoriesToMap = [];

  if (ctgId) {
    subCategoriesToMap = subCategories.filter(
      (sub) => sub.categoryId === ctgId
    );
  }
  return (
    <div>
      {subCategoriesToMap.map((ctg) => (
        <Button
          key={ctg.id}
          text={ctg.name}
          onClick={() => productsContext.onSubCategorySelect(ctg.id)}
          active={productsContext.selectedSubCategoryId === ctg.id}
        />
      ))}
    </div>
  );
};

export default SubCategories;
