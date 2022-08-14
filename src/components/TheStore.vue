<template>
    <div class="container-fluid">
        <div class="row justify-content-end bg-dark text-white p-2">
            <a class="navbar-brand col-5">SKLEP SPORTOWY</a>
            <cart-summary class="col-3" />
        </div>

        <div class="row">
            <div class="col-3 bg-info p-2">
                <category-controls class="mb-5" />
                <button class="btn btn-block btn-warning mt-5"
                        v-on:click="setShowSearch(true)">
                    Szukaj
                </button>
            </div>

            <div class="col-9 bg-success p-2">
                <search />
                <product-list />
            </div>
        </div>
    </div>
</template>

<script>
import ProductList from "./ProductList.vue"
import CategoryControls from "./CategoryControls"
import CartSummary from "./CartSummary"
import { mapMutations } from "vuex"
import Search from "./TheSearch.vue"

export default {
    components: { ProductList, CategoryControls, CartSummary, Search },
    methods: {
        ...mapMutations(["setShowSearch"])
    }
}
</script>