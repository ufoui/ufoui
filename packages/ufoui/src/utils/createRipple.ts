import React from 'react';

/**
 * Creates a material-style ripple effect inside the given element.
 *
 * @param el - Target element that receives the ripple.
 * @param event - Mouse event used to determine the ripple origin.
 * @param host - Optional host element that receives the ripple container instead of `el`.
 *
 * @remarks
 * - Automatically clears previous ripples.
 * - Injects a `.ripple-container` and `.ripple` element.
 * - Uses the element's client size and border radius.
 * - Safe for buttons, icon buttons, list items, etc.
 *
 * @category Utils
 */
export const createRipple = (el: HTMLElement, event: React.MouseEvent<HTMLElement>, host?: HTMLElement) => {
    const target = host ?? el;

    const old = target.querySelector('.ripple-container');
    if (old) {
        old.remove();
    }

    const elRect = el.getBoundingClientRect();
    const hostRect = target.getBoundingClientRect();

    const rawX = event.clientX - elRect.left;
    const rawY = event.clientY - elRect.top;

    const inside = rawX >= 0 && rawX <= elRect.width && rawY >= 0 && rawY <= elRect.height;

    const x = inside ? rawX : elRect.width / 2;
    const y = inside ? rawY : elRect.height / 2;

    const diameter = Math.sqrt(elRect.width * elRect.width + elRect.height * elRect.height);
    const radius = diameter / 2;

    const container = document.createElement('div');
    container.className = 'ripple-container';
    container.style.position = 'absolute';
    container.style.pointerEvents = 'none';
    container.style.overflow = 'hidden';
    container.style.width = `${elRect.width}px`;
    container.style.height = `${elRect.height}px`;
    container.style.left = `${elRect.left - hostRect.left}px`;
    container.style.top = `${elRect.top - hostRect.top}px`;

    requestAnimationFrame(() => {
        container.style.borderRadius = getComputedStyle(el).borderRadius;
    });

    const circle = document.createElement('span');
    circle.className = 'ripple';
    circle.style.position = 'absolute';
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${x - radius}px`;
    circle.style.top = `${y - radius}px`;

    container.appendChild(circle);
    target.appendChild(container);

    circle.addEventListener('animationend', () => {
        container.remove();
    });
};
