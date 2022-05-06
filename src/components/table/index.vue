<template>
    <table class="table_header" border="1" cellspacing="0" cellpadding="0">
        <tr class="table_header__row">
            <td v-for="(item, index) in columnList" :key="item.key" @click="sortBy(index, item.key)"
                class="table_header__item" :title="item.title">
                {{ item.title }}
                <span class="table_header__item_up"
                    :class="`table_header__item_up--${item.sortType === 1 ? 'active' : ''}`"></span>
                <span class="table_header__item_down"
                    :class="`table_header__item_down--${item.sortType === 2 ? 'active' : ''}`"></span>
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
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { sortByKey } from '../../utils/common'
/**
* @file
*/

const props = withDefaults(defineProps<{
    data: any[],
    columns: any[]
}>(), {
    data: () => [],
    columns: () => []
})

const originData = [...props.data]
let tempData = reactive(props.data)

const keyList = computed(() => {
    const filterKeys = props.columns.length && props.columns.map((v) => {
        return v.key
    })
    return filterKeys
})

const columnList = reactive([...props.columns.map((v) => {
    v.sortType = 0
    // 0: 原， 1: 升， 2: 降
    return v
})])

const isDefaultDirection = computed(() => {
    return !!columnList.reduce((pre, cur) => {
        return pre * cur.sortType
    }, 1)
})

const curTableData = computed(() => {
    let dataList = isDefaultDirection.value ? originData : tempData;
    const filterData = dataList.length && dataList.filter((item) => {
        return item
    })
    return filterData
})

const sortBy = (index: number, key: string) => {
    let type = columnList[index].sortType;
    type = type === 2 ? 0 : ++type
    columnList.forEach((item, idx) => {
        if (idx === index) {
            item.sortType = type
        } else {
            item.sortType = 0
        }
    })
    tempData = type ? sortByKey(tempData, key, type) : [...originData]
}

</script>
<style lang="less" scoped>
.table {
    &_header {
        &__row {
            font-weight: bold;
            background: lightgray;
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
        &__item {
            min-width: 80px;
        }
    }
}
</style>