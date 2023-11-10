import React, {useEffect, useMemo, useRef} from "react";
import "./styles.css";
import {useAppDispatch, useAppSelector} from "../../hook";
import {addItem, changeItem, deleteItem, getDataSource, updateItem} from "./store";
import {
    Button as GridButton,
    Column,
    DataGrid,
    Editing,
    Item,
    Summary,
    Toolbar,
    TotalItem,
} from "devextreme-react/data-grid";
import {IncomeExpense} from "./IncomeExpense";
import CustomStore from "devextreme/data/custom_store";
import {useWithUID} from "../../hooks/useWithUID";
import {DataGridMobileTitle} from "../../components/DataGridMobileTitle";
import {useTranslation} from "react-i18next";
import {
    CellPreparedEvent,
    ColumnCellTemplateData,
    CustomSummaryInfo,
    EditorPreparingEvent,
} from "devextreme/ui/data_grid";
import {Icon} from "../../components/Icon";
import {useTableToggle} from "../../hooks/useTableToggle";

const onCellPrepared = (e: CellPreparedEvent<IncomeExpense, number>) => {
    if (e.rowType !== "data") {
        return;
    }

    if (e.data.isDisabled) {
        e.cellElement.classList.add("dark:text-gray-700", "text-gray-300");
        return;
    }

    if (
        !e.data.isExpense &&
        e.data.price &&
        (e.column.dataField as keyof IncomeExpense) !== "taxesPercent"
    ) {
        e.cellElement.classList.add("text-green-500");
    }
};

const onEditorPreparing = (e: EditorPreparingEvent<IncomeExpense, number>) => {
    if (e.row?.rowType !== "data") {
        return;
    }

    if ((e.dataField as keyof IncomeExpense) === "taxesPercent" && e.row.data.isExpense) {
        e.cancel = true;
    }
};

const calculateTotals = (options: CustomSummaryInfo & {totals: any}) => {
    const totalName = options.name;
    const start = options.summaryProcess === "start";
    const calc = options.summaryProcess === "calculate";
    const finalize = options.summaryProcess === "finalize";
    const item: IncomeExpense = options.value;

    if (start) {
        options.totalValue = 0;
        options.totals = {
            incomes: 0,
            expenses: 0,
        };
    }

    switch (true) {
        case totalName === "incomes" && calc:
            options.totalValue +=
                item.isDisabled || item.isExpense
                    ? 0
                    : item.price - item.price * (item.taxesPercent || 1);
            break;
        case totalName === "incomes" && finalize:
            break;

        case totalName === "expenses" && calc:
            options.totalValue += item.isDisabled || item.isExpense ? item.price : 0;
            break;
        case totalName === "expenses" && finalize:
            break;
    }
};

export const IncomesExpenses: React.FC = () => {
    const uid = useWithUID();
    const {dataSource} = useAppSelector((state) => state.incomesExpenses);
    const dispatch = useAppDispatch();
    const dataGrid = useRef<DataGrid>(null);
    const {t} = useTranslation();
    const {t: tC} = useTranslation("feature_credits");
    const toggle = useTableToggle<IncomeExpense, IncomeExpense>();

    const customDataSource = useMemo(
        () =>
            new CustomStore<IncomeExpense, number>({
                key: "id",
                loadMode: "raw",
                load: () => {
                    return dataSource;
                },
                insert: async (c) => {
                    await dispatch(addItem({...c, ...uid}));
                    return c;
                },
                update: async (id, values) => {
                    const property = Object.keys(values)[0] as keyof IncomeExpense;
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
            onCellPrepared={onCellPrepared}
            onEditorPreparing={onEditorPreparing}
            ref={dataGrid}
            dataSource={customDataSource}
            rowAlternationEnabled={true}
            showBorders={false}
            showRowLines={true}
            showColumnLines={false}
            height="100%"
            repaintChangesOnly
            noDataText={tC("noDataText")}
            className="incomes"
        >
            <Toolbar>
                <Item location="before">
                    <DataGridMobileTitle>{tC("title")}</DataGridMobileTitle>
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
                allowSorting={false}
                alignment="center"
                calculateSortValue={(e: IncomeExpense) => (e.isDisabled ? 999 : 0)}
                caption=""
                dataField="isDisabled"
                width={30}
                sortOrder="asc"
            />
            <Column
                allowEditing={false}
                allowSorting={false}
                alignment="center"
                calculateSortValue={(e: IncomeExpense) => (e.isExpense ? 1 : 0)}
                caption=""
                cssClass="!px-0 !align-middle"
                dataField="isExpense"
                width={20}
                cellRender={(e: ColumnCellTemplateData<IncomeExpense, IncomeExpense>) =>
                    e.data!.isDisabled ? null : (
                        <Icon
                            onClick={() => toggle(e)}
                            icon={e.data!.isExpense ? "export" : "download"}
                            className={e.data!.isExpense ? "text-red-500" : "text-green-500"}
                        />
                    )
                }
                sortOrder="asc"
            />
            <Column
                dataField="title"
                caption={t("name")}
                dataType="string"
            />
            <Column
                dataField="price"
                caption="USD"
                dataType="number"
                editorOptions={{
                    format: "currency",
                    useMaskBehaviour: true,
                }}
                format="currency"
                alignment="right"
                sortOrder="desc"
                width={90}
            />
            <Column
                allowSorting={false}
                dataField="taxesPercent"
                caption="Tax"
                calculateDisplayValue={(e: IncomeExpense) => (e.isExpense ? "" : e.taxesPercent)}
                dataType="number"
                editorOptions={{
                    format: "percent",
                    useMaskBehaviour: true,
                }}
                format="percent"
                width={50}
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

            {/*@ts-ignore*/}
            <Summary calculateCustomSummary={calculateTotals}>
                <TotalItem
                    name="incomes"
                    summaryType="custom"
                    valueFormat="#,##0"
                    displayFormat="{0}"
                    showInColumn="price"
                    cssClass="text-green-500"
                />
                <TotalItem
                    name="expenses"
                    summaryType="custom"
                    valueFormat="#,##0"
                    displayFormat="{0}"
                    showInColumn="price"
                    cssClass="text-red-500"
                />
            </Summary>
        </DataGrid>
    );
};
