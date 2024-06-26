import React, {useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {addItem, changeItem, deleteItem, getDataSource, updateItem} from "./store";
import {ColumnCellTemplateData, CustomSummaryInfo} from "devextreme/ui/data_grid";
import {Goal} from "./Goal";
import CustomStore from "devextreme/data/custom_store";
import {Icon} from "../../components/Icon";
import {useWithUID} from "../../hooks/useWithUID";
import {
    Button as GridButton,
    Column,
    DataGrid,
    Editing,
    Item,
    Paging,
    Summary,
    Toolbar,
    TotalItem,
} from "devextreme-react/data-grid";
import {Button} from "devextreme-react/button";
import {DataGridMobileTitle} from "../../components/DataGridMobileTitle";
import {useTranslation} from "react-i18next";
import {useTableToggle} from "../../hooks/useTableToggle";

const calculateTotals = (options: CustomSummaryInfo & {totals: any}) => {
    const totalName = options.name;
    const start = options.summaryProcess === "start";
    const calc = options.summaryProcess === "calculate";
    const finalize = options.summaryProcess === "finalize";
    const goal: Goal = options.value;

    if (start) {
        options.totalValue = 0;
        options.totals = {
            hotTotal: 0,
        };
    }

    switch (true) {
        case totalName === "total" && calc:
            options.totalValue += goal.isCompleted ? 0 : goal.price;
            break;
        case totalName === "hotTotal" && calc:
            options.totalValue += goal.isFavourite ? goal.price : 0;
            break;
    }
};

export const Goals: React.FC = () => {
    const uid = useWithUID();
    const {dataSource} = useAppSelector((state) => state.goals);
    const dispatch = useAppDispatch();
    const [showCompleted, setShowCompleted] = useState<boolean>(false);
    const {t} = useTranslation();
    const {t: tF} = useTranslation("feature_credits");
    const toggle = useTableToggle<Goal, Goal>();

    const customDataSource = useMemo(
        () =>
            new CustomStore<Goal, number>({
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
                    const property = Object.keys(values)[0] as keyof Goal;
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
            repaintChangesOnly
            columnAutoWidth={true}
            wordWrapEnabled={true}
            noDataText={tF("noDataText")}
        >
            <Toolbar>
                <Item location="before">
                    <DataGridMobileTitle>{tF("title")}</DataGridMobileTitle>
                </Item>
                <Item location="after">
                    <Button
                        text={`${showCompleted ? "Hide" : "Show"} Completed`}
                        onClick={() => setShowCompleted(!showCompleted)}
                        visible={dataSource.some((g) => g.isCompleted)}
                    />
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
            <Paging defaultPageSize={100} />

            <Column
                allowSorting={false}
                alignment="center"
                calculateSortValue={(e: Goal) => (e.isCompleted ? 999 : 0)}
                caption=""
                dataField="isCompleted"
                filterValue={showCompleted ? null : false}
                width={30}
                sortOrder="asc"
            />
            <Column
                allowEditing={false}
                allowSorting={false}
                alignment="center"
                calculateSortValue={(e: Goal) => (e.isFavourite ? 0 : 1)}
                caption=""
                cssClass="!px-0 !align-middle"
                dataField="isFavourite"
                width={20}
                cellRender={(e: ColumnCellTemplateData<Goal, Goal>) =>
                    e.data!.isCompleted ? null : (
                        <Icon
                            onClick={() => toggle(e)}
                            icon="favorites"
                            className={e.data!.isFavourite ? "text-amber-500" : "text-violet-300"}
                        />
                    )
                }
                sortOrder="asc"
            />
            <Column
                dataField="title"
                caption={t("name")}
                dataType="string"
                sortOrder="asc"
            />
            <Column
                dataField="price"
                caption={t("price")}
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

            {/*// @ts-ignore*/}
            <Summary calculateCustomSummary={calculateTotals}>
                <TotalItem
                    name="hotTotal"
                    summaryType="custom"
                    valueFormat="currency"
                    displayFormat="★{0}"
                    showInColumn="price"
                />
                <TotalItem
                    name="total"
                    summaryType="custom"
                    valueFormat="currency"
                    displayFormat="Σ{0}"
                    showInColumn="price"
                />
            </Summary>
        </DataGrid>
    );
};
