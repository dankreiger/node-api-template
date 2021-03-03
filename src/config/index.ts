import devConfig from './dev';
import testConfig from './testing';
import prodConfig from './prod';

const env = process.env.NODE_ENV || 'development';

interface BaseConfig {
  env: string;
  isDev: boolean;
  isTest: boolean;
  port: number;
  secrets: {
    jwt: string | undefined;
    jwtExp: string;
  };
}

const baseConfig: BaseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d',
  },
};

interface EnvConfig {
  dbUrl: string;
}

let envConfig: EnvConfig = {
  dbUrl: '',
};

switch (env) {
  case 'dev':
  case 'development':
    envConfig = devConfig;
    break;
  case 'test':
  case 'testing':
    envConfig = testConfig;
    break;
  default:
    envConfig = prodConfig;
}

export default { ...baseConfig, ...envConfig };
