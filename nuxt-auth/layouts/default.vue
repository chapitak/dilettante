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
              @click="move(item.value)"
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
        <nuxt-link to="/" tag="div" style="cursor:pointer;"><span class="title ml-3 mr-5">공사중~&nbsp;</span></nuxt-link>
        <v-spacer></v-spacer>
        <div v-if="isAuthenticated">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                flat
                v-on="on"
                class="pa-1"
              >
                안녕! {{ loggedInUser.username }}
              </v-btn>
            </template>
            <v-list>  
              <v-list-tile
                v-for="(menuitem, index) in menuItems"
                :key="index"
                @click="move(menuitem.value)"
              >
                <v-list-tile-title>{{ menuitem.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <!--<nuxt-link class="navbar-item" to="/profile">My Profile</nuxt-link>
          <a class="navbar-item" @click="logout">Logout</a>-->
          
        </div>

        
        <nuxt-link v-else class="navbar-item" to="/sign-in" tag="span" style="cursor:pointer;">Sign In</nuxt-link>
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
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'sync', text: '최신 글 보기', value: '/recent' },
      { icon: 'library_books', text: '독서', value: '/books' },
      { icon: 'movie', text: '영상물', value: '/video' },
      { icon: 'album', text: '음악', value: '/album' },
      { icon: 'wb_incandescent', text: '개발 관련', value: '/dev' },
      { icon: 'border_color', text: '일기', value: '/logbook' }
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
    ],
    menuItems: [
      { title: 'Profile', value: "Profile" },
      { title: 'Sign Out', value: "logout" }
    ]
  }),
  props: {
    source: String
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout();//여기서 async 쓴 것은 navbar에서 즉각 업데이트 해주기 위함인 것처럼 보인다... 
    },
    move(target) {
      if(target == "logout"){
        this.logout()
      }
      else {
        this.$router.replace(target)
      }
    }
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
