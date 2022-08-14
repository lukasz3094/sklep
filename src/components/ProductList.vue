<template>
    <div>
        <div v-for="p in products" v-bind:key="p.id" class="card m-1 p-1 bg-light">
            <h4 class="text-start">
                {{ p.name }}
                <span class="badge rounded-pill bg-primary float-end">
                    {{ currency(p.price) }}
                </span>
            </h4>
            <div class="card-text bg-white p-1">
                {{ p.description }}
                <button class="btn btn-success btn-sm float-end"
                        v-on:click="handleProductAdd(p)">
                    Dodaj do koszyka
                </button>
            </div>
        </div>
        <page-controls />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import PageControls from "./PageControls.vue"
export default {
    components: { PageControls },
    computed: {
        ...mapGetters({ products: "processedProducts" })
    },
    methods: {
        ...mapMutations({ addProduct: "cart/addProduct" }),
        handleProductAdd(product) {
            this.addProduct(product)
            this.$router.push("/cart")
        }
    }
}
</script>