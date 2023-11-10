import {CustomItemCreatingEvent} from "devextreme/ui/select_box";

export const onCustomItemCreating = (args: CustomItemCreatingEvent) => {
    if (!args.text) {
        args.customItem = null;
        return;
    }

    const {component, text} = args;
    const currentItems = component.option("items");

    const newItem = {
        title: text.trim(),
    };

    const itemInDataSource = currentItems!.find((item) => item.title === newItem.title);
    if (itemInDataSource) {
        args.customItem = itemInDataSource;
    } else {
        currentItems!.push(newItem);
        component.option("items", currentItems);
        args.customItem = newItem;
    }
};
