import React from "react";
import {Total} from "../features/Total/Total";
import {useMediaQuery} from "../hooks/useMediaQuery";
import {Timeline} from "../features/Timeline/Timeline";
import {Goals} from "../features/Goals/Goals";
import {Credits} from "../features/Credits/Credits";
import {useTranslation} from "react-i18next";
import {Item, TabPanel} from "devextreme-react/tab-panel";
import {Savings} from "../features/Savings/Savings";

export const Desktop: React.FC = () => {
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-y-auto p-2">
            <div className="dx-card shadow-lg">
                <Savings />
            </div>
            <div className="dx-card shadow-lg">
                <Timeline />
            </div>
            <div className="dx-card shadow-lg">
                <Goals />
            </div>
            <div className="dx-card shadow-lg">
                <Credits />
            </div>
        </div>
    );
};

export const Mobile: React.FC = () => {
    const {t} = useTranslation();

    return (
        <div className="grid grid-cols-1 grid-rows-[minmax(400px,_1fr)] overflow-y-auto">
            <TabPanel
                showNavButtons={true}
                defaultSelectedIndex={1}
                scrollingEnabled={false}
            >
                <Item
                    title={t("title", {ns: "feature_savings"})}
                    component={Savings}
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

export const Home: React.FC = () => {
    const mobile = useMediaQuery("lg");

    const className = mobile ? "grid-rows-[auto_1fr_auto]" : "grid-rows-[auto_auto_1fr]";

    return (
        <section className={"grid grid-cols-1 " + className}>
            <Total />
            {!mobile && <Desktop />}
            {mobile && <Mobile />}
        </section>
    );
};