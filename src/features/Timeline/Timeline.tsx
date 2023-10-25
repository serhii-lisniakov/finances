import React, {useRef, useState} from "react";
import DataGrid, {Column, Editing} from "devextreme-react/data-grid";

export const Timeline = () => {
    const [state, setState] = useState([]);
    const dataGrid = useRef<DataGrid>(null);

    return (
        <DataGrid
            ref={dataGrid}
            dataSource={state}
            rowAlternationEnabled={true}
            showBorders={false}
            height="100%"
            columnAutoWidth={true}
            repaintChangesOnly
        >
            <Editing
                mode="cell"
                allowUpdating={true}
                allowAdding={true}
                allowDeleting={true}
                confirmDelete={false}
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
            ></Column>
        </DataGrid>
    );
};
