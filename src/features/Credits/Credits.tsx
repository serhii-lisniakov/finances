import React, {useEffect, useMemo, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../hook";
import {
    addCredit,
    changeCredit,
    getCredits,
    removeCredit,
    updateCredit,
} from "../../store/creditsSlice";
import {
    Button as GridButton,
    Column,
    DataGrid,
    Editing,
    Summary,
    TotalItem,
} from "devextreme-react/data-grid";
import {Credit} from "../../models/Credit";
import CustomStore from "devextreme/data/custom_store";
import {useWithUID} from "../../hooks/useWithUID";

export const Credits: React.FC = () => {
    const uid = useWithUID();
    const {credits} = useAppSelector((state) => state.credits);
    const {price} = useAppSelector((state) => state.currency);
    const dispatch = useAppDispatch();
    const dataGrid = useRef<DataGrid>(null);

    const customDataSource = useMemo(
        () =>
            new CustomStore<Credit, number>({
                key: "id",
                loadMode: "raw",
                load: () => {
                    return credits;
                },
                insert: async (c) => {
                    await dispatch(addCredit({...c, ...uid}));
                    return c;
                },
                update: async (id, values) => {
                    const property = Object.keys(values)[0] as keyof Credit;
                    dispatch(changeCredit({id, value: values[property], property}));
                    await dispatch(updateCredit({id, ...uid}));
                },
                remove: async (id) => {
                    dispatch(removeCredit({id, ...uid}));
                },
            }),
        [credits],
    );

    useEffect(() => {
        dispatch(getCredits(uid.uid));
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
        >
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
                name="amountUAH"
                allowEditing={false}
                calculateCellValue={(g: Credit) => g.price * price || 0}
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

            <Summary>
                <TotalItem
                    summaryType="sum"
                    valueFormat="currency"
                    displayFormat="{0}"
                    column="price"
                />
                <TotalItem
                    summaryType="sum"
                    valueFormat="#,##0"
                    displayFormat="{0}"
                    column="amountUAH"
                />
            </Summary>
        </DataGrid>
    );
};
