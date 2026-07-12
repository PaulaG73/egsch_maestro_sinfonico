<template>
  <div class="section-scroll-up">
    <button
      type="button"
      class="section-scroll-up__btn"
      :aria-label="ariaLabel"
      @click="scrollToNav"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  ariaLabel: {
    type: String,
    default: 'Volver a la barra de navegación',
  },
})

function scrollToNav() {
  const nav = document.getElementById('navbar-principal')
  if (nav) {
    nav.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.section-scroll-up {
  display: flex;
  justify-content: center;
  padding: 0.85rem 0 0.35rem;
}

.section-scroll-up__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  background: transparent;
  color: rgba(255, 255, 255, 0.38);
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.section-scroll-up__btn:hover,
.section-scroll-up__btn:focus-visible {
  color: var(--ms-accent-on-dark);
  border-color: rgba(var(--ms-accent-rgb), 0.45);
  background: rgba(var(--ms-accent-rgb), 0.12);
  transform: translateY(-2px);
}

.section-scroll-up__btn:focus-visible {
  outline: 2px solid rgba(var(--ms-accent-rgb), 0.4);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .section-scroll-up__btn {
    transition: none;
  }

  .section-scroll-up__btn:hover,
  .section-scroll-up__btn:focus-visible {
    transform: none;
  }
}
</style>
