<template>
    <div>
        <h4 class="bg-info text-white text-center p-2">Zamówienia</h4>

        <div class="form-group text-center">
            <input class="form-check-input" type="checkbox" v-model="showShipped" />
            <label class="form-check-label">Pokaż wysłane zamówienia</label>
        </div>

        <table class="table table-sm table-bordered">
            <thead>
                <tr>
                    <th>ID</th><th>Imię</th><th>Miasto, kod pocztowy</th>
                    <th class="text-end">Suma łączna</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="displayOrders.length == 0">
                    <td colspan="5">Nie ma zamówień</td>
                </tr>
                <tr v-for="o in displayOrders" v-bind:key="o.id">
                    <td>{{ o.id }}</td>
                    <td>{{ o.name }}</td>
                    <td>{{ `${o.city}, ${o.zip}` }}</td>
                    <td class="text-end">{{ currency(getTotal(o)) }}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger"
                                v-on:click="shipOrder(o)">
                            {{ o.shipped ? "Nie wysłano" : "Wysłano" }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex"
export default {
    data: function() {
        return {
            showShipped: false
        }
    },
    computed: {
        ...mapState({ orders: state => state.orders.orders }),
        displayOrders() {
            return this.showShipped ? this.orders 
            : this.orders.filter(o => o.shipped != true)
        }
    },
    methods: {
        ...mapMutations(["changeOrderShipped"]),
        ...mapActions(["getOrders", "updateOrder"]),
        getTotal(order) {
            if (order.cartLines != null && order.cartLines.length > 0) {
                return order.cartLines.reduce((total, line) => 
                    total + (line.quantity * line.product.price), 0)
            } else {
                return 0
            }
        },
        shipOrder(order) {
            this.updateOrder(order)
        }
    },
    created() {
        this.getOrders()
    }
}
</script>