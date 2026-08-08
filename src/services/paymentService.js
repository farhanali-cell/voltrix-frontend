import axios from "../api/axiosInstance";

export const createCheckoutSession = (couponCode) => {
  return axios.post(
    "/payments/create-checkout-session/",
    couponCode ? { coupon_code: couponCode } : {},
  );
};

export const applyCoupon = (code) => {
  return axios.post("/coupons/apply/", { code });
};
