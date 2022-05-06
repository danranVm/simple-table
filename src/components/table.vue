<template>
    <div class="table" :style="tableStyle">
        <table class="table_header" border="1" cellspacing="0" cellpadding="0">
            <tr class="table_header__row">
                <td v-for="(item, index) in columnList" :key="item.key" @click="_sortBy(index, item.key, item.sort)"
                    class="table_header__item" :title="item.title">
                    {{ item.title }}
                    <span v-if="item.sort" class="table_header__item_up"
                        :class="`table_header__item_up--${item.sortType === 1 ? 'active' : ''}`"></span>
                    <span v-if="item.sort" class="table_header__item_down"
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
    </div>
    <div class="paging">
        共{{ totalNum }}条记录
        每页{{ perPage }} 条
        <span @click="_prevPage" 
              class="paging__btn" 
              :class="`paging__btn--${isFirst ? '' : 'active'}`">
              上一页
        </span>
        <span @click="_nextPage" 
              class="paging__btn" 
              :class="`paging__btn--${isLast ? '' : 'active'}`">
              下一页
        </span>
        前往第
        <input type="text" 
               class="paging__input"
               :class="`paging__input--${isValid ? '' : 'error'}`"
               :value="curIndex" 
               @input="_setValue($event)"/> 页
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { sortByKey } from '../utils/common'

const props = withDefaults(defineProps<{
    data: any[],
    columns: any[],
    defaultHeight: number
}>(), {
    data: () => [],
    columns: () => [],
    defaultHeight: 250
})

const originData = [...props.data]
let tempData = reactive(props.data)
const columnList = reactive([...props.columns.map((v) => {
    v.sortType = 0
    // 0: 原， 1: 升， 2: 降
    return v
})])

const keyList = computed(() => {
    const filterKeys = props.columns.length && props.columns.map((v) => {
        return v.key
    })
    return filterKeys
})

const isDefaultDirection = computed(() => {
    return !!columnList.reduce((pre, cur) => {
        return pre * cur.sortType
    }, 1)
})

const curTableData = computed(() => {
    let dataList = isDefaultDirection.value ? originData : tempData;
    let start = isValid.value ? (curIndex.value - 1) * perPage.value : 0;
    let end = start + perPage.value
    const filterData = dataList.length && dataList.filter((item, index) => {
        return (index >= start && index <= end)
    })
    return filterData
})

const _sortBy = (index: number, key: string, sortAble: boolean) => {
    if (!sortAble) {
        return
    }
    let type = columnList[index].sortType;
    type = type === 2 ? 0 : ++type
    columnList.forEach((ele, idx) => {
        ele.sortType = idx === index ? type : 0
    })
    tempData = type ? sortByKey(tempData, key, type) : [...originData]
}

const tableStyle = computed(() => {
    return {
        height: `${props.defaultHeight}px`
    }
})

const curIndex = ref(1)
const totalNum = computed(() => {
    return props.data.length
})
const perPage = ref(10)
const isFirst = computed(() => {
    if (!isValid.value) {
        return true
    }
    // input输入的value是字符型
    return curIndex.value == 1
})

const isLast = computed(() => {
    if (!isValid.value) {
        return true
    }
    return curIndex.value == endPage.value
})

const endPage = computed(() => {
    return Math.ceil(totalNum.value / perPage.value)
})

const _prevPage = () => {
    if (isFirst.value) {
        return
    }
    curIndex.value--
}

const _nextPage = () => {
    if (isLast.value) {
        return
    }
    curIndex.value++
}
const isValid = ref(true)
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

</script>
<style lang="less" scoped>
.table {
    min-height: 250px;

    &_header {
        width: 100%;

        &__row {
            font-weight: bold;
            background: #d2e8f3;
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
                background-color: #e6f3f7;
            }
        }

        &__item {
            min-width: 80px;
        }
    }

}

.paging {
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