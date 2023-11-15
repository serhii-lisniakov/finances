import React, {useEffect, useMemo} from "react";
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
import {CheckBox} from "devextreme-react/check-box";
import {IncomeExpense} from "./IncomeExpense";
import CustomStore from "devextreme/data/custom_store";
import {useWithUID} from "../../hooks/useWithUID";
import {DataGridMobileTitle} from "../../components/DataGridMobileTitle";
import {useTranslation} from "react-i18next";
import {
    CellPreparedEvent,
    ColumnCellTemplateData,
    CustomSummaryInfo,
    EditingStartEvent,
    EditorPreparingEvent,
    InitNewRowEvent,
} from "devextreme/ui/data_grid";
import {Icon} from "../../components/Icon";
import {useTableToggle} from "../../hooks/useTableToggle";
import {calcTotals} from "./calcTotals";

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
        !["taxesPercent", "date"].includes(e.column.dataField as keyof IncomeExpense)
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

const calculateTotals = (options: CustomSummaryInfo & {dataSource: IncomeExpense[]}) => {
    const totalName = options.name;
    const start = options.summaryProcess === "start";
    const calc = options.summaryProcess === "calculate";
    const finalize = options.summaryProcess === "finalize";
    const item: IncomeExpense = options.value;

    if (start) {
        options.totalValue = 0;
        options.dataSource = [];
    }

    if (calc) {
        options.dataSource.push(item);
    }

    switch (true) {
        case totalName === "incomes" && finalize:
            options.totalValue = calcTotals(options.dataSource).incomes;
            break;

        case totalName === "expenses" && finalize:
            options.totalValue = calcTotals(options.dataSource).expenses;
            break;
    }
};

const onInitNewRow = (e: InitNewRowEvent<IncomeExpense>) => {
    e.data.startDate = new Date().getTime();
    e.data.dayOfMonth = new Date().getDate();
};

const onEditingStart = (e: EditingStartEvent<IncomeExpense, number>) => {
    if (e.data.isExpense) {
        e.component.columnOption("taxesPercent").formItem.visible = false;
    }
};

export const IncomesExpenses: React.FC = () => {
    const uid = useWithUID();
    const {dataSource} = useAppSelector((state) => state.incomes_expenses);
    const dispatch = useAppDispatch();
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
            onCellPrepared={onCellPrepared}
            onEditorPreparing={onEditorPreparing}
            onEditingStart={onEditingStart}
            onInitNewRow={onInitNewRow}
            dataSource={customDataSource}
            rowAlternationEnabled={true}
            showBorders={false}
            showRowLines={true}
            showColumnLines={false}
            height="100%"
            repaintChangesOnly
            noDataText={tC("noDataText")}
            wordWrapEnabled={true}
        >
            <Toolbar>
                <Item location="before">
                    <DataGridMobileTitle>{tC("title")}</DataGridMobileTitle>
                </Item>
                <Item name="addRowButton" />
            </Toolbar>
            <Editing
                mode="form"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true}
                confirmDelete={true}
                useIcons={true}
                texts={{
                    cancelRowChanges: t("actions.cancel"),
                    saveRowChanges: t("actions.save"),
                }}
            />
            <Column
                allowSorting={false}
                calculateSortValue={(e: IncomeExpense) => (e.isDisabled ? 999 : 0)}
                cssClass="!align-top"
                caption=""
                dataField="isDisabled"
                width={30}
                sortOrder="asc"
                cellRender={(e: ColumnCellTemplateData<IncomeExpense, IncomeExpense>) => (
                    <CheckBox
                        onValueChange={() => toggle(e)}
                        value={!e.data!.isDisabled}
                        iconSize={16}
                    />
                )}
                formItem={{
                    visible: false,
                }}
            />
            <Column
                allowEditing={false}
                allowSorting={false}
                alignment="center"
                calculateSortValue={(e: IncomeExpense) => (e.isExpense ? 1 : 0)}
                caption=""
                cssClass="!px-0"
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
                formItem={{
                    visible: false,
                }}
            />
            <Column
                dataField="title"
                caption={t("name")}
                dataType="string"
                validationRules={[{type: "required"}]}
                formItem={{
                    isRequired: true,
                }}
            />
            <Column
                dataField="price"
                caption={t("amount")}
                dataType="number"
                editorOptions={{
                    format: "currency",
                    useMaskBehaviour: true,
                }}
                format="currency"
                alignment="right"
                sortOrder="desc"
                width={120}
            />
            <Column
                allowSorting={false}
                dataField="taxesPercent"
                caption={t("tax")}
                calculateDisplayValue={(e: IncomeExpense) => (e.isExpense ? "" : e.taxesPercent)}
                dataType="number"
                editorOptions={{
                    format: "percent",
                    useMaskBehaviour: true,
                }}
                width={50}
                visible={false}
                formItem={{
                    visible: true,
                }}
            />
            <Column
                caption={t("start")}
                dataField="startDate"
                dataType="date"
                format="MMM dd yyyy"
                editorOptions={{
                    useMaskBehavior: true,
                }}
                visible={false}
            />
            <Column
                caption={tC("repeat")}
                dataField="dayOfMonth"
                dataType="number"
                editorOptions={{
                    min: 1,
                    max: 31,
                    format: `#0 ${tC("dayOfMonth")}`,
                }}
                visible={false}
            />
            <Column
                caption=""
                type="buttons"
                width={54}
            >
                <GridButton
                    name="edit"
                    cssClass="dx-theme-text-color !mx-0"
                />
                <GridButton
                    name="delete"
                    cssClass="!text-red-500 !mx-0"
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
