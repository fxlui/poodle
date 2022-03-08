<script lang="ts">
	import { browser } from '$app/env';

	let totalPoodle = 0;
	let totalPoodleWins = 0;
	let currentPoodleStreaks = 0;
	let maxPoodleStreaks = 0;
	let totalPoodleObj = {
		1: 0,
		2: 0,
		3: 0
	};

	if (browser) {
		if (localStorage.getItem('totalPoodleObj')) {
			totalPoodleObj = JSON.parse(localStorage.getItem('totalPoodleObj'));
		}
		if (localStorage.getItem('totalPoodle')) {
			totalPoodle = parseInt(localStorage.getItem('totalPoodle'));
		}
		if (localStorage.getItem('totalPoodleWins')) {
			totalPoodleWins = parseInt(localStorage.getItem('totalPoodleWins'));
		}
		if (localStorage.getItem('currentPoodleStreaks')) {
			currentPoodleStreaks = parseInt(localStorage.getItem('currentPoodleStreaks'));
		}
		if (localStorage.getItem('maxPoodleStreaks')) {
			maxPoodleStreaks = parseInt(localStorage.getItem('maxPoodleStreaks'));
		}
	}
</script>

<div class="">
	<h2 class="font-bold mb-4 text-center">STATISTICS</h2>
	<div class="flex space-x-4">
		<div class="flex flex-col items-center text-center">
			<span class="wins text-2xl font-bold">{totalPoodle}</span>
			<span class="text-sm">played</span>
		</div>
		<div class="flex flex-col items-center text-center">
			<span class="wins text-2xl font-bold"
				>{totalPoodle ? Math.floor((totalPoodleWins / totalPoodle) * 100) : 'N/A'}</span
			>
			<span class="text-sm">win %</span>
		</div>
		<div class="flex flex-col items-center text-center">
			<span class="wins text-2xl font-bold">{currentPoodleStreaks}</span>
			<span class="text-sm">current<br />streak</span>
		</div>
		<div class="flex flex-col items-center text-center">
			<span class="wins text-2xl font-bold">{maxPoodleStreaks}</span>
			<span class="text-sm">max<br />streak</span>
		</div>
	</div>
	{#if totalPoodleObj}
		<div class="space-y-2">
			{#each [1, 2, 3] as value}
				<div class="flex items-center">
					{value}
					<div class="ml-2 pr-1 bg-neutral-600">
						<span class="text-neutral-100 ml-1">{totalPoodleObj[value]}</span>
					</div>
					{#if totalPoodleObj[value]}
						{#each Array(totalPoodleObj[value]) as _}
							<div class="bg-neutral-600 px-1">
								<span class="opacity-0 pointer-events-none">.</span>
							</div>
						{/each}
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
