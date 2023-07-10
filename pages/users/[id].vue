<template>
    <v-container fluid style="padding-top: 5px">
        <!-- Shown when the users data is not available // is loading.-->
        <UserPageAppBar :user="user"></UserPageAppBar>
        <v-row style="margin-top: 1.6%;" v-if="user !== null">
            <v-col cols="3">
                <users-user-page-messages-card :user="user"></users-user-page-messages-card>
            </v-col>
            <v-col cols="4">
                <user-profile-tracks-card :user="user"></user-profile-tracks-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import $ from 'jquery';

import Config from '~/config';
import {getUserSocials} from "~/utils";
import UserPageAppBar from "~/components/users/UserPageAppBar.vue";
import UserProfileTracksCard from "~/components/users/UserProfileTracksCard.vue";

const route = useRoute();
const userId = route.params.id;
const user = ref(null);
const error = ref(false);

onBeforeMount(() => {
    $.ajax({
        url: `${Config.API_BASE_URL}/api/profile/${userId}`,
        method: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log(`Found this for user:`, data);
            user.value = data;
        },
        statusCode: {
            404: function () {
                console.error(`${userId} was not found in the database.`)
            }
        }
    })
})

const {data, pending, refresh} = useAsyncData(() => {
    return $fetch(`${Config.API_BASE_URL}/api/profile/${userId}`)
}, {watch: [user]});


</script>

<style scoped>
a:link, a:visited {
    text-decoration: none;
}
</style>