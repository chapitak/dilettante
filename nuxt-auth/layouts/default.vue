// layouts/default.vue

<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        fixed
        clipped
        class="grey lighten-4"
        app
        v-model="drawer"
      >
        <v-list
          dense
          class="grey lighten-4"
        >
          <template v-for="(item, i) in items">
            <v-layout
              row
              v-if="item.heading"
              align-center
              :key="i"
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn small flat>edit</v-btn>
              </v-flex>
            </v-layout>
            <v-divider
              dark
              v-else-if="item.divider"
              class="my-3"
              :key="i"
            ></v-divider>
            <v-list-tile
              :key="i"
              v-else
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="amber" app absolute clipped-left dense>
        <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">Dilettante&nbsp;</span>
        <v-spacer></v-spacer>
        <nuxt-link class="navbar-item" to="/SignIn">Sign In</nuxt-link>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height class="grey lighten-4">
          <v-layout justify-center align-center>
            <v-flex shrink>
              <nuxt/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>

export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'lightbulb_outline', text: 'Notes' }
      /*{ icon: 'touch_app', text: 'Reminders' },
      { divider: true },
      { heading: 'Labels' },
      { icon: 'add', text: 'Create new label' },
      { divider: true },
      { icon: 'archive', text: 'Archive' },
      { icon: 'delete', text: 'Trash' },
      { divider: true },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Trash' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'keyboard', text: 'Keyboard shortcuts' }*/
    ]
  }),
  props: {
    source: String
  }
}
</script>

<style>
#keep main .container {
  height: 660px;
}

.navigation-drawer__border {
  display: none;
}

.text {
  font-weight: 400;
}
</style>
