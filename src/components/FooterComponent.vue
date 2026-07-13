<template>
  <footer class="footer mt-auto bg-maestro-profundo border-top footer-maestro">
    <div class="container footer-inner">
      <a
        class="footer-cta"
        :href="whatsappHref"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="footer-cta__label">{{ t('footer.contactUs') }}</span>
      </a>

      <div class="footer-contacts">
        <a class="footer-contact" :href="telHref">{{ phoneDisplay }}</a>
        <span class="footer-contacts__sep" aria-hidden="true">·</span>
        <a class="footer-contact" :href="mailtoHref">{{ emailDisplay }}</a>
      </div>

      <p class="mb-0 footer-copy">{{ t('footer.rights', { year: 2026 }) }}</p>

      <SectionScrollUp :aria-label="t('footer.scrollUp')" />
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import SectionScrollUp from './SectionScrollUp.vue'
import { getWhatsAppFooterUrl } from '@/config/whatsapp'
import { useI18n } from '@/i18n/useI18n'

const { t } = useI18n()

/** Placeholders de contacto — reemplazar cuando estén definitivos */
const phoneDisplay = '+56 x xxxx xxxx'
const emailDisplay = 'contacto@xxxxx.cl'
const telHref = 'tel:+56000000000'
const whatsappHref = getWhatsAppFooterUrl()

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(t.value('footer.mailSubject'))
  return `mailto:${emailDisplay}?subject=${subject}`
})
</script>

<style scoped>
.footer-maestro {
  border-color: var(--ms-border) !important;
  box-shadow: 0 -1px 0 0 rgba(var(--ms-accent-rgb), 0.28);
}

.footer {
  color: rgba(255, 255, 255, 0.9);
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.15rem;
  padding-block: clamp(1.75rem, 4vw, 2.75rem);
}

.footer-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 2rem 0.75rem;
  border: 1px solid rgba(var(--ms-accent-rgb), 0.55);
  border-radius: 999px;
  background: transparent;
  color: var(--ms-accent-on-dark);
  text-decoration: none;
  transition:
    color 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.footer-cta__label {
  font-family: var(--font-display);
  font-size: clamp(0.78rem, 2vw, 0.92rem);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  line-height: 1;
}

.footer-cta:hover,
.footer-cta:focus-visible {
  color: #fff;
  background: rgba(var(--ms-accent-rgb), 0.22);
  border-color: rgba(var(--ms-accent-rgb), 0.9);
  box-shadow: 0 0 0 1px rgba(var(--ms-accent-rgb), 0.25);
}

.footer-cta:focus-visible {
  outline: 2px solid rgba(var(--ms-accent-rgb), 0.55);
  outline-offset: 3px;
}

.footer-contacts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.45rem 0.85rem;
}

.footer-contact {
  font-family: var(--font-body);
  font-size: clamp(0.82rem, 2vw, 0.95rem);
  font-weight: 500;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-contact:hover,
.footer-contact:focus-visible {
  color: var(--ms-accent-on-dark);
}

.footer-contact:focus-visible {
  outline: 2px solid rgba(var(--ms-accent-rgb), 0.45);
  outline-offset: 3px;
  border-radius: 0.2rem;
}

.footer-contacts__sep {
  color: rgba(255, 255, 255, 0.35);
  font-weight: 300;
  user-select: none;
}

.footer-copy {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.45);
  padding-top: 0.35rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  width: min(100%, 22rem);
}

@media (prefers-reduced-motion: reduce) {
  .footer-cta,
  .footer-contact {
    transition: none;
  }
}
</style>
