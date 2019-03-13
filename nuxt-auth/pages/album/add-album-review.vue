<template>
  <section class="section">
    <div class="container">
      <h1 class="title">add Index</h1>
      <div>
        
    <v-container>
      <v-layout row wrap>
        <v-flex
        xs12
        class="pa-2">
          <v-text-field
            label="Url"
          ></v-text-field>
         </v-flex>
        <v-flex
          xs12
          md4
          class="pa-2"
        >
          <v-text-field
            v-model="firstname"
            label="First name"
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
          class="pa-2"
        >
          <v-text-field
            v-model="lastname"
            label="Last name"
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
          class="pa-2"
        >
          <v-text-field
            v-model="email"
            label="E-mail"
          ></v-text-field>
        </v-flex>
        <v-flex
          xs12
          md4
          class="pa-2"
        >
          <v-text-field
            v-model="firstname"
            label="First name"
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
          class="pa-2"
        >
          <v-text-field
            v-model="lastname"
            label="Last name"
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
          class="pa-2"
        >
          <v-text-field
            v-model="email"
            label="E-mail"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
      </div>
    </div>
  </section>
</template>