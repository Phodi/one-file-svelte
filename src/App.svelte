<script>
  import "./style.css";
  import { onMount } from "svelte";
  import { initializeApp } from "./app_init";

  onMount(() => {
    initializeApp();
  });
</script>

<p>Hello World!</p>
<button class="btn">OK</button>
