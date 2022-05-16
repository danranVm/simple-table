import { Ref, ComputedRef, computed, ref, toRefs } from "vue";
import { type pageProps, StepItem } from "./types";

export interface PagingContext {
    curIndex: Ref<number>;
    isValid: Ref<boolean>;
    stepRange: ComputedRef<StepItem>;
    isFirstOrDisabled: ComputedRef<boolean>;
    isLastOrDisabled: ComputedRef<boolean>;
    endPage: ComputedRef<number>;
    resetIndex: () => void;
    _prevPage: () => void;
    _nextPage: () => void;
    _setValue: (e: any) => void;
}

export function usePagination(
    props: pageProps,
) : PagingContext {
    const { total, pageSize } = toRefs(props);
    const curIndex = ref(1)
    const isValid = ref(true)
    const resetIndex = () => {
        curIndex.value = 1
    }

    const isFirstOrDisabled = computed(() => {
        // input输入的value是字符型,所以用 ==
        return !isValid.value || curIndex.value == 1
    })

    const isLastOrDisabled = computed(() => {
        return !isValid.value || curIndex.value == endPage.value
    })

    const endPage = computed(() => {
        return Math.ceil(total.value / pageSize.value)
    })

    const stepRange = computed<StepItem>(() => {
        // 非法输入就重置回第一页
        let start = isValid.value ? (curIndex.value - 1) * pageSize.value : 0;
        let end = start + pageSize.value
        return {
            start,
            end
        }
    })

    const _prevPage = () => {
        if (isFirstOrDisabled.value) {
            return
        }
        curIndex.value--;
    }

    const _nextPage = () => {
        if (isLastOrDisabled.value) {
            return
        }
        curIndex.value++;
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

   return {
       curIndex,
       isValid,
       resetIndex,
       isFirstOrDisabled,
       isLastOrDisabled,
       endPage,
       stepRange,
       _prevPage,
       _nextPage,
       _setValue
   }
}