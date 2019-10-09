export default (collection) => {
  const currentMaxId = collection.reduce((currentMax, current) => Math.max(current.id, currentMax), 0);

  return currentMaxId + 1;
};
