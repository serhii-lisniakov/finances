import React from "react";
import {Item, TabPanel} from "devextreme-react/tab-panel";
import {Balances} from "../features/Balances/Balances";
import {Timeline} from "../features/Timeline/Timeline";
import {Goals} from "../features/Goals/Goals";
import {Credits} from "../features/Credits/Credits";
import {useTranslation} from "react-i18next";

export const Mobile = () => {
    const {t} = useTranslation();

    return (
        <div className="grid grid-cols-1 grid-rows-[minmax(400px,_1fr)] overflow-y-auto">
            <TabPanel
                showNavButtons={true}
                defaultSelectedIndex={1}
            >
                <Item
                    title="Summary"
                    component={Balances}
                />
                <Item
                    title={t("title", {ns: "feature_timeline"})}
                    component={Timeline}
                />
                <Item
                    title={t("title", {ns: "feature_goals"})}
                    component={Goals}
                />
                <Item
                    title={t("title", {ns: "feature_credits"})}
                    component={Credits}
                />
            </TabPanel>
        </div>
    );
};
