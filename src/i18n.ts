import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en_common from "./locales/en/common.json";
import ua_common from "./locales/ua/common.json";

import feature_goals from "./features/Goals/locales";
import feature_credits from "./features/Credits/locales";
import feature_timeline from "./features/Timeline/locales";
import feature_savings from "./features/Savings/locales";

export const resources = {
    en: {
        common: en_common,
        feature_timeline: feature_timeline.en,
        feature_credits: feature_credits.en,
        feature_goals: feature_goals.en,
        feature_savings: feature_savings.en,
    },
    ua: {
        common: ua_common,
        feature_timeline: feature_timeline.ua,
        feature_credits: feature_credits.ua,
        feature_goals: feature_goals.ua,
        feature_savings: feature_savings.ua,
    },
} as const;

export const defaultNS = "common";

i18n.use(initReactI18next).init({
    ns: ["common", "feature_timeline", "feature_credits"],
    fallbackLng: "en",
    debug: true,
    lng: (localStorage.getItem("lang") as string) || "en",
    defaultNS,
    resources,
});

export default i18n;
