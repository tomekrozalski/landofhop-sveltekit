<ul class="header">
	<li>nazwa</li>
	<li class="withSublist">
		ilość piw uwarzonych
		<ul>
			<li>samodzielnie</li>
			<li>w kooperacji</li>
			<li>jako kontraktor</li>
		</ul>
	</li>
	<li>średnia ocena</li>
	<li>punty</li>
</ul>

<style>
	ul.header {
		display: grid;
		grid-template-columns: 3fr 3fr 1fr 1fr;
		background-color: var(--color-brand-6-light);
		border-bottom: 0.1rem solid var(--color-black);
	}

	li {
		align-self: self-end;
		padding: 0.4rem 1rem;
	}

	li.withSublist {
		text-align: center;
		background-color: var(--color-brand-5-light);
	}

	ul ul {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
</style>
