import Button from "@/components/Button";
import { PATHS } from "@/constants/path";
import React from "react";
import { Link } from "react-router-dom";

const HomeIntro = ({ introProducts }) => {
  return (
    <div className="intro-section pt-3 pb-3 mb-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="intro-slider-container slider-container-ratio mb-2 mb-lg-0">
              <div
                className="intro-slider owl-carousel owl-simple owl-dark owl-nav-inside"
                data-toggle="owl"
                data-owl-options='{
                                    "nav": false, 
                                    "dots": true,
                                    "responsive": {
                                    "768": {
                                    "nav": true,
                                    "dots": false
                                      }
                                    }
                                  }'
              >
                <div className="intro-slide">
                  <figure className="slide-image">
                    <img
                      src="/assets/images/demos/demo-3/slider/slide-1.jpg"
                      alt="Image Desc"
                    />
                  </figure>
                  <div className="intro-content">
                    <h3 className="intro-subtitle text-primary">Daily Deals</h3>
                    <h1 className="intro-title">
                      AirPods <br />
                      Earphones
                    </h1>
                    <div className="intro-price">
                      <sup>Today:</sup>
                      <span className="text-primary">
                        $247 <sup>.99</sup>
                      </span>
                    </div>
                    <Button className="btn-round" link={PATHS.PRODUCTS}>
                      <span>Click Here</span>
                      <i className="icon-long-arrow-right" />
                    </Button>
                  </div>
                </div>
                <div className="intro-slide">
                  <figure className="slide-image">
                    <img
                      src="/assets/images/demos/demo-3/slider/slide-2.jpg"
                      alt="Image Desc"
                    />
                  </figure>
                  <div className="intro-content">
                    <h3 className="intro-subtitle text-primary">
                      Deals and Promotions
                    </h3>
                    <h1 className="intro-title">
                      Echo Dot <br />
                      3rd Gen
                    </h1>
                    <div className="intro-price">
                      <sup className="intro-old-price">$49,99</sup>
                      <span className="text-primary">
                        $29 <sup>.99</sup>
                      </span>
                    </div>
                    <Button link={PATHS.PRODUCTS} className="btn-round">
                      <span>Click Here</span>
                      <i className="icon-long-arrow-right" />
                    </Button>
                  </div>
                </div>
              </div>
              <span className="slider-loader" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="intro-banners">
              {introProducts?.map((products, index) => {
                return (
                  <div
                    key={index}
                    className="banner mb-lg-1 mb-xl-2"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Link to={PATHS.PRODUCTS}>
                      <img
                        style={{
                          height: 119,
                          objectFit: "contain",
                          objectPosition: "center right",
                          opacity: 0.7,
                        }}
                        src={products.image || ""}
                        alt={products.name || ""}
                      />
                    </Link>
                    <div className="banner-content">
                      <h3 className="banner-title">
                        <Link to={PATHS.PRODUCTS}>{products.name || ""}</Link>
                      </h3>
                      <Link to={PATHS.PRODUCTS} className="banner-link">
                        Shop Now <i className="icon-long-arrow-right" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeIntro;
