import Checkbox from "@/components/Checkbox";
import React from "react";

const ProductFilter = ({
  categories,
  handleCateFilterChange,
  activeCategory,
}) => {
  const _onFilterChange = (id, isChecked) => {
    handleCateFilterChange(id, isChecked);
  };
  return (
    <aside className="col-lg-3 order-lg-first">
      <div className="sidebar sidebar-shop">
        <div className="widget widget-clean">
          <label>Filters:</label>
          <a
            href="#"
            className="sidebar-filter-clear"
            onClick={() => handleCateFilterChange("")}
          >
            Clean All
          </a>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <a
              data-toggle="collapse"
              href="#widget-1"
              role="button"
              aria-expanded="true"
              aria-controls="widget-1"
            >
              {" "}
              Category{" "}
            </a>
          </h3>
          <div className="collapse show" id="widget-1">
            <div className="widget-body">
              <div className="filter-items filter-items-count">
                {categories?.map((cate) => {
                  return (
                    <div className="filter-item" key={cate.id}>
                      <Checkbox
                        label={cate?.name || ""}
                        id={cate?.id || index}
                        checked={activeCategory.includes(cate?.id || "")}
                        onChange={(value) =>
                          _onFilterChange(cate?.id, value.target.checked)
                        }
                      />
                      {/* <span className="item-count">3</span> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="widget widget-collapsible">
          <h3 className="widget-title">
            <a
              data-toggle="collapse"
              href="#widget-2"
              role="button"
              aria-expanded="true"
              aria-controls="widget-5"
            >
              {" "}
              Price{" "}
            </a>
          </h3>
          <div className="collapse show" id="widget-2">
            <div className="widget-body">
              <div className="filter-price">
                <div className="filter-price-text">
                  {" "}
                  Price Range: <span id="filter-price-range" />
                </div>
                <div id="price-slider" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ProductFilter;
