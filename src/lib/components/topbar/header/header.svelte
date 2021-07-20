<script>
  import Logo from './logo.svelte'
</script>

<header><div><Logo /></div></header>

<style>
  header {
    width: 100%;
    background-color: var(--color-black);
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--index-header);
    transform: translateY(0);
    transition: transform var(--transition-default);
  }

  div {
    display: grid;
    grid-template-columns: minmax(5rem, auto) 1fr minmax(5rem, auto);
    grid-template-areas: 'search logo more';
    grid-template-rows: var(--size-header-height);
    width: 100%;
    max-width: var(--size-container-max-width);
    margin: 0 auto;
    position: relative;
  }
</style>
