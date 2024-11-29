import { useEffect } from "react";
import HomeBenefits from "./components/HomeBenefits";
import HomeBrand from "./components/HomeBrand";
import HomeDeals from "./components/HomeDeals";
import HomeFeatured from "./components/HomeFeatured";
import HomeFeaturedProducts from "./components/HomeFeaturedProducts";
import HomeIntro from "./components/HomeIntro";
import HomeSocial from "./components/HomeSocial";
import useHomePage from "./useHomePage";

const HomePage = () => {
  const { homeProps } = useHomePage();
  useEffect(() => {
    function owlCarousels($wrap, options) {
      if ($.fn.owlCarousel) {
        var owlSettings = {
          items: 1,
          loop: true,
          margin: 0,
          responsiveClass: true,
          nav: true,
          navText: [
            '<i class="icon-angle-left">',
            '<i class="icon-angle-right">',
          ],
          dots: true,
          smartSpeed: 400,
          autoplay: false,
          autoplayTimeout: 15000,
        };
        if (typeof $wrap == "undefined") {
          $wrap = $("body");
        }
        if (options) {
          owlSettings = $.extend({}, owlSettings, options);
        }

        // Init all carousel
        $wrap.find('[data-toggle="owl"]').each(function () {
          var $this = $(this),
            newOwlSettings = $.extend(
              {},
              owlSettings,
              $this.data("owl-options")
            );

          $this.owlCarousel(newOwlSettings);
        });
      }
    }
    owlCarousels();
  }, []);

  return (
    <div>
      <main className="main">
        <HomeIntro {...homeProps} />

        <HomeFeatured />

        <div className="mb-7 mb-lg-11" />

        <HomeDeals />

        <HomeBrand {...homeProps} />
        <div className="container">
          <hr className="mt-3 mb-6" />
        </div>
        <div className="container">
          <hr className="mt-5 mb-6" />
        </div>
        <HomeFeaturedProducts />
        <div className="container">
          <hr className="mt-5 mb-0" />
        </div>
        <HomeBenefits />
        <HomeSocial />
      </main>
    </div>
  );
};

export default HomePage;
