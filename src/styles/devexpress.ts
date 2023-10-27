import {createGlobalStyle} from "styled-components";

export const DevexpressStyles = createGlobalStyle`
  .dx-datagrid-total-footer > .dx-datagrid-content {
    padding: 0;
  }

  .dx-datagrid-header-panel .dx-toolbar {
    margin: 0.25em 0;
    padding: 0 0.5em;
  }

  .dx-datagrid-content .dx-datagrid-table .dx-row .dx-command-select {
    padding: 0;
    width: 40px;
    min-width: 40px;
    max-width: 40px;
  }
`;
