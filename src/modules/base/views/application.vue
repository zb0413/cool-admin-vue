<template>
	<cl-crud ref="Crud">
		<cl-row>
			<cl-refresh-btn />
			<cl-add-btn />
			<cl-multi-delete-btn />
			<cl-flex1 />
			<cl-search-key placeholder="搜索名称" />
		</cl-row>

		<cl-row>
			<cl-table ref="Table" :default-sort="{
				prop: 'createTime',
				order: 'descending'
			}" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<cl-pagination />
		</cl-row>

		<cl-upsert ref="Upsert">

		</cl-upsert>
	</cl-crud>
</template>

<script lang="ts" name="sys-role" setup>
import { useTable, useUpsert, useCrud, setFocus } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-crud
const Crud = useCrud({ service: service.base.sys.application }, (app) => {
	app.refresh();
});

// cl-upsert
const Upsert = useUpsert({
	dialog: {
		width: "800px"
	},

	items: [
		{
			prop: "clientId",
			label: "应用ID",
			span: 12,
			required: true,
			component: {
				name: "el-input"
			}
		},
		{
			prop: "clientSecret",
			label: "应用密码",
			span: 12,
			required: true,
			component: {
				name: "el-input"
			}
		},
		{
			prop: "remark",
			label: "备注",
			span: 24,
			component: {
				name: "el-input",
				props: {
					type: "textarea",
					rows: 4
				}
			}
		}
	],

	plugins: [setFocus()],

});

// cl-table
const Table = useTable({
	columns: [
		{
			type: "selection",
			width: 60
		},
		{
			prop: "clientId",
			label: "应用ID",
			minWidth: 120
		},
		{
			prop: "remark",
			label: "备注",
			showOverflowTooltip: true,
			minWidth: 150
		},
		{
			prop: "createTime",
			label: "创建时间",
			sortable: "custom",
			minWidth: 160
		},
		{
			prop: "updateTime",
			label: "更新时间",
			sortable: "custom",
			minWidth: 160
		},
		{
			label: "操作",
			type: "op",
			buttons: ["edit", "delete"]
		}
	]
});


</script>
