const getCircleSize = (value = 1, min = 5, max = 30) => (value + min > max ? max : value + min);

export default getCircleSize;
