import React from "react";
import {Item, TabPanel} from "devextreme-react/tab-panel";
import {Balances} from "../features/Balances/Balances";
import {Timeline} from "../features/Timeline/Timeline";
import {Goals} from "../features/Goals/Goals";
import {Credits} from "../features/Credits/Credits";

export const Mobile = () => {
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
                    title="Timeline"
                    component={Timeline}
                />
                <Item
                    title="Goals"
                    component={Goals}
                />
                <Item
                    title="Expenses"
                    component={Credits}
                />
            </TabPanel>
        </div>
    );
};
