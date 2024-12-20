<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card mt-5">
                    <div class="card-header bg-primary-subtle">
                        <h2 class="card-title">Usuarios registrados</h2>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 col-md-8">
                                <input type="search" class="form-control" placeholder="Buscar..." v-model="busqueda"
                                    @input="listarUsuarios()">
                            </div>
                            <div class="col-12 col-md-4 text-center">
                                <button type="button" class="btn btn-primary" @click="agregarUsuario()">Agregar <i
                                        class="fas fa-plus ms-2"></i></button>
                            </div>
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-hover table-striped">
                                        <thead class="table-primary">
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Correo electrónico</th>
                                                <th>Contacto</th>
                                                <th>Rol</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in usuarios" :key="item.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ item.datos_generales?.nombre }} {{ item.datos_generales?.apellido
                                                    }}</td>
                                                <td>{{ item.email }}</td>
                                                <td>{{ item.datos_generales?.telefono }}</td>
                                                <td v-if="item.roles && item.roles.length > 0">{{ item.roles[0].name }}
                                                </td>
                                                <td v-else>Sin rol</td>
                                                <td>
                                                    <span class="badge"
                                                        :class="{ 'bg-danger': item.is_deleted, 'bg-success': !item.is_deleted }">
                                                        {{ item.is_deleted ? 'Inactivo' : 'Activo' }}</span>
                                                </td>
                                                <td>
                                                    <div class="btn-group btn-group-sm" style="cursor: pointer;">
                                                        <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action"
                                                            @click="mostrarDetalleUsuario(item.id)"></i>
                                                        <i class="fas fa-pencil mx-1 text-warning fa-lg fs-5 btn-action cursor-pointer"
                                                            @click="mostrarEditarUsuario(item.id)"></i>
                                                        <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                                                            :class="{ 'fa-check text-success': item.is_deleted, 'fa-trash text-danger': !item.is_deleted }"
                                                            @click="borrarUser(item)"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="col-12">
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination justify-content-center">
                                                <li class="page-item">
                                                    <button type="button" class="page-link"
                                                        :class="paginacion.paginaAnterior == null ? 'disabled' : ''"
                                                        aria-label="Previous" @click="paginaAnterior">
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </button>
                                                </li>
                                                <li class="page-item">
                                                    <button type="button" class="page-link bg-primary text-white">
                                                        {{ paginacion.paginaActual }}
                                                    </button>
                                                </li>
                                                <li class="page-item">
                                                    <button type="button" class="page-link"
                                                        :class="paginacion.paginaSiguiente == null ? 'disabled' : ''"
                                                        aria-label="Next" @click="paginaSiguiente">
                                                        <span aria-hidden="true">&raquo;</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="usuariosModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
        aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-title-notification">Nuevo Usuario</h5>
                        <button type="button" class="btn-close text-dark" aria-label="Close" @click="cerrarModal()">
                        </button>
                    </div>
                    <div class="modal-body gy-4">
                        <div class="form-group">
                            <label for="password" class="form-label font-weight-bolder text-sm">Nombre(s)<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" v-model="registro.nombre">
                            <small v-if="errors.nombre" class="text-danger fst-italic text-xs"><i
                                    class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                        </div>
                        <div class="form-group">
                            <label for="password" class="form-label font-weight-bolder text-sm">Apellido(s)<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" v-model="registro.apellido">
                            <small v-if="errors.apellido" class="text-danger fst-italic text-xs"><i
                                    class="fas fa-times me-1"></i>{{ errors.apellido[0] }}</small>
                        </div>
                        <div class="form-group">
                            <label for="password" class="form-label font-weight-bolder text-sm">Correo electrónico<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" v-model="registro.email">
                            <small v-if="errors.email" class="text-danger fst-italic text-xs"><i
                                    class="fas fa-times me-1"></i>{{ errors.email[0] }}</small>
                        </div>
                        <div class="form-group">
                            <label for="password" class="form-label font-weight-bolder text-sm">Contraseña<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" v-model="registro.password">
                            <small v-if="errors.password" class="text-danger fst-italic text-xs"><i
                                    class="fas fa-times me-1"></i>{{ errors.password[0] }}</small>
                        </div>
                        <div class="form-group">
                            <label for="password" class="form-label font-weight-bolder text-sm">Rol<span
                                    class="text-danger fst-italic">*</span></label>
                            <select class="form-select" aria-label="Default select example" v-model="registro.rol">
                                <option value="" selected>Seleccione</option>
                                <option v-for="rol in roles" :key="rol.id" :value="rol.name"> {{ rol.name }} </option>
                            </select>
                            <small v-if="errors.rol" class="text-danger fst-italic text-xs"><i
                                    class="fas fa-times me-1"></i>{{ errors.rol[0] }}</small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="cerrarModal()">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="guardarUsuario()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="editarUsuarioModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
        aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-title-notification">Editar perfil de usuario</h5>
                        <button type="button" class="btn-close text-dark" aria-label="Close"
                            @click="cerrarModalEdicion()"></button>
                    </div>
                    <div class="modal-body">
                        <p class="text-uppercase text-center">INFORMACIÓN DE USUARIO</p>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Nombre(s)<span
                                            class="text-danger fst-italic">*</span></label>
                                    <input class="form-control" type="text" v-model="datos_generales.nombre">
                                    <small v-if="errors_datos_generales.nombre"
                                        class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{
                                            errors_datos_generales.nombre[0] }}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre"
                                        class="form-label font-weight-bolder text-sm">Apellido(s)</label>
                                    <input class="form-control" type="email" v-model="datos_generales.apellido">
                                    <small v-if="errors_datos_generales.apellido"
                                        class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{
                                            errors_datos_generales.apellido[0] }}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Documento de
                                        identidad</label>
                                    <input class="form-control" type="text" v-model="datos_generales.ci">
                                    <small v-if="errors_datos_generales.ci" class="text-danger fst-italic text-xs"><i
                                            class="fas fa-times me-1"></i>{{ errors_datos_generales.ci[0] }}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Teléfono</label>
                                    <input class="form-control" type="text" v-model="datos_generales.telefono">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Dirección</label>
                                    <input class="form-control" type="text" v-model="datos_generales.direccion">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Ciudad</label>
                                    <input class="form-control" type="text" v-model="datos_generales.ciudad">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">País</label>
                                    <input class="form-control" type="text" v-model="datos_generales.pais">
                                </div>
                            </div>
                        </div>
                        <hr class="horizontal dark">
                        <p class="text-uppercase text-center">CREDENCIALES</p>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Correo
                                        electrónico<span class="text-danger fst-italic">*</span></label>
                                    <input class="form-control" type="text" v-model="user.email">
                                    <small v-if="errors_credenciales.email" class="text-danger fst-italic text-xs"><i
                                            class="fas fa-times me-1"></i>{{ errors_credenciales.email[0] }}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Password</label>
                                    <input class="form-control" type="text" v-model="credenciales.password">
                                    <small v-if="errors_credenciales.password" class="text-danger fst-italic text-xs"><i
                                            class="fas fa-times me-1"></i>{{ errors_credenciales.password[0] }}</small>
                                </div>
                            </div>
                        </div>
                        <hr class="horizontal dark">
                        <p class="text-uppercase text-center">ROL</p>
                        <div class="row">
                            <div class="col-6" v-for="(rol, index) in roles" :key="index">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" :value="rol.name"
                                        v-model="opcionesSeleccionadas">
                                    <label class="form-check-label" for="flexSwitchCheckDefault">{{ rol.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="cerrarModalEdicion()">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="editarDatosGenerales()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { asignarRolesUsuario, mostrarRoles } from '@/services/RolesPermisosService';
import { actualizarCredencialesAdmin, actualizarDatosGeneralesAdmin, borrarUsuario, mostrarUsuario, mostrarUsuariosPaginados, registroUsuarioRol } from '@/services/UserService';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
onMounted(() => {
    listarUsuarios();
    listarRolesDisponibles();
    modal = document.getElementById('usuariosModal');
    instanciaModal = new Modal(modal);
    modalEditar = document.getElementById('editarUsuarioModal');
    instanciaEditarModal = new Modal(modalEditar);
})
const usuarios = ref(null);
const paginacion = ref({
    paginaActual: 1,
    paginaAnterior: null,
    paginaSiguiente: null
});
const busqueda = ref('');
const roles = ref([]);
let modal = null;
let instanciaModal = null;
let modalEditar = null;
let instanciaEditarModal = null;
const registro = ref({});
const errors = ref({});
const credenciales = ref({
    email: null,
    password: '',
    password_confirmation: ''
});
let usuario_id = null;
const opcionesSeleccionadas = ref([]);
const user = ref({});
const datos_generales = ref({});
const errors_datos_generales = ref({});
const errors_credenciales = ref({});
const listarUsuarios = async () => {
    try {
        const { data } = await mostrarUsuariosPaginados(paginacion.value.paginaActual, busqueda.value);
        usuarios.value = data.datos.data;
        paginacion.value.paginaAnterior = data.datos.prev_page_url;
        paginacion.value.paginaSiguiente = data.datos.next_page_url;
        console.log(usuarios.value);
    } catch (error) {
        console.log(error);
    }
}
const paginaSiguiente = async () => {
    if (paginacion.value.paginaSiguiente != null) {
        paginacion.value.paginaActual++;
        listarUsuarios();
    }
}
const paginaAnterior = async () => {
    if (paginacion.value.paginaAnterior != null) {
        paginacion.value.paginaActual--;
        listarUsuarios();
    }
}

const borrarUser = async (usuario) => {
    try {
        const { data } = await borrarUsuario(usuario.id);
        usuario.is_deleted = !usuario.is_deleted;
        Swal.fire({
            icon: "success",
            title: "Bien",
            text: "Estado modificado correctamente!",
        });
    } catch (error) {
        console.log(error);
    }
}
const listarRolesDisponibles = async () => {
    try {
        const { data } = await mostrarRoles();
        roles.value = data.datos;
        console.log(roles.value);
    } catch (error) {
        console.log(error);
    }
}
const agregarUsuario = () => {
    listarRolesDisponibles();
    instanciaModal.show();
}
const guardarUsuario = async () => {
    try {
        let nuevo = {
            nombre: registro.value.nombre,
            apellido: registro.value.apellido,
            email: registro.value.email,
            password: registro.value.password,
            password_confirmation: registro.value.password,
            rol: registro.value.rol
        }
        const { data } = await registroUsuarioRol(nuevo);
        paginacion.value.paginaActual = 1;
        listarUsuarios();
        instanciaModal.hide();
        registro.value = {};
        errors.value = {};
        Swal.fire({
            icon: "success",
            title: "Bien",
            text: "Usuario creado correctamente!",
        });
    } catch (error) {
        if (error.response.status) {
            errors.value = error.response.data.errors;
        } else {
            console.log(error);
        }
    }
}
const mostrarDetalleUsuario = async (idUsuario) => {
    instanciaEditarModal.show();
    try {
        const { data } = await mostrarUsuario(idUsuario);
        console.log(data);
        user.value = data.datos;
        /* perfilCard.value.mostrarDatosUsuario(); */
    } catch (error) {
        console.log(error);
    }
}
const editarDatosGenerales = async () => {
    errors_datos_generales.value = {};
    try {
        let formulario = new FormData();
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
        const { data } = await actualizarDatosGeneralesAdmin(user.value.id, formulario);
        console.log(data);
        await editarCredenciales();
        let formularioRoles = {
            user_id: usuario_id,
            roles: opcionesSeleccionadas.value,
        };
        console.log(formulario);
        const { datos } = await asignarRolesUsuario(formularioRoles);
        cerrarModalEdicion();
        user.value = {};
        credenciales.value.email = null;
        credenciales.value.password = '';
        credenciales.value.password_confirmation = '';
        datos_generales.value = {};
        Swal.fire({
            icon: "success",
            title: "Bien",
            text: "Datos actualizados correctamente!",
        });
        listarUsuarios();
    } catch (error) {
        if (error.response.status == 422) {
            errors_datos_generales.value = error.response.data.errors;
        } else {
            console.log(error);
        }
    }
}
const editarCredenciales = async () => {
    errors_credenciales.value = {};
    try {
        if (credenciales.value.password == '') {
            const { data } = await actualizarCredencialesAdmin(user.value.id, { email: user.value.email });
        } else {
            credenciales.value.password_confirmation = credenciales.value.password;
            const { data } = await actualizarCredencialesAdmin(user.value.id, credenciales.value);
        }
        credenciales.value.password = '';
        credenciales.value.password_confirmation = '';
    } catch (error) {
        if (error.response.status == 422) {
            errors_credenciales.value = error.response.data.errors;
        } else {
            console.log(error);
        }
    }
}
const mostrarEditarUsuario = async (idUsuario) => {
    opcionesSeleccionadas.value = [];
    instanciaEditarModal.show();
    try {
        const { data } = await mostrarUsuario(idUsuario);
        user.value = data.datos;
        credenciales.value.email = user.value.email;
        datos_generales.value = data.datos.datos_generales;
        usuario_id = idUsuario;
        console.log(usuario_id)
        data.datos.roles.forEach(element => {
            opcionesSeleccionadas.value.push(element.name);
        });
    } catch (error) {
        console.log(error);
    }
}
const cerrarModalEdicion = () => {
    instanciaEditarModal.hide();
    errors_credenciales.value = {};
    errors_datos_generales.value = {};
}
const cerrarModal = () => {
    instanciaModal.hide();
    errors.value = ref({});
    registro.value = {};
}
</script>
<style scoped>
@import url('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
</style>