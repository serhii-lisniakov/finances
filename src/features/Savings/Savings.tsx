import React, {useEffect, useMemo} from "react";
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
import CustomStore from "devextreme/data/custom_store";
import {addItem, changeItem, deleteItem, getDataSource, updateItem} from "./store";
import {Saving} from "./Saving";
import {useAppDispatch, useAppSelector} from "../../hook";
import {useWithUID} from "../../hooks/useWithUID";

export const Savings = () => {
    const uid = useWithUID();
    const {dataSource} = useAppSelector((state) => state.savings);
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const {t: tF} = useTranslation("feature_savings");

    const customDataSource = useMemo(
        () =>
            new CustomStore<Saving, number>({
                key: "id",
                loadMode: "raw",
                load: () => {
                    return dataSource;
                },
                insert: async (g) => {
                    await dispatch(addItem({...g, ...uid}));
                    return g;
                },
                update: async (id, values) => {
                    const property = Object.keys(values)[0] as keyof Saving;
                    dispatch(changeItem({id, value: values[property], property}));
                    await dispatch(updateItem({id, ...uid}));
                },
                remove: async (id) => {
                    dispatch(deleteItem({id, ...uid}));
                },
            }),
        [dataSource],
    );

    useEffect(() => {
        dispatch(getDataSource(uid.uid));
    }, []);

    return (
        <DataGrid
            dataSource={customDataSource}
            rowAlternationEnabled={true}
            showBorders={false}
            showRowLines={true}
            showColumnLines={false}
            height="100%"
            columnAutoWidth={true}
            repaintChangesOnly
            noDataText={tF("noDataText")}
            wordWrapEnabled={true}
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
                dataField="title"
                caption={t("name")}
                dataType="string"
            />
            <Column
                dataField="amount"
                caption={t("amount")}
                dataType="number"
                editorOptions={{
                    format: "currency",
                    useMaskBehaviour: true,
                }}
                format="currency"
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
