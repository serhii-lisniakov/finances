import React, {useRef, useState} from "react";
import {
    DataGrid,
    Column,
    Editing,
    Button as GridButton,
    Item,
    Toolbar,
} from "devextreme-react/data-grid";
import {DataGridMobileTitle} from "../../components/DataGridMobileTitle";

export const Timeline = () => {
    const [state, setState] = useState([]);
    const dataGrid = useRef<DataGrid>(null);

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
            noDataText="Start adding expenses rignt now..."
        >
            <Toolbar>
                <Item location="before">
                    <DataGridMobileTitle>Timeline</DataGridMobileTitle>
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
                caption="Name"
                dataType="string"
            />
            <Column
                dataField="date"
                caption="Date"
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
