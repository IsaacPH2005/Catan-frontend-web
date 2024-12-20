<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h2>Nuevo registro</h2>
                    </div>
                    <div class="card-body">
                        <div class="row gy-2">
                            <label for="nombre" class="label-form">Nombre<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control ms-2" id="nombre" placeholder="Escribe..."
                                v-model="nombreRol">
                            <small v-if="errors.nombre" class="text-danger fst-italic text-xs"><i
                                    class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                            <div class="col-12">
                                <h4 class="text-center mt-3">Permisos</h4>
                                <div class="card" v-for="(permisos, grupos) in grupos" :key="grupo">
                                    <div class="card-header">
                                        <h5 class="d-flex justify-content-between">{{ grupo }}
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox"
                                                    @change="seleccionarTodos(grupo, $event)">
                                            </div>
                                        </h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-6 col-md-3 my-2" v-for="(permiso) in permisos"
                                                :key="permiso.id">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox"
                                                        :value="permiso.name" v-model="permisosSeleccionados[grupo]">
                                                    <label class="form-check-label" for="flexSwitchCheckDefault">{{
                                                        permiso.name }}</label>
                                                </div>
                                            </div>
                                        </div>
                                       <!--  -->
                                    </div>
                                </div>
                                <small v-if="errors.permisos" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.permisos[0]}}</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="text-end">
                            <button type="button" class="btn btn-danger" @click="volver()">Volver</button>
                            <button type="button" class="btn btn-success ms-2" @click="guardar()">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { agregarRol, mostrarPermisos } from '@/services/RolesPermisosService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
onMounted(() => {
    listarPermisos();
})
const nombreRol = ref("");
const permisosSeleccionados = ref({});
const grupos = ref(null);
const errors = ref({});
const router = useRouter();
const listarPermisos = async () => {
    try {
        const { data } = await mostrarPermisos();
        grupos.value = data.datos;
        for (let grupoNombre in grupos.value) {
            permisosSeleccionados.value[grupoNombre] = [];
        }
        console.log(grupos.value);
    } catch (error) {
        console.log(error);
    }
}
const volver = () => {
    router.push('/roles');
}
const seleccionarTodos = (grupoNombre, event) => {
    if (event.target.checked) {
        permisosSeleccionados.value[grupoNombre] = grupos.value[grupoNombre].map(permiso => permiso.name);
    } else {
        permisosSeleccionados.value[grupoNombre] = [];
    }
}
const guardar = async () => {
    errors.value = {};
    let seleccionados = Object.values(permisosSeleccionados.value).flat();
    try {
        let formulario = {
            nombre: nombreRol.value,
            permisos: seleccionados
        };
        const { data } = await agregarRol(formulario);
        volver();
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
        } else {
            console.log(error);
        }
    }
}
</script>
<style scoped>
@import url('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
</style>