// // eslint-disable-next-line no-undef
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };
// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
};
export default config;
