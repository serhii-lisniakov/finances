import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {addGoal, changeGoal, getGoals, removeGoal, updateGoal} from "../../store/goalsSlice";
import {
    CellPreparedEvent,
    ColumnCellTemplateData,
    CustomSummaryInfo,
} from "devextreme/ui/data_grid";
import {Goal} from "../../models/Goal";
import CustomStore from "devextreme/data/custom_store";
import {GoalStatus} from "../../enums/GoalStatus";
import {Icon} from "../../components/Icon";
import {useWithUID} from "../../hooks/useWithUID";
import {
    Column,
    DataGrid,
    Editing,
    Summary,
    TotalItem,
    Toolbar,
    Item,
} from "devextreme-react/data-grid";
import {Button} from "devextreme-react/button";

const StatusConfig = {
    [GoalStatus.Open]: {icon: "add", className: "cell"},
    [GoalStatus.Hot]: {icon: "favorites", className: "!bg-cell-yellow"},
    [GoalStatus.Completed]: {icon: "check", className: "!bg-cell-green"},
};

const onCellPrepared = (e: CellPreparedEvent<Goal, number>) => {
    if (e.rowType !== "data" || !e.data.id) {
        return;
    }

    e.cellElement.classList.add(StatusConfig[e.data.status].className);
};

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
            options.totalValue += goal.status !== 2 ? goal.price : 0;
            break;
        case totalName === "hotTotal" && calc:
            options.totalValue += goal.status === 1 ? goal.price : 0;
            break;
    }
};

export const Goals: React.FC = () => {
    const uid = useWithUID();
    const {goals} = useAppSelector((state) => state.goals);
    const {price} = useAppSelector((state) => state.currency);
    const dispatch = useAppDispatch();
    const dataGrid = useRef<DataGrid>(null);
    const [showCompleted, setShowCompleted] = useState<boolean>(true);

    const customDataSource = useMemo(
        () =>
            new CustomStore<Goal, number>({
                key: "id",
                loadMode: "raw",
                load: () => {
                    return goals;
                },
                insert: async (g) => {
                    await dispatch(addGoal({title: g.title, ...uid}));
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

    const changeStatus = useCallback((e: ColumnCellTemplateData<Goal, Goal>) => {
        e.component.cellValue(
            e.row.rowIndex,
            "status",
            e.data!.status === GoalStatus.Completed ? GoalStatus.Open : e.data!.status + 1,
        );
        e.component.saveEditData();
    }, []);

    return (
        <DataGrid
            onCellPrepared={onCellPrepared}
            ref={dataGrid}
            dataSource={customDataSource}
            rowAlternationEnabled={true}
            showBorders={false}
            height="100%"
            repaintChangesOnly
        >
            <Toolbar>
                <Item location="after">
                    <Button
                        text={`${showCompleted ? "Hide" : "Show"} Completed`}
                        onClick={() => setShowCompleted(!showCompleted)}
                        visible={goals.some((g) => g.status === 2)}
                    />
                </Item>
                <Item name="addRowButton" />
            </Toolbar>
            <Editing
                mode="cell"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true}
                confirmDelete={false}
                useIcons={true}
            />
            <Column
                allowEditing={false}
                allowSorting={false}
                alignment="center"
                calculateSortValue={(e) => (e.status === 1 ? 0 : 1)}
                caption=""
                dataField="status"
                filterValue={showCompleted ? null : 2}
                selectedFilterOperation="<>"
                width={40}
                cellRender={(e: ColumnCellTemplateData<Goal, Goal>) => (
                    <Icon
                        onClick={() => changeStatus(e)}
                        icon={StatusConfig[e.data!.status]?.icon}
                        className="absolute left-2.5 text-[20px]"
                    />
                )}
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
                editorOptions={{format: "currency", useMaskBehaviour: true}}
                format="currency"
                alignment="right"
                width={80}
            />
            <Column
                allowEditing={false}
                calculateCellValue={(g: Goal) => g.price * price || 0}
                dataField="amountUAH"
                caption="UAH"
                format="#,##0"
                alignment="right"
                width={80}
            />
            <Column
                caption=""
                type="buttons"
                width={40}
            ></Column>

            {/*// @ts-ignore*/}
            <Summary calculateCustomSummary={calculateTotals}>
                <TotalItem
                    name="hotTotal"
                    summaryType="custom"
                    valueFormat="currency"
                    displayFormat="★ {0}"
                    showInColumn="price"
                />
                <TotalItem
                    name="total"
                    summaryType="custom"
                    valueFormat="currency"
                    displayFormat="Σ {0}"
                    showInColumn="price"
                />
            </Summary>
        </DataGrid>
    );
};
