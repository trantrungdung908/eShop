import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productService";
import { handleAddCart } from "@/store/reducers/cartReducer";
import { message } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const useProductDetail = () => {
  const { slug } = useParams();
  const colorRef = useRef();
  const quantityRef = useRef();
  const dispatch = useDispatch();

  const {
    data: productData,
    loading: productLoading,
    fetchApi: fetchProductBySlug,
  } = useMutation(productService.getProductBySlug);

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug);
    }
  }, [slug]);

  const { id, name, description, shippingReturn, price, discount } =
    productData || {};

  const { data: productDetailReviews } = useQuery(
    () => id && productService.getProductReview(id),
    [id]
  );

  const handleAddToCart = () => {
    const { value: colorValue, reset: resetColor } = colorRef.current || {};
    const { value: quantityValue, reset: resetQuantity } =
      quantityRef.current || {};

    if (!colorValue) {
      message.error("Xin mời chọn màu sản phẩm");
      return;
    } else if (isNaN(quantityValue) && quantityValue < 1) {
      message.error("Số lượng không nhỏ hơn 1");
    }

    // call API add to cart

    const addPayload = {
      addedId: id,
      addedColor: colorValue,
      addedQuantity: quantityValue,
      addedPrice: price - discount,
    };
    try {
      const res = dispatch(handleAddCart(addPayload)).unwrap();
      if (res) {
        resetColor?.();
        resetQuantity?.();
      }
    } catch (error) {
      throw error;
    }
  };

  const handleAddToWishlist = () => {};

  const productDetailTopProps = {
    ...productData,
    reviews: productDetailReviews,
    colorRef,
    quantityRef,
    handleAddToCart,
    handleAddToWishlist,
  };

  const productDetailTabProps = {
    description,
    shippingReturn,
    reviews: productDetailReviews,
  };

  return {
    productName: name,
    productDetailTopProps,
    productDetailTabProps,
  };
};

export default useProductDetail;
