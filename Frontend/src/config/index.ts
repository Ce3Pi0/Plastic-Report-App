export enum ErrorCodes {
  OK = 200,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  CONFLICT = 409,
  PRECONDITION_FAILED = 412,
  UNPROCESSABLE_CONTENT = 422,
  TOO_MANY_REQUESTS = 429,
}

export const DOMAIN: string = import.meta.env.VITE_DOMAIN;
export const UNSAFE_PASSWORD: number = parseInt(
  import.meta.env.VITE_UNSAFE_PASSWORD,
);
export const MACEDONIA_CENTER = {
  lat: parseFloat(import.meta.env.VITE_MACEDONIA_LAT),
  lng: parseFloat(import.meta.env.VITE_MACEDONIA_LNG),
};
export const DEFAULT_ZOOM = parseFloat(import.meta.env.VITE_DEFAULT_ZOOM);
