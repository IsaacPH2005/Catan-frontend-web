<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h2 class="card-title">Roles</h2>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 col-md-8">
                                <input type="search" class="form-control" placeholder="Buscar...">
                            </div>
                            <div class="col-12 col-md-4 text-center">
                                <button type="button" class="btn btn-primary" @click="agregarRol()">Agregar <i
                                        class="fas fa-plus ms-2"></i></button>
                            </div>
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-hover table-striped">
                                        <thead class="table-success">
                                            <tr>
                                                <th class="text-center">item</th>
                                                <th class="text-center">Rol</th>
                                                <th class="text-center">Estado</th>
                                                <th class="text-center">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in roles" :key="item.id">
                                                <td class="text-center">{{ index + 1 }}</td>
                                                <td class="text-center">{{ item.name }}</td>
                                                <td class="text-center">
                                                    <span class="badge bg-success">Activo</span>
                                                </td>
                                                <td class="text-center">
                                                    <div class="btn-group btn-group-sm" style="cursor: pointer;">
                                                        <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"
                                                            @click="mostrarModalDetalle(item.id)"></i>
                                                        <i class="fas fa-pencil mx-1 text-warning fa-lg fs-5 btn-action cursor-pointer"
                                                            @click="mostrarModalEdicion(item.id)"></i>
                                                        <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer fa-trash text-danger"
                                                            @click="eliminaRol(item.id)"></i>
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
    <div class="modal fade" id="roleModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
        aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-title-notification">{{ tituloModal }}</h5>
                        <button type="button" class="btn-close text-dark" aria-label="Close" @click="cerrarModal()">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="password" class="form-label font-weight-bolder text-sm">Nombre<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" v-model="rol.nombre"
                                :disabled="isDisabled || !rol.modificacion">
                            <small v-if="!rol.modificacion" class="text-danger fst-italic text-xs"><i
                                    class="fas fa-times me-1"></i>Este nombre de rol no se puede modificar</small>
                            <small v-if="errors.nombre" class="text-danger fst-italic text-xs"><i
                                    class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                        </div>
                        <h4 class="text-center py-2">Permisos</h4>
                        <div class="card mb-3 shadow" v-for="(permisos, grupo) in grupos" :key="grupo">
                            <div class="card-header p-2 z-index-1 align-middle">
                                <h5 class="d-flex justify-content-between"> {{ grupo }}
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox"
                                            @change="seleccionarTodos(grupo, $event)" :disabled="isDisabled">
                                    </div>
                                </h5>
                            </div>
                            <div class="card-body pt-2">
                                <div class="row mt-3">
                                    <div class="col-6 my-2" v-for="(permiso) in permisos" :key="permiso.id">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" :value="permiso.name"
                                                v-model="permisosSeleccionados[grupo]" :disabled="isDisabled">
                                            <label class="form-check-label" for="flexSwitchCheckDefault">{{ permiso.name
                                                }}</label>
                                        </div>
                                        <small v-if="errors.permisos" class="text-danger fst-italic text-xs"><i
                                            class="fas fa-times me-1"></i>{{ errors.permisos[0] }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" v-show="isDisabled"
                            @click="cerrarModal()">Cerrar</button>
                        <button type="button" class="btn btn-danger" v-show="!isDisabled"
                            @click="cerrarModal()">Cancelar</button>
                        <button type="button" class="btn btn-primary" v-show="!isDisabled"
                            @click="editarRol()">Modificar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { actualizarRolConPermisos, eliminarRol, mostrarPermisos, mostrarRolConPermisos, mostrarRoles } from '@/services/RolesPermisosService';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
onMounted(() => {
    modal = document.getElementById('roleModal');
    instanciaModal = new Modal(modal);
    listarRoles();
    listarPermisos();
})
let modal = null;
let instanciaModal = null;
const router = useRouter();
const roles = ref(null);
const tituloModal = ref("");
const rol = ref("");
const grupos = ref(null);
const permisosSeleccionados = ref({});
const isDisabled = ref(true);
const errors = ref({});
const cerrarModal = () => {
    instanciaModal.hide();
}
const listarRoles = async () => {
    try {
        const { data } = await mostrarRoles();
        roles.value = data.datos
        console.log(roles.value);
    } catch (error) {
        console.log(error);
    }
}
const listarPermisos = async () => {
    try {
        const { data } = await mostrarPermisos();
        grupos.value = data.datos;
        for (let grupoNombre in grupos.value) {
            permisosSeleccionados.value[grupoNombre] = [];
        }
    } catch (error) {
        console.log(error)
    }
}
const seleccionarTodos = (grupoNombre, event) => {
    if (event.target.checked) {
        permisosSeleccionados.value[grupoNombre] = grupos.value[grupoNombre].map(permiso => permiso.name);
    } else {
        permisosSeleccionados.value[grupoNombre] = [];
    }
}
const agregarRol = () => {
    router.push('/roles-form');
}
const eliminaRol = async (id) => {
    Swal.fire({
        title: "Estas seguro?",
        text: "Estas seguro de eliminar este registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, eliminar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const { data } = await eliminarRol(id);
                listarRoles();
            } catch (error) {
                console.log(error);
            }
        }
    });
}
const mostrarModalEdicion = async (id) => {
    errors.value = {};
    tituloModal.value = "Editar rol";
    isDisabled.value = false;
    try {
        const { data } = await mostrarRolConPermisos(id);
        console.log(data);
        rol.value = data.datos;
        let permisosRol = data.datos.permisos;
        for (let grupo in permisosRol) {
            let nombres = permisosRol[grupo].map(permiso => permiso.name);
            permisosSeleccionados.value[grupo] = nombres;
        }
    } catch (error) {
        console.log(error);
    }
    instanciaModal.show();
}
const editarRol = async () => {
    let seleccionados = Object.values(permisosSeleccionados.value).flat();
    try {
        let formulario = {
            nombre: rol.value.nombre,
            permisos: seleccionados
        };
        const { data } = await actualizarRolConPermisos(rol.value.id, formulario);
        cerrarModal();
        listarRoles();
        Swal.fire({
            icon: "success",
            title: "Bien",
            text: "Datos actualizados correctamente!",
        });
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
        } else {
            console.log(error);
        }
    }
}
const mostrarModalDetalle = async (id) => {
    errors.value = {};
    tituloModal.value = "Detalle rol";
    isDisabled.value = true;
    try {
        const { data } = await mostrarRolConPermisos(id);
        rol.value = data.datos;
        let permisosRol = data.datos.permisos;
        for (let grupo in permisosRol) {
            let nombres = permisosRol[grupo].map(permiso => permiso.name);
            permisosSeleccionados.value[grupo] = nombres;
        }
    } catch (error) {
        console.log(error);
    }
    instanciaModal.show();
}
</script>
<style scoped>
@import url('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
</style>