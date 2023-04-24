/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // copied from a github issue - the code below supposedly fixes a bug that causes
  // the react navigation's default header's menu icon to not be displayed
  // server: {
  //   ...defaultConfig.server,
  //   enhanceMiddleware: (middleware) => {
  //     return (req, res, next) => {
  //       // When an asset is imported outside the project root, it has wrong path on Android
  //       // So we fix the path to correct one
  //       if (/\/packages\/.+\.png\?.+$/.test(req.url)) {
  //         req.url = `/assets/../${req.url}`;
  //       }
  //
  //       return middleware(req, res, next);
  //     };
  //   },
  // },
};
