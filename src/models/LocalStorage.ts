import {LocalStorage as LocalStorageEnum} from "../enums/LocalStorage";

export interface LocalStorage {
    [LocalStorageEnum.Theme]: string;
}
