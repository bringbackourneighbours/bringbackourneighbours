const common = {
  import: ['tsx/esm', 'features/**/*.ts'],
  worldParameters: {
    baseUrl: 'https://bringbackourneighbours.de/',
    useDevServer: false,
  },
};

export default {
  ...common,
};

export const dev = {
  ...common,
  worldParameters: {
    baseUrl: 'http://localhost:4321/',
    useDevServer: true,
  },
};
