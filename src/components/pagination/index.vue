<template>
    <div class="pagination" v-if="enable">
        共{{ total }}条记录
        每页{{ pageSize }} 条
        <span @click="prevPage" class="pagination__btn"
            :class="`pagination__btn--${isFirstOrDisabled ? '' : 'active'}`">
            上一页
        </span>
        <span @click="nextPage" class="pagination__btn" :class="`pagination__btn--${isLastOrDisabled ? '' : 'active'}`">
            下一页
        </span>
        前往第
        <input type="text" class="pagination__input" :class="`pagination__input--${isValid ? '' : 'error'}`"
            :value="curIndex" @input="setValue($event)" /> 页
    </div>
</template>
    
<script lang='ts'>
import { ref, computed, defineComponent } from 'vue';
import { pageProps } from './types';
import { usePagination } from './usePagination'

export default defineComponent({
    name: 'Pagination',
    props: pageProps,
    setup(props) {
        const { curIndex, stepRange, total, pageSize, enable } = usePagination(props)

        const isValid = ref(true)
        const isFirstOrDisabled = computed(() => !isValid.value || curIndex.value == 1)
        const isLastOrDisabled = computed(() => !isValid.value || curIndex.value == endPage.value)
        const endPage = computed(() => Math.ceil(total.value / pageSize.value))
        const prevPage = () => !isFirstOrDisabled.value && curIndex.value-- 
        const nextPage = () => !isLastOrDisabled.value && curIndex.value++ 

        const setValue = (e: any) => {
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

        return {
            prevPage,
            nextPage,
            isFirstOrDisabled,
            isLastOrDisabled,
            curIndex,
            isValid,
            setValue,
            stepRange,
            enable
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