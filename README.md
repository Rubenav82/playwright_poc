# playwright_poc

---
GENERAR PROYECTO:
    Dentro del directorio, abrir terminal y "npm init playwright@latest"
---

---
COMPROBAR ACTUALIZACIONES:
    En terminal ejecutar "npm install -D <nombre_dependencia>@latest", por ejemplo "npm install -D @playwright/test@latest".
    *Si se actualiza la versión de la dependencia, ejecutar "npx playwright install" para que se actualicen los navegadores acorde a la versión de la dependencia de playwright.
    *Se recomienda antes de actualizar, hacer un branch, y ejecutar los test para comprobar que todo funciona, para tener una rama distinta de respaldo.
---

---
EJECUTAR TODOS LOS TESTS:
    Dentro del directorio, abrir terminal y "npx playwright test"
---

---
EJECTUAR UN TEST ESPECÍFICO:
    npx playwright test saucedemoPOM.spec.ts -g "<nombre_test>"
---

---
EJECUTAR UN TEST N VECES:
    npx playwright test saucedemoPOM.spec.ts -g "<nombre_test>" --repeat-each 5
---

---
SETEAR VARIABLE DE ENTORNO:
    set NODE_ENV=pre o pro
---

---
EJECUTAR TEST EN ENTORNO ESPECÍFICO:
    set NODE_ENV=pre; npx playwright test saucedemoPOM.spec.ts -g "<nombre_test>"
---

---
EJECUTAR TEST EN MODO DEBUG:
    npx playwright test saucedemoPOM.spec.ts -g "<nombre_test>" --debug
---