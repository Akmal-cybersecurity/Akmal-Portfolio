# Akmal B — Cybersecurity Portfolio Website

A premium, interactive 3D personal portfolio website for **Akmal B**, a Computer Science Engineering student specializing in Cyber Security at SRM Trichy (Expected Graduation: 2030).

---

## 🌟 Features & Highlights

- **Authentic Student Profile**: Accurately showcases academic background at SRM Trichy, core technical foundations (Linux, Networking, Python, C), and active exploration into Cloud Security.
- **Interactive 3D Particle Field**: Canvas-driven multi-layer 3D particle environment responding dynamically to cursor movement with fluid wave repulsion, spring damping, and proximity network lines.
- **Micro 3D Tilt**: Perspective card tilt and glare effects on the hero profile card and interactive components.
- **3D Network Topology Visualizers**: Interactive 3D geometric nodes and distributed perimeter structures in About, Cloud Security, and Contact sections.
- **Dark & Light Mode**: Default cinematic dark theme (`#05070A`) with an intentionally styled light theme and persistent state.
- **Centralized Data Architecture (`js/data/portfolio-data.js`)**: All personal information, skills, roadmap steps, and future projects/certifications/achievements are stored in a single structured file.
- **Future-Ready Empty States**: Beautiful, intentional placeholders for upcoming projects, certifications, internships, and milestones.
- **Minimal Precision Cursor**: Dot and trailing ring micro-interaction on desktop (automatically disabled on touch devices).
- **Responsive & Accessible**: Mobile drawer navigation, semantic HTML5, ARIA compliance, and `prefers-reduced-motion` support.

---

## 🚀 How to Run Locally

Because the application is built using modern native ES modules and standard web standards, no compilation or build steps are required.

### Quick Start with Python:
```bash
python3 -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your browser.

### Quick Start with Node / `npx serve`:
```bash
npx serve .
```

---

## 📁 Structure

```
Akmal-Portfolio/
├── assets/
│   ├── favicon.svg               # Geometric AB monogram vector favicon
│   └── images/
│       ├── akmal-profile.png     # Full resolution original portrait
│       ├── akmal-profile-800.webp# Optimized 800x800 WebP (fast hero load)
│       └── akmal-profile-400.webp# Optimized 400x400 WebP thumbnail
├── css/
│   └── styles.css                # Design system tokens, glassmorphism, responsive grid
├── js/
│   ├── canvas/
│   │   ├── particle-field.js     # 3D particle canvas engine with cursor physics
│   │   └── network-visual.js     # 3D projection network topology visualizer
│   ├── data/
│   │   └── portfolio-data.js     # Centralized portfolio data store
│   ├── interactions/
│   │   ├── cursor.js             # Custom minimal cursor controller
│   │   └── tilt.js               # 3D card tilt & glare controller
│   ├── main.js                   # Application orchestrator & DOM renderer
│   └── theme.js                  # Dark/Light theme manager
├── index.html                    # Semantic HTML5 application shell
└── README.md

---

## 📬 Contact & Links
- **GitHub**: [https://github.com/Akmal-cybersecurity](https://github.com/Akmal-cybersecurity)
- **LinkedIn**: [https://www.linkedin.com/in/akmal-b-136618416/](https://www.linkedin.com/in/akmal-b-136618416/)
- **Email**: [sahulakmal805@gmail.com](mailto:sahulakmal805@gmail.com)
