import React, {useEffect, useMemo, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {addGoal, changeGoal, getGoals, removeGoal, updateGoal} from "../../store/goalsSlice";
import {ColumnCellTemplateData, CustomSummaryInfo} from "devextreme/ui/data_grid";
import {Goal} from "../../models/Goal";
import CustomStore from "devextreme/data/custom_store";
import {Icon} from "../../components/Icon";
import {useWithUID} from "../../hooks/useWithUID";
import {
    Button as GridButton,
    Column,
    DataGrid,
    Editing,
    Item,
    Summary,
    Toolbar,
    TotalItem,
    Paging,
} from "devextreme-react/data-grid";
import {Button} from "devextreme-react/button";

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

const changeStatus = (e: ColumnCellTemplateData<Goal, Goal>) => {
    e.component.cellValue(e.row.rowIndex, e.column.dataField!, !e.value);
    e.component.saveEditData();
};

export const Goals: React.FC = () => {
    const uid = useWithUID();
    const {goals} = useAppSelector((state) => state.goals);
    const {price} = useAppSelector((state) => state.currency);
    const dispatch = useAppDispatch();
    const dataGrid = useRef<DataGrid>(null);
    const [showCompleted, setShowCompleted] = useState<boolean>(false);

    const customDataSource = useMemo(
        () =>
            new CustomStore<Goal, number>({
                key: "id",
                loadMode: "raw",
                load: () => {
                    return goals;
                },
                insert: async (g) => {
                    await dispatch(addGoal({...g, ...uid}));
                    return g;
                },
                update: async (id, values) => {
                    const property = Object.keys(values)[0] as keyof Goal;
                    dispatch(changeGoal({id, value: values[property], property}));
                    await dispatch(updateGoal({id, ...uid}));
                },
                remove: async (id) => {
                    dispatch(removeGoal({id, ...uid}));
                },
            }),
        [goals],
    );

    useEffect(() => {
        dispatch(getGoals(uid.uid));
    }, []);

    return (
        <DataGrid
            ref={dataGrid}
            dataSource={customDataSource}
            rowAlternationEnabled={true}
            showBorders={false}
            showRowLines={true}
            showColumnLines={false}
            height="100%"
            repaintChangesOnly
            columnAutoWidth={true}
            wordWrapEnabled={true}
            noDataText="You have no goals. Add it right know."
        >
            <Toolbar>
                <Item location="after">
                    <Button
                        text={`${showCompleted ? "Hide" : "Show"} Completed`}
                        onClick={() => setShowCompleted(!showCompleted)}
                        visible={goals.some((g) => g.isCompleted)}
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
                            onClick={() => changeStatus(e)}
                            icon="favorites"
                            className={e.data!.isFavourite ? "text-amber-500" : "text-violet-300"}
                        />
                    )
                }
                sortOrder="asc"
            />
            <Column
                dataField="title"
                caption="Name"
                dataType="string"
                sortOrder="asc"
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
                width={90}
            />
            <Column
                allowEditing={false}
                calculateCellValue={(g: Goal) => g.price * price || 0}
                dataField="amountUAH"
                caption="UAH"
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
