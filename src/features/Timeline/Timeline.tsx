import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Button as GridButton,
    Column,
    DataGrid,
    Editing,
    GroupItem,
    Item,
    SortByGroupSummaryInfo,
    Summary,
    Toolbar,
} from "devextreme-react/data-grid";
import DateRangeBox from "devextreme-react/date-range-box";
import {DataGridMobileTitle} from "../../components/DataGridMobileTitle";
import {useTranslation} from "react-i18next";
import {useWithUID} from "../../hooks/useWithUID";
import {useAppDispatch, useAppSelector} from "../../hook";
import CustomStore from "devextreme/data/custom_store";
import {addItem, changeItem, deleteItem, getDataSource as getTimelines, updateItem} from "./store";
import {getDataSource as getIncomesExpenses} from "../IncomesExpenses/store";
import {CellPreparedEvent, InitNewRowEvent} from "devextreme/ui/data_grid";
import {addMonths, format, startOfToday} from "date-fns";
import {LocalStorage} from "../../enums/LocalStorage";
import {getMappedTimelines, MappedTimeline} from "./getMappedTimelines";

const defaultRange: [Date, Date] = [startOfToday(), addMonths(startOfToday(), 6)];

const getRange = (): [Date, Date] => {
    const prevInitialRange = localStorage.getItem(LocalStorage.DateRange);
    if (!prevInitialRange) {
        return defaultRange;
    }

    const initialRange: [string, string] = JSON.parse(prevInitialRange);
    return [new Date(initialRange[0]), new Date(initialRange[1])];
};

const onInitNewRow = (e: InitNewRowEvent<MappedTimeline>) => {
    e.data.amount = 0;
    e.data.repeat = 0;
    e.data.date = new Date().getTime();
};

const onCellPrepared = (e: CellPreparedEvent<MappedTimeline, number>) => {
    if (e.rowType !== "data") {
        return;
    }

    if (!e.data.isExpense) {
        e.cellElement.classList.add("text-green-500", "font-bold");
    }
};

export const Timeline = () => {
    const {t} = useTranslation();
    const {t: tF} = useTranslation("feature_timeline");
    const uid = useWithUID();
    const {dataSource} = useAppSelector((state) => state.timelines);
    const {dataSource: incomes_expenses} = useAppSelector((state) => state.incomes_expenses);
    const dispatch = useAppDispatch();
    const [dates, setDates] = useState<[Date, Date]>(getRange());

    const customDataSource = useMemo(
        () =>
            new CustomStore<MappedTimeline, number>({
                key: "id",
                loadMode: "raw",
                load: () => {
                    return getMappedTimelines(dataSource, incomes_expenses);
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
        [dataSource, incomes_expenses],
    );

    useEffect(() => {
        dispatch(getIncomesExpenses(uid.uid));
        dispatch(getTimelines(uid.uid));
    }, []);

    const datePicketChange = useCallback(
        (e: [Date, Date]) => {
            const dates = e.filter(Boolean).length ? e : defaultRange;
            setDates(dates);
            localStorage.setItem(LocalStorage.DateRange, JSON.stringify(dates));
        },
        [setDates],
    );

    return (
        <DataGrid
            onInitNewRow={onInitNewRow}
            onCellPrepared={onCellPrepared}
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
            paging={{
                pageSize: 100,
            }}
        >
            <Toolbar>
                <Item location="before">
                    <DataGridMobileTitle>{tF("title")}</DataGridMobileTitle>
                </Item>
                <Item location="before">
                    <DateRangeBox
                        // @ts-ignore
                        onValueChange={datePicketChange}
                        value={dates}
                        width={290}
                        displayFormat="MMM dd yyyy"
                        className="!mt-0"
                        showClearButton={true}
                    />
                </Item>
                <Item
                    name="addRowButton"
                    locateInMenu="never"
                />
            </Toolbar>
            <Editing
                mode="form"
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
                validationRules={[{type: "required"}]}
            />
            <Column
                dataField="date"
                caption={t("date")}
                dataType="date"
                format="dd MMM"
                filterValue={dates}
                selectedFilterOperation="between"
                sortOrder="asc"
                editorOptions={{
                    displayFormat: "MMM dd yyyy",
                    useMaskBehavior: true,
                }}
                validationRules={[{type: "required"}]}
                showWhenGrouped={true}
                groupIndex={0}
                calculateGroupValue={(row) => format(row.date, "MMMM yyyy")}
                groupCellRender={(data) => data.data.key}
                width={90}
                formItem={{
                    label: {text: t("start")},
                }}
            />
            <Column
                dataField="amount"
                caption={t("amount")}
                dataType="number"
                editorOptions={{
                    format: "currency",
                    useMaskBehavior: true,
                }}
                format="currency"
                alignment="right"
            />
            <Column
                dataField="repeat"
                dataType="number"
                visible={false}
            />
            <Column
                caption=""
                type="buttons"
                width={60}
                alignment="right"
            >
                <GridButton
                    visible={({row}) => row.data.id}
                    name="edit"
                    cssClass="dx-theme-text-color !mx-0"
                />
                <GridButton
                    name="delete"
                    cssClass="!text-red-500 !mx-0"
                />
            </Column>

            <Summary>
                <GroupItem
                    column="groupDateSort"
                    showInGroupFooter={false}
                    summaryType="min"
                />
            </Summary>
            <Column
                dataType="date"
                allowExporting={false}
                calculateCellValue={(row) => row.date}
                name="groupDateSort"
                showInColumnChooser={false}
                visible={false}
                formItem={{
                    visible: false,
                }}
                sortOrder="asc"
            />
            <SortByGroupSummaryInfo summaryItem="groupDateSort" />
        </DataGrid>
    );
};
