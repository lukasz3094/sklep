<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col bg-dark text-white">
                    <a class="navbar-brand">SKLEP SPORTOWY</a>
                </div>
            </div>
        </div>

        <div class="m-2">
            <div class="form-group m-2">
                <label class="m-2 p-2">Imię</label>
                <input v-model="state.order.name" class="form-control" type="text" />
                <validation-err v-bind:validation="v$.order.name" />
            </div>
        </div>

        <div class="m-2">
            <div class="form-group m-2">
                <label class="m-2 p-2">E-mail</label>
                <input v-model="state.order.email" class="form-control" type="text" />
                <validation-err v-bind:validation="v$.order.email" />
            </div>
        </div>

        <div class="m-2">
            <div class="form-group m-2">
                <label class="m-2 p-2">Adres</label>
                <input v-model="state.order.address" class="form-control" type="text" />
                <validation-err v-bind:validation="v$.order.address" />
            </div>
        </div>

        <div class="m-2">
            <div class="form-group m-2">
                <label class="m-2 p-2">Miasto</label>
                <input v-model="state.order.city" class="form-control" type="text" />
                <validation-err v-bind:validation="v$.order.city" />
            </div>
        </div>

        <div class="m-2">
            <div class="form-group m-2">
                <label class="m-2 p-2">Kod pocztowy</label>
                <input v-model="state.order.zip" class="form-control" type="text" />
                <validation-err v-bind:validation="v$.order.zip" />
            </div>
        </div>

        <div class="text-center">
            <router-link to="/cart" class="btn btn-secondary m-1" >
                Powrót
            </router-link>
            <button class="btn btn-primary m-1" v-on:click="submitOrder">
                Złóż zamówienie
            </button>
        </div>
    </div>
</template>
<script>
import { required, email } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import { reactive, computed } from "vue"
import { mapActions } from "vuex"
import ValidationErr from "./ValidationError"
export default {
    components: { ValidationErr },
    setup() {
        const state = reactive({
            order: {
                name: null,
                email: null,
                address: null,
                city: null,
                zip: null
            }          
        })

        const rules = computed(() => {
            return {
                order: {
                    name: { required },
                    email: { required, email },
                    address: { required },
                    city: { required },
                    zip: { required }
                }
            }
        })

        const v$ = useValidate(rules, state)
        return {
            v$,
            state
        }
    },
    methods: {
        ...mapActions({
            storeOrder: "storeOrder",
            clearCart: "cart/clearCartData"
        }),
        async submitOrder() {
            this.v$.$touch()    
            if (!this.v$.$invalid) {
                let order = await this.storeOrder(this.state.order)
                this.clearCart()
                this.$router.push(`/thanks/${order}`)
            }
        }
    }
}
</script>