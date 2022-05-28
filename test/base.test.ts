import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import { ref } from 'vue';
import MyTable from "../src/components/table/index.vue";

describe("mount table", () => {
    const wrapper = shallowMount(MyTable, {
        props: {
            data: ref([
                { 'a': 1 },
                { 'a': 2 }
            ]),
            columns: [
                {
                    title: 'a',
                    key: 'a'
                }
            ],
            defaultHeight: 500
        },
    });
    test('data length', () => {
        expect(wrapper.props().data.value.length).toBe(2)
    });

    test('set height', () => {
        expect(wrapper.props().defaultHeight).toBe(500)
    });

    // 不配置pageAble默认为true
    test('pagable', () => {
        expect(wrapper.props().pageAble).toBe(true)
    });
});
