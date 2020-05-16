const manifestJSON = require("./public/manifest.json");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const path = require("path");

module.exports = {
  outputDir: "dist",

  chainWebpack: config => {
    config.resolve.alias.set("@ico", path.resolve(__dirname, "src/assets/icons"));
    config.resolve.alias.set("@img", path.resolve(__dirname, "src/assets/img"));
    config.resolve.alias.set("@com", path.resolve(__dirname, "src/components"));

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();

    svgRule
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .options({ svgo: { plugins: [{ prefixIds: true }] } });
  },

  publicPath: "/kocktail-docs/",

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/app.scss";`,
      },
    },
  },

  configureWebpack: {
    plugins: [
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
          quality: "80-90",
        },
        disable: true || process.env.NODE_ENV !== "production",
      }),
    ],
  },

  pwa: {
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js",
    },
  },

  productionSourceMap: false,
  filenameHashing: false,
};
