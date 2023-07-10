<template>
    <v-app-bar v-if="user === null">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
        <h2>Loading...</h2>
    </v-app-bar>
    <v-app-bar id="floatingActionbar" class="pa-4 mb-2" density="compact" v-else>
        <v-row>
            <v-col cols="1">
                <v-btn to="/" nuxt class="mt-3" variant="plain" color="gray">
                    <v-icon>mdi-chevron-left</v-icon>
                    Homepage
                </v-btn>
            </v-col>
            <v-col cols="3">
                <v-row>
                    <v-col cols="2">
                        <v-avatar class="ml-1 mt-2" size="48px" rounded="1">
                            <v-img :src="user.profile_image_url"
                                   v-if="user.profile_image_url !== null"></v-img>
                            <v-icon v-else icon="mdi-account-circle" color="gray" size="48"></v-icon>
                        </v-avatar>
                    </v-col>
                    <v-col class="mt-4">
                        <NuxtLink :to="user.slaps.profile_url"
                                  class="font-weight-thin text-h2 text-overline ml-2 text-center"
                                  style="text-decoration: none;">

                            {{ user.username }}
                        </NuxtLink>
                    </v-col>
                </v-row>


            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="2">
                <v-btn v-for="social in socials" :key="social.url" variant="plain" :href="social.url"
                       :icon="social.icon"
                       :color="social.color" class="mt-3"></v-btn>
            </v-col>
        </v-row>
        <template v-slot:append>
            <v-chip color="cyan" label v-if="this.user.slaps.follower_count > 0">
                {{ this.user.slaps.follower_count }} Followers (Slaps)
            </v-chip>
        </template>
    </v-app-bar>
</template>

<script>
import {getUserSocials} from "~/utils";

export default {
    name: "UserPagesAppBar",
    props: {
        user: Object
    },
    computed: {
        socials() {
            if (this.user === null || this.user === undefined) {
                return []
            }

            return getUserSocials(this.user)
        }
    }
}
</script>

<style scoped>

</style>