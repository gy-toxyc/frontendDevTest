# FrontEnd Dev Test

Esta aplicación web muestra una lista de productos, concretamente dispositivos móviles, ofreciendo al usuario la posibilidad de navegar a través de ellos y descubrir los detalles del que más le interese. El usuario podrá elegir el almacenamiento y el color del producto y añadirlo a su cesta.

## Dependencias

Antes de ejecutar la aplicación o probarla, es importante tener instaladas ciertas herramientas.

- Node (>= v22.11.0, preferiblemente)

<br>

## Toma de Decisiones

En cuanto al enrutado de la aplicación web, se ha decidido utilizar el `App Router` de React, que resulta de gran utilidad para conseguir un enrutado versátil y modificable, permitiendo una adición sencilla del Layout y un manejo correcto de Path Variables (por ejemplo, para los detalles de un producto).
Los breadcrumbs del Header también deben su funcionamiento al `App Router`.

Para las comunicaciones externas se ha decidido utilizar el concepto de `Custom Hooks`, uno para cada petición a la API proporcionada. Los productos obtenidos están almacenados en caché, así como lo que se añade al carrito.

Por lo demás, la componentización se ha basado en lo propuesto, dividiendo principalmente los componentes de las páginas. Todos ellos con sus respectivos estilos segregados a una carpeta `styles`. Estilos, por cierto, desarrollados usando `SCSS`.

Para los tests unitarios, se ha decidido utilizar `Vitest`, que tiene una buena integración con proyectos de `Vite`, como este.

<br>

## Guía de Ejecución

Antes de ejecutar la aplicación web en local, es importante instalar las dependencias en la raíz del proyecto utilizando el siguiente comando (para el cual es necesario tener instalado Node).

```bash
npm install
```

Ya con esto, podemos ejecutar la aplicación con el siguiente comando.

```bash
npm run start
```

La ejecución estará lista en http://localhost:5173.

<br>

## Guía de Tests

Para ejecutar los tests se deberá realizar la instalación de dependencias de igual manera previamente usando el siguiente comando.

```bash
npm install
```

Ahora, ejecutamos el comando para que los tests se lancen.

```bash
npm run test
```