<script lang="ts">
	const answer = 3;
	const try1 = [true, false, false, false, false, false];
	const try2 = [true, true, true, true, true, false];
</script>

<div class="mt-4 flex space-x-10">
	<div class="space-y-1 flex flex-col items-center">
		{#each try1 as value, i}
			<div class="pastblock{i}">
				<input
					type="checkbox"
					class="pastblock opacity-0 absolute h-10 w-10 cold"
					checked={value}
					disabled
				/>
				<div
					class="bg-transparent border-2 border-neutral-700 w-10 h-10 flex flex-shrink-0 justify-center items-center"
				/>
			</div>
		{/each}
		<p class="pt-2 text-sm">Too short!</p>
	</div>
	<div class="space-y-1 flex flex-col items-center">
		{#each try1 as value, i}
			<div class="poopblock{i}">
				<input
					type="checkbox"
					class="poopblock opacity-0 absolute h-10 w-10"
					checked={i < answer}
					disabled
				/>
				<div
					class="bg-transparent border-2 border-neutral-700 w-10 h-10 flex flex-shrink-0 justify-center items-center"
				>
					<p class="poop hidden pointer-events-none text-2xl">💩</p>
				</div>
			</div>
		{/each}
		<p class="pt-2 text-sm">Correct!</p>
	</div>
	<div class="space-y-1 flex flex-col items-center">
		{#each try2 as value, i}
			<div class="pastblock{i}">
				<input
					type="checkbox"
					class="pastblock opacity-0 absolute h-10 w-10 hot"
					checked={value}
					disabled
				/>
				<div
					class="bg-transparent border-2 border-neutral-700 w-10 h-10 flex flex-shrink-0 justify-center items-center"
				/>
			</div>
		{/each}
		<p class="pt-2 text-sm">Too long!</p>
	</div>
</div>
