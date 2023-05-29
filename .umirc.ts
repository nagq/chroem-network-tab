import { defineConfig } from 'umi';

export default defineConfig({
  outputPath: './chrome-network-tab',
  nodeModulesTransform: {
    type: 'none',
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  dynamicImport: {},
  ignoreMomentLocale: true,
  devServer: {
    writeToDisk: true,
  },
  chainWebpack(memo, { env }) {
    memo.devServer.hot = false as any;
    memo.plugins.delete('hmr');
    memo
      .entry('background')
      .add('./src/pages/background/index.js')
      .end()
      .entry('popup')
      .add('./src/pages/popup/index.js')
      .end()
      .entry('devtool')
      .add('./src/pages/devtool/index.js')
      .end();
  },
  history: {
    type: 'hash',
  },
  fastRefresh: {},
  mfsu: {},
  webpack5: {},
});
