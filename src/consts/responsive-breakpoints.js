const BREAKPOINTS = {
  mobile: 479,
  tablet: 767,
  desktop: 960,
  large: 1280,
  xlarge: 1600,
}; export default BREAKPOINTS;

// use this for help: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
// export const currentSize = (w) => {
//   const keys = Object.keys(BREAKPOINTS);
//   const sizes = keys.map((key) => {
//     const currentValue = BREAKPOINTS[key];
//     return [currentValue, key];
//   });
//   sizes.sort((a, b) => a[0] - b[0]);
//   sizes.reduce((minSizeKey, currentValue) => {
//     if currentValue
//   });
// };
//
// Test and integrate later
// export const isMobile = w => w <= BREAKPOINTS.mobile;
// export const isTablet = (w) => {
// };
