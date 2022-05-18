<template>
    <Table :data="data" :columns="columns">
        <template #a="{ record }">
            {{ record.a }}
        </template>
        <template #b="{ record }">
            {{ record.b }}
        </template>
        <template #c="{ record }">
            {{ record.c }}
        </template>
        <template #d="{ record }">
            {{ record.d }}
        </template>
        <template #e="{ record }">
            {{ record.e }}
        </template>
        <template #f="{ record }">
            {{ record.f }}
        </template>
        <template #g="{ record }">
            {{ record.g }}
        </template>
        <template #h="{ record }">
            {{ record.h }}
        </template>
        <template #i="{ record }">
            {{ record.i }}
        </template>
    </Table>
    <button @click="changeData">点我加载新数据</button>
</template>

<script setup lang="ts">
import Table from '@components/table.vue'
import { ref } from "vue";

/**
 * 
 * file 基础场景，加载数据,开启分页，不开启排序。 
 * 
*/

let data = ref(Array.from(Array(4447)).map(function (v, i) {
    let t = i & 1 ? 2 : 0
    return {
        a: 'a' + (i + t),
        b: 'b' + (i + t),
        c: (i + t),
        d: 'd' + (i + t),
        e: 'e' + (i + t + 9),
        f: 'f' + (i + t),
        g: 'g' + (i + t),
        h: 'g' + (i + t),
        i: 'g' + (i + t),
    };
}))

const columns = [
    {
        title: '数据1',
        key: 'a'
    }, {
        title: '数据2',
        key: 'b'
    }, {
        title: '数据3',
        key: 'c'
    }, {
        title: '数据4',
        key: 'd'
    }, {
        title: '数据5',
        key: 'e'
    }, {
        title: '数据6',
        key: 'f'
    }, {
        title: '数据7',
        key: 'g'
    }, {
        title: '数据8',
        key: 'h'
    }, {
        title: '数据9',
        key: 'i'
    }
]

const changeData = () => {
    let num = Math.floor(Math.random() * 100 + 5)
    setTimeout(() => {
        data.value = Array.from(Array(num)).map(function (v, i) {
            let t = i & 1 ? Math.ceil(num / 10) + 1 : Math.ceil(num / 10) - 1
            return {
                a: 'a' + (i + t),
                b: 'b' + (i + t),
                c: (i + t),
                d: 'd' + (i + t),
                e: 'e' + (i + t + 9),
                f: 'f' + (i + t),
                g: 'g' + (i + t),
                h: 'g' + (i + t),
                i: 'g' + (i + t),
            };
        })
    }, 1000)
}

</script>
