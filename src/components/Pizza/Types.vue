<template>
	<ul>
		<li
			:class="{ active: activeItem === index }"
			v-for="(item, index) in typeItems"
			:key="item"
			@click="handleActiveItem(index)"
		>
			{{ item }}
		</li>
	</ul>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
	setup() {
		const typeItems = ref(["Тонкое", "Традиционное"]);
		const activeItem = ref(0);

		const handleActiveItem = (index) => {
			activeItem.value = index
		}

		return { typeItems, activeItem,handleActiveItem };
	},
};
</script>

<style>
</style>