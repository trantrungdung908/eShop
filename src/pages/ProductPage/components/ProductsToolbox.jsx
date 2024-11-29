import FormItem from "@/components/Form";
import Select from "@/components/Select";
import { SORT_OPTIONS } from "@/constants/general";
import React from "react";
import styled from "styled-components";

const ProductsToolbox = ({ showNumb, totalNumb, activeSort, onSortChange }) => {
  const onSelectChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-info">
          {" "}
          Showing{" "}
          <span>
            {showNumb || 0} of {totalNumb || 0}
          </span>{" "}
          Products{" "}
        </div>
      </div>
      <ToolboxRightWrapper className="toolbox-right">
        <FormItem
          label={"Sort by:"}
          className="toolbox-sort"
          renderInput={(inputProps) => {
            return (
              <Select
                defaultValue={SORT_OPTIONS.popularity.value}
                {...inputProps}
                onChange={onSelectChange}
                value={activeSort}
                options={[
                  SORT_OPTIONS.popularity,
                  SORT_OPTIONS.pricelow,
                  SORT_OPTIONS.pricehigh,
                  SORT_OPTIONS.newest,
                  SORT_OPTIONS.rating,
                ]}
              />
            );
          }}
        >
          {/* <label htmlFor="sortby">Sort by:</label>
          <div className="select-custom">
            <select name="sortby" id="sortby" className="form-control">
              <option value="popularity" selected>
                Most Popular
              </option>
              <option value="pricelow">Price Low to High</option>
              <option value="pricehight">Price Hight to Low </option>
              <option value="newest">Newest</option>
              <option value="rating">Most Rated</option>
            </select>
          </div> */}
        </FormItem>
      </ToolboxRightWrapper>
    </div>
  );
};

const ToolboxRightWrapper = styled.div``;

export default ProductsToolbox;
