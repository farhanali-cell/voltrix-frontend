import axios from "../api/axiosInstance";

export const createCheckoutSession = (couponCode, address) => {
  const payload = { ...address };

  if (couponCode) {
    payload.coupon_code = couponCode;
  }

  return axios.post("/payments/create-checkout-session/", payload);
};

export const applyCoupon = (code) => {
  return axios.post("/coupons/apply/", { code });
};
