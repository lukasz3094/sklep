<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col bg-secondary text-white p-1 fs-4">
                <a class="navbar-brand">Panel administracyjny</a>
            </div>
        </div>
    
        <div class="row">
            <div class="col-3 gap-2 bg-secondary p-2">
                <router-link to="/admin/products" class="d-block btn btn-primary"
                        active-class="active">
                    Produkty
                </router-link>

                <router-link to="/admin/orders" class="d-block my-2 btn btn-primary"
                        active-class="active">
                    Zamówienia
                </router-link>
            </div>
            <div class="col-9 p-2">
                <router-view />
            </div>
        </div>
    </div>
</template>