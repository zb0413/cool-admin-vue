<template>
	<div v-loading="loading" class="page-iframe" element-loading-text="拼命加载中">
		<iframe :src="url" frameborder="0" :ref="setRefs('iframe')"></iframe>
	</div>
</template>

<script lang="ts" name="frame" setup>
import { ref, watch, onMounted } from "vue";
import { useCool } from "/@/cool";
import { useBase } from "/$/base";

const loading = ref(false);
const url = ref();
const { user } = useBase();

const { route, refs, setRefs } = useCool();

async function getSrc(srcUrl: any) {
	if (srcUrl) {
		const res = await fetch(srcUrl, {
			method: 'GET',
			headers: {
				"Authorization": user.token,
			}
		});
		const blob = await res.blob();
		url.value = URL.createObjectURL(blob);
	}
}

watch(
	() => route,
	(val) => {
		getSrc(val.meta?.iframeUrl);
	},
	{
		immediate: true,
		deep: true
	}
);

onMounted(() => {
	loading.value = true;



	refs.iframe.onload = () => {
		loading.value = false;
	};
});
</script>

<style lang="scss" scoped>
.page-iframe {
	height: 100%;

	iframe {
		height: 100%;
		width: 100%;
	}
}
</style>
