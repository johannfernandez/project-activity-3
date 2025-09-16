# Project Activity 3 - Creating an IPV4/IPV6 Address Application

## Overview
This is a prototype Python application that retrieves and displays a computer’s public IPv4 and IPv6 addresses using publicly available REST APIs.
The application is designed for network technicians who need quick access to IP addressing details for troubleshooting and network diagnostics.

In addition to IP addresses, depending on the chosen API, the application may also display:

- Geolocation information (city, region, country)
- ISP (Internet Service Provider)
- ASN (Autonomous System Number) of the ISP
- Country code

The tool formats this information neatly in the console for easy readability.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
