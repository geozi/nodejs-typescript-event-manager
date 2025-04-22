export const PHONE_NUMBER_REGEX = new RegExp(/^\d{10}$/);

export const CITY_REGEX = new RegExp(/^[A-Za-z\s]+$/);

export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
);
