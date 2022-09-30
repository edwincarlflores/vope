export const urlQueryParamToString = (
  urlQueryParam: string | string[] | undefined
) => {
  return !urlQueryParam || typeof urlQueryParam !== "string"
    ? ""
    : urlQueryParam;
};
