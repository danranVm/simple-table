import { DIRECTION } from '../components/table/types';
// import { Ref } from 'vue'

export function sortByKey(data: any[], key: string, type: DIRECTION) {

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
