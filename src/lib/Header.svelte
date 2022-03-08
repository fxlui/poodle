<script lang="ts">
	import Modal from './Modal.svelte';
	import Stats from './Stats.svelte';
	import Help from './Help.svelte';
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
</script>

<div class="w-screen flex justify-between items-center px-5 py-4 border-b-2 border-neutral-700">
	<button class="w-6 h-6" on:click={() => handleToggleHelpModal()}><FaRegQuestionCircle /></button>
	<span class="font-branding font-500 text-2xl">Poodle</span>
	<button class="w-6 h-6" on:click={() => handleToggleStatsModal()}><FaRegChartBar /></button>

	<Modal open={showHelpModal} on:close={() => handleToggleHelpModal()}>
		<svelte:fragment slot="body">
			<h2 class="font-bold mb-4">HOW TO PLAY</h2>
			<div class="max-w-xl">
				<p>Guess the Turdle (length of turd) in 3 tries.</p>
				<p class="mt-3">Each guess can be 1-6 boxes in length. Hit the Poop button to submit.</p>
				<p class="mt-3">
					After each guess, the colour of the boxes will change to show how close your guess was to
					the Turdle.
				</p>
			</div>
			<Help />
			<p class="text-xs mt-5">
				<a href="https://www.flaticon.com/free-icons/anus" title="anus icons"
					>Anus icons created by Good Ware - Flaticon</a
				>
			</p>
			<p class="text-xs mt-5 opacity-50">made with poop by frix</p>
		</svelte:fragment>
	</Modal>

	<Modal open={showStatsModal} on:close={() => handleToggleStatsModal()}>
		<svelte:fragment slot="body">
			<Stats />
		</svelte:fragment>
	</Modal>
</div>
