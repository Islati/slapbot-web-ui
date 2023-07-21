<template>
  <v-col cols="4">
    <v-card class="mx-auto pa-1" variant="elevated">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="2">
              <v-avatar size="48px" rounded="1" @click="() => $router.push({'path':`/users/${this.user.id}`})">
                <v-img :src="this.user.profile_image_url"
                       v-if="this.user.profile_image_url !== null"></v-img>
                <v-icon v-else icon="mdi-account-circle" color="gray" size="36"></v-icon>
              </v-avatar>
            </v-col>

            <v-col cols="7" class="mt-2">
              <v-row class="mt-1 ml-0">
                <a :href="this.user.slaps.profile_url" target="_blank"
                   class="font-weight-bold text-h2 text-overline">
                  {{ this.user.username }}
                </a>
              </v-row>

              <v-row>
                <v-col v-for="social in this.socials" :key="social.url" cols="1">
                  <v-btn variant="plain" :href="social.url" :icon="social.icon"
                         :color="social.color"></v-btn>
                </v-col>
              </v-row>

            </v-col>

            <v-col offset="0.5" cols="2" class="mt-2">
              <v-row>
                <v-col cols="6">
                  <v-badge :color="messageBadgeColor" :content="messageCount"
                           @click="() => $router.push({'path':`/users/${this.user.id}`})">
                    <v-tooltip activator="parent" location="left">
                      Messages Sent
                    </v-tooltip>
                    <v-icon>mdi-email</v-icon>
                  </v-badge>
                </v-col>
                <v-col cols="6">

                  <v-badge :color="commentBadgeColor" :content="commentCount"
                           @click="() => $router.push({'path':`/users/${this.user.id}`})">
                    <v-tooltip activator="parent" location="bottom">
                      Comments the bot has posted on this users profile
                    </v-tooltip>
                    <v-icon>mdi-mail</v-icon>
                  </v-badge>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-text>
            <p class="ml-1">{{ this.description !== null ? this.description.substring(0, 100) : "" }}</p>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-chip color="cyan" label v-if="this.user.slaps.follower_count > 0">
            {{ this.user.slaps.follower_count }} Followers (Slaps)
          </v-chip>
          <v-chip class="ml-2" color="white" label @click="navigateTo({path: `/users/${this.user.id}`})">
            Show More
            <v-icon>mdi-chevron-right</v-icon>
          </v-chip>

          <!--          <v-chip color="yellow" label v-if="this.user.slaps.tracks.length > 0">-->
          <!--            {{ this.user.slaps.tracks.length }} Tracks (Slaps)-->
          <!--          </v-chip>-->

          <!--          <v-chip color="green" label v-if="this.user.slaps.play_count > 0">-->
          <!--            {{ this.user.slaps.play_count }} Plays (Slaps)-->
          <!--          </v-chip>-->
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script lang="js">
import {getUserSocials} from "~/utils";

export default {
  name: "UserProfileCard",
  props: {
    user: Object
  },
  computed: {
    socials() {
      return getUserSocials(this.user);
    },
    messageCount() {
      try {
        return this.user.messages.length;
      } catch (e) {
        return 0;
      }
    },
    commentCount() {
      try {
        return this.user.comments.length;
      } catch (e) {
        return 0;
      }
    },
    messageBadgeColor() {
      try {
        return this.user.messages.length > 0 ? "success" : "light-grey";
      } catch (e) {
        return "light-grey";
      }
    },
    commentBadgeColor() {
      try {
        return this.user.comments.length > 0 ? "info" : "light-grey";
      } catch (e) {
        return "light-grey";
      }
    },

    description() {
      try {
        return this.user.description.trim();
      } catch (e) {
        return ""
      }
    }
  },
}
</script>

<style scoped>
.user-profile {

}

a:link, a:visited {
  text-decoration: none;
}

</style>