import { SORT_OPTIONS } from "@/constants/general";
import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productService";
import queryString from "query-string";
import { useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const PRODUCT_LIMITS = 9;

const useProductPage = () => {
  const { search } = useLocation();

  const queryObject = queryString.parse(search);
  const [_, setSearchParams] = useSearchParams();

  const {
    data: productsData,
    loading: productsLoading,
    error: productError,
    fetchApi: fetchProducts,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
  );
  const products = productsData?.products || [];
  const productsPagi = productsData?.pagination || {};

  useEffect(() => {
    fetchProducts(search);
  }, [search]);

  const productListProps = {
    isLoading: productsLoading,
    isError: !!productError,
    products,
  };

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCategories);

  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const pagiProps = {
    page: Number(productsPagi.page || queryObject.page || 1),
    limit: Number(productsPagi.limit || 0),
    total: Number(productsPagi.total || 0),
    onPagiChange,
  };

  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (options) =>
          options.queryObject.orderBy === queryObject.orderBy &&
          options.queryObject.order === queryObject.order
      )?.value || SORT_OPTIONS.popularity.value
    );
  }, [queryObject]);

  const onSortChange = (sortType) => {
    const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
    if (sortQueryObject) {
      updateQueryString({
        ...queryObject,
        ...sortQueryObject,
        page: 1,
      });
    }
  };

  const toolboxProps = {
    totalNumb: productsPagi?.total || 0,
    showNumb: products?.length || 0,
    activeSort,
    onSortChange,
  };

  const categories = categoriesData?.products || [];

  const handleCateFilterChange = (cateId, isChecked) => {
    let newCategoryQuery = Array.isArray(queryObject.category)
      ? [...queryObject.category, cateId]
      : [queryObject.category, cateId];

    if (!isChecked) {
      newCategoryQuery = newCategoryQuery.filter((cate) => cate !== cateId);
    }

    if (!cateId) {
      newCategoryQuery = [];
    }

    updateQueryString({
      ...queryObject,
      category: newCategoryQuery,
      page: 1,
    });
  };

  const filterProps = {
    categories,
    handleCateFilterChange,
    activeCategory: Array.isArray(queryObject.category)
      ? queryObject.category
      : [queryObject.category],
  };

  return {
    productListProps,
    pagiProps,
    toolboxProps,
    filterProps,
  };
};

export default useProductPage;
