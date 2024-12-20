<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-12 col-md-12 text-center my-4">
                <button type="button" class="btn btn-primary" @click="agregar()">Agregar <i
                        class="fas fa-plus ms-1"></i></button>
            </div>
            <div class="col-12">
                <div class="card" v-for="(item, index) in datos" :key="item.id">
                    <div class="card-header d-flex justify-content-between">
                        <h3>{{ item.eventos?.nombre }}</h3>
                        <span v-if="item.eventos && item.eventos.users && item.eventos.users.datos_generales">
                            {{ item.eventos.users.datos_generales.nombre }} {{
                                item.eventos.users.datos_generales.apellido }}
                        </span>
                        <span v-else>Usuario no disponible</span>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 col-md-8">
                                <input type="search" class="form-control" placeholder="Buscar...">
                            </div>
                            <div class="col-12 col-md-4 text-center">
                                <button type="button" class="btn" :class="item.estado ? 'btn-danger' : 'btn-success'"
                                    @click="changeStatusTables(item.id)">
                                    {{ item.estado ? 'Ocultar Tabla' : 'Mostrar Tabla' }}
                                    <i class="fas" :class="item.estado ? 'fa-eye-slash' : 'fa-eye'"></i>
                                </button>
                            </div>
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-striped table-gover">
                                        <thead>
                                            <tr>
                                                <th class="text-center">#</th>
                                                <th class="text-center">Jugadores</th>
                                                <th class="text-center">Poblados</th>
                                                <th class="text-center">Ciudades</th>
                                                <th class="text-center">Logros</th>
                                                <th class="text-center">P.V</th>
                                                <th class="text-center">Puntos</th>
                                                <th class="text-center">Estado</th>
                                                <th class="text-center">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in item.jugadores" :key="item.id">
                                                <td class="text-center">{{ index + 1 }}</td>
                                                <td>
                                                    <div class="text-center">
                                                        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/bf1d52e3-b46b-4c07-9b4f-a1ab8c4e40f8-profile_image-70x70.png"
                                                            class="rounded-circle" width="50px" height="50px" alt=""> {{
                                                                item.user.datos_generales.nombre }} {{
                                                            item.user.datos_generales.apellido }}
                                                    </div>
                                                </td>
                                                <td class="text-center">{{ item.poblados }}</td>
                                                <td class="text-center">{{ item.ciudades }}</td>
                                                <td class="text-center">{{ item.logros }}</td>
                                                <td class="text-center">{{ item.puntos_de_victoria }}</td>
                                                <td class="text-center">{{ item.puntos_total }}</td>
                                                <td class="text-center"><span class="badge"
                                                        :class="item.estado == true ? 'bg-success' : 'bg-danger'">{{
                                                            item.estado == true ? 'Activo' : 'Inactivo' }}</span></td>
                                                <td class="text-center">
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-warning btn-sm"
                                                            @click="mostrar(item.id)">Editar</button>
                                                        <button type="button" class="btn btn-sm"
                                                            :class="item.estado == true ? 'btn-danger' : 'btn-success'"
                                                            @click="changeStatusButtomTables(item.id)">{{ item.estado
                                                                == true ? '🗑' : '✔'
                                                            }}</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="col-12 mt-4" v-if="datos.length > 0">
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination justify-content-center">
                                                <li class="page-item">
                                                    <button type="button" class="page-link"
                                                        :class="!paginacion.paginaAnterior ? 'disabled' : ''"
                                                        aria-label="Previous" @click="paginaAnterior">
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </button>
                                                </li>
                                                <li class="page-item">
                                                    <button type="button" class="page-link bg-gray-700">
                                                        {{ paginacion.paginaActual }} de {{ totalPaginas }}
                                                    </button>
                                                </li>
                                                <li class="page-item">
                                                    <button type="button" class="page-link"
                                                        :class="!paginacion.paginaSiguiente ? 'disabled' : ''"
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
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <label for="evento" class="label-form">Evento <i class="text-danger">*</i></label>
                            <select class="form-select" aria-label="Default select example" v-model="form.evento_id">
                                <option value="" selected>Seleccione</option>
                                <option :value="item.id" v-for="(item, index) in eventos" :key="item.id">{{
                                    item.nombre }}
                                    {{ item.id }}
                                </option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="jugadores" class="label-form">Jugadores <i class="text-danger">*</i></label>
                            <div v-for="(jugador, index) in form.jugadores" :key="index" class="input-group mb-3">
                                <select class="form-select" v-model="jugador.user_id">
                                    <option value="" selected>Seleccione un jugador</option>
                                    <option :value="item.id" v-for="(item, index) in usuarios" :key="item.id">
                                        {{ item.datos_generales.nombre }} {{ item.datos_generales.apellido }}
                                    </option>
                                </select>
                                <button class="btn btn-danger" type="button"
                                    @click="removeJugador(index)">Eliminar</button>
                            </div>
                            <button class="btn btn-secondary" type="button" @click="addJugador">Agregar Jugador</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="storePlayerEvents()">Guardar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Ingrese sus puntajes</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <label for="poblados">Numero de Poblados</label>
                            <select class="form-select" aria-label="Default select example" id="poblados"
                                v-model="form2.poblados">
                                <option selected>Seleccione</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="ciudades">Numero de Ciudades</label>
                            <select class="form-select" aria-label="Default select example" id="ciudades"
                                v-model="form2.ciudades">
                                <option selected>Seleccione</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="logros">Numero de Logros</label>
                            <select class="form-select" aria-label="Default select example" id="logros"
                                v-model="form2.logros">
                                <option value="" selected>Seleccione</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="puntos_de_victoria">Numero de Puntos de victoria</label>
                            <select class="form-select" aria-label="Default select example" id="puntos_de_victoria"
                                v-model="form2.puntos_de_victoria">
                                <option value="" selected>Seleccione</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" @click="actualizarPuntos()">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { indexActivosEventos, indexTotales } from '@/services/EventosService';
