import Table from "./table.vue";
// import 

export type MyTable = typeof Table

export const tableProps = {
    data: [],
    columns: [],
    defaultHeight: 235,
    pagination: true,
}

export interface colunmItemConfig {
    title: string;
    key: string;
    // 是否开启排序
    sort? : boolean;
    // 排序类型 0: 原， 1: 升， 2: 降
    direction: number;
}