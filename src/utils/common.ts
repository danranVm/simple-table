export function sortByKey(data: any[], key: string, type: number) {
    // 奇数升序，偶数降序
    if(type&1){
        return data.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
            return a[key] - b[key]
        })
    } else {
        return data.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
            return b[key] - a[key]
        })
    }
}
