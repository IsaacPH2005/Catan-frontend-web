<template>
    <section class="vh-100" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black shadow p-3 mb-5 bg-body-tertiary rounded" style="border-radius: 25px;">
                        <div class="card-body p-md-5">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                        <div class="col-11 form-floating">
                                            <input type="text" class="form-control" id="floatingInput"
                                                placeholder="name@example.com" v-model="credenciales.nombre">
                                            <label for="floatingInput">Nombre </label>
                                            <small v-if="errors.nombre" class="text-danger fst-italic text-xs"><i
                                                class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                        <div class="col-11 form-floating">
                                            <input type="text" class="form-control" id="floatingInput"
                                                placeholder="name@example.com" v-model="credenciales.apellido">
                                            <label for="floatingInput">apellido </label>
                                            <small v-if="errors.apellido" class="text-danger fst-italic text-xs"><i
                                                class="fas fa-times me-1"></i>{{ errors.apellido[0] }}</small>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                        <div class="col-11 form-floating">
                                            <input type="email" class="form-control" id="floatingInput"
                                                placeholder="name@example.com" v-model="credenciales.email">
                                            <label for="floatingInput">Email address</label>
                                            <small v-if="errors.email" class="text-danger fst-italic text-xs"><i
                                                class="fas fa-times me-1"></i>{{ errors.email[0] }}</small>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                        <div class="col-11 form-floating">
                                            <input type="email" class="form-control" id="floatingInput"
                                                placeholder="name@example.com" v-model="credenciales.password">
                                            <label for="floatingInput">Contraseña</label>
                                            <small v-if="errors.password" class="text-danger fst-italic text-xs"><i
                                                class="fas fa-times me-1"></i>{{ errors.password[0] }}</small>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row align-items-center mb-4">
                                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                        <div class="col-11 form-floating">
                                            <input type="email" class="form-control" id="floatingInput"
                                                placeholder="name@example.com"
                                                v-model="credenciales.password_confirmation">
                                            <label for="floatingInput">Confirmar contraseña</label>
                                        </div>
                                    </div>

                                    <div class="form-check d-flex justify-content-center mb-4">
                                        <input class="form-check-input me-2" type="checkbox" value=""
                                            id="form2Example3c" />
                                        <label class="form-check-label" for="form2Example3">
                                            Ya tienes cuenta ? <a href="#!">Login</a>
                                        </label>
                                    </div>
                                    <div class="d-flex justify-content-center ">
                                        <button type="button" class="btn btn-primary btn-lg col-12" v-on:click="registrar()">Register</button>
                                    </div>
                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                        class="img-fluid" alt="Sample image">

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
import { registroUsuario } from '@/services/AuthService';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const credenciales = ref({});
const errors = ref({});
const registrar = async () => {
    errors.value = {};
    try {
        const { data } = await registroUsuario(credenciales.value);
        console.log(data);
        Swal.fire({
            icon: "success",
            title: "Bien",
            text: "Usuario creado correctamente!",
        });
        router.push({ path: "/login" });
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors
        }else{
            console.log(error);
        }
    }
}
</script>
<style></style>