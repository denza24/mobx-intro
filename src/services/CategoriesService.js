const categoriesUrl = "https://api.jsonbin.io/b/6148643b4a82881d6c526efa";
const subCategoriesUrl = "https://api.jsonbin.io/b/61486531aa02be1d444bb3bc";

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
