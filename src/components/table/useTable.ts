import { Ref, ref, toRefs } from "vue";
import { type TableProps } from "./types";
import { type colunmItemConfig, DIRECTION } from "./types";

export interface PagingContext {
    data: Ref<any[]>;
    columnList: Ref<colunmItemConfig[]>;
    onSort: (key: string, sortAble: boolean | undefined, direction: DIRECTION) => void;
    pageAble: Ref<boolean>,
    defaultHeight: Ref<number>
}

export function useTable(
    props: TableProps,
): PagingContext {
    const { data, columns, defaultHeight, pageAble } = toRefs(props);
    const columnList = ref<colunmItemConfig[]>(columns.value.map((v) => {
        v.direction = DIRECTION.none
        return v
    }));

    const onSort = (key: string, sortAble: boolean | undefined, direction: DIRECTION) => {
        if (!sortAble) {
            return
        }
        direction = direction ? (direction === DIRECTION.asc ? DIRECTION.desc : DIRECTION.none) : DIRECTION.asc;
        columnList.value.forEach(ele => { ele.direction = ele.key === key ? direction : DIRECTION.none })
    }

    return {
        data,
        columnList,
        defaultHeight,
        pageAble,
        onSort
    }
}