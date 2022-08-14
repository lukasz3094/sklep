<template>
    <div>
        <h4 class="text-center text-white p-2" v-bind:class="themeClass">
            {{ editMode ? "Edytuj" : "Utwórz produkt" }}
        </h4>

        <h4 v-if="v$.$invalid && v$.$dirty" class="bg-danger text-white text-center p-2">
            Należy podać wartości dla wszystkich pól
        </h4>

        <div class="form-group m-2" v-if="editMode">
            <label>ID (Tylko do odczytu)</label>
            <input class="form-control" disabled v-model="state.product.id" />
        </div>

        <div class="form-group m-2">
            <label>Nazwa</label>
            <input class="form-control" v-model="state.product.name" />
        </div>

        <div class="form-group m-2">
            <label>Opis</label>
            <input class="form-control" v-model="state.product.description" />
        </div>

        <div class="form-group m-2">
            <label>Kategoria</label>
            <select v-model="state.product.category" class="form-control form-select">
                <option v-for="c in categories" v-bind:key="c">
                    {{ c }}
                </option>
            </select>
        </div>

        <div class="form-group m-2">
            <label>Cena</label>
            <input class="form-control" v-model="state.product.price" />
        </div>

        <div class="text-center">
            <router-link to="/admin/products" class="btn btn-secondary m-1">
                Anuluj
            </router-link>
            <button class="btn m-1" v-bind:class="themeClassButton"
                    v-on:click="handleSave">
                {{ editMode ? "Zapisz zmiany" : "Zapisz produkt" }}
            </button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex"
import { required } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import { reactive, computed } from "vue"
export default {
    setup() {
        const state = reactive({
            product: {
                name: "",
                description: "",
                category: "",
                price: ""
            }
        })

        const rules = computed(() => {
            return {
                product: {
                    name: { required },
                    description: { required },
                    category: { required },
                    price: { required }
                }
            }
        })

        const v$ = useValidate(rules, state)
        return {
            v$,
            state
        }
    },
    computed: {
        ...mapState({
            pages: state => state.pages,
            currentPage: state => state.currentPage,
            categories: state => state.categoriesData
        }),
        editMode() {
            return this.$route.params["op"] == "edit"
        },
        themeClass() {
            return this.editMode ? "bg-info" : "bg-primary"
        },
        themeClassButton() {
            return this.editMode ? "btn-info" : "btn-primary"
        }
    },
    methods: {
        ...mapActions(["addProduct", "updateProduct"]),
        async handleSave() {
            this.v$.$touch()
            if (!this.v$.$invalid) {
                if (this.editMode) {
                    await this.updateProduct(this.state.product)
                } else {
                    await this.addProduct(this.state.product)
                }
                this.$router.push("/admin/products")
            }
        }
    },
    created() {
        if (this.editMode) {
            Object.assign(this.state.product, 
                this.$store.getters.productById(this.$route.params["id"]))
        }
    }
}
</script>