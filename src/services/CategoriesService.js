const categoriesUrl =
  "https://gist.githubusercontent.com/breakpoint-solutions/a1b0da3ce8b8a94edce12eebeae5fd84/raw/2de5c795f3d8372887e1e61a4617f9e18a2d3820/categories.json";
const subCategoriesUrl =
  "https://gist.githubusercontent.com/breakpoint-solutions/381f083af2f01018edbc91c44da75ca0/raw/a0c25f8810d9ef6fbcba9e3aecb0d70214798ccf/subcategories.json";

class CategoriesService {
  getCategories = async () => {
    const options = {
      method: "GET",
    };
    const request = new Request(categoriesUrl, options);
    const response = await fetch(request);
    return await response.json();
  };
  getSubCategories = async () => {
    const options = {
      method: "GET",
    };
    const request = new Request(subCategoriesUrl, options);
    const response = await fetch(request);
    return await response.json();
  };
}
export default CategoriesService;
