<div>
	<!-- @ToDo: Auth -->
	<ul>
		<li><a href="/about">About</a></li>
		<li><a href="/stats">Stats</a></li>
		<!--
      @ToDo:
      <li>
        <Link href="/add-new-beverage">
          <a>
            <FormattedMessage id="admin.beverage.add" />
          </a>
        </Link>
      </li>
    -->
	</ul>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: var(--size-container-max-width);
		margin: 0 0.5rem;
	}

	ul {
		display: flex;
		margin: 0 0.5rem;
		padding: 0.5rem 0;
	}

	li {
		display: flex;
	}

	a {
		display: flex;
		align-items: center;
		padding: 1rem;
		background-color: var(--color-white);
		color: var(--color-black);
		transition: color var(--transition-default), background-color var(--transition-default);
	}

	a:hover {
		background-color: var(--color-black);
		color: var(--color-white);
	}

	@media (--md) {
		div {
			flex-direction: row-reverse;
			justify-content: space-between;
			align-items: stretch;
		}
	}
</style>
