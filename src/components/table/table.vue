<template>
    <table class="table_header" border="1" cellspacing="0" cellpadding="0">
        <tr class="table_header__row">
            <td v-for="item in columns" :key="item.key" @click="sortBy(item.key)" class="table_header__item"
                :title="item.title">
                {{ item.title }}
            </td>
        </tr>
    </table>
    <table class="table_body" border="1" cellspacing="0" cellpadding="0">
        <tr v-for="(item, index) in curTableData" :key="index" class="table_body__row">
            <td v-for="(ele, idx) in columnList" class="table_body__item" :title="item[ele]">
                <slot :content="item" :name="ele" :key="idx">
                </slot>
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { sortByKey } from '../../utils/common'
/**
* @file
*/
let type = function () {
    let count = 0;
    function calc() {
        count = count === 2 ? 0 : ++count;
        return count
    }
    return calc
};
const props = withDefaults(defineProps<{
    data: any[],
    columns: any[]
}>(), {
    data: () => [],
    columns: () => []
})

let orginData = props.data

const columnList = computed(() => {
    const filterColumns = props.columns.length && props.columns.map((v) => {
        return v.key
    })
    return filterColumns
})

const curTableData = computed(() => {
    const filterData = orginData.length && orginData.filter((item) => {
        return item
    })

    return filterData
})

const sortBy = (key: string) => {
    let a = type()
    let v = a()
    window.console.log('触发了', v, key)
    orginData = sortByKey(orginData, key, v)
}

onMounted(() => {
    window.console.log(curTableData)
    window.console.log(orginData)
})

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

            &::before {
                position: absolute;
                cursor: pointer;
                content: "";
                border: 4px solid transparent;
                border-bottom-color: black;
                width: 0;
                height: 0;
                top: 2px;
                right: 4px;
            }

            &::after {
                position: absolute;
                cursor: pointer;
                content: "";
                border: 4px solid transparent;
                border-top-color: black;
                width: 0;
                height: 0;
                bottom: 2px;
                right: 4px;
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