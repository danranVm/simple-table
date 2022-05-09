<template>
    <div class="table" :style="tableStyle">
        <table class="table_header" border="1" cellspacing="0" cellpadding="0">
            <tr class="table_header__row">
                <td v-for="(item, index) in columnList" :key="item.key" @click="_sortBy(item.key, item.sort)"
                    class="table_header__item" :title="item.title">
                    {{ item.title }}
                    <span v-if="item.sort" class="table_header__item_up"
                        :class="`table_header__item_up--${item.direction === 1 ? 'active' : ''}`"></span>
                    <span v-if="item.sort" class="table_header__item_down"
                        :class="`table_header__item_down--${item.direction === 2 ? 'active' : ''}`"></span>
                </td>
            </tr>
        </table>
        <table class="table_body" border="1" cellspacing="0" cellpadding="0">
            <tr v-for="(item, index) in curTableData" :key="index" class="table_body__row">
                <td v-for="(ele, idx) in keyList" class="table_body__item" :title="item[ele]">
                    <slot :content="item" :name="ele" :key="idx">
                    </slot>
                </td>
            </tr>
        </table>
    </div>
    <div class="pagination" v-if="pagination">
        共{{ totalNum }}条记录
        每页{{ perPage }} 条
        <span @click="_prevPage" class="pagination__btn"
            :class="`pagination__btn--${isFirstOrDisabled ? '' : 'active'}`">
            上一页
        </span>
        <span @click="_nextPage" class="pagination__btn"
            :class="`pagination__btn--${isLastOrDisabled ? '' : 'active'}`">
            下一页
        </span>
        前往第
        <input type="text" class="pagination__input" :class="`pagination__input--${isValid ? '' : 'error'}`"
            :value="curIndex" @input="_setValue($event)" /> 页
    </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import { sortByKey } from '../utils/common'
import { type colunmItemConfig } from "./types";

const props = withDefaults(defineProps<{
    data: any[],
    columns: colunmItemConfig[],
    defaultHeight?: number,
    pagination?: boolean,
}>(), {
    data: () => [],
    columns: () => [],
    defaultHeight: 235,
    pagination: true
})

const {
    data,
    columns,
    defaultHeight,
    pagination
} = toRefs(props)

const columnList = ref<colunmItemConfig[]>(columns.value.map((v) => {
    v.direction = 0
    return v
}))

const keyList = computed(() => {
    const filterKeys = columns.value.map((v) => {
        return v.key
    })
    return filterKeys
})

const curTableData = computed(() => {
    const { start, end } = stepRange.value
    let filterData = pagination ? _filterByStep(data.value, start, end) : data.value;
    columnList.value.forEach(item => {
        if (item.sort && item.direction) {
            sortByKey(filterData, item.key, item.direction)
        }
    })
    // 这里可以对filterData做其他筛选功能
    return filterData
})

const _sortBy = (key: string, sortAble: boolean) => {
    if (!sortAble) {
        return
    }
    let direction = columnList.value.filter(item => {
        return item.key === key
    })[0].direction
    direction = direction === 2 ? 0 : ++direction
    
    // 排序一列，把其他列的direction重置
    columnList.value.forEach(ele => {
        ele.direction = ele.key === key ? direction : 0
    })
}

const tableStyle = computed(() => {
    return {
        height: `${defaultHeight}px`
    }
})

const curIndex = ref(1)
const perPage = ref(10)
const isValid = ref(true)
const totalNum = computed(() => {
    return data.value.length
})

const isFirstOrDisabled = computed(() => {
    // input输入的value是字符型,所以用 ==
    return !isValid.value || curIndex.value == 1
})

const isLastOrDisabled = computed(() => {
    return !isValid.value || curIndex.value == endPage.value
})

const endPage = computed(() => {
    return Math.ceil(totalNum.value / perPage.value)
})

const stepRange = computed(() => {
    // 非法输入就重置回第一页
    let start = isValid.value ? (curIndex.value - 1) * perPage.value : 0;
    let end = start + perPage.value
    return {
        start,
        end
    }
})

const _prevPage = () => {
    if (isFirstOrDisabled.value) {
        return
    }
    curIndex.value--
}

const _nextPage = () => {
    if (isLastOrDisabled.value) {
        return
    }
    curIndex.value++
}

const _filterByStep = (data: any[], start: number, end: number) => {
    let filterData = data.filter((item, index) => {
        return (index >= start && index < end)
    })
    return filterData
}

const _setValue = (e: any) => {
    let numReg = /^[0-9]*$/
    let inputNum = e.target.value
    curIndex.value = inputNum
    if (numReg.test(String(Math.abs(parseFloat(inputNum))))) {
        if (inputNum < 1) {
            e.target.title = '该输入项的最小值是1'
            isValid.value = false
        } else if (inputNum > endPage.value) {
            e.target.title = `该输入项的最大值是${endPage.value}`
            isValid.value = false
        } else {
            isValid.value = true
            e.target.title = inputNum
        }
    } else {
        isValid.value = false
        e.target.title = '该输入项不是一个有效的数字'
    }
}

// 源数据变化，重置页码回第一页。
watch(data, () => {
    curIndex.value = 1
})
</script>
<style lang="less" scoped>
.table {
    min-height: 235px;

    &_header {
        width: 100%;

        &__row {
            font-weight: bold;
            background: #d9ecff;
            border-bottom: none;
        }

        &__item {
            position: relative;
            min-width: 80px;

            &_up {
                position: absolute;
                cursor: pointer;
                border: 4px solid transparent;
                border-bottom-color: white;
                top: 1px;
                right: 4px;

                &--active {
                    border-bottom-color: black;
                }
            }

            &_down {
                position: absolute;
                cursor: pointer;
                border: 4px solid transparent;
                bottom: 1px;
                right: 4px;
                border-top-color: white;

                &--active {
                    border-top-color: black;
                }
            }
        }
    }

    &_body {
        width: 100%;

        &__row {
            &:first-of-type {
                border-top: none;
            }

            &:nth-of-type(2n) {
                background-color: #d9ecff;
            }
        }

        &__item {
            min-width: 80px;
        }
    }

}

.pagination {
    text-align: end;

    &__input {
        width: 20px;
        text-align: center;
        margin: 0 5px;

        &--error:focus-visible {
            outline: none;
            border: 2px solid red;
            color: red;
        }
    }

    &__btn {
        color: gray;

        &--active {
            cursor: pointer;
            color: black;
        }
    }
}
</style>