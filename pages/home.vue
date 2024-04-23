<template>
  <div class="container" >
    <h1 class="title">Home page</h1>
    <div>
      <div class="selector">
        <v-btn id="menu-activator" color="primary">
          {{ currentCategory }}
        </v-btn>

        <v-menu activator="#menu-activator">
          <v-list>
            <v-list-item
              v-for="item in categories"
              :key="item"
              :value="item"
              @click="currentCategory = item"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="products">
        <Product
          class="product_item"
          :product="product"
          :key="product.id"
          v-for="product in filteredProducts"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: products } = useFetch("/api/products");

const isSelectorMenu = ref(false);
const currentCategory = ref("Все");
const categories = computed(() => {
  if (products.value) {
    return [...new Set(products.value.map(({ category }) => category))];
  }
  return [];
});

const filteredProducts = computed(() => {
  if (products.value) {
    if (currentCategory.value === "Все") {
      return products.value;
    } else {
      return products.value.filter((p) => p.category === currentCategory.value);
    }
  }
  return [];
});

function changeCategory(category: string) {
  currentCategory.value = category;
  isSelectorMenu.value = false;
}
</script>

<style scoped>
.title {
  font-size: 25px;
  padding: 20px 0;
  border-bottom: 1px solid #e5e5e5;
}

.selector {
  margin: 20px 0;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin: 30px 0;
  justify-content: center;
}

.product_item {
  width: 48%;
}

@media (max-width: 600px) {
  .product_item {
    width: 100%;
  }
}
</style>
