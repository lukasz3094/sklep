<template>
    <div class="container-fluid">

        <div class="row">
            <div class="col bg-dark text-white">
                <a class="navbar-brand">SKLEP SPORTOWY</a>
            </div>
        </div>

        <div class="row">
            <div class="col mt-2">
                <h2 class="text-center">Twój koszyk</h2>
                <table class="table table-bordered table-striped p-2">
                    <thead>
                        <tr>
                            <th>Ilość</th><th>Produkt</th>
                            <th class="text-end">Cena</th>
                            <th class="text-end">Podsumowanie</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="lines.length == 0">
                            <td colspan="4" class="text-center">
                                Twój koszyk jest pusty
                            </td>
                        </tr>
                        <cart-line v-for="line in lines" v-bind:key="line.product.id"
                            v-bind:line="line"
                            v-on:quantity="handleQuantityChange(line, $event)"
                            v-on:remove="remove" />
                    </tbody>
                    <tfoot v-if="lines.length > 0">
                        <tr>
                            <td colspan="3" class="text-end">Razem:</td>
                            <td class="text-end">
                                {{ currency(totalPrice) }}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="text-center">
                    <router-link to="/" class="btn btn-secondary m-1">
                        Kontynuuj zakupy
                    </router-link>
                    <router-link to="/checkout" class="btn btn-primary m-1"
                            v-bind:disabled="lines.length == 0">
                        Do kasy
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex"
import CartLine from "./ShoppingCartLine"
export default {
    components: { CartLine },
    computed: {
        ...mapState({ lines: state => state.cart.lines }),
        ...mapGetters({ totalPrice: "cart/totalPrice" })
    },
    methods: {
        ...mapMutations({
            change: "cart/changeQuantity",
            remove: "cart/removeProduct"
        }),
        handleQuantityChange(line, $event) {
            this.change({ line, quantity: $event })
        }
    }
}
</script>