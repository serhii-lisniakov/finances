export interface PutEntity<T> {
    id: number;
    value: any;
    property: keyof T;
}
