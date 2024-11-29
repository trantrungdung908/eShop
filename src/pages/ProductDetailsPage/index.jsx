import BreadCrumb from "@/components/BreadCrumb";
import { PATHS } from "@/constants/path";
import { Link } from "react-router-dom";
import ProductDetailTab from "./components/ProductDetailTab";
import ProductDetailTop from "./components/ProductDetailTop";
import useProductDetail from "./components/useProductDetail";

const ProductDetailsPage = () => {
  const { productName, productDetailTabProps, productDetailTopProps } =
    useProductDetail();

  return (
    <main className="main">
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>

        <BreadCrumb.Item>
          {" "}
          <Link to={PATHS.PRODUCTS}>Product</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>{productName || ""}</BreadCrumb.Item>
      </BreadCrumb>

      <div className="page-content">
        <div className="container">
          <ProductDetailTop {...productDetailTopProps} />

          <ProductDetailTab {...productDetailTabProps} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
