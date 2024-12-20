<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'closed': !isSidebarOpen }">
      <div class="logo">
        <h2>🎲 Catan Admin</h2>
      </div>
      <nav class="menu">
        <RouterLink to="/" class="menu-item" active-class="active">
          <span class="icon">📊</span>
          <span class="text">Dashboard</span>
        </RouterLink>
        <RouterLink to="/usuarios" class="menu-item" active-class="active">
          <span class="icon">🌾</span>
          <span class="text">Usuarios</span>
        </RouterLink>
        <RouterLink to="/eventos" class="menu-item" active-class="active">
          <span class="icon">👥</span>
          <span class="text">Eventos</span>
        </RouterLink>
        <RouterLink to="/tablas" class="menu-item" active-class="active">
          <span class="icon">💱</span>
          <span class="text">Tablas</span>
        </RouterLink>
        <RouterLink to="/roles" class="menu-item" active-class="active">
          <span class="icon">📈</span>
          <span class="text">Roles</span>
        </RouterLink>
        <RouterLink to="/configuracion" class="menu-item" active-class="active">
          <span class="icon">⚙️</span>
          <span class="text">Configuración</span>
        </RouterLink>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content" :class="{ 'sidebar-closed': !isSidebarOpen }">
      <!-- Top Bar -->
      <div class="top-bar">
        <button class="toggle-btn" @click="toggleSidebar">
          ☰
        </button>
        <div class="top-bar-content">
          <div class="search-bar">
            <input type="text" placeholder="Buscar...">
          </div>
          <div class="user-menu">
            <span class="username">Admin</span>
            <div class="avatar">👤</div>
          </div>
        </div>
      </div>
      
      <div class="content-area">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --primary-color: #8B4513;
  --secondary-color: #228B22;
  --accent-color: #DAA520;
  --background-color: #F5DEB3;
  --text-color: #2C1810;
  --sidebar-width: 250px;
}
/* Layout */
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: var(--sidebar-width);
  transition: margin-left 0.3s ease;
}

.main-content.sidebar-closed {
  margin-left: 0;
}

/* Sidebar Styles */
.sidebar {
  width: var(--sidebar-width);
  background: var(--primary-color);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  color: white;
  transition: transform 0.3s ease;
}

.sidebar.closed {
  transform: translateX(-100%);
}

.logo {
  padding: 1.5rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.menu {
  padding: 1rem;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: var(--accent-color);
}

.icon {
  margin-right: 1rem;
}

.text {
  font-size: 0.9rem;
}

/* Top Bar Styles */
.top-bar {
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--primary-color);
  padding: 0.5rem;
}

.top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 1rem;
}

.search-bar input {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  color: var(--text-color);
}

.avatar {
  font-size: 1.5rem;
  cursor: pointer;
}
h1 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

h3 {
  color: var(--secondary-color);
  margin-bottom: 0.5rem;
}
</style>