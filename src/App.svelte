<script lang="ts">
  import "./style.css";
  import { initializeApp } from "./app_init";
  $effect(() => {
    initializeApp();
  });
  let count = $state(0);
</script>

<p>Count = {count}</p>
<button
  class="btn"
  onclick={() => {
    count = count + 1;
  }}>ADD</button
>
