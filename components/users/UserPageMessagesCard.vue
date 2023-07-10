<template>
    <v-card class="mx-auto">
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
            <v-tab value="conversation"><small>Conversation ({{user.messages.length}})</small></v-tab>
            <v-tab value="comments"><small>Comments ({{user.comments.length}})</small></v-tab>
        </v-tabs>
        <v-card-text>
            <v-container fluid class="ma-1">
                <v-row>
                    <v-window v-model="tab">
                        <v-window-item key="conversation" value="conversation">
                            <v-list lines="two">
                                <v-list-item v-for="message in user.messages"
                                             :subtitle="message.timestamp">
                                    <p>{{message.message}}</p>
                                </v-list-item>
                            </v-list>
                        </v-window-item>
                        <v-window-item key="comments" value="comments">
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
    name: "UserPageMessagesCard",
    props: {
        user: Object
    },
    data: () => ({
        tab: null
    }),
    beforeMount() {
        if (this.user !== null) {
            if (this.user.comments.length > 0) {
                this.tab = "comments";
            } else if (this.user.messages.length > 0) {
                this.tab = "conversation"
            }
        }
    },
    mounted() {
        console.log(`User Comments:`)
        console.log(JSON.parse(JSON.stringify(this.user.comments)))
    },
    computed: {
        userProfileUrl() {
            return `/users/${this.user.id}`
        }
    }
}

</script>

<style scoped>

</style>