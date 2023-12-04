module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
