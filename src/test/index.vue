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
</template>

<script setup lang="ts">
import Table from '@components/table.vue'

const data = Array.from(Array(17)).map(function (v, i) {
    return {
        a: 'a' + i,
        b: 'b' + i,
        c: i,
        d: 'd' + i,
        e: 'e' + i,
        f: 'f' + i,
        g: 'g' + i,
        h: 'g' + i,
        i: 'g' + i,
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

</script>
