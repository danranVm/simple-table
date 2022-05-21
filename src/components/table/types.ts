import Table from "./table.vue";
import { PropType, ExtractPropTypes } from 'vue'

export type MyTable = typeof Table;

export enum DIRECTION {
    desc = 'DESC',
    asc = 'ASC',
    none = ''
}

export const tableProps = {
    data: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
    columns: {
        type: Array as PropType<colunmItemConfig[]>,
        default: () => []
    },
    defaultHeight: {
        type: Number as PropType<number>,
        require: false,
        default: 200
    },
    pageAble: {
        type: Boolean as PropType<boolean>,
        require: false,
        default: true
    },
}

export interface colunmItemConfig {
    title: string;
    key: string;
    // 是否开启排序
    sort?: boolean;
    // 排序类型 0: 原， 1: 升， 2: 降
    direction: DIRECTION;
}

export type TableProps = ExtractPropTypes<typeof tableProps>