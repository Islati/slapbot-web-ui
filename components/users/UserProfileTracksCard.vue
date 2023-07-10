<template>
    <v-card class="mx-auto">
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
            <v-tab value="slaps"><small>Slaps ({{ user.slaps?.uploads.length || 0 }})</small></v-tab>
            <v-tab value="spotify"><small>Spotify ({{ user.spotify?.tracks.length || 0 }})</small></v-tab>
        </v-tabs>
        <v-card-text>
            <v-container fluid class="ma-1">
                <v-row>
                    <v-window v-model="tab">
                        <v-window-item key="slaps" value="slaps">
                            <song-player v-for="track in user.slaps?.uploads" :upload="track" class="mb-1"/>
                        </v-window-item>
                        <v-window-item key="spotify" value="spotify">
                            <v-list lines="two">
                                <v-list-item v-for="comment in user.comments" :subtitle="comment.timestamp">
                                    <template v-slot:prepend>
                                        <v-btn :to="'/users/' + comment.user_id" nuxt variant="plain" icon>
                                            <v-icon>mdi-account-circle-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <p>{{ comment.comment }}</p>
                                </v-list-item>
                            </v-list>
                        </v-window-item>
                    </v-window>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>

</template>

<script>
export default {
    name: "UserProfileTracksCard",
    props: {
        user: Object
    },
    data: () => ({
        tab: null
    }),
    computed: {}
}
</script>

<style scoped>

</style>