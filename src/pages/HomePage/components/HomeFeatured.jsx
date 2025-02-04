import React from "react";
import cn from "@/utils/cn";
import { useEffect, useState } from "react";
import owlCarousels from "@/utils/owlCarousel";
import ProductCard from "@/components/ProductCard";

const TABS = {
  featured: "Featured",
  on_sale: "On Sale",
  top_rated: "Top Rated",
};

const HomeFeatured = ({
  featuredProducts,
  onSaleProducts,
  topRatedProducts,
}) => {
  const [selectedTab, setSelectedTab] = useState(TABS.featured);

  const _onTabChange = (e, tab) => {
    e.preventDefault();
    e.stopPropagation();

    // clear data before owlcarousels run again
    setSelectedTab("");

    setTimeout(() => {
      setSelectedTab(tab);
    }, 200);
  };

  // Handle slider carousel
  useEffect(() => {
    owlCarousels();
  }, [selectedTab, featuredProducts, onSaleProducts, topRatedProducts]);

  const _getSelectedProducts = (tab) => {
    switch (tab) {
      case TABS.featured:
        return featuredProducts;
      case TABS.on_sale:
        return onSaleProducts;
      case TABS.top_rated:
        return topRatedProducts;
      default:
        return [];
    }
  };

  const renderProducts = _getSelectedProducts(selectedTab);

  return (
    <div className="container featured" style={{ height: 550 }}>
      <ul className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3">
        <li className="nav-item">
          <div
            style={{ cursor: "pointer" }}
            className={cn("nav-link", {
              active: selectedTab === TABS.featured,
            })}
            onClick={(e) => _onTabChange(e, TABS.featured)}
          >
            Featured
          </div>
        </li>
        <li className="nav-item">
          <div
            style={{ cursor: "pointer" }}
            className={cn("nav-link", {
              active: selectedTab === TABS.on_sale,
            })}
            onClick={(e) => _onTabChange(e, TABS.on_sale)}
          >
            On Sale
          </div>
        </li>
        <li className="nav-item">
          <div
            style={{ cursor: "pointer" }}
            className={cn("nav-link", {
              active: selectedTab === TABS.top_rated,
            })}
            onClick={(e) => _onTabChange(e, TABS.top_rated)}
          >
            Top Rated
          </div>
        </li>
      </ul>
      <div className="tab-content tab-content-carousel">
        <div
          className={cn("tab-pane p-0 fade", {
            "active show": renderProducts?.length > 0,
          })}
          role="tabpanel"
        >
          {renderProducts?.length > 0 && (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                                      "nav": true, 
                                                      "dots": true,
                                                      "margin": 20,
                                                      "loop": false,
                                                      "responsive": {
                                                          "0": {
                                                              "items":2
                                                          },
                                                          "600": {
                                                              "items":2
                                                          },
                                                          "992": {
                                                              "items":3
                                                          },
                                                          "1200": {
                                                              "items":4
                                                          }
                                                      }
                                                  }'
            >
              {renderProducts.map((product, index) => {
                return (
                  <ProductCard
                    key={product.id || new Date().getTime() + index}
                    product={product}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeFeatured;
