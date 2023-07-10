<template>
    <v-row no-gutters>
        <v-col cols="2">
            <v-img :width="80" cover :src="upload.artwork_url"></v-img>
        </v-col>
        <v-col class="ml-2" cols="9">
            <v-row>
                <v-col cols="12">
                    <NuxtLink class="song-player-track-link" :to="upload.track_url">
                        <h4 class="text-blue">{{ upload.track_title }}</h4>
                    </NuxtLink>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <audio controls>
                        <source :src="upload.media_url" type="audio/mpeg">
                    </audio>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import {VueSound} from "vue-sound";

export default {
    name: "SongPlayer",
    props: {
        upload: Object
    },
    components: {
        VueSound
    },
    mounted() {

    }
}
</script>

<style scoped>
a:link, a:visited, a {
    text-decoration: none;

}

</style>