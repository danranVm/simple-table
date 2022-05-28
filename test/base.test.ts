import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import MyTable from "../src/components/table/index.vue";

test("mount component", () => {
    const wrapper = shallowMount(MyTable, {
        props: {
            data: [
                { 'a': 1 },
                { 'a': 2 }
            ],
            columns: [
                {
                    title: 'a',
                    key: 'a'
                }
            ]
        },
    });

    expect(wrapper.html()).toMatchSnapshot();
});