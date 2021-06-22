module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    disableHostCheck: true,
    port: 8080,
    public: 'http://localhost:8080',
  },
};
