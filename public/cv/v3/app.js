/* Hoja de vida web · versión 3 — comportamiento.
   Sin dependencias. Cada bloque indica la heurística de Nielsen que atiende. */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const EMAIL = "daniel_caiz@hotmail.com";
  const PHONE_WA = "593984471075";

  /* localStorage puede no existir (modo privado, almacenamiento bloqueado). */
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* sin persistencia */ } },
  };

  /* ------------------------------------------------------------------
     Aviso emergente — H1 visibilidad del estado, H3 deshacer
     ------------------------------------------------------------------ */
  const toast = $("#toast");
  const toastText = $("#toast-text");
  const toastAction = $("#toast-action");
  let toastTimer = 0;
  let toastHandler = null;

  function hideToast() {
    toast.classList.remove("show");
    toastAction.hidden = true;
    toastHandler = null;
  }
  function scheduleHide(ms) {
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, ms);
  }
  function notify(message, action) {
    toastText.textContent = message;
    if (action) {
      toastAction.textContent = action.label;
      toastAction.hidden = false;
      toastHandler = action.run;
    } else {
      toastAction.hidden = true;
      toastHandler = null;
    }
    toast.classList.add("show");
    scheduleHide(action ? 8000 : 3200);
  }
  toastAction.addEventListener("click", () => {
    const run = toastHandler;
    hideToast();
    if (run) run();
  });
  /* Mientras el puntero o el foco están encima, el aviso no se va. */
  toast.addEventListener("mouseenter", () => clearTimeout(toastTimer));
  toast.addEventListener("focusin", () => clearTimeout(toastTimer));
  toast.addEventListener("mouseleave", () => toast.classList.contains("show") && scheduleHide(2500));
  toast.addEventListener("focusout", () => toast.classList.contains("show") && scheduleHide(2500));

  /* ------------------------------------------------------------------
     Tema claro / oscuro — H3 control, H7 flexibilidad
     ------------------------------------------------------------------ */
  const themeBtn = $("#theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme, announce) {
    const dark = theme === "dark";
    root.dataset.theme = theme;
    themeBtn.setAttribute("aria-label", dark ? "Activar modo claro" : "Activar modo oscuro");
    $$('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", dark ? "#0c0c0b" : "#f7f6f2"));
    if (announce) notify(dark ? "Modo oscuro activado" : "Modo claro activado");
  }
  function toggleTheme() {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    store.set("cv-theme", next);
    applyTheme(next, true);
  }
  applyTheme(root.dataset.theme === "dark" ? "dark" : "light", false);
  themeBtn.addEventListener("click", toggleTheme);
  systemDark.addEventListener("change", (e) => {
    if (!store.get("cv-theme")) applyTheme(e.matches ? "dark" : "light", false);
  });

  /* ------------------------------------------------------------------
     Menú móvil — H3 salida clara (botón, Esc, clic fuera)
     ------------------------------------------------------------------ */
  const nav = $("#nav");
  const menuBtn = $("#menu-toggle");
  const menuLabel = $("span", menuBtn);
  const desktop = window.matchMedia("(min-width: 1180px)");

  function setMenu(open, { focusFirst = false } = {}) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuLabel.textContent = open ? "Cerrar" : "Menú";
    nav.classList.toggle("open", open);
    if (open && focusFirst) $("a", nav).focus();
  }
  const menuOpen = () => menuBtn.getAttribute("aria-expanded") === "true";

  menuBtn.addEventListener("click", () => setMenu(!menuOpen(), { focusFirst: !menuOpen() }));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a") && !desktop.matches) setMenu(false);
  });
  document.addEventListener("click", (e) => {
    if (menuOpen() && !e.target.closest("#nav, #menu-toggle")) setMenu(false);
  });
  desktop.addEventListener("change", () => setMenu(false));

  /* ------------------------------------------------------------------
     Sección activa, progreso de lectura y «volver arriba» — H1, H6
     ------------------------------------------------------------------ */
  const sectionLinks = $$("#nav ul a");
  const sections = sectionLinks.map((a) => document.getElementById(a.hash.slice(1)));
  const progressBar = $("#progress-bar");
  const toTop = $("#to-top");
  let ticking = false;

  function updateScrollState() {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    progressBar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    toTop.hidden = y < 700;

    /* Una sección pasa a ser la activa cuando su borde superior cruza el 40 %
       superior de la ventana: así cambia cuando el usuario ya la está leyendo,
       no cuando su título llega pegado a la cabecera. */
    const line = Math.min(window.innerHeight * 0.4, 320);
    let current = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) current = section;
    }
    if (max > 0 && y >= max - 4) current = sections[sections.length - 1];
    sectionLinks.forEach((a) => {
      if (current && a.hash === `#${current.id}`) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScrollState);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateScrollState();

  /* Ir a una sección y dejar el foco en su título, para que el lector de
     pantalla anuncie dónde ha llegado el usuario. */
  function goTo(id) {
    const section = document.getElementById(id);
    if (!section) return;
    const heading = $("h2", section);
    history.pushState(null, "", `#${id}`);
    section.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }

  /* El WhatsApp flotante se oculta mientras la portada o el contacto —que ya
     ofrecen ese botón— están a la vista: así nunca hay dos iguales en pantalla
     ni tapa los botones del formulario. */
  const fabWa = $(".fab-wa");
  const visibleTwins = new Set();
  const twinObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleTwins.add(entry.target.id);
      else visibleTwins.delete(entry.target.id);
    });
    fabWa.hidden = visibleTwins.size > 0;
  }, { threshold: 0.1 });
  twinObserver.observe($("#inicio"));
  twinObserver.observe($("#contacto"));

  /* ------------------------------------------------------------------
     Copiar al portapapeles — H1 confirmación, H9 alternativa si falla
     ------------------------------------------------------------------ */
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      area.remove();
      return ok;
    }
  }
  function flashCopied(button) {
    const use = $("use", button);
    if (!use) return;
    use.setAttribute("href", "#i-check");
    setTimeout(() => use.setAttribute("href", "#i-copy"), 1800);
  }

  document.addEventListener("click", async (e) => {
    const button = e.target.closest("[data-copy], [data-copy-from]");
    if (!button) return;
    const source = button.dataset.copyFrom && document.getElementById(button.dataset.copyFrom);
    const text = button.dataset.copy || (source ? source.textContent.replace(/\s+/g, " ").trim() : "");
    if (await copyText(text)) {
      flashCopied(button);
      notify(button.dataset.copyLabel || "Copiado");
    } else {
      notify("No se pudo copiar. Selecciona el texto y pulsa Ctrl + C.");
    }
  });

  /* ------------------------------------------------------------------
     Certificaciones: búsqueda + filtro por año — H1, H3, H7, H9
     ------------------------------------------------------------------ */
  const normalize = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const search = $("#cert-search");
  const clearSearch = $("#cert-clear");
  const yearButtons = $$("#year-filter button");
  const certStatus = $("#cert-status");
  const certEmpty = $("#cert-empty");
  const certItems = $$("#cert-list li");
  const certGroups = $$("#cert-list .cert-year");
  const total = certItems.length;
  let year = "all";
  let statusTimer = 0;

  const certData = certItems.map((li) => {
    const nameEl = $(".cert-name", li);
    return { li, nameEl, name: nameEl.textContent, haystack: normalize(li.textContent) };
  });

  /* Resalta la coincidencia en el nombre. La normalización sólo elimina
     marcas diacríticas, así que los índices coinciden con el original. */
  function highlight(item, query) {
    const index = query ? normalize(item.name).indexOf(query) : -1;
    if (index < 0) {
      item.nameEl.textContent = item.name;
      return;
    }
    const mark = document.createElement("mark");
    mark.textContent = item.name.slice(index, index + query.length);
    item.nameEl.replaceChildren(item.name.slice(0, index), mark, item.name.slice(index + query.length));
  }

  function describe(shown, raw) {
    if (shown === 0) return "Ninguna certificación coincide con el filtro";
    if (shown === total && !raw) return `Mostrando las ${total} certificaciones`;
    let text = `Mostrando ${shown} de ${total} certificaciones`;
    if (year !== "all") text += ` de ${year}`;
    if (raw) text += ` para «${raw}»`;
    return text;
  }

  function applyFilter({ immediateStatus = false } = {}) {
    const raw = search.value.trim();
    const query = normalize(raw);
    let shown = 0;

    certData.forEach((item) => {
      const match = (year === "all" || item.li.dataset.year === year) && (!query || item.haystack.includes(query));
      item.li.hidden = !match;
      highlight(item, match ? query : "");
      if (match) shown += 1;
    });
    certGroups.forEach((group) => { group.hidden = !$("li:not([hidden])", group); });

    clearSearch.hidden = !search.value;
    certEmpty.hidden = shown > 0;
    if (shown === 0) {
      $("#cert-empty-term").textContent = raw || "tu búsqueda";
      $("#cert-empty-year").textContent = year !== "all" ? ` en ${year}` : "";
    }

    /* El texto visible cambia al instante; el anuncio al lector de pantalla
       espera a que el usuario deje de escribir para no interrumpirle. */
    clearTimeout(statusTimer);
    const update = () => { certStatus.textContent = describe(shown, raw); };
    if (immediateStatus) update();
    else statusTimer = setTimeout(update, 450);
  }

  function setYear(value) {
    year = value;
    yearButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.year === value)));
  }

  search.addEventListener("input", () => applyFilter());
  search.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && search.value) {
      e.stopPropagation();
      search.value = "";
      applyFilter({ immediateStatus: true });
    }
  });
  clearSearch.addEventListener("click", () => {
    search.value = "";
    applyFilter({ immediateStatus: true });
    search.focus();
  });
  yearButtons.forEach((button) => button.addEventListener("click", () => {
    setYear(button.dataset.year);
    applyFilter({ immediateStatus: true });
  }));
  $("#cert-reset").addEventListener("click", () => {
    search.value = "";
    setYear("all");
    applyFilter({ immediateStatus: true });
    search.focus();
  });

  /* ------------------------------------------------------------------
     Formulario de contacto — H5 prevención, H9 recuperación, H3 deshacer
     ------------------------------------------------------------------ */
  const form = $("#contact-form");
  const fields = {
    nombre: $("#f-nombre"),
    correo: $("#f-correo"),
    mensaje: $("#f-mensaje"),
  };
  const labels = {
    nombre: "Nombre y apellido",
    correo: "Correo electrónico",
    mensaje: "Mensaje",
  };
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const MIN_MESSAGE = 20;

  const rules = {
    nombre(value) {
      const v = value.trim();
      if (!v) return "Escribe tu nombre para saber a quién responder.";
      if (v.length < 2) return "El nombre es muy corto: escribe al menos 2 letras.";
      return "";
    },
    correo(value) {
      const v = value.trim();
      if (!v) return "Escribe tu correo para poder responderte.";
      if (!EMAIL_RE.test(v)) return "Este correo no parece válido. Revisa que tenga una @ y un dominio, por ejemplo nombre@empresa.com.";
      return "";
    },
    mensaje(value) {
      const v = value.trim();
      if (!v) return "Escribe tu mensaje: cuéntame en qué puedo ayudarte.";
      if (v.length < MIN_MESSAGE) return `Cuéntame un poco más: mínimo ${MIN_MESSAGE} caracteres (llevas ${v.length}).`;
      return "";
    },
  };

  function showError(name, message) {
    const input = fields[name];
    $(`#${input.id}-error`).textContent = message;
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }
  const validate = (name) => {
    const message = rules[name](fields[name].value);
    showError(name, message);
    if (summaryVisible()) renderSummary(currentErrors(), { focus: false });
    return message;
  };

  const summary = $("#error-summary");
  const summaryText = $("#error-summary-text");
  const summaryList = $("#error-summary-list");
  const summaryVisible = () => !summary.hidden;
  const currentErrors = () => Object.keys(fields)
    .map((name) => ({ name, message: rules[name](fields[name].value) }))
    .filter((item) => item.message);

  /* El resumen se mantiene al día mientras el usuario corrige: cada campo
     arreglado desaparece de la lista y, con el último, el resumen se cierra. */
  function renderSummary(errors, { focus }) {
    if (!errors.length) {
      summary.hidden = true;
      return;
    }
    summaryText.textContent = errors.length === 1
      ? "Hay 1 campo por corregir antes de continuar:"
      : `Hay ${errors.length} campos por corregir antes de continuar:`;
    summaryList.replaceChildren(...errors.map(({ name, message }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${fields[name].id}`;
      a.textContent = `${labels[name]}: ${message}`;
      li.append(a);
      return li;
    }));
    summary.hidden = false;
    if (focus) summary.focus();
  }

  /* Se valida al salir del campo (no mientras se escribe por primera vez) y,
     si el campo ya mostraba un error, en cada pulsación para que el usuario
     vea cuándo queda corregido. */
  Object.keys(fields).forEach((name) => {
    const input = fields[name];
    input.addEventListener("blur", () => { if (input.value.trim()) validate(name); });
    input.addEventListener("input", () => { if (input.hasAttribute("aria-invalid")) validate(name); });
  });

  /* Sugerencia de dominio para errores de tipeo frecuentes. */
  const DOMAIN_FIXES = {
    "gmial.com": "gmail.com", "gmal.com": "gmail.com", "gmai.com": "gmail.com", "gamil.com": "gmail.com",
    "gmail.co": "gmail.com", "gmail.con": "gmail.com", "gmail.cm": "gmail.com",
    "hotmial.com": "hotmail.com", "hotmal.com": "hotmail.com", "hotmai.com": "hotmail.com",
    "hotmail.co": "hotmail.com", "hotmail.con": "hotmail.com", "homail.com": "hotmail.com",
    "outlok.com": "outlook.com", "outloo.com": "outlook.com", "outlook.co": "outlook.com", "outlook.con": "outlook.com",
    "yaho.com": "yahoo.com", "yahooo.com": "yahoo.com", "yahoo.co": "yahoo.com", "yahoo.con": "yahoo.com",
  };
  const suggestBox = $("#f-correo-suggest");
  const suggestValue = $("#f-correo-suggest-value");
  function checkSuggestion() {
    const value = fields.correo.value.trim();
    const at = value.lastIndexOf("@");
    const fix = at > 0 ? DOMAIN_FIXES[value.slice(at + 1).toLowerCase()] : null;
    suggestBox.hidden = !fix;
    if (fix) suggestValue.textContent = `${value.slice(0, at)}@${fix}`;
  }
  fields.correo.addEventListener("blur", checkSuggestion);
  fields.correo.addEventListener("input", () => { if (!suggestBox.hidden) checkSuggestion(); });
  $("#f-correo-suggest-apply").addEventListener("click", () => {
    fields.correo.value = suggestValue.textContent;
    suggestBox.hidden = true;
    validate("correo");
    fields.correo.focus();
  });

  /* Contador de caracteres del mensaje. */
  const counter = $("#f-mensaje-count");
  const maxLength = Number(fields.mensaje.getAttribute("maxlength"));
  function updateCounter() {
    const length = fields.mensaje.value.length;
    counter.textContent = `${length} / ${maxLength}`;
    counter.classList.toggle("near", length >= maxLength - 100);
  }
  fields.mensaje.addEventListener("input", updateCounter);

  const result = $("#form-result");
  const waMessage = $("#wa-message");
  let preparedMessage = "";

  summaryList.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    e.preventDefault();
    const input = document.getElementById(link.hash.slice(1));
    input.scrollIntoView({ block: "center", behavior: reducedMotion.matches ? "auto" : "smooth" });
    input.focus({ preventScroll: true });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    Object.keys(fields).forEach((name) => showError(name, rules[name](fields[name].value)));
    const errors = currentErrors();

    if (errors.length) {
      result.hidden = true;
      renderSummary(errors, { focus: true });
      return;
    }

    summary.hidden = true;
    const nombre = fields.nombre.value.trim();
    const correo = fields.correo.value.trim();
    const empresa = $("#f-empresa").value.trim();
    const motivo = $("#f-motivo").value;
    const mensaje = fields.mensaje.value.trim();

    const subject = `${motivo} — contacto desde tu hoja de vida web`;
    preparedMessage = `${mensaje}\n\n—\n${nombre}${empresa ? `\n${empresa}` : ""}\n${correo}`;
    waMessage.href = `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(
      `Hola Elian, soy ${nombre}${empresa ? ` (${empresa})` : ""}. Motivo: ${motivo}.\n\n${mensaje}`,
    )}`;

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preparedMessage)}`;
    result.hidden = false;
    result.focus();
  });

  $("#copy-message").addEventListener("click", async (e) => {
    const ok = await copyText(`Para: ${EMAIL}\n\n${preparedMessage}`);
    if (ok) flashCopied(e.currentTarget);
    notify(ok ? `Mensaje copiado. Pégalo en un correo para ${EMAIL}` : "No se pudo copiar. Selecciona el texto del mensaje y pulsa Ctrl + C.");
  });

  /* Borrar con posibilidad de deshacer: nada se pierde por un clic. */
  $("#form-clear").addEventListener("click", () => {
    const controls = $$("input, select, textarea", form);
    const snapshot = controls.map((c) => c.value);
    const isEmpty = controls.every((c) => c.tagName === "SELECT" || !c.value.trim());
    if (isEmpty) {
      notify("El formulario ya está vacío");
      return;
    }
    form.reset();
    Object.keys(fields).forEach((name) => showError(name, ""));
    summary.hidden = true;
    result.hidden = true;
    suggestBox.hidden = true;
    updateCounter();
    notify("Formulario borrado", {
      label: "Deshacer",
      run() {
        controls.forEach((c, i) => { c.value = snapshot[i]; });
        updateCounter();
        notify("Formulario restaurado");
        fields.nombre.focus();
      },
    });
  });

  /* ------------------------------------------------------------------
     Ayuda — H10
     ------------------------------------------------------------------ */
  const help = $("#help");
  let returnFocus = null;

  function openHelp() {
    if (help.open) return;
    returnFocus = document.activeElement;
    setMenu(false);
    help.showModal();
  }
  $("#help-open").addEventListener("click", openHelp);
  $$("[data-open-help]").forEach((b) => b.addEventListener("click", openHelp));
  $("#help-close").addEventListener("click", () => help.close());
  /* Clic en el fondo oscuro = cerrar. */
  help.addEventListener("click", (e) => { if (e.target === help) help.close(); });
  help.addEventListener("close", () => {
    if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
  });

  $("#print-btn").addEventListener("click", () => window.print());

  /* ------------------------------------------------------------------
     Atajos de teclado — H7 aceleradores (desactivables, WCAG 2.1.4)
     ------------------------------------------------------------------ */
  const shortcutsToggle = $("#shortcuts-toggle");
  const shortcutsLabel = shortcutsToggle.parentElement.querySelector("span:last-child");
  let shortcutsOn = store.get("cv-shortcuts") !== "off";

  function renderShortcuts() {
    shortcutsToggle.checked = shortcutsOn;
    shortcutsLabel.textContent = shortcutsOn ? "Atajos de teclado activados" : "Atajos de teclado desactivados";
  }
  renderShortcuts();
  shortcutsToggle.addEventListener("change", () => {
    shortcutsOn = shortcutsToggle.checked;
    store.set("cv-shortcuts", shortcutsOn ? "on" : "off");
    renderShortcuts();
    notify(shortcutsOn ? "Atajos de teclado activados" : "Atajos de teclado desactivados");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen()) {
      setMenu(false);
      menuBtn.focus();
      return;
    }
    if (!shortcutsOn || e.ctrlKey || e.metaKey || e.altKey || e.isComposing) return;
    if (e.target.closest("input, textarea, select, [contenteditable='true']")) return;
    if (help.open) return;

    if (e.key === "?") {
      e.preventDefault();
      openHelp();
    } else if (e.key === "/") {
      e.preventDefault();
      search.scrollIntoView({ block: "center", behavior: reducedMotion.matches ? "auto" : "smooth" });
      search.focus({ preventScroll: true });
    } else if (e.key === "t" || e.key === "T") {
      toggleTheme();
    } else if (/^[1-7]$/.test(e.key)) {
      setMenu(false);
      goTo(sectionLinks[Number(e.key) - 1].hash.slice(1));
    }
  });
})();
