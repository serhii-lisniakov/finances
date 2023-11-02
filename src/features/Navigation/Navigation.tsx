import React, {useMemo} from "react";
import {Tabs} from "devextreme-react/tabs";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Navigation = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const tabs = useMemo(
        () => [
            {
                id: 0,
                path: "home",
                text: t("home"),
                icon: "home",
            },
            {
                id: 1,
                path: "settings",
                text: t("settings"),
                icon: "preferences",
            },
        ],
        [],
    );

    return (
        <Tabs
            dataSource={tabs}
            defaultSelectedIndex={0}
            scrollingEnabled={false}
            onSelectedItemChange={(e) => {
                if (!e) {
                    return;
                }
                navigate(e.path);
            }}
            width="100%"
        />
    );
};
