import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";
import {Loader} from "../components/Loader";
import {Header} from "../components/Header";
import {Goals} from "../features/Goals/Goals";
import {Timeline} from "../features/Timeline/Timeline";
import {Total} from "../features/Total/Total";
import {Credits} from "../features/Credits/Credits";
import {Balances} from "../features/Balances/Balances";
import {Item, TabPanel} from "devextreme-react/tab-panel";

export const Layout = () => {
    const [user, loading] = useAuthState(auth);

    return (
        <section className="grid h-full grid-cols-1 grid-rows-[auto_auto_1fr]">
            <Header />
            {loading && <Loader>Loading...</Loader>}

            {user && <Total />}

            {user && (
                <div className="z-10 grid grid-cols-1 grid-rows-[minmax(400px,_1fr)] overflow-y-auto">
                    <TabPanel
                        showNavButtons={true}
                        defaultSelectedIndex={2}
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
            )}
        </section>
    );
};
