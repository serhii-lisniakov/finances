import React from "react";
import "./Totals.css";
import {Form, SimpleItem} from "devextreme-react/form";
import {NumberBox} from "devextreme-react/number-box";
import {useTranslation} from "react-i18next";

export const Totals: React.FC = () => {
    const {t} = useTranslation();

    return (
        <div className="p-2">
            <Form
                showColonAfterLabel={false}
                scrollingEnabled={true}
                labelMode="floating"
                className=""
            >
                <SimpleItem>
                    <div className="flex gap-1">
                        <NumberBox
                            format="currency"
                            className="flex-grow"
                            value={0}
                            label={`${t("total_one")} ${t("income")}`}
                            readOnly
                        />
                        <NumberBox
                            format="currency"
                            className="flex-grow"
                            value={0}
                            label={`${t("total", {count: 2})} ${t("expenses")}`}
                            readOnly
                        />
                    </div>
                </SimpleItem>
                <SimpleItem>
                    <div className="flex gap-1">
                        <NumberBox
                            format="currency"
                            className="flex-grow"
                            value={0}
                            label={`${t("total", {count: 2})} ${t("savings")}`}
                            readOnly
                        />
                        <NumberBox
                            format="currency"
                            className="flex-grow"
                            value={0}
                            label={`${t("accumulate")}/${t("month").toLowerCase()}`}
                            readOnly
                        />
                    </div>
                </SimpleItem>
            </Form>
        </div>
    );
};
