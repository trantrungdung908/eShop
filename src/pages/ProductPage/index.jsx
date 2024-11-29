import BreadCrumb from "@/components/BreadCrumb";
import Pagination from "@/components/Pagination";
import ProductsToolbox from "./components/ProductsToolbox";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import { Link } from "react-router-dom";
import { PATHS } from "@/constants/path";
import useProductPage from "./components/useProductPage";

const ProductPage = () => {
  const { productListProps, pagiProps, toolboxProps, filterProps } =
    useProductPage();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>
      <BreadCrumb className="mb-2">
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>

        <BreadCrumb.Item isActive>Product</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ProductsToolbox {...toolboxProps} />
              <ProductList {...productListProps} />
              <Pagination {...pagiProps} />
            </div>
            <ProductFilter {...filterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
