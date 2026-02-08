// ==========================================
// 1. CONFIGURACIÓN SUPABASE (TUS DATOS)
// ==========================================
const supabaseUrl = 'https://pmedrqauhesybkzxraxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZWRycWF1aGVzeWJrenhyYXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MTQyNTIsImV4cCI6MjA4NTk5MDI1Mn0.DnC8YSij2mN-gR3kcnYzjhVmy1HXKcul_TcXzAjcI-I';

const db = supabase.createClient(supabaseUrl, supabaseKey);

// ==========================================
// 2. ESTADO GLOBAL
// ==========================================
let currentUser = null;
let userProfile = null;

// ==========================================
// 3. INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    await checkSession();
    renderNavbar();

    // Listener cerrar menú
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('user-dropdown');
        const btn = document.getElementById('user-menu-btn');
        if (menu && !menu.classList.contains('hidden') && !btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });
});

async function checkSession() {
    const { data: { session } } = await db.auth.getSession();
    if (session) {
        currentUser = session.user;
        
        // Intentar obtener perfil, si no existe, usar datos de sesión
        const { data, error } = await db.from('profiles').select('*').eq('id', currentUser.id).single();
        
        if (data) {
            userProfile = data;
        } else {
            // Fallback visual si la DB falla
            userProfile = { email: currentUser.email, role: 'user' };
        }
    }
}

// ==========================================
// 4. NAVBAR ROBUSTO
// ==========================================
function renderNavbar() {
    const navRight = document.getElementById('nav-right');
    if (!navRight) return;

    if (currentUser) {
        const email = userProfile?.email || currentUser.email;
        const initial = email.charAt(0).toUpperCase();
        const role = userProfile?.role || 'user';

        navRight.innerHTML = `
            <div class="relative">
                <button id="user-menu-btn" onclick="toggleUserMenu()" class="flex items-center gap-3 focus:outline-none group">
                    <span class="hidden md:block text-sm font-bold text-gray-900 group-hover:text-gray-600 transition">${email}</span>
                    <div class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-serif text-lg border border-black group-hover:bg-gray-800 transition">
                        ${initial}
                    </div>
                </button>

                <div id="user-dropdown" class="hidden absolute right-0 mt-4 w-60 bg-white shadow-2xl border border-gray-100 z-50 py-2 rounded-sm">
                    <div class="px-6 py-4 border-b border-gray-100 mb-2">
                        <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Rol: ${role}</p>
                        <p class="text-sm font-bold text-black truncate">${email}</p>
                    </div>
                    
                    <a href="dashboard.html" class="block px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition">
                        <i class="fa-solid fa-gauge-high mr-3 w-4"></i> Panel de Control
                    </a>
                    
                    <a href="create.html" class="block px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition">
                        <i class="fa-solid fa-plus mr-3 w-4"></i> Publicar Espacio
                    </a>

                    <a href="profile.html" class="block px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition">
                        <i class="fa-solid fa-user-gear mr-3 w-4"></i> Mis Datos
                    </a>

                    ${role === 'super_admin' ? `
                    <a href="dashboard.html?tab=admin" class="block px-6 py-3 text-sm text-red-600 font-bold bg-red-50 hover:bg-red-100 transition">
                        <i class="fa-solid fa-lock mr-3 w-4"></i> Super Admin
                    </a>` : ''}

                    <div class="border-t border-gray-100 mt-2 pt-2">
                        <button onclick="handleLogout()" class="block w-full text-left px-6 py-3 text-sm text-red-500 hover:bg-red-50 transition font-bold">
                            <i class="fa-solid fa-right-from-bracket mr-3 w-4"></i> Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else {
        navRight.innerHTML = `
            <a href="login.html" class="text-sm font-bold text-gray-500 hover:text-black uppercase tracking-wide transition hidden md:block mr-4">Ingresar</a>
            <a href="login.html?mode=signup" class="bg-black text-white px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition shadow-lg">Registrarse</a>
        `;
    }
}

function toggleUserMenu() {
    document.getElementById('user-dropdown').classList.toggle('hidden');
}

async function handleLogout() {
    await db.auth.signOut();
    window.location.href = 'index.html';
}