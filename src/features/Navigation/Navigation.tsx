import React, {useMemo, useState} from "react";
import "./Navigation.css";
import {Tabs, Item} from "devextreme-react/tabs";
import {useNavigate} from "react-router-dom";
import {Icon} from "../../components/Icon";
import i18n from "../../i18n";

export const Navigation: React.FC = () => {
    const navigate = useNavigate();
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
            className="nav dx-theme-border-color border-t-2"
        >
            {tabs.map((tab) => (
                <Item
                    key={tab.path}
                    data-index={tab.index}
                    data-path={tab.path}
                    render={() => (
                        <div className={`grid text-center`}>
                            <Icon
                                icon={tab.icon}
                                className="text-2xl"
                            />
                        </div>
                    )}
                />
            ))}
        </Tabs>
    );
};
