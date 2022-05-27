import { Ref, ref, toRefs } from "vue";
import { type TableProps } from "./types";
import { type colunmItemConfig, DIRECTION } from "./types";

export interface PagingContext {
    data: Ref<any[]>;
    columnList: Ref<colunmItemConfig[]>;
    onSort: (key: string, sortAble: boolean | undefined, direction: DIRECTION) => void;
    pageAble: Ref<boolean>,
    defaultHeight: Ref<number>,
    sortByKey: (data: any[], key: string, type: DIRECTION) => any[]
}

export function useTable(
    props: TableProps,
): PagingContext {
    const { data, columns, defaultHeight, pageAble } = toRefs(props);
    const columnList = ref<colunmItemConfig[]>(columns.value.map((v) => {
        v.direction = DIRECTION.none
        return v
    }));
    
    // 点击切换排序规则
    const onSort = (key: string, sortAble: boolean | undefined, direction: DIRECTION) => {
        if (!sortAble) {
            return
        }
        direction = direction ? (direction === DIRECTION.asc ? DIRECTION.desc : DIRECTION.none) : DIRECTION.asc;
        columnList.value.forEach(ele => { ele.direction = ele.key === key ? direction : DIRECTION.none })
    }

    // 根据columns里的key，对表格数据进行排序
    const sortByKey = (data: any[], key: string, type: DIRECTION) => {
        if (type === DIRECTION.none) {
            return data;
        }
        if (type === DIRECTION.asc) {
            return data.slice().sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
                // sort内的排序函数：字符串不能直接运算
                return a[key] === b[key] ? 0 : (a[key] > b[key] ? 1 : -1)
            })
        } else {
            return data.slice().sort((a: { [x: string]: any }, b: { [x: string]: any }) => {
                return a[key] === b[key] ? 0 : (a[key] > b[key] ? -1 : 1)
            })
        }
    }

    return {
        data,
        columnList,
        defaultHeight,
        pageAble,
        onSort,
        sortByKey
    }
}