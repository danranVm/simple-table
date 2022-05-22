import { Ref, computed, ref, toRefs, ComputedRef } from "vue";
import type { PageProps, StepItem } from "./types";

export interface PagingContext {
    resetIndex: () => void;
    curIndex: Ref<number>;
    total: Ref<number>;
    enable: Ref<boolean>;
    pageSize: Ref<number>;
    stepRange: ComputedRef<StepItem>,
    isValid: Ref<boolean>,
    judgeInputValid: (input: string, end: number) => string;
}

export function usePagination(
    props: PageProps,
): PagingContext {
    const { pageSize, total, enable } = toRefs(props);
    const curIndex = ref(1)
    const isValid = ref(true)
    const resetIndex = () => curIndex.value = 1;

    const stepRange = computed(() => {
        let start = (curIndex.value - 1) * pageSize.value
        return {
            start,
            end: start + pageSize.value
        }
    });

    const resetIsValid = (value: boolean) => {
        isValid.value = value
    };

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
        curIndex,
        total,
        enable,
        resetIndex,
        pageSize,
        stepRange,
        isValid,
        judgeInputValid
    }
}