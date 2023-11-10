import React, {useEffect, useMemo} from "react";
import {
    Button as GridButton,
    Column,
    DataGrid,
    Editing,
    Item,
    Lookup,
    Toolbar,
} from "devextreme-react/data-grid";
import {DataGridMobileTitle} from "../../components/DataGridMobileTitle";
import {useTranslation} from "react-i18next";
import {useWithUID} from "../../hooks/useWithUID";
import {useAppDispatch, useAppSelector} from "../../hook";
import CustomStore from "devextreme/data/custom_store";
import {addItem, changeItem, deleteItem, getDataSource, updateItem} from "./store";
import {TimelineItem} from "./TimelineItem";
import {InitNewRowEvent} from "devextreme/ui/data_grid";
import {onCustomItemCreating} from "../../@functions/onCustomItemCreated";

const onInitNewRow = (e: InitNewRowEvent<TimelineItem>) => {
    e.data.amount = 0;
    e.data.repeat = 0;
    e.data.date = new Date().getTime();
};

const processDataSource = (data: TimelineItem[]) => {
    return data.map((i) => {
        return i;
    });
};

export const Timeline = () => {
    const {t} = useTranslation();
    const {t: tF} = useTranslation("feature_timeline");
    const uid = useWithUID();
    const {dataSource} = useAppSelector((state) => state.timelines);
    const {dataSource: incomes_expenses} = useAppSelector((state) => state.incomes_expenses);
    const dispatch = useAppDispatch();

    const customDataSource = useMemo(
        () =>
            new CustomStore<TimelineItem, number>({
                key: "id",
                loadMode: "raw",
                load: () => {
                    return processDataSource(dataSource);
                },
                insert: async (values) => {
                    await dispatch(addItem({...values, ...uid}));
                    return values;
                },
                update: async (id, values) => {
                    dispatch(changeItem({...values, id}));
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
            onInitNewRow={onInitNewRow}
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
                mode="popup"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true}
                confirmDelete={true}
                useIcons={true}
            />
            <Column
                caption=""
                dataField="edit"
                type="buttons"
                width={30}
            >
                <GridButton
                    name="edit"
                    cssClass="!text-violet-500"
                />
            </Column>
            <Column
                dataField="title"
                calculateDisplayValue={(i: TimelineItem) => i.title}
                caption={t("name")}
                dataType="string"
                validationRules={[{type: "required"}]}
                editorOptions={{
                    onCustomItemCreating,
                    acceptCustomValue: true,
                }}
            >
                <Lookup
                    dataSource={{
                        store: incomes_expenses,
                        sort: ["title"],
                    }}
                    displayExpr="title"
                    valueExpr="title"
                />
            </Column>
            <Column
                dataField="date"
                caption={t("date")}
                dataType="date"
                format="monthAndDay"
                sortOrder="desc"
                editorOptions={{
                    useMaskBehavior: true,
                }}
                validationRules={[{type: "required"}]}
            />
            <Column
                dataField="amount"
                caption="Amount"
                dataType="number"
                editorOptions={{
                    format: "currency",
                    useMaskBehavior: true,
                }}
                format="currency"
                alignment="right"
                width={100}
            />
            <Column
                dataField="repeat"
                dataType="number"
                visible={false}
            />
            <Column
                caption=""
                type="buttons"
                dataField="delete"
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
