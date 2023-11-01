import React, {useRef, useState} from "react";
import {
    Button as GridButton,
    Column,
    DataGrid,
    Editing,
    Item,
    Toolbar,
} from "devextreme-react/data-grid";
import {DataGridMobileTitle} from "../../components/DataGridMobileTitle";
import {useTranslation} from "react-i18next";

export const Timeline = () => {
    const [state] = useState([]);
    const dataGrid = useRef<DataGrid>(null);
    const {t} = useTranslation();
    const {t: tF} = useTranslation("feature_timeline");

    return (
        <DataGrid
            ref={dataGrid}
            dataSource={state}
            rowAlternationEnabled={true}
            showBorders={false}
            showRowLines={true}
            showColumnLines={false}
            height="100%"
            columnAutoWidth={true}
            repaintChangesOnly
            noDataText={tF("noDataText")}
        >
            <Toolbar>
                <Item location="before">
                    <DataGridMobileTitle>{tF("title")}</DataGridMobileTitle>
                </Item>
                <Item name="addRowButton" />
            </Toolbar>
            <Editing
                mode="cell"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true}
                confirmDelete={true}
                useIcons={true}
            />
            <Column
                dataField="name"
                caption={t("name")}
                dataType="string"
            />
            <Column
                dataField="date"
                caption={t("date")}
                dataType="date"
                format="monthAndDay"
                sortOrder="desc"
                editorOptions={{
                    useMaskBehavior: true,
                }}
            />
            <Column
                dataField="amountUAH"
                caption="UAH"
                dataType="number"
                format="#,##0"
                alignment="right"
                width={90}
            />
            <Column
                caption=""
                type="buttons"
                width={40}
            >
                <GridButton
                    name="delete"
                    cssClass="!text-red-500"
                />
            </Column>
        </DataGrid>
    );
};
