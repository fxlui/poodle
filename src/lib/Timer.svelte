<script>
	let result = '...';

	setInterval(function () {
		const toDate = new Date();
		const tomorrow = new Date();
		tomorrow.setHours(24, 0, 0, 0);

		let diffMS = tomorrow.getTime() / 1000 - toDate.getTime() / 1000;
		let diffHr = Math.floor(diffMS / 3600);
		diffMS = diffMS - diffHr * 3600;
		let diffMi = Math.floor(diffMS / 60);
		diffMS = diffMS - diffMi * 60;
		let diffS = Math.floor(diffMS);

		let temp = diffHr < 10 ? '0' + diffHr : diffHr;
		temp += ':' + (diffMi < 10 ? '0' + diffMi : diffMi);
		temp += ':' + (diffS < 10 ? '0' + diffS : diffS);

		result = temp.toString();
	}, 1000);
</script>

<p class="mt-2">
	{result}
</p>
