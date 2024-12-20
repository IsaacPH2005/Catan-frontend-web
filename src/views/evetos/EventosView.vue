<template>
    <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h1 class="card-title">Eventos registrados</h1>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 col-md-8">
                                <input type="search" class="form-control">
                            </div>
                            <div class="col-12 col-md-4 text-center">
                                <button type="button" class="btn btn-primary" @click="openModal()">Agregar <i
                                        class="fas fa-plus ms-2"></i></button>
                            </div>
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>item</th>
                                                <th>Nombre</th>
                                                <th>Fecha de inicio</th>
                                                <th>Fecha de fin</th>
                                                <th>Ciudad</th>
                                                <th>Usuario</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in datos" :key="item.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.nombre }}</td>
                                                <td>{{ item.fecha_inicio }}</td>
                                                <td>{{ item.fecha_fin }}</td>
                                                <td>{{ item.ciudad }}</td>
                                                <td>{{ item.users.datos_generales?.nombre }}</td>
                                                <td><span class="badge"
                                                        :class="item.estado == true ? 'bg-success' : 'bg-danger'">{{
                                                            item.estado == true ? 'Activo' : 'Inactivo' }}</span></td>
                                                <td>
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-warning btn-sm"
                                                            @click="mostrar(item.id)">Editar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" :class="posicion != '' ? 'bg-warning text-dark' : 'bg-success text-white'">
                    <span class="h3 modal-title fs-5" id="staticBackdropLabel">{{ posicion != "" ? 'Editar registro' :
                        'Guardar registro' }} </span>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row gy-3">
                        <div class="col-col-12 col-md-6">
                            <label for="nombre" class="label-form">Nombre <small class="text-danger">*</small></label>
                            <input type="text" class="form-control" id="nombre" v-model="form.nombre"
                                :class="{ 'border-danger': errors.nombre }">
                            <small class="text-danger fst-italic text-xs" v-if="errors.nombre"><i
                                    class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                        </div>
                        <div class="col-col-12 col-md-6">
                            <label for="ciudad" class="label-form">Ciudad:</label>
                            <input type="text" class="form-control" id="ciudad" v-model="form.ciudad"
                                :class="{ 'border-danger': errors.ciudad }">
                            <small class="text-danger fst-italic text-xs" v-if="errors.ciudad"><i
                                    class="fas fa-times me-1"></i>{{ errors.ciudad[0] }}</small>
                        </div>
                        <div class="col-col-12 col-md-6">
                            <label for="fecha_inicio" class="label-form">Fecha inicio:</label>
                            <input type="date" class="form-control" id="fecha_inicio" v-model="form.fecha_inicio"
                                :class="{ 'border-danger': errors.fecha_inicio }">
                            <small class="text-danger fst-italic text-xs" v-if="errors.fecha_inicio"><i
                                    class="fas fa-times me-1"></i>{{ errors.fecha_inicio[0] }}</small>
                        </div>
                        <div class="col-col-12 col-md-6">
                            <label for="fecha_fin" class="label-form">Fecha fin:</label>
                            <input type="date" class="form-control" id="fecha_fin" v-model="form.fecha_fin"
                                :class="{ 'border-danger': errors.fecha_fin }">
                            <small class="text-danger fst-italic text-xs" v-if="errors.fecha_fin"><i
                                    class="fas fa-times me-1"></i>{{ errors.fecha_fin[0] }}</small>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn" :class="posicion != '' ? 'btn-warning' : 'btn-success'"
                    @click="guardar()">{{ posicion != '' ? 'Editar' : 'Guardar' }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { indexEventos, showEventos, storeEventos, updateEventos } from '@/services/EventosService';
import { mostrarUsuariosPaginados } from '@/services/UserService';
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';
let modal = null;
let instanciaModal = null;
const datos = ref([]);
const form = ref({});
const posicion = ref('');
const errors = ref({});
const usuarios = ref([]);
onMounted(() => {
    modal = document.getElementById('staticBackdrop');
    instanciaModal = new Modal(modal);
    listar();
    mostrarUsuariosConRolTienda();
})
const openModal = () => {
    form.value = {
        nombre: '',
        fecha_inicio: '',
        fecha_fin: '',
        ciudad: '',
        user_id: '',
    }
    posicion.value = '';
    errors.value = {};
    instanciaModal.show();
}
const closeModal = () => {
    instanciaModal.hide();
}
const listar = async () => {
    try {
        const { data } = await indexEventos('', '');
        datos.value = data.datos.data
        console.log(datos.value);
    } catch (error) {
        console.log(error);
    }
}
const guardar = async () => {
    errors.value = {};
    try {
        if (posicion.value != '') {
            const { data } = await updateEventos(posicion.value, form.value);
            console.log(data);
            closeModal();
            listar();
        } else {
            const { data } = await storeEventos(form.value);
            console.log(data);
            closeModal();
            listar();
        }
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
        } else {
            console.log(error);
        }
    }
}
const mostrarUsuariosConRolTienda = async () => {
    try {
        const { data } = await mostrarUsuariosPaginados('', '');
        usuarios.value = data.datos.data;
        console.log(usuarios.value);
    } catch (error) {
        console.log(error);
    }
}
const mostrar = async (id) => {
    try {
        const { data } = await showEventos(id);
        form.value = {
            nombre: data.datos.nombre,
            fecha_inicio: data.datos.fecha_inicio,
            fecha_fin: data.datos.fecha_fin,
            ciudad: data.datos.ciudad,
            user_id: data.datos.user_id,
        }
        console.log(form.value);
        instanciaModal.show();
        errors.value = {};
        posicion.value = id;
    } catch (error) {
        console.log(error);
    }
}
</script>
<style scoped>
@import url('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
</style>