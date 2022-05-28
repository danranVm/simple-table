<template>
    <div class="pagination" v-if="enable">
        共{{ total }}条记录
        每页{{ pageSize }}条
        共{{ endPage }}页
        当前第{{ curIndex }}页
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
import { computed, defineComponent, ref, toRefs } from 'vue';
import { pageProps } from './types';
import { usePagination } from './usePagination'

export default defineComponent({
    name: 'Pagination',
    props: pageProps,
    setup(props) {

        const curIndex = ref(1)
        const isValid = ref(true);
        const { pageSize, total, enable } = toRefs(props);

        const {
            stepRange,
            resetIndex,
            isFirstOrInvalid,
            isLastOrInvalid,
            endPage,
            prevPage,
            nextPage,
            setValue
        } = usePagination(props, { curIndex, isValid })

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