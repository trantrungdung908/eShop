const PRODUCTS_PATH = "/products";
const PROFILE_PATH = "/profile";
const PROFILE_ORDER = "/profile/order";
const PROFILE_ADDRESS = "/profile/address";
const PROFILE_WISHLIST = "/profile/wishlist";
const PROFILE_CHANGEPASS = "/profile/changepass";

const BLOG_PATH = "/blog";

const NOTFOUND_PATH = "*";
export const PATHS = {
  HOME: "/",
  PRODUCTS: PRODUCTS_PATH,
  PRODUCT_DETAIL: PRODUCTS_PATH + "/:slug",
  CART: "/cart",
  CHECKOUT: "/checkout",
  CHECKOUT_SUCCESS: "/checkout_success",
  DASHBOARD: "/dashboard",
  FAQ: "/FAQ",
  PAYMENT_METHOD: "/payment_method",
  PRIVACY: "/privacy",
  RETURN: "/return",
  SHIPPING: "/shipping",
  PROFILE: {
    INDEX: PROFILE_PATH,
    PROFILE_ORDER: PROFILE_ORDER,
    PROFILE_WISHLIST: PROFILE_WISHLIST,
    PROFILE_ADDRESS: PROFILE_ADDRESS,
    PROFILE_CHANGEPASS: PROFILE_CHANGEPASS,
  },
  BLOG: BLOG_PATH,
  BLOG_DETAIL: BLOG_PATH + "/:slug",
  CONTACT: "contact",
  ABOUT: "/about",
  NOTFOUND: NOTFOUND_PATH,
};
