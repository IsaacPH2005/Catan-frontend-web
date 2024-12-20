import { http, httpNotToken, urlBase } from "./Http";

export const indexTabla = (page) => {
    return http().get(`${urlBase}tabla-clasificacion?page=${page}`);
}
export const storeTabla = (formulario) => {
    return http().post(`${urlBase}tabla-clasificacion-nuevo`, formulario);
}
export const usariosConRolJugador = () => {
    return http().get(`${urlBase}usuarios-jugadores`);
}
export const changeStatus = (id) => {
    return http().delete(`${urlBase}tabla-clasificacion/${id}`);
}
export const indexActivosTablas = (page) => {
    return httpNotToken().get(`${urlBase}tabla-clasificacion-activos?page=${page}`);
}

export const changeStatusPlayers = (id) => {
    return http().delete(`${urlBase}tabla-clasificacion-jugador/${id}`);
}

export const showTabla = (id) => {
    return http().get(`${urlBase}tabla-clasificacion/${id}`);
}

export const updatePuntos = (id, formulario) => {
    return http().put(`${urlBase}tabla-clasificacion-puntos/${id}`, formulario);
}