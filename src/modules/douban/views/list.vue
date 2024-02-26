<template>
    <cl-crud ref="Crud">
        <cl-row>
            <cl-search ref="Search" />
        </cl-row>
        <cl-table></cl-table>
        <cl-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]"
            :small="small" :disabled="disabled" layout="total, sizes, prev, pager, next, jumper" :total="400"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    </cl-crud>
</template>

<script lang="ts" setup>
import { useCrud, useTable, useSearch } from "@cool-vue/crud";
import { ref } from "vue";
// import { douban_service } from "../service/douban_service";

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

const Search = useSearch({
    items: [
        {
            label: "搜索",
            prop: "q",
            component: {
                name: "el-input",
                props: {
                    clearable: true
                }
            }
        },
        {
            label: "状态",
            prop: "status",
            component: {
                name: "el-select",
                props: {
                    clearable: true,
                    onChange(status) {
                        Crud.value?.refresh({ status, page: 1 });
                    }
                },
                options: [
                    {
                        label: "待处理",
                        value: 0
                    },
                    {
                        label: "爬取中",
                        value: 1
                    },
                    {
                        label: "爬取完成",
                        value: 1
                    },
                    {
                        label: "暂不处理",
                        value: -1
                    },
                    {
                        label: "爬取失败",
                        value: -2
                    },

                ]
            }
        },
        {
            label: "类别",
            prop: "categories",
            component: {
                name: "el-select",
                props: {
                    clearable: true,
                    multiple: true,
                    onChange(categories) {
                        Crud.value?.refresh({ categories, page: 1 });
                    }
                },
                options: [
                    {
                        label: "剧情",
                        value: 1
                    },
                    {
                        label: "悬疑",
                        value: 0
                    }
                ]
            }
        }
    ]
});

const Crud = useCrud({ service: 'test' }, (app) => {
    app.refresh();
});

const Table = useTable({
    columns: [
        {
            label: "名称",
            prop: "title",
            sortable: "custom"
        },
        {
            label: "类别",
            prop: "categries"
        },
        {
            label: "链接",
            prop: "url",
            sortable: "custom"
        },
        {
            label: "状态",
            prop: "status",
            sortable: "custom",
            dict: [
                {
                    label: "开启",
                    value: 1,
                    type: "success"
                },
                {
                    label: "关闭",
                    value: 0,
                    type: "danger"
                }
            ]
        },
        {
            label: "创建时间",
            prop: "createTime",
            sortable: "custom"
        },
        {
            label: "操作",
            type: 'op',
            width: 250,
            buttons: [
                { 'label': '预览' },
                { 'label': '爬取' },
                { 'label': '不处理' },
            ]

        }
    ]
});

// const ws = new WebSocket("ws://starlette-training:8000/ws/comic_list");
const ws = new WebSocket("ws://localhost:8000/ws/comic_list");
ws.onmessage = function (event) {
    console.info('ws event:' + event.data)
};

const sendMessage = (message: any) => {
    ws.send(message)
}
</script>