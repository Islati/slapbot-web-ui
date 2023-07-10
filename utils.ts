import {ICON_COLORS} from "~/styles";
import {UserProfile, UserSocialIcon} from "~/store";


export function getSocialIconColor(icon: string): string {
    return ICON_COLORS[icon] === undefined ? "grey" : ICON_COLORS[icon];
}

/**
 * Retrieve an array of renderable objects defining a user social profile.
 * @param user
 */
export const getUserSocials = (user: UserProfile): UserSocialIcon[] => {
    if (user === null) {
        return [];
    }

    let socials: any[] = [];
    for (let social of Object.values(user.socials)) {
        if (social === null) {
            // console.log(`User ${this.user.username} has a null social at index ${i}`)
            continue;
        }

        if (socials.includes(social)) {
            // console.log(`User ${this.user.username} has a duplicate social at index ${i}`)
            continue;
        }

        const social_icon = getSocialIcon(social);
        socials.push({url: social, icon: social_icon, color: getSocialIconColor(social_icon)});
    }


    return socials;
}

/**
 * Retrieve a social media icon based on text inputted.
 * @param social
 */
export const getSocialIcon = (social: string): string => {

    if (social === null) {
        return "mdi-link";
    }

    if (social.includes("twitter")) {
        return "mdi-twitter";
    } else if (social.includes("instagram")) {
        return "mdi-instagram";
    } else if (social.includes("youtube")) {
        return "mdi-youtube";
    } else if (social.includes("spotify")) {
        return "mdi-spotify";
    } else if (social.includes("slaps")) {
        return "mdi-plug";
    } else {
        return "mdi-link";
    }
}