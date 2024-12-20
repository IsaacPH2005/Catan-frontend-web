<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false);
const router = useRouter();
const userLoggedIn = ref(true); // Set to true to show the user profile
const userName = ref('Colonizador Pro');
const userImage = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4';

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const handleLogin = () => {
    router.push('/login');
};

const handleLogout = () => {
    userLoggedIn.value = false;
    router.push('/login');
};
</script>

<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <div class="logo-container">
                <img src="#" alt="Logo" class="navbar-logo" />
            </div>
            <h1 class="brand-title">Catan World</h1>
        </div>

        <button class="navbar-toggle" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }" aria-label="menu">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <div class="navbar-menu" :class="{ 'is-open': isMenuOpen }">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">
                    <span class="icon">🏠</span>
                    <span>Aldea</span>
                </router-link>
                <router-link to="/admin-crud" class="navbar-item">
                    <span class="icon">⚔️</span>
                    <span>Administrador</span>
                </router-link>
                <router-link to="/profile" class="navbar-item">
                    <span class="icon">👥</span>
                    <span>Perfil</span>
                </router-link>
            </div>

            <div class="navbar-end">
                <template v-if="userLoggedIn">
                    <div class="user-profile">
                        <div class="user-info">
                            <span class="user-level">Nivel 42</span>
                            <span class="user-name">{{ userName }}</span>
                        </div>
                        <div class="avatar-container">
                            <img :src="userImage" alt="User avatar" class="user-avatar" />
                            <div class="status-indicator"></div>
                        </div>
                        <button @click="handleLogout" class="logout-button">
                            <span class="icon">🚪</span>
                            <span>Salir</span>
                        </button>
                    </div>
                </template>
                <template v-else>
                    <button @click="handleLogin" class="login-button">
                        <span class="icon">🔑</span>
                        <span>Iniciar Sesión</span>
                    </button>
                </template>
            </div>
        </div>
    </nav>
    <div class="content-wrapper mt-5">
        <router-view></router-view>
    </div>
</template>

<style scoped>
.navbar {
    background: #8B4513; /* Wood brown - representing lumber */
    background: linear-gradient(to right, #8B4513, #A0522D);
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}

.navbar-brand {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo-container {
    background: #FFD700; /* Gold - representing wheat */
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

.navbar-logo {
    height: 2rem;
    width: auto;
}

.brand-title {
    color: #FFD700; /* Gold - representing wheat */
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.navbar-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-grow: 1;
    justify-content: space-between;
    margin-left: 2rem;
}

.navbar-start {
    display: flex;
    gap: 1.5rem;
}

.navbar-end {
    display: flex;
    align-items: center;
}

.navbar-item {
    color: #FFF8DC; /* Cream color */
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
    font-weight: 500;
}

.navbar-item:hover {
    background: rgba(255, 215, 0, 0.1);
    transform: translateY(-2px);
    color: #FFD700;
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    backdrop-filter: blur(10px);
}

.user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.user-level {
    font-size: 0.8rem;
    color: #FFD700;
    font-weight: bold;
}

.user-name {
    color: #FFF8DC;
    font-weight: 500;
}

.avatar-container {
    position: relative;
}

.user-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 2px solid #FFD700;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.status-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0.8rem;
    height: 0.8rem;
    background: #4CAF50;
    border: 2px solid #8B4513;
    border-radius: 50%;
}

.login-button, .logout-button {
    background: #DAA520; /* Golden brown */
    color: #FFF8DC;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    font-weight: 500;
}

.login-button:hover, .logout-button:hover {
    background: #B8860B;
    transform: translateY(-2px);
}


@media (max-width: 768px) {
    .navbar-toggle {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .navbar-toggle span {
        display: block;
        width: 25px;
        height: 3px;
        background-color: #FFD700;
        transition: all 0.3s ease;
    }

    .navbar-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #8B4513;
        padding: 1rem;
        flex-direction: column;
        display: none;
    }

    .navbar-menu.is-open {
        display: flex;
    }

    .navbar-start {
        flex-direction: column;
        width: 100%;
    }

    .navbar-end {
        margin-top: 1rem;
    }

    .user-profile {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1rem;
    }

    .user-info {
        align-items: center;
        margin-bottom: 0.5rem;
    }
}
</style>
<!-- <script setup>
import {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,

} from 'mdb-vue-ui-kit';
import { cerrarSesion } from '@/services/AuthService';
import { ref } from 'vue';
import { RouterView } from 'vue-router';
const datosUser = ref([]);
const obtiendoDatos = localStorage.getItem("usuario");
datosUser.value = JSON.parse(obtiendoDatos);
console.log(datosUser.value);
const logout = async () => {
    try {
        const { data } = await cerrarSesion();
        localStorage.clear();
    } catch (error) {
        console.log(error);
    }
}
const collapse11 = ref(false);
</script> -->
