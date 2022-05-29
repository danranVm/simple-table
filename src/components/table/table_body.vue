<template>
    <div :style="tableStyle" class="table_body__contaniner">
        <table class="table_body" border="1" cellspacing="0" cellpadding="0">
            <tr v-for="(item, index) in data" :key="index" class="table_body__row">
                <td v-for="(ele, idx) in slotList" class="table_body__item" :title="item[ele]">
                    <slot :record="item" :name="ele" :key="idx">
                        {{ item[ele] }}
                    </slot>
                </td>
            </tr>
        </table>
        <div v-if="!data.length">
            <h2>数据为空</h2>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { tableBodyProps } from "./types";
export default defineComponent({
    name: 'TableBody',
    props: tableBodyProps,
    setup(props) {
        const { data, defaultHeight, slotList } = toRefs(props);
        const tableStyle = computed(() => ({ height: `${defaultHeight.value}px` }));
        return {
            tableStyle,
            data,
            slotList
        }
    }
})

</script>
<style lang="less" scoped>
.table {

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