<template>
  <div class="product">
    <v-card class="mx-auto card">
      <v-img
        class="product_image"
        height="400px"
        :src="product.image"
        contain
      ></v-img>

      <v-card-title> {{ product.title }} </v-card-title>

      <v-card-subtitle> {{ product.price }} </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange-lighten-2" text="Подробнее"></v-btn>

        <v-spacer></v-spacer>

        <v-btn
          :icon="product.id === show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="
            show === product.id ? (show = -Infinity) : (show = product.id)
          "
        ></v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="product.id === show">
          <v-divider></v-divider>

          <v-card-text>
            {{ product.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types";

const show = ref(-Infinity);
type ProductProps = {
  product: Product;
};

defineProps<ProductProps>();
</script>

<style scoped>
.product {
  padding: 20px;
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.card {
  width: 100%;
}
</style>
