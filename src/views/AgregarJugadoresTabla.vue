<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h2 class="card-title">Agregar Jugador</h2>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <label for="evento" class="label-form">Evento <i class="text-danger">*</i></label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Seleccione</option>
                                    <option value="1" v-for="(item, index) in eventos" :key="item.id">{{ item.nombre }}</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="evento" class="label-form">Usuario <i class="text-danger">*</i></label>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Seleccione</option>
                                    <option value="1" v-for="(item, index) in usuarios" :key="item.id">{{item.datos_generales.nombre}} {{item.datos_generales.apellido}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <button type="submit" class="btn btn-danger">Cancelar</button>
                        <button type="reset" class="btn btn-success ms-2">Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { indexActivosEventos } from '@/services/EventosService';
import { usariosConRolJugador } from '@/services/TablaClasificacionService';
import { onMounted, ref } from 'vue';
onMounted(() => {
    listarUsuariosRolJugador();  
    listarEventosActivos();
})
const usuarios = ref([]);
const eventos = ref([]);
const listarUsuariosRolJugador = async () => {
    try {
        const {data} = await usariosConRolJugador();
        usuarios.value = data.usuarios
        console.log(usuarios.value);
    } catch (error) {
        console.log(error);
    }
}
const listarEventosActivos = async () => {
    try {
        const {data} = await indexActivosEventos();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
</script>
<style scoped>
@import url('../../node_modules/bootstrap/dist/css/bootstrap.min.css');
</style>