const common = {
  import: ['tsx/esm', 'features/**/*.ts'],
};
export default {
  ...common,
  worldParameters: {
    appUrl: 'https://bringbackourneighbours.de/',
  },
};

export const dev = {
  ...common,
  worldParameters: {
    appUrl: 'http://localhost:4321/',
  },
};
