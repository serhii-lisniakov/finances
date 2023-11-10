import React, {useState} from "react";
import "./styles.css";
import {Icon} from "../../components/Icon";
import {Totals} from "./Totals";
import {NumberBox} from "devextreme-react/number-box";
import {useAppSelector} from "../../hook";

export const Total = () => {
    const [opened, setOpened] = useState<boolean>(true);
    const {dataSource} = useAppSelector((state) => state.savings);

    const total = dataSource.reduce((acc, i) => (acc += i.amount), 0);

    return (
        <div className="totals grid bg-gradient-to-r from-indigo-600 from-10% via-sky-600 via-30% to-emerald-600 to-90% px-2 py-1">
            <div
                onClick={() => setOpened((prev) => !prev)}
                className="flex cursor-pointer items-center justify-end gap-1 text-3xl font-bold text-[#dedede]"
            >
                <NumberBox
                    format="currency"
                    value={total}
                    label={" "}
                    readOnly
                    className="balance flex-grow"
                />
                <Icon
                    icon={opened ? "spinup" : "spindown"}
                    className="relative top-1"
                />
            </div>
            <div
                className={`overflow-hidden transition-[max-height] duration-200 ${
                    opened ? "h-auto max-h-[500px]" : "h-0 max-h-0"
                }`}
            >
                <Totals />
            </div>
        </div>
    );
};
