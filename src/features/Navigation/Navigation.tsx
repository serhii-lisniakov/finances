import React, {useState} from "react";
import {Tabs, Item} from "devextreme-react/tabs";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    return (
        <Tabs
            selectedIndex={selectedIndex}
            scrollingEnabled={false}
            onSelectedItemChange={(e) => {
                if (!e) {
                    return;
                }
                setSelectedIndex(e["data-id"]);
                navigate(e["data-path"]);
            }}
            width="100%"
        >
            <Item
                text={t("home")}
                icon="home"
                data-id={0}
                data-path="home"
            />
            <Item
                text={t("settings")}
                icon="preferences"
                data-id={1}
                data-path="settings"
            />
        </Tabs>
    );
};
