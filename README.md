# App

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Bienvenido a tu workspace de [Nx](https://nx.dev) ✨

Este workspace está configurado para manejar tanto el frontend como el backend de la aplicación. Usa los siguientes comandos para administrar cada uno de los servicios.

## Estructura del Proyecto

Este monorepo de Nx contiene los siguientes proyectos:

- **Frontend**: Aplicación web desarrollada con `React/Angular/Vue`.
- **Backend**: API desarrollada con `NestJS/Express/Fastify`.

## Configuración Inicial

Asegúrate de instalar todas las dependencias antes de ejecutar cualquier servicio:

```sh
npm install
```

## Ejecución del Proyecto

Para iniciar el frontend en modo desarrollo:

```sh
npx nx serve frontend
```

Para iniciar el backend en modo desarrollo:

```sh
npx nx serve backend
```

Para compilar el frontend para producción:

```sh
npx nx build frontend
```

Para compilar el backend para producción:

```sh
npx nx build backend
```

## Comandos Útiles

Para listar los proyectos disponibles:

```sh
npx nx show projects
```

Para ver todas las tareas disponibles para un proyecto:

```sh
npx nx show project frontend
npx nx show project backend
```

## Generación de Código

Puedes generar nuevas aplicaciones y bibliotecas dentro del monorepo utilizando Nx.

Para crear una nueva aplicación:

```sh
npx nx g @nx/react:app new-app
```

Para crear una nueva librería compartida:

```sh
npx nx g @nx/js:lib shared-lib
```

Puedes ver los plugins instalados con:

```sh
npx nx list
```

Y obtener detalles sobre un plugin en particular con:

```sh
npx nx list <plugin-name>
```

## Configuración de CI/CD

Puedes configurar Nx Cloud para optimizar la ejecución de comandos y compartir caché entre equipos:

[Conectar con Nx Cloud](https://cloud.nx.app/connect/hckg8tGxq5)

También puedes revisar la documentación sobre Nx en CI/CD:

[Configuración de Nx en CI](https://nx.dev/ci/intro/ci-with-nx)

## Instalación de Nx Console

Nx Console es una extensión para editores como VSCode e IntelliJ que facilita la gestión del monorepo.

[Instalar Nx Console](https://nx.dev/getting-started/editor-setup)

## Recursos Adicionales

- [Documentación Oficial de Nx](https://nx.dev)
- [Comunidad en Discord](https://go.nx.dev/community)
- [Canal de YouTube de Nx](https://www.youtube.com/@nxdevtools)
- [Blog Oficial de Nx](https://nx.dev/blog)
