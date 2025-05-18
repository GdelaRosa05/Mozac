const menuBtn = document.getElementById('menu-btn')
const header = document.getElementById('header')
const headerContainer = document.getElementById('header-container')
const links = document.getElementById('mobile-links')
const linkItems = links.querySelectorAll('.link')
const path = window.location.pathname.split("/").pop() || "index.html"


window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    headerContainer.classList.add('scrolled')
  } else {
    headerContainer.classList.remove('scrolled')
  }
})

// Marcar enlace activo según la URL
linkItems.forEach(link => {
  if (link.getAttribute("href") === path) {
    link.classList.add("active")
  }
})

// Botón menú
function toggleMenu() {
  header.classList.toggle('active-header')
  links.classList.toggle('show')
}
menuBtn.addEventListener('click', toggleMenu)


// Presupuesto
const presupuestoBtn = document.getElementById('presupuesto')
const body = document.body

presupuestoBtn.addEventListener('click', () => {
  const form = document.createElement('form')
  form.classList.add('presupuesto-form')
  const overlay = document.createElement('div')
  overlay.classList.add('form-overlay')

  // Definimos la estructura del formulario
  form.innerHTML = `
  <button id="close-btn" class="close-btn">&times;</button>
  <h1>Solicita tu presupuesto</h1>
  <p>Rellena el formulario y obtén tu presupuesto gratuito.</p>

  <div class="form-group">
    <label>
      Nombre completo:
      <input type="text" name="nombre_completo" required>
    </label>

    <label>
      Teléfono:
      <input type="tel" name="telefono" required>
    </label>

    <label>
      Email:
      <input type="email" name="email" required>
    </label>

    <label>
      ¿Qué tipo de propiedad buscas reformar?
      <input type="text" name="tipo_propiedad" required>
    </label>

    <label>
      ¿Cuántos metros cuadrados aprox. son?
      <input type="number" name="metros_cuadrados" required>
    </label>

    <label>
      Tu mensaje:
      <input name="message" required></input>
    </label>
  </div>

  <button type="submit">Enviar</button>
  `

  // Manejamos el envío sin redirección
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://hooks.zapier.com/hooks/catch/22920325/278hrq8/', true)
    xhr.onload = function () {
      if (xhr.status === 200) {
        form.innerHTML = `
        <button id="close-btn" class="close-btn">&times;</button>
        <p>¡Formulario enviado con éxito!</p>
        `
      } else {
        form.innerHTML = "<p>Error al enviar el formulario.</p>"
      }
    }
    xhr.send(formData)
  })

  body.appendChild(form)
  body.appendChild(overlay)

 
  // Forzar reflow y activar animación
  requestAnimationFrame(() => {
    form.classList.add('show')
    overlay.classList.add('show')
  })

  // Cerrar
  const closeBtn = form.querySelector('#close-btn')
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    form.classList.remove('show')
    overlay.classList.remove('show')
    setTimeout(() => {
      body.removeChild(form)
      body.removeChild(overlay)
    }, 300) // tiempo igual al de la transición
  })
})
