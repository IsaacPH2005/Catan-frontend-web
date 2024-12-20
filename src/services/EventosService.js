import { http, urlBase, httpNotToken } from "./Http";
export const indexEventos = () => {
    return http().get(`${urlBase}eventos`);
}
export const storeEventos = (formulario) => {
    return http().post(`${urlBase}evento-nuevo`, formulario);
}
export const showEventos = (id) => {
    return http().get(`${urlBase}evento/${id}`);
}
export const updateEventos = (id ,formulario) => {
    return http().put(`${urlBase}evento/${id}`, formulario);
}

export const deleteEventos = (id) => {
    return http().delete(`${urlBase}evento/${id}`);
}

export const indexActivosEventos = (page) => {
    return httpNotToken().get(`${urlBase}eventos-activos?page=${page}`);
}

export const indexTotales = () => {
    return http().get(`${urlBase}eventos-totales`);
}

