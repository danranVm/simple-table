import { type colunmItemConfig, DIRECTION } from "./types";

export interface PagingContext {
    onSort: (columns: colunmItemConfig[], key: string, sortAble: boolean | undefined, direction: DIRECTION) => void;
    sortByKey: (data: any[], key: string, type: DIRECTION) => any[]
}

export function useTable(): PagingContext {

    // 点击切换排序规则
    const onSort = (columns: colunmItemConfig[], key: string, sortAble: boolean | undefined, direction: DIRECTION) => {
        if (!sortAble) {
            return;
        }
        direction = direction ? (direction === DIRECTION.asc ? DIRECTION.desc : DIRECTION.none) : DIRECTION.asc;
        columns.forEach(ele => { ele.direction = ele.key === key ? direction : DIRECTION.none })
    }

    // 根据columns里的key，对表格数据进行排序
    const sortByKey = (data: any[], key: string, type: DIRECTION) => {
        if (!Array.isArray(data)) {
            window.console.warn('传入data格式非法')
        }
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
        onSort,
        sortByKey
    }
}