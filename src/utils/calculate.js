export const reduceArrNumber = (arr = [], initValue = 0) => {
  return arr.reduce((cur, next) => Number(cur) + Number(next), initValue);
};
