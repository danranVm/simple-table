<template>
    <Table :data="data" :columns="columns">
        <template #a="{ content }">
            {{ content.a }}
        </template>
        <template #b="{ content }">
            {{ content.b }}
        </template>
        <template #c="{ content }">
            {{ content.c }}
        </template>
        <template #d="{ content }">
            {{ content.d }}
        </template>
        <template #e="{ content }">
            {{ content.e }}
        </template>
        <template #f="{ content }">
            {{ content.f }}
        </template>
        <template #g="{ content }">
            {{ content.g }}
        </template>
        <template #h="{ content }">
            {{ content.h }}
        </template>
        <template #i="{ content }">
            {{ content.i }}
        </template>
    </Table>
    <button @click="changeData">点我加载新数据</button>
</template>

<script setup lang="ts">
import Table from '@components/table.vue'
import { ref } from "vue";

let data = ref(Array.from(Array(47)).map(function (v, i) {
    let t = i&1 ? 2 : 0
    return {
        a: 'a' + (i + t),
        b: 'b' + (i + t),
        c: (i + t),
        d: 'd' + (i + t),
        e: 'e' + (i + t + 9) ,
        f: 'f' + (i + t),
        g: 'g' + (i + t),
        h: 'g' + (i + t),
        i: 'g' + (i + t),
    };
}))

let dd = Array.from(Array(66)).map(function (v, i) {
    let t = i&1 ? 3 : 2
    return {
        a: 'a' + (i + t),
        b: 'b' + (i + t),
        c: (i + t),
        d: 'd' + (i + t),
        e: 'e' + (i + t + 9) ,
        f: 'f' + (i + t),
        g: 'g' + (i + t),
        h: 'g' + (i + t),
        i: 'g' + (i + t),
    };
})

const columns = [
    {
        title: '数据1',
        key: 'a',
        // sort: true
    }, {
        title: '数据2',
        key: 'b',
        sort: true
    }, {
        title: '数据3',
        key: 'c',
        sort: true
    }, {
        title: '数据4',
        key: 'd',
        sort: true
    }, {
        title: '数据5',
        key: 'e',
        sort: true
    }, {
        title: '数据6',
        key: 'f',
        sort: true
    }, {
        title: '数据7',
        key: 'g',
        sort: true
    }, {
        title: '数据8',
        key: 'h',
        sort: true
    }, {
        title: '数据9',
        key: 'i',
        sort: true
    }
]

const changeData = () => {
    data.value = dd
}

</script>
