import React, { useState, useEffect, useContext } from "react";
import Button from "./Button";
import { ProductsContext } from "../store/ProductsContext";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  // const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const prodCtx = useContext(ProductsContext);

  useEffect(() => {
    const getCategories = async () => {
      const categoriesFromServer = await fetchCategories();

      setCategories(categoriesFromServer);
    };

    getCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch(
      "https://api.jsonbin.io/b/6148643b4a82881d6c526efa"
    );
    const data = await res.json();

    return data;
  };

  return (
    <div>
      {categories.map((ctg) => (
        <Button
          key={ctg.id}
          text={ctg.name}
          onClick={() => prodCtx.onCategorySelect(ctg.id)}
          active={prodCtx.selectedCategoryId === ctg.id}
        />
      ))}
    </div>
  );
};

export default Categories;
