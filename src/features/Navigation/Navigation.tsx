import React, {useMemo, useState} from "react";
import "./Navigation.css";
import {Tabs, Item} from "devextreme-react/tabs";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Icon} from "../../components/Icon";
import i18n from "../../i18n";

export const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const tabs = useMemo(
        () => [
            {index: 0, t: "home", path: "home", icon: "home"},
            {index: 1, t: "settings", path: "settings", icon: "preferences"},
        ],
        [i18n.language],
    );

    return (
        <Tabs
            selectedIndex={selectedIndex}
            scrollingEnabled={false}
            onSelectedItemChange={(e) => {
                if (!e) {
                    return;
                }
                setSelectedIndex(e["data-index"]);
                navigate(e["data-path"]);
            }}
        >
            {tabs.map((tab) => (
                <Item
                    key={tab.path}
                    data-index={tab.index}
                    data-path={tab.path}
                    render={() => (
                        <div
                            className={`grid text-center ${
                                tab.index === selectedIndex ? "text-amber-500" : ""
                            }`}
                        >
                            <Icon
                                icon={tab.icon}
                                className="text-2xl"
                            />
                            <span className="text-[0.75em]">{t(tab.t as any)}</span>
                        </div>
                    )}
                />
            ))}
        </Tabs>
    );
};
