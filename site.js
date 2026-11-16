document.addEventListener('DOMContentLoaded', function () {
    const menuButtons = document.querySelectorAll('.dropdown');

    menuButtons.forEach(function (button) {
        const menu = button.nextElementSibling;

        if (!menu || !menu.classList.contains('orderB')) {
            return;
        }

        const setMenuState = function (isOpen) {
            button.setAttribute('aria-expanded', String(isOpen));
            menu.style.display = isOpen ? 'block' : 'none';
        };

        const menuId = menu.id || 'site-menu-' + Math.random().toString(36).slice(2, 8);
        menu.id = menuId;
        button.setAttribute('aria-controls', menuId);
        setMenuState(false);

        button.addEventListener('click', function () {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            setMenuState(!isOpen);
        });
    });

    const collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(function (button) {
        const content = button.nextElementSibling;

        if (!content || !content.classList.contains('content')) {
            return;
        }

        const setCollapseState = function (isOpen) {
            button.setAttribute('aria-expanded', String(isOpen));
            content.style.display = isOpen ? 'block' : 'none';
        };

        setCollapseState(false);
        button.addEventListener('click', function () {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            setCollapseState(!isOpen);
        });
    });
});
