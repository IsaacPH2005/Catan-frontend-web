<!-- <template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h1 class="card-title">Editar perfil</h1>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 col-md-6">
                                <label for="nombre" class="label-form">Nombre :</label>
                                <input type="text" id="nombre" class="form-control" v-model="datos_generales.nombre">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="apellido" class="label-form">Apellido :</label>
                                <input type="text" id="apellido" class="form-control"
                                    v-model="datos_generales.apellido">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="celular" class="label-form">Celular :</label>
                                <input type="tel" id="celular" class="form-control" v-model="datos_generales.telefono">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="ci" class="label-form">DNI :</label>
                                <input type="tel" id="ci" class="form-control" v-model="datos_generales.ci">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="fecha_nacimiento" class="label-form">Fecha de nacimiento :</label>
                                <input type="date" id="fecha_nacimiento" class="form-control">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="nombre" class="form-label font-weight-bolder text-sm">Dirección</label>
                                <input class="form-control" type="text" v-model="datos_generales.direccion">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="nombre" class="form-label font-weight-bolder text-sm">Ciudad</label>
                                <input class="form-control" type="text" v-model="datos_generales.ciudad">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="nombre" class="form-label font-weight-bolder text-sm">País</label>
                                <input class="form-control" type="text" v-model="datos_generales.pais">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4 mt-4">
                <div class="card">
                    <div class="card-header">
                        <h1 class="card-title"> Foto perfil</h1>
                    </div>
                    <div class="card-body">
                        <img src="data:image/png;base64,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"
                            alt="Foto de Perfil" class="img-fluid rounded-circle">
                        <div class="text-center">
                            <input type="file" id="foto" class="form-control" @change="cargarFoto">
                            <button type="button" class="btn btn-primary mt-3" @click="guardarCambios">Guardar
                                cambios</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { mostrarUsuario } from '@/services/UserService';
import { onMounted, ref } from 'vue';

onMounted(() => {
    mostrarDatosUsuario();
})
const user = ref({});
const datos_generales = ref({});
const credenciales = ref({
    email: null,
    password: '',
    password_confirmation: ''
});
const urlImage = ref(null);
const image = ref(null);
const mostrarDatosUsuario = async () => {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuario);
    try {
        const { data } = await mostrarUsuario(usuario.id);
        user.value = data.datos;
        credenciales.value.email = user.value.email;
        datos_generales.value = data.datos.datos_generales;
        console.log(credenciales.value);
    } catch (error) {
        console.log(error);
    }
}
const obtenerImagen = (event) => {
    image.value = event.target.files[0];
    if (image.value != null) {
        const reader = new FileReader();
        reader.onload = (e) => urlImage.value = e.target.result;
        reader.readAsDataURL(image.value);
    }
}
</script>
<style></style> -->
<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h3 class="mb-0 text-center mb-2">Editar perfil</h3>
                        <hr class="horizontal dark">
                        <p class="text-uppercase text-center">INFORMACIÓN DE USUARIO</p>
                        <div class="row gy-3">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Nombre(s)<span class="text-danger fst-italic">*</span></label>
                                    <input class="form-control" type="text" v-model="datos_generales.nombre">
                                    <small v-if="errors_datos_generales.nombre" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors_datos_generales.nombre[0]}}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Apellido(s)</label>
                                    <input class="form-control" type="email" v-model="datos_generales.apellido">
                                    <small v-if="errors_datos_generales.apellido" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors_datos_generales.apellido[0]}}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Dirección de correo electrónico<span class="text-danger fst-italic">*</span></label>
                                    <input class="form-control" type="text" v-model="user.email">
                                    <small v-if="errors_credenciales.email" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors_credenciales.email[0]}}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Número de documento de identidad</label>
                                    <input class="form-control" type="text" v-model="datos_generales.ci">
                                    <small v-if="errors_datos_generales.ci" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors_datos_generales.ci[0]}}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Foto de perfil</label>
                                    <input class="form-control" type="file" accept="jpg, pnp, jpeg" @change="obtenerImagen($event)">                                    
                                </div>
                            </div>
                        </div>
                        <hr class="horizontal dark">
                        <p class="text-uppercase text-center">INFORMACIÓN DE CONTACTO</p>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Dirección</label>
                                    <input class="form-control" type="text" v-model="datos_generales.direccion">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Ciudad</label>
                                    <input class="form-control" type="text" v-model="datos_generales.ciudad">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">País</label>
                                    <input class="form-control" type="text" v-model="datos_generales.pais">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="telefono" class="form-label font-weight-bolder text-sm">Teléfono</label>
                                    <input class="form-control" id="telefono" v-model="datos_generales.telefono">
                                </div>
                            </div>
                        </div>
                        <hr class="horizontal dark">
                        <div class="row">
                            <div class="col-md-12 d-flex justify-content-center">
                                <button type="button" class="btn btn-primary me-2" @click="editarDatosGenerales()">Guardar cambios</button>
                                <button type="button" class="btn btn-primary ms-2" @click="mostrarModal()">Modificar contraseña</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <PerfilCard ref="perfilCard" v-if="user.id" :idUsuario="user.id" /> 
            </div>
        </div>
    </div>
    <div class="modal fade" id="cambioPasswordModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
        aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="modal-title-notification">Modificar contraseña</h6>
                        <button type="button" class="btn-close text-dark" aria-label="Close" @click="cerrarModal()">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="password" class="form-label font-weight-bolder text-sm">Nueva contraseña<span class="text-danger fst-italic">*</span></label>
                            <input type="password" class="form-control" v-model="credenciales.password">
                            <small v-if="errors_credenciales.password" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors_credenciales.password[0]}}</small>                          
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation" class="form-label font-weight-bolder text-sm">Confirme nueva contraseña<span class="text-danger fst-italic">*</span></label>
                            <input type="password" class="form-control" v-model="credenciales.password_confirmation">                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="cerrarModal()">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="editarCredenciales()">Modificar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script setup>
    import { onMounted, ref } from "vue";
    import { mostrarUsuario, actualizarCredenciales, actualizarDatosGenerales } from "@/services/UserService.js";
import PerfilCard from "@/components/PerfilCard.vue";
    import { Modal } from 'bootstrap';
    import Swal from 'sweetalert2';

    const user = ref({});
    const image = ref(null);
    const urlImage = ref(null);
    const perfilCard = ref(null);
    const datos_generales = ref({});
    let modal = null;
    let instanciaModal = null;
    const isModalVisible = ref(false);
    const credenciales = ref({
        email: null,
        password: '',
        password_confirmation: ''
    });
    const errors_datos_generales = ref({});
    const errors_credenciales = ref({});
    const mostrarDatosUsuario = async () => {
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        try {
            const { data } = await mostrarUsuario(usuario.id);
            user.value = data.datos;
            credenciales.value.email = user.value.email;
            datos_generales.value = data.datos.datos_generales;
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerImagen = (event) => {
        image.value = event.target.files[0];
        if (image.value != null) {
            const reader = new FileReader();
            reader.onload = (e) => urlImage.value = e.target.result;
            reader.readAsDataURL(image.value);
        }
    }
    const editarDatosGenerales = async () => {
        errors_datos_generales.value = {};
        try {
            let formulario = new FormData();
            if(image.value != null) {
                formulario.append('foto_perfil', image.value);
            }
            formulario.append('nombre', datos_generales.value.nombre);
            formulario.append('apellido', datos_generales.value.apellido);
            formulario.append('ci', datos_generales.value.ci);
            formulario.append('direccion', datos_generales.value.direccion);
            formulario.append('ciudad', datos_generales.value.ciudad);
            formulario.append('pais', datos_generales.value.pais);
            formulario.append('telefono', datos_generales.value.telefono);
            formulario.append('_method', 'PUT');
            const listaNulos = [];
            for (let [key, value] of formulario.entries()) {
                if (value == '' || value == 'null') {
                    listaNulos.push(key);
                }
            }
            listaNulos.forEach(key => formulario.delete(key));
            const { data } = await actualizarDatosGenerales(formulario);
            console.log(data);
            await editarCredenciales();
            let datosUsuario = {
                id: data.datos.id,
                nombre: data.datos.nombre,
                apellido: data.datos.apellido,
                email: user.value.email,
                image: data.datos.foto_perfil
            }         
            console.log(datosUsuario);  
            localStorage.setItem('usuario', JSON.stringify(datosUsuario));
            perfilCard.value.mostrarDatosUsuario();
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Datos actualizados correctamente!",
            });
        } catch (error) {
            if (error.response.status == 422) {
                errors_datos_generales.value = error.response.data.errors;
            } else {
                console.log(error);
            }
        }
    }
    const editarCredenciales = async () => {
        try {
            if(credenciales.value.password == '') {
                const { data } = await actualizarCredenciales({ email: user.value.email });
            } else {
                const { data } = await actualizarCredenciales(credenciales.value);
            }
            credenciales.value.password = '';
            credenciales.value.password_confirmation = '';
            if(isModalVisible) {
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Contraseña actualizada correctamente!",
            });
            }
            cerrarModal();            
        } catch (error) {
            if (error.response.status == 422) {
                errors_credenciales.value = error.response.data.errors;
            } else {
                console.log(error);
            }
        }
    }
    const mostrarModal = () => {
        errors_credenciales.value = {};
        instanciaModal.show();
        isModalVisible.value = true;
    }
    const cerrarModal = () => {
        credenciales.value.password = '';
        credenciales.value.password_confirmation = '';
        instanciaModal.hide();
        isModalVisible.value = false;
    }
    onMounted(() => {
        modal = document.getElementById('cambioPasswordModal');
        instanciaModal = new Modal(modal);
        mostrarDatosUsuario();
    })
</script>

<style scoped>
@import url('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
</style>