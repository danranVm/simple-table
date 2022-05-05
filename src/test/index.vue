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
    </Table>
</template>

<script setup lang="ts">
import Table from '@components/table/table.vue'

/**
* @file
*/

const data = [
    {
        a: 123, b: 456, c: 789
    }, {
        a: 454, b: 5445, c: 774
    }, {
        a: 877, b: 14, c: 987
    }
]

const columns = [
    {
        title: '数据1',
        key: 'a',
    }, {
        title: '数据2',
        key: 'b',
    }, {
        title: '数据3',
        key: 'c',
    },
]

</script>
