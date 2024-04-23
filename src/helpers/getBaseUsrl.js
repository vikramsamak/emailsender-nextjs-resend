import { DEV_ENV, PROD_ENV } from "./constants";

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === DEV_ENV) return;
  else if (process.env.NODE_ENV === PROD_ENV) {
    return
  }
};
