<script setup>
import { ref, computed, onMounted } from 'vue';
import { indexActivosTablas } from '@/services/TablaClasificacionService';

const datos = ref([]);
const paginacion = ref({
  paginaActual: 1,
  paginaAnterior: null,
  paginaSiguiente: null
});
const totalPaginas = ref(0);
const searchQuery = ref('');

const globalScores = [
  { id: 1, name: 'Isaac Parisaca', total_games: 15, victories: 8, total_points: 150 },
  { id: 2, name: 'Super Admin', total_games: 12, victories: 5, total_points: 120 },
  { id: 3, name: 'Juan Pérez', total_games: 10, victories: 4, total_points: 98 },
];

const listarActivosTablas = async () => {
  try {
    const { data } = await indexActivosTablas(paginacion.value.paginaActual);
    console.log(data);
    datos.value = data.datos.data;
    paginacion.value.paginaAnterior = data.datos.prev_page_url;
    paginacion.value.paginaSiguiente = data.datos.next_page_url;
    totalPaginas.value = data.datos.last_page;
  } catch (error) {
    console.error('Error al cargar las tablas:', error);
  }
};

const paginaSiguiente = () => {
  if (paginacion.value.paginaSiguiente) {
    paginacion.value.paginaActual++;
    listarActivosTablas();
  }
};

const paginaAnterior = () => {
  if (paginacion.value.paginaAnterior) {
    paginacion.value.paginaActual--;
    listarActivosTablas();
  }
};

const getSortedPlayers = (players) => {
  return [...players].sort((a, b) => b.puntos_total - a.puntos_total);
};

onMounted(() => {
  listarActivosTablas();
});
</script>

<template>
  <div class="app">
    <header class="catan-header">
      <div class="header-content">
        <h1>Tablas de Puntuación Catan</h1>
      </div>
    </header>
    
    <main class="main-content">
      <div class="search-container">
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Buscar tabla..." 
          class="search-input"
        >
      </div>

      <!-- Game Scores -->
      <div v-for="item in datos" :key="item.id" class="score-table">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Jugador</th>
                <th>Poblados</th>
                <th>Ciudades</th>
                <th>Logros</th>
                <th>P.V</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(player, index) in getSortedPlayers(item.jugadores)" :key="player.id">
                <td class="position">{{ index + 1 }}</td>
                <td class="player">
                  <img :src="player.user?.datos_generales?.foto_perfil" 
                       :alt="player.user?.datos_generales?.nombre"
                       class="player-avatar">
                  <span class="player-name">
                    {{ player.user?.datos_generales?.nombre }} 
                    {{ player.user?.datos_generales?.apellido }}
                  </span>
                </td>
                <td data-label="Poblados">{{ player.poblados }}</td>
                <td data-label="Ciudades">{{ player.ciudades }}</td>
                <td data-label="Logros">{{ player.logros }}</td>
                <td data-label="P.V">{{ player.puntos_de_victoria }}</td>
                <td data-label="Total" class="total">{{ player.puntos_total }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Event Creator -->
        <div class="event-creator">
          <h3>Creador del Evento</h3>
          <div class="creator-info">
            <img :src="item.eventos.users.datos_generales?.foto_perfil || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3J7fax0r25yrhXbt64ICXsKZ-Clm_txAxmw&s'" 
                 :alt="item.eventos.users.datos_generales?.nombre"
                 class="creator-avatar">
            <span>
              {{ item.eventos.users.datos_generales?.nombre }} 
              {{ item.eventos.users.datos_generales?.apellido }}
            </span>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button 
          :disabled="!paginacion.paginaAnterior" 
          @click="paginaAnterior" 
          class="page-btn"
        >
          ←
        </button>
        <span class="page-info">{{ paginacion.paginaActual }} / {{ totalPaginas }}</span>
        <button 
          :disabled="!paginacion.paginaSiguiente" 
          @click="paginaSiguiente" 
          class="page-btn"
        >
          →
        </button>
      </div>

      <!-- Global Scores -->
      <div class="global-scores">
        <h2>Puntuaciones Globales</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Jugador</th>
                <th>Partidas</th>
                <th>Victorias</th>
                <th>Puntos Totales</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(player, index) in globalScores" :key="player.id">
                <td class="position">{{ index + 1 }}</td>
                <td data-label="Jugador">{{ player.name }}</td>
                <td data-label="Partidas">{{ player.total_games }}</td>
                <td data-label="Victorias">{{ player.victories }}</td>
                <td data-label="Puntos Totales" class="total">{{ player.total_points }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="social-links">
        <a href="#" class="social-link">Facebook</a>
        <a href="#" class="social-link">Twitter</a>
        <a href="#" class="social-link">Instagram</a>
        <a href="#" class="social-link">GitHub</a>
      </div>
      <div class="copyright">
        © 2024 Catan Scoreboard. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

:root {
  --primary-color: #8b4513;
  --accent-color: #f4d03f;
  --background-color: #f5eee6;
  --text-color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.catan-header {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://www.turolgames.com/juegos-mesa-rol-miniaturas/wp-content/uploads/2020/09/Catan.jpg') center/cover;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.header-content h1 {
  color: var(--accent-color);
  font-size: 3.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Cinzel', serif;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-container {
  margin: 2rem 0;
}

.search-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  font-size: 1rem;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(244, 208, 63, 0.2);
}

/* Table Styles */
.score-table, .global-scores {
  background: #f5eee6;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

th {
  background: var(--primary-color);
  color: var(--accent-color);
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  white-space: nowrap;
}

td {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #e0d5c1;
}

.player {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}

.player-avatar, .creator-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.event-creator {
  margin-top: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
}

.creator-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.global-scores h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-align: center;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.page-btn {
  background: var(--primary-color);
  color: var(--accent-color);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
}

.page-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.page-btn:hover:not(:disabled) {
  background: #723a0f;
}

.page-info {
  font-weight: bold;
  color: var(--primary-color);
}

/* Footer */
.footer {
  background: var(--primary-color);
  color: white;
  padding: 2rem;
  text-align: center;
  margin-top: auto;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.social-link {
  color: var(--accent-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.social-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.copyright {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content h1 {
    font-size: 2.5em;
  }

  .main-content {
    padding: 1rem;
  }

  table {
    display: block;
  }
  
  thead {
    display: none;
  }
  
  tbody tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #e0d5c1;
    border-radius: 8px;
  }
  
  td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    text-align: right;
    border: none;
  }
  
  td::before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 1rem;
  }
  
  .player {
    justify-content: flex-end;
  }
  
  .player-name {
    text-align: right;
  }

  .social-links {
    flex-wrap: wrap;
  }
}
</style>