import React from "react";
import {Balances} from "../features/Balances/Balances";
import {Timeline} from "../features/Timeline/Timeline";
import {Goals} from "../features/Goals/Goals";
import {Credits} from "../features/Credits/Credits";

export const Desktop = () => {
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2 overflow-y-auto p-2">
            <div className="dx-card shadow-lg">
                <Balances />
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
