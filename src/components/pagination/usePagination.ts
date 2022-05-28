import { Ref, computed, toRefs, ComputedRef } from "vue";
import type { PageProps, StepItem, PageConfig } from "./types";

export interface PagingContext {
    resetIndex: () => void;
    stepRange: ComputedRef<StepItem>,
    isFirstOrInvalid: ComputedRef<boolean>,
    isLastOrInvalid: ComputedRef<boolean>,
    endPage: ComputedRef<number>,
    prevPage: () => void;
    nextPage: () => void;
    setValue: (e: any) => void;
}

export function usePagination(
    props: PageProps,
    config: PageConfig
): PagingContext {
    const { pageSize, total } = toRefs(props);
    const { curIndex, isValid } = toRefs(config);
    const resetIndex = () => curIndex.value = 1;

    const stepRange = computed(() => {
        let start = (curIndex.value - 1) * pageSize.value
        return {
            start,
            end: start + pageSize.value
        }
    });

    const judgeInputValid = (input: string, end: number, valid: Ref<boolean>) => {
        let reg = /^[1-9]\d*$/;
        let num = Number(input)
        if (reg.test(input)) {
            if (num < 1) {
                valid.value = false
                return '该输入项的最小值是1'
            } else if (num > end) {
                valid.value = false
                return `该输入项的最大值是${end}`
            } else {
                valid.value = true
                return input
            }
        } else {
            valid.value = false
            return '该输入项不是一个有效的数字'
        }

    }

    // 首页或非法输入
    const isFirstOrInvalid = computed(() => !isValid.value || curIndex.value == 1)
    // 尾页或非法输入
    const isLastOrInvalid = computed(() => !isValid.value || curIndex.value == endPage.value)
    // 尾页
    const endPage = computed(() => Math.ceil(total.value / pageSize.value))
    // 上一页
    const prevPage = () => !isFirstOrInvalid.value && curIndex.value--
    // 下一页
    const nextPage = () => !isLastOrInvalid.value && curIndex.value++
    // 设置输入框的值
    const setValue = (e: any) => {
        curIndex.value = e.target.value;
        e.target.title = judgeInputValid(e.target.value, endPage.value, isValid)
    }

    return {
        resetIndex,
        stepRange,
        isFirstOrInvalid,
        isLastOrInvalid,
        endPage,
        prevPage,
        nextPage,
        setValue
    }
}