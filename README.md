# 🕹️ GBA V5 —

Welcome to the **GBA Emulator**, a high-performance web-based terminal designed to bring retro gaming into a modern, cyberpunk aesthetic. This project focuses on "Laboratory" visuals, using neon accents and CRT-style effects to create an immersive user experience.

---

## 🔬 Project Overview & Performance

As a web developer, my goal was to build a wrapper that feels like a physical piece of hardware. The interface is built for **speed and stability**, utilizing the latest web standards to ensure low-latency emulation.

### Performance Highlights:
* **Vite-Powered Speed:** Leveraging Vite ensures that the application loads almost instantly by using native ES modules.
* **Secure Environment:** The configuration includes specific security headers (**Cross-Origin-Opener-Policy**) to allow for advanced browser features required for smooth emulation performance.
* **Immersive UI:** A custom-built "Laboratory" theme featuring real-time scanline animations and neon glow effects.

---

## 🛠️ Technology "Tier List"

Here is the breakdown of the tools used to engineer this lab environment:

| Tier | Tool / Strategy | Purpose |
| :--- | :--- | :--- |
| **S (God Tier)** | **React + Vite** | Provides the reactive UI and ultra-fast development environment. |
| **A (Elite)** | **CSS Keyframe Animations** | Creates the "Scanline" effect that moves across the screen to mimic old monitors. |
| **A (Elite)** | **Vercel Security Config** | Essential for enabling the high-performance memory sharing needed for emulators. |
| **B (Pro)** | **Neon Design System** | A consistent use of `#00ffa3` across the borders and text for a cohesive look. |

---

## 📱 Features & Responsiveness

### 1. Cyberpunk Terminal UI 🖥️
The interface uses a deep black background (`#050505`) and high-contrast neon green text to reduce eye strain and match the hardware aesthetic. 

### 2. Animated Scanlines 🎞️
To give the "emulator" a realistic feel, a custom CSS animation called `scan` moves a semi-transparent line from the top to the bottom of the screen continuously.

### 3. Responsive Screen Scaling 📲
The emulator container is designed to be **responsive**. On mobile devices, the "Emu Screen" adapts its size, while the neon glow and border-radius remain consistent to keep the "handheld" feel.

### 4. Zero-Friction Navigation ⌨️
The project removes standard scrollbars to keep the focus entirely on the emulator screen, creating a dedicated "App" experience rather than just a website.

---

## 💻 Coding & "Modding"

This project is built to be easily customized or "modded" for different visual styles.

### **The "Scanline" Engine**
You can adjust the speed of the CRT effect in the `style` section of the `index.html`. Changing the `4s` value in `animation: scan 4s linear infinite;` will speed up or slow down the refresh effect.

### **Branding & Colors**
The entire lab's atmosphere is controlled by the `color` and `border` properties. To change the theme from "Neon Green" to "Cyber Red," you simply update the color code `#00ffa3` to your preferred hex code in the `body` and `.emu-screen-container` styles.

### **Running the Lab**
To start the project in a development environment:
```bash
npm install
npm run dev
```

---
