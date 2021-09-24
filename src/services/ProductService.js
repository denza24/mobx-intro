const webApiUrl =
  "https://gist.githubusercontent.com/breakpoint-solutions/6ec1c923183fe8b7d99cc3000dcc4d85/raw/440a30f2d66742ce61eb6e85621e3ed04b476fd6/products.json";

class ProductService {
  get = async () => {
    const response = await fetch(webApiUrl);
    return await response.json();
  };
}
export default ProductService;
