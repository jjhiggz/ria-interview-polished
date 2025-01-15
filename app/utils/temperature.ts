export const kelvinToFarenheight = (tempK: number) => {
  return ((tempK - 273.15) * 9) / 5 + 32;
};

export const formatTemp = (inputK: number) => {
  return kelvinToFarenheight(inputK).toPrecision(4);
};
