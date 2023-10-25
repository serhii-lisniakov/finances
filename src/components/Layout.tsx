import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";
import {Loader} from "./Loader";
import {Header} from "./Header";
import {Goals} from "../features/Goals/Goals";
import {Timeline} from "../features/Timeline/Timeline";
import {Total} from "../features/Total/Total";
import {Credits} from "../features/Credits/Credits";
import {Balances} from "../features/Info/Balances";
import {Card} from "./Card";
import {Item, TabPanel} from "devextreme-react/tab-panel";

export const Layout = () => {
    const [user, loading] = useAuthState(auth);

    return (
        <section className="grid h-full grid-cols-1 grid-rows-[auto_auto_1fr] gap-2 p-2">
            <Header />
            {loading && <Loader>Loading...</Loader>}
            {user && <Total />}

            {user && (
                <Card className="z-10 grid grid-cols-1 grid-rows-1">
                    <TabPanel
                        showNavButtons={true}
                        defaultSelectedIndex={1}
                    >
                        <Item
                            title="Balances"
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
                            title="Payments"
                            component={Credits}
                        />
                    </TabPanel>
                </Card>
            )}
        </section>
    );
};
