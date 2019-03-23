module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "dilettante",
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
    }
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
      }
    }
  },
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  vuetify: {
    // Vuetify options
    //  theme: { }
  }
};
