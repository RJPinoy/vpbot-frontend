import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faEye, faEyeSlash, faUser, faCog, faHouse } from "@fortawesome/free-solid-svg-icons";

library.add(
    // Eye icons for password visibility toggle
    faEye, faEyeSlash,

    // Cancel icon for modal close or cancel actions
    faXmark,

    // User icon for user-related actions or profiles
    faUser, faHouse,

    // Settings icon for configuration or settings pages
    faCog,
);