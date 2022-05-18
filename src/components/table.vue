<template>
    <div class="table">
        <table class="table_header" border="1" cellspacing="0" cellpadding="0">
            <tr class="table_header__row">
                <td v-for="item in columnList" :key="item.key" @click="_sortBy(item.key, item.sort)"
                    class="table_header__item" :title="item.title">
                    {{ item.title }}
                    <span v-if="item.sort" class="table_header__item_up"
                        :class="`table_header__item_up--${item.direction === 1 ? 'active' : ''}`"></span>
                    <span v-if="item.sort" class="table_header__item_down"
                        :class="`table_header__item_down--${item.direction === 2 ? 'active' : ''}`"></span>
                </td>
            </tr>
        </table>
        <div :style="tableStyle" class="table_body__contaniner">
            <table class="table_body" border="1" cellspacing="0" cellpadding="0">
                <tr v-for="(item, index) in curTableData" :key="index" class="table_body__row">
                    <td v-for="(ele, idx) in defaultSlots" class="table_body__item" :title="item[ele]">
                        <slot :record="item" :name="ele" :key="idx">
                        </slot>
                    </td>
                </tr>
            </table>
        </div>
        
    </div>
    <Pagination v-if="pagination" :total="tableLength" @step-change="_stepChange" />
</template>

<script setup lang="ts">
import { computed, ref, toRefs, useSlots } from 'vue';
import Pagination from '@components/pagination/index.vue';
import type { StepItem } from './pagination/types'
import { sortByKey } from '../utils/common'
import type { colunmItemConfig } from "./types";
const slots = useSlots()
const props = withDefaults(defineProps<{
    data: any[],
    columns: colunmItemConfig[],
    defaultHeight?: number,
    pagination?: boolean,
}>(), {
    data: () => [],
    columns: () => [],
    defaultHeight: 200,
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

const defaultSlots = computed(() => {
    return Object.keys(slots) || []
})

const curTableData = computed(() => {
    const { start, end } = stepRange.value
    let filterData = pagination.value ? _filterByStep(data.value, start, end) : data.value;
    columnList.value.forEach(item => {
        if (item.sort && item.direction) {
            sortByKey(filterData, item.key, item.direction)
        }
    })
    return filterData
})

const tableLength = computed(() => {
    return data.value.length
})

const stepRange = ref({ start: 0, end: 10 })

const _stepChange = (step: StepItem) => {
    stepRange.value = step
}

const _sortBy = (key: string, sortAble: boolean | undefined) => {
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
        height: `${defaultHeight.value}px`
    }
})

const _filterByStep = (data: any[], start: number, end: number) => {
    let filterData = data.filter((item, index) => {
        return (index >= start && index < end)
    })
    return filterData
}

</script>
<style lang="less" scoped>
.table {

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

            &:last-of-type {
                border-bottom: none;
            }
        }

        &__item {
            min-width: 80px;
        }

        &__contaniner {
            overflow-y: scroll;
            border-bottom: 1px solid;
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