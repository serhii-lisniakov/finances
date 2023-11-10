import {ColumnCellTemplateData} from "devextreme/ui/data_grid";

export const useTableToggle = <TRowData, TKey>(): ((
    e: ColumnCellTemplateData<TRowData, TKey>,
) => void) => {
    return (e: ColumnCellTemplateData<TRowData, TKey>) => {
        e.component.cellValue(e.row.rowIndex, e.column.dataField!, !e.value);
        e.component.saveEditData();
    };
};