import { changeStatus, changeStatusPlayers, indexTabla, showTabla, storeTabla, updatePuntos, usariosConRolJugador } from '@/services/TablaClasificacionService';
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';


let modal = null;
let instanciaModal = null;
let modal2 = null;
let instanciaModal2 = null;
const form = ref({
    evento_id: '',
    jugadores: [{ user_id: '' }] // Inicializa con un jugador vacío
});
const form2 = ref({});
const usuarios = ref([]);
const eventos = ref([]);
const tablas = ref([]);
const datos = ref([]);
const paginacion = ref({
    paginaActual: 1,
    paginaAnterior: null,
    paginaSiguiente: null
});
const posicion = ref('');
const totalPaginas = ref(0); // Nueva referencia para el total de páginas
const agregar = () => {
    // Resetea el formulario antes de abrir el modal
    form.value = {
        jugadores: [{ user_id: '' }], // Inicializa con un jugador vacío
        evento_id: ''
    };
    instanciaModal.show();
}
const listarUsuariosRolJugador = async () => {
    try {
        const { data } = await usariosConRolJugador();
        usuarios.value = data.usuarios
        console.log(usuarios.value);
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    modal = document.getElementById('staticBackdrop');
    instanciaModal = new Modal(modal);
    modal2 = document.getElementById('staticBackdrop2');
    instanciaModal2 = new Modal(modal2);
    listarUsuariosRolJugador();
    listarEventosActivos();
    eventsActivos();
    listarPlayers();
})
const listarEventosActivos = async () => {
    try {
        const { data } = await indexTotales();
        eventos.value = data.datos;
        console.log(eventos.value);
    } catch (error) {
        console.log(error);
    }
}
const eventsActivos = async () => {
    try {
        const { data } = await indexActivosEventos();
        tablas.value = data.datos.data;
        console.log(tablas.value);
    } catch (error) {
        console.log(error);
    }
}
const paginaSiguiente = async () => {
    if (paginacion.value.paginaSiguiente != null) {
        paginacion.value.paginaActual++;
        listarPlayers();
    }
}
const paginaAnterior = async () => {
    if (paginacion.value.paginaAnterior != null) {
        paginacion.value.paginaActual--;
        listarPlayers();
    }
}
const listarPlayers = async () => {
    try {
        const { data } = await indexTabla(paginacion.value.paginaActual);
        console.log(data);
        datos.value = data.datos.data;
        paginacion.value.paginaAnterior = data.datos.prev_page_url;
        paginacion.value.paginaSiguiente = data.datos.next_page_url;
        totalPaginas.value = data.datos.last_page
        console.log(datos.value);
    } catch (error) {
        console.log(error);
    }
}
// Función para agregar un nuevo jugador
const addJugador = () => {
    form.value.jugadores.push({ user_id: '' });
};

// Función para eliminar un jugador
const removeJugador = (index) => {
    form.value.jugadores.splice(index, 1);
};
const storePlayerEvents = async () => {
    try {
        const dato = {
            evento_id: form.value.evento_id,
            jugadores: form.value.jugadores // Envía el array de jugadores
        };
        console.log(dato);

        // Guardar los jugadores en el evento
        const { data } = await storeTabla(dato);
        console.log(data);

        // Cierra el modal después de guardar
        instanciaModal.hide();
        listarPlayers();
    } catch (error) {
        console.log(error);
    }
};
const changeStatusButtomTables = async (id) => {
    try {
        // Llama a la API para cambiar el estado
        const { data } = await changeStatusPlayers(id);
        console.log(data);
        // Si deseas actualizar la lista de jugadores, puedes hacer esto
        listarPlayers(); // Descomenta si es necesario
    } catch (error) {
        console.log(error);
    }
}
const changeStatusTables = async (id) => {
    try {
        const {data} = await changeStatus(id);
        console.log(data);
        listarPlayers();
    } catch (error) {
        console.log(error);
    }
}
const abrirModal = () => {
    instanciaModal2.show();
}
const mostrar = async (id) => {
    try {
        const { data } = await showTabla(id);
        console.log(data);
        abrirModal();
            form2.value = {
                poblados: data.datos.poblados,
                ciudades: data.datos.ciudades,
                logros: data.datos.logros,
                puntos_de_victoria: data.datos.puntos_de_victoria,
                puntos_total: data.datos.puntos_total
            };
            posicion.value = id;
            console.log(form2.value);
            console.log(data.datos);
    } catch (error) {
        console.log(error);
    }
}
const actualizarPuntos = async () => {
    try {
        // Sumar los puntos
        const puntosTotal = (parseInt(form2.value.poblados) || 0) +
            (parseInt(form2.value.ciudades) || 0) +
            (parseInt(form2.value.logros) || 0) +
            (parseInt(form2.value.puntos_de_victoria) || 0);
        // Crear el objeto con los datos a actualizar
        const datosActualizados = {
            poblados: form2.value.poblados,
            ciudades: form2.value.ciudades,
            logros: form2.value.logros,
            puntos_de_victoria: form2.value.puntos_de_victoria,
            puntos_total: puntosTotal // Almacenar el total de puntos
        };
        console.log(datosActualizados);
        // Llamar a la API para actualizar los puntos
        const { data } = await updatePuntos(posicion.value, datosActualizados);
        console.log(data);

        // Cerrar el modal después de la actualización
        instanciaModal2.hide();
        listarPlayers(); // Actualizar la lista de jugadores si es necesario
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
@import url('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
</style>