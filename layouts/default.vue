<template>
  <div>
    <VApp>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item prepend-icon="mdi-bomb" style="color: #72db67">
            <v-container>
              <p>Skreet <small>(Dashboard)</small></p>
            </v-container>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item class="mt-3" prepend-icon="mdi-spider" title="Scraped Data" value="scraped-data" @click="navigateTo({path: `/`})">
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <VMain>
        <slot/>
      </VMain>
    </VApp>
  </div>
</template>
