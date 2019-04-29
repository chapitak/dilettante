import TerserPlugin from 'terser-webpack-plugin'

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Jeongkyo Kim",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        //rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css'
      }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
      config.node = {

        fs: "empty"
    };
    config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin')
    },
    vendor: ['MultiFilters']
  },
  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "@nuxtjs/vuetify"],
  axios: {
    baseURL: "http://jeongkyo.kim:1337/"
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "auth/local", method: "post", propertyName: "jwt" },
          user: { url: "users/me", method: "get", propertyName: "" },
          logout: false
        }
      },
      google: {
        client_id:
          '131112647070-ctj1d6eq52d99ue5gdjpfrebgqlqcljj.apps.googleusercontent.com',
          userinfo_endpoint: 'users/me',
      }
    }
  },
  node: {
    console: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  vuetify: {
    // Vuetify options
    //  theme: { }
  },
  plugins: [
    { src: '~plugins/MultiFilters.js'}
  ],
  css: [
    '~assets/markdown.css'
  ]
};
