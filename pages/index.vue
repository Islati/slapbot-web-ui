<template>
  <v-container fluid style="padding-top:5px">
    <!--  Navbar header for sorting the users profiles  -->
    <v-app-bar id="floatingActionbar" class="pa-3" density="compact">
      <v-row>

        <v-col cols="1">
          <v-btn @click="getPrevPage" prepend-icon="mdi-chevron-left" variant="plain" color="white">Prev
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-text-field class="mt-3" density="compact" v-model="search" prepend-inner-icon="mdi-magnify"
                        label="Search"
                        single-line hide></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field class="mt-3" density="compact" v-model="limit" label="Show" type="number"
                        placeholder="50"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-checkbox-btn v-model="requireSocials"
                          @change="() => performUserRequest()"
                          color="white" label="Socials Linked"></v-checkbox-btn>
          <v-checkbox-btn v-model="requireContact"
                          @change="() => performUserRequest()"
                          color="white" label="Contacted"></v-checkbox-btn>
        </v-col>
        <v-col cols="2">
          <v-select label="Sort Value" class="mt-3" density="compact"
                    :items="Object.values(SortValue).filter(item => item)" v-model="sortValue"></v-select>
        </v-col>
        <v-col cols="1">
          <v-select label="Order" class="mt-3" density="compact" :items="Object.values(SortType)"
                    v-model="sortType"></v-select>
        </v-col>
        <v-col cols="1">
          <v-btn @click="dialog = true;" append-icon="mdi-plus" variant="plain" color="green">New Profile</v-btn>
        </v-col>
        <v-col cols="1">
          <v-btn @click="getNextPage" append-icon="mdi-chevron-right" variant="plain" color="white">Next</v-btn>
        </v-col>

      </v-row>
    </v-app-bar>
    <!-- Content display area for user profiles -->
    <v-row class="mt-5">
      <v-dialog
          v-model="dialog"
          width="60%"
      >
        <v-card>
          <v-container fluid>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field v-model="newProfileUrl" label="Profile URL" placeholder="Youtube, Spotify"></v-text-field>
              </v-col>
            </v-row>

            <v-row align-content="center" justify="space-between" no-gutters>
              <v-col cols="2">
                <v-btn color="success" block @click="createProfile" prepend-icon="mdi-plus">Create</v-btn>
              </v-col>
              <v-col cols="2" offset="4">
                <v-btn color="primary" block @click="dialog = false; newProfileUrl = ''">
                  Close
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>

      <div v-if="store.userData?.length === 0">
        <v-progress-circular indeterminate color="white"></v-progress-circular>
      </div>
      <div v-else>
        <v-col cols="12">
          <v-row>
            <user-profile-card v-for="user in sortedUserProfileData" :key="user.id" :user="user"></user-profile-card>
          </v-row>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-unused-vars
import {useUserStore, UserProfile as UserProfileData} from "~/store";
import UserProfileCard from "~/components/users/UserProfileCard.vue";
import {useToast} from "vue-toast-notification";

enum SortValue {
  SLAPS_FOLLOWERS = "Slaps (Followers)",
  YOUTUBE_SUBSCRIBERS = "YT (Subscribers)",
  MESSAGES = "Msgs",
  JOIN_DATE = "Joined"
}

enum SortType {
  ASCENDING = "ASC",
  DESCENDING = "DESC"
}

/* Local references */
const search = ref("");
const limit = ref(500);
const page = ref(1);
const requireSocials = ref(true);
const requireContact = ref(false);
const allProfiles = ref(false);
const sortValue = ref(SortValue.SLAPS_FOLLOWERS)
const sortType = ref(SortType.DESCENDING)
const requireReply = ref(false);
const newProfileUrl = ref("");

const dialog = ref(false);

/* Application wide references */
const store = useUserStore();

const sortedUserProfileData = computed(() => {
  if (store.userData !== null && store.userData !== undefined)
    switch (sortValue.value) {
        /* Sort by slaps follower count */
      case SortValue.SLAPS_FOLLOWERS:
        return store.userData.sort((a: UserProfileData, b: UserProfileData) => {
          let aSlapsCount: number | undefined = a.slaps?.follower_count;
          let bSlapsCount: number | undefined = b.slaps?.follower_count;

          if (aSlapsCount === undefined) {
            return -1;
          }

          if (bSlapsCount === undefined) {
            return -1;
          }

          if (sortType.value == "ASC") {
            return aSlapsCount - bSlapsCount;
          }

          return bSlapsCount - aSlapsCount;
        });
        /* Sort by messages count (desc) */
      case SortValue.MESSAGES:
        return store.userData.sort((a: UserProfileData, b: UserProfileData) => {
          let aSlapsMessageCount: number | undefined = a.slaps?.messages?.length;
          let bSlapsMessageCount: number | undefined = b.slaps?.messages?.length;

          if (aSlapsMessageCount === undefined || bSlapsMessageCount === undefined || aSlapsMessageCount === bSlapsMessageCount) {
            return 0
          }

          if (sortType.value == "ASC") {
            return aSlapsMessageCount - bSlapsMessageCount;
          } else {
            return bSlapsMessageCount - aSlapsMessageCount;
          }
        })

      default:
        return store.userData
    }
})
const performUserRequest = () => {
  store.fetchPagedUserData(limit.value, page.value, requireSocials.value, allProfiles.value, requireContact.value, requireReply.value);
}

const createProfile = () => {
  const toast = useToast();
  toast.info(`Creating profile for ${newProfileUrl.value}`);
  store.createProfile(newProfileUrl.value);
}

const getNextPage = () => {
  page.value += 1;
  performUserRequest();
}
const getPrevPage = () => {
  if (page.value >= 2) {
    page.value -= 1;
    performUserRequest();
  }
}

onMounted(() => {
  //Perform a request for the data on mount
  performUserRequest();
});

watch(limit, (limit, prevLimit) => {
  //watch the limit variable and perform requests based on it.
  performUserRequest();
})

watch(sortValue, (sortType, prevSortType) => {

})
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#floatingActionbar {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
