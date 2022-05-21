<template>
    <div class="table">
        <table class="table_header" border="1" cellspacing="0" cellpadding="0">
            <tr class="table_header__row">
                <td v-for="item in columnList" :key="item.key" @click="onSort(item.key, item.sort, item.direction)"
                    class="table_header__item" :title="item.title">
                    {{ item.title }}
                    <span v-if="item.sort" class="table_header__item_up"
                        :class="`table_header__item_up--${item.direction === DIRECTION.asc ? 'active' : ''}`"></span>
                    <span v-if="item.sort" class="table_header__item_down"
                        :class="`table_header__item_down--${item.direction === DIRECTION.desc ? 'active' : ''}`"></span>
                </td>
            </tr>
        </table>
        <div :style="tableStyle" class="table_body__contaniner">
            <table class="table_body" border="1" cellspacing="0" cellpadding="0">
                <tr v-for="(item, index) in finalData" :key="index" class="table_body__row">
                    <td v-for="(ele, idx) in Object.keys($slots)" class="table_body__item" :title="item[ele]">
                        <slot :record="item" :name="ele" :key="idx">
                        </slot>
                    </td>
                </tr>
            </table>
            <div v-if="!finalData.length">
                <h2>数据为空</h2>
            </div>
        </div>

    </div>
    <Pagination ref="pagination" :total="data.length" :enable="pageAble" />
</template>

<script lang="ts">
import { computed, ref, defineComponent, watch } from 'vue';
import Pagination from '@components/pagination/index.vue';
import { type PagiNation } from '../pagination/types';
import { sortByKey } from '../../utils/common'
import { tableProps, DIRECTION } from "./types";
import { useTable } from './useTable';
export default defineComponent({
    name: 'MyTable',
    props: tableProps,
    components: {
        Pagination
    },
    setup(props) {

        const { data, columnList, defaultHeight, pageAble, onSort } = useTable(props)

        const pagination = ref<PagiNation | null>(null)

        const stepRange = computed(() => pagination.value?.stepRange ?? { start: 0, end: 10 });

        const filterByStepData = computed(() => {
            const { start, end } = stepRange.value;
            return data.value.slice(start, end)
        })

        const sortedData = computed(() => {
            let filterData = filterByStepData.value;
            columnList.value.find(item => {
                item.sort && item.direction && (filterData = sortByKey(filterData, item.key, item.direction))
            })
            return filterData
        })

        const finalData = computed(() => {
            return pageAble.value ? sortedData.value : data.value
        })

        const tableStyle = computed(() => ({ height: `${defaultHeight.value}px` }));

        // 原始数据变化，重置回第一页
        watch(data, () => {
            pagination.value?.resetIndex()
        })

        return {
            columnList,
            onSort,
            tableStyle,
            pagination,
            pageAble,
            DIRECTION,
            finalData
        }
    }
})

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
            border: 1px solid;
        }
    }

}
</style>