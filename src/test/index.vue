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
    </Table>
</template>

<script setup lang="ts">
import Table from '@components/table.vue'

const data = [
    {
        a: 123, b: 456, c: 789, d: 0, e: 88
    }, {
        a: 454, b: 5445, c: 774, d: 0, e: 488
    }, {
        a: 877, b: 14, c: 987, d: 0, e: 488
    },{
        a: 123, b: 456, c: 789, d: 0, e: 88
    }, {
        a: 454, b: 5445, c: 774, d: 0, e: 488
    }, {
        a: 877, b: 14, c: 987, d: 0, e: 488
    },{
        a: 123, b: 456, c: 789, d: 0, e: 88
    }, {
        a: 454, b: 5445, c: 774, d: 0, e: 488
    }, {
        a: 877, b: 14, c: 987, d: 0, e: 488
    },{
        a: 123, b: 456, c: 789, d: 0, e: 88
    }, {
        a: 454, b: 5445, c: 774, d: 0, e: 488
    }, {
        a: 877, b: 14, c: 987, d: 0, e: 488
    }
]

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
    },{
        title: '数据4',
        key: 'd',
        sort: true
    },{
        title: '数据5',
        key: 'e',
        sort: false
    }
]

</script>
