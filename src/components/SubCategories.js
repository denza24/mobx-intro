import React, { useEffect, useContext } from "react";
import Button from "./Button";
import { observer } from "mobx-react-lite";
import CategoriesContext from "../store/CategoriesStore";

const SubCategories = () => {
  // const [subCategories, setSubCategories] = useState([]);
  // const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  // const productsContext = useContext(ProductsContext);

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const subCategoriesFromServer = await fetchSubCategories();

  //     setSubCategories(subCategoriesFromServer);
  //   };

  //   getCategories();
  // }, []);
  // useEffect(() => {
  //   if (subCategories.length > 0) {
  //     //ucitane subkategorije
  //     const setInitialSubCategory = () => {
  //       console.log("Initial subcategory", subCategories[0]);
  //       productsContext.onSubCategorySelect(subCategories[0].id);
  //     };
  //     setInitialSubCategory();
  //   }
  // }, [subCategories]);
  // const fetchSubCategories = async () => {
  //   const res = await fetch(
  //     "https://api.jsonbin.io/b/61486531aa02be1d444bb3bc"
  //   );
  //   const data = await res.json();

  //   return data;
  // };

  const categoriesStore = useContext(CategoriesContext);
  useEffect(() => {
    categoriesStore.getSubCategoriesAsync();
    // eslint-disable-next-line
  }, []);

  const ctgId = categoriesStore.selectedCategoryId;
  let subCategoriesToMap = [];

  if (ctgId) {
    subCategoriesToMap = categoriesStore.subCategories.filter(
      (sub) => sub.categoryId === ctgId
    );
  }

  return (
    <div>
      {subCategoriesToMap.map((sub) => (
        <Button
          key={sub.id}
          text={sub.name}
          onClick={() => categoriesStore.onSelectSubCategoryId(sub.id)}
          isSelected={categoriesStore.selectedSubCategoryId === sub.id}
        />
      ))}
    </div>
  );
};

export default observer(SubCategories);
