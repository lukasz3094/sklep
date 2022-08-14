<template>
    <div class="m-2">
        <h4 class="bg-primary text-white text-center p-2">
            Panel administracyjny sklepu
        </h4>

        <h4 v-if="showFailureMessage" class="bg-danger text-white text-center p-2 my-2" >
            Uwierzytelnianie nie powiodło się. Spróbuj ponownie.
        </h4>

        <div class="form-group">
            <label>Nazwa użytkownika</label>
            <input type="text" class="form-control" v-model="v$.username.$model" />
            <validation-error v-bind:validation="v$.username" />
        </div>

        <div class="form-group">
            <label>Hasło</label>
            <input type="password" class="form-control" v-model="v$.password.$model" />
            <validation-error v-bind:validation="v$.password" />
        </div>

        <div class="text-center">
            <button class="btn btn-primary my-2" v-on:click="handleAuth">Zaloguj</button>
        </div>
    </div>
</template>
<script>
import { required } from "@vuelidate/validators"
import useValidate from "@vuelidate/core"
import { mapActions, mapState } from "vuex"
import { reactive, computed } from "vue"
import ValidationError from "../ValidationError"
export default {
    components: { ValidationError },
    data: function() {
        return { showFailureMessage: false }
    },
    setup() {
        const state = reactive({
            username: null,
            password: null,
        })

        const rules = computed(() => {
            return {
                username: { required },
                password: { required }
            }
        })

        const v$ = useValidate(rules, state)
        return {
            v$,
            state
        }
    },
    computed: {
        ...mapState({authenticated: state => state.auth.authenticated})
    },
    methods: {
        ...mapActions(["authenticate"]),
        async handleAuth() {
            this.v$.$touch()
            if (!this.v$.$invalid) {
                await this.authenticate({
                    name: this.state.username,
                    password: this.state.password 
                })
            }
            if (this.authenticated) {
                this.$router.push("/admin")
            } else {
                this.showFailureMessage = true
            }
        }
    }
}
</script>