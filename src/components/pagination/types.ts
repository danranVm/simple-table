import { ExtractPropTypes } from "vue"

export interface StepItem {
    start: number,
    end: number
}

export const pageProps = {
    enable: {
        type: Boolean,
        default: true
    },
    total: {
        type: Number,
        default: 0
    },
    pageSize: {
        type: Number,
        default: 10
    }
}

export type pageProps = ExtractPropTypes<typeof pageProps>