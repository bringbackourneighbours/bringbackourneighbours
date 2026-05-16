const common = {
  import: ['tsx/esm', 'features/**/*.ts'],
  worldParameters: {
    baseUrl: 'http://localhost:4321/',
    useDevServer: false,
    headless: false,
  },
};

export default {
  ...common,
};

export const prod = {
  ...common,
  worldParameters: {
    baseUrl: 'https://bringbackourneighbours.de/',
    useDevServer: false,
    headless: true,
  },
};

export const dev = {
  ...common,
  worldParameters: {
    useDevServer: true,
    headless: true,
  },
};
