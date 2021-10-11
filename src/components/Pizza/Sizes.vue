<template>
	<ul>
		<li
			:class="{ active: activeItem === index }"
			v-for="(item, index) in sizeItems"
			:key="item"
			@click="handleActiveItem(index)"
		>
			{{ item }} см
		</li>
	</ul>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
	setup() {
		const sizeItems = ref([26, 30, 40]);
		const activeItem = ref(0);

		const handleActiveItem = (index) => {
			activeItem.value = index
		}

		return { activeItem, sizeItems,handleActiveItem };
	},
};
</script>

<style>
</style>