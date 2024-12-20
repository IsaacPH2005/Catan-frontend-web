<template>
    <section class="h-100 gradient-form" style="background-color: #eee;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-10">
                    <div class="card rounded-3 text-black">
                        <div class="row g-0">
                            <div class="col-lg-6">
                                <div class="card-body p-md-5 mx-md-4">
                                    <div class="row gy-2">
                                        <div class="text-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                style="width: 185px;" alt="logo">
                                            <h4 class="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                                        </div>
                                        <p>Please login to your account</p>

                                        <div class="form-floating mb-3">
                                            <input type="email" class="form-control" :class="{ 'border-danger': errors.email }" id="floatingInput"
                                                placeholder="name@example.com" v-model="formulario.email">
                                            <label for="floatingInput" class="ms-2">Email address</label>
                                            <small v-if="errors.email" class="text-danger fst-italic text-xs"><i
                                                class="fas fa-times me-1"></i>{{ errors.email[0] }}</small>
                                        </div>

                                        <div class="form-floating">
                                            <input type="password" class="form-control" :class="{ 'border-danger': errors.password }" id="floatingPassword"
                                                placeholder="Password" v-model="formulario.password">
                                            <label for="floatingPassword" class="ms-2">Password</label>
                                            <small v-if="errors.email" class="text-danger fst-italic text-xs"><i
                                                class="fas fa-times me-1"></i>{{ errors.email[0] }}</small>
                                        </div>
                                        <div class="text-center pt-1 mb-5 pb-1">
                                            <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                type="button" @click="login()">Log
                                                in</button>
                                        </div>

                                        <div class="d-flex align-items-center justify-content-center pb-4">
                                            <p class="mb-0 me-2">Don't have an account?</p>
                                            <button type="button" class="btn btn-outline-danger">Create new</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                    <h4 class="mb-4">We are more than just a company</h4>
                                    <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                        do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud
                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { iniciarSesion } from '@/services/AuthService';
import { ref } from 'vue';
import { Buffer } from "buffer";
import { useRouter } from 'vue-router';
const router = useRouter();
const formulario = ref({});
 const errors = ref({});
 const login = async () => {
    try {
        errors.value = {}; 
        const { data } = await iniciarSesion(formulario.value);
        console.log(data);
        const tokenEncrypt = Buffer.from(data.access_token).toString("base64");
        localStorage.setItem("token", tokenEncrypt);
        let datosUsuario = {
            id: data.user.id,
            nombre: data.user.datos_generales.nombre,
            apellido: data.user.datos_generales.apellido,
            email: data.user.email,
            image: data.user.datos_generales.foto_perfil,
            role: data.user.roles[0].name,
        };
        localStorage.setItem("usuario", JSON.stringify(datosUsuario));
        router.push({ path: "/profile" });
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status) {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
            } else {
                console.log(error);
            }
        } else {
            console.log('Error al obtener la respuesta');
        }
    }
}
</script>
<style>
.gradient-custom-2 {
    /* fallback for old browsers */
    background: #fccb90;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
}

@media (min-width: 768px) {
    .gradient-form {
        height: 100vh !important;
    }
}

@media (min-width: 769px) {
    .gradient-custom-2 {
        border-top-right-radius: .3rem;
        border-bottom-right-radius: .3rem;
    }
}
</style>