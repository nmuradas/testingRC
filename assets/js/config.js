tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Tailwind ahora usa tus variables CSS
                brand: 'var(--color-brand)',
                secondary: 'var(--color-secondary)',
                bg: 'var(--color-bg)',
                surface: 'var(--color-surface)',
                border: 'var(--color-border)',
                dark: 'var(--color-dark)',
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif']
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'card': '0 2px 8px rgba(0,0,0,0.04)',
                'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
            }
        }
    }
}