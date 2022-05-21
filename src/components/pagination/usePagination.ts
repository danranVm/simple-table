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
    resetIsValid: (value: boolean) => void;
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
    }

    return {
        curIndex,
        total,
        enable,
        resetIndex,
        pageSize,
        stepRange,
        isValid,
        resetIsValid
    }
}