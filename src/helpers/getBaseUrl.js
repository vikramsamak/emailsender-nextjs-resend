import { DEV_ENV, DEV_URL, PROD_ENV, PROD_URL } from "./constants";

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === DEV_ENV) return DEV_URL;
  else if (process.env.NODE_ENV === PROD_ENV) {
    return PROD_URL;
  }
};
