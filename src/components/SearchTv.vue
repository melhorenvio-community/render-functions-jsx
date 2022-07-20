<template>
  <div>
    <h1>teste</h1>
    <div>
      <h3>Filled</h3>
      <MEButton compact> Trocar tipo </MEButton>
      <div>
        <h3>Disabled</h3>
        <MECepField
          label="Label"
          name="field_3"
          rules="required"
          :tabindex="3"
          disabled
        />
        <MEButton class="mt-2 mb-4" alt compact label="TESTE"> </MEButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import { MEButton, MECepField } from "@melhorenvio/ds-core";
</script>
