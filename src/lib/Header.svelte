<script lang="ts">
	import Modal from './Modal.svelte';
	import Stats from './Stats.svelte';
	import FaRegQuestionCircle from 'svelte-icons/fa/FaRegQuestionCircle.svelte';
	import FaRegChartBar from 'svelte-icons/fa/FaRegChartBar.svelte';
	import { browser } from '$app/env';

	let showHelpModal = false;
	if (browser) {
		const visited = localStorage.getItem('poodledBefore');
		if (!visited) {
			showHelpModal = true;
		}
	}

	const handleToggleHelpModal = () => {
		showHelpModal = !showHelpModal;
		if (browser) {
			const visited = localStorage.getItem('poodledBefore');
			if (!visited) {
				localStorage.setItem('poodledBefore', 'true');
			}
		}
	};

	let showStatsModal = false;
	const handleToggleStatsModal = () => {
		showStatsModal = !showStatsModal;
	};

	const answer = 3;
	const try1 = [true, false, false, false, false, false];
	const try2 = [true, true, true, true, true, false];
</script>

<div class="w-screen flex justify-between items-center px-5 py-4 border-b-2 border-neutral-700">
	<button class="w-6 h-6" on:click={() => handleToggleHelpModal()}><FaRegQuestionCircle /></button>
	<span class="font-branding font-500 text-2xl">Poodle</span>
	<button class="w-6 h-6" on:click={() => handleToggleStatsModal()}><FaRegChartBar /></button>

	<Modal open={showHelpModal} on:close={() => handleToggleHelpModal()}>
		<svelte:fragment slot="body">
			<h2 class="font-bold mb-4">HOW TO PLAY</h2>
			<div class="max-w-xl">
				<p>Guess the Poodle (length of poop) in 3 tries.</p>
				<p class="mt-3">Each guess can be 1-6 boxes in length. Hit the Poop button to submit.</p>
				<p class="mt-3">
					After each guess, the colour of the boxes will change to show how close your guess was to
					the Poodle.
				</p>
			</div>
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
					<p class="pt-2 text-sm">Poodled!</p>
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
			<p class="text-xs mt-5">
				<a href="https://www.flaticon.com/free-icons/anus" title="anus icons"
					>Anus icons created by Good Ware - Flaticon</a
				>
			</p>
		</svelte:fragment>
	</Modal>

	<Modal open={showStatsModal} on:close={() => handleToggleStatsModal()}>
		<svelte:fragment slot="body">
			<Stats />
		</svelte:fragment>
	</Modal>
</div>
