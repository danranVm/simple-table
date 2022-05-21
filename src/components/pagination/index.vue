<template>
    <div class="pagination" v-if="enable">
        共{{ total }}条记录
        每页{{ pageSize }} 条
        共{{ endPage }} 页
        <span @click="prevPage" class="pagination__btn" :class="`pagination__btn--${isFirstOrInvalid ? '' : 'active'}`">
            上一页
        </span>
        <span @click="nextPage" class="pagination__btn" :class="`pagination__btn--${isLastOrInvalid ? '' : 'active'}`">
            下一页
        </span>
        前往第
        <input type="text" class="pagination__input" :class="`pagination__input--${isValid ? '' : 'error'}`"
            :value="curIndex" @input="setValue($event)" /> 页
    </div>
</template>
    
<script lang='ts'>
import { computed, defineComponent } from 'vue';
import { pageProps } from './types';
import { usePagination } from './usePagination'

export default defineComponent({
    name: 'Pagination',
    props: pageProps,
    setup(props) {
        const {
            curIndex,
            stepRange,
            total,
            pageSize,
            enable,
            resetIndex,
            isValid,
            resetIsValid
        } = usePagination(props)

        const isFirstOrInvalid = computed(() => !isValid.value || curIndex.value == 1)
        const isLastOrInvalid = computed(() => !isValid.value || curIndex.value == endPage.value)
        const endPage = computed(() => Math.ceil(total.value / pageSize.value))
        const prevPage = () => !isFirstOrInvalid.value && curIndex.value--
        const nextPage = () => !isLastOrInvalid.value && curIndex.value++

        const setValue = (e: any) => {
            curIndex.value = e.target.value;
            e.target.title = judgeInputValid(e.target.value, endPage.value)
        }

        const judgeInputValid = (input: string, end: number) => {
            let reg = /^[1-9]\d*$/;
            let num = Number(input)
            if (reg.test(input)) {
                if (num < 1) {
                    resetIsValid(false)
                    return '该输入项的最小值是1'
                } else if (num > end) {
                    resetIsValid(false)
                    return `该输入项的最大值是${end}`
                } else {
                    resetIsValid(true)
                    return input
                }
            } else {
                resetIsValid(false)
                return '该输入项不是一个有效的数字'
            }

        }

        return {
            prevPage,
            nextPage,
            isFirstOrInvalid,
            isLastOrInvalid,
            curIndex,
            isValid,
            setValue,
            stepRange,
            enable,
            endPage,
            resetIndex
        }
    }
})

</script>
    
<style lang="less">
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