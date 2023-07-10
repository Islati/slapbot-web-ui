import {defineStore} from 'pinia';
import $ from 'jquery';
import Config from '~/config';

export interface SlapsDirectMessage {
    user_id: number,
    username: string,
    profile_pic_url?: string,
    user?: SlapsProfile,
    message: string,
    message_id: string,
    timestamp: Date,
    received: boolean
}

export interface SlapsComment {
    title?: string,
    user_id: number,
    username: string,
    profile_pic_url?: string,
    user?: SlapsProfile,
    comment: string,
    timestamp: Date,
    song_id?: number
}

export interface Location {
    id: number,
    name: string
}

export interface Tag {
    id: number,
    tag: string,
}

export interface SlapsUpload {
    id: number,
    user_id: number,
    track_url: string,
    track_title: string,
    artwork_url?: string,
    tags?: Tag[],
}

export interface SlapsProfile {
    id: number,
    profile_url?: string,
    username: string,
    message_url?: string,
    following_on_slaps: boolean,
    twitter_url?: string,
    instagram_url?: string,
    youtube_url?: string,
    facebook_url?: string,
    messages: SlapsDirectMessage[],
    comments: SlapsComment[],
    description?: string,
    deep_scraped: boolean,
    deep_scrape_completion_timestamp?: Date,
    profile_image_url?: string,
    recently_posted?: boolean,
    joined_date?: string,
    play_count?: number,
    follower_count?: number,

    location_id?: number,
    location?: Location,
    uploads?: SlapsUpload[],
}

export interface YoutubeVideoComment {
    url: string,
    message: string,
    timestamp: Date,
    liked: boolean,
    subscribed: boolean
}

export interface YoutubeChannel {
    url: string,
    name: string,
    subscribed: boolean,
    subscribe_date: Date,
    comments: YoutubeVideoComment[],
}

export interface UserSocials {
    youtube?: string,
    facebook?: string,
    spotify?: string,
    instagram?: string,
    twitter?: string
}

export interface UserProfile {
    id: number,
    username: string,
    description: string,
    messages?: any[]
    comments?: any[],
    social_count: number,
    socials: UserSocials,
    profile_image_url?: string,
    has_messaged: boolean,
    slaps?: SlapsProfile,
    youtube?: YoutubeChannel,

    //todo implement interfaces for these to be typed all through.
    facebook?: any,
    spotify?: any,
    instagram?: any,
    twitter?: any
}

/**
 * Used in rendering a social icon on the GUI for the user.
 */
export interface UserSocialIcon {
    url: string,
    icon: string,
    color: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: [] as UserProfile[],
        minimum_followers_count: 1 as number,
    }),
    getters: {},
    actions: {
        async fetchPagedUserData(limit: number, page: number, requireSocials = false, all = false, contacted = false, replied = false) {
            const timestamp = new Date().getTime();

            let self = this;

            $.ajax({
                url: `${Config.API_BASE_URL}/api/profiles?per_page=${limit}&page=${page}&require_socials=${requireSocials}&contacted=${contacted}&replied=${replied}&all=${all}`,
                method: 'GET',
                crossDomain: true,
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    self.userData = data['profiles']
                    console.log(`Finished fetching paged user data in ${new Date().getTime() - timestamp}ms w/ ${self.userData?.length} users.`)
                }
            })
            console.log(`Start fetching user data...`)
        }
    }
});