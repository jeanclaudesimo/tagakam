# TaGaKaM&Co Website

Eine moderne, responsive Website für TaGaKaM&Co, entwickelt mit Nuxt.js 3, TypeScript, Tailwind CSS und Pinia.

## 🚀 Features

- ✨ Modernes, ansprechendes Design mit Animationen
- 📱 Vollständig responsive für alle Geräte
- 🎨 Tailwind CSS für schnelles Styling
- 🔄 Pinia State Management
- 🌐 API-Integration mit portal.digitalssolutions.de
- ⚡ Optimierte Performance mit Nuxt 3
- 🎯 TypeScript für Type-Safety
- 🎭 Smooth Scrolling und Animationen
- 📦 Komponentenbasierte Architektur
- 🤖 Bot-Schutz im Kontaktformular (Honeypot)

## 📋 Hauptsektionen

1. **Hero Section** - Eindrucksvoller Willkommensbereich mit animiertem Hintergrund
2. **Über uns** - Unternehmensvorstellung mit Services
3. **Services** - Detaillierte Darstellung aller Dienstleistungen
4. **Team** - Vorstellung des Teams
5. **FAQ** - Häufig gestellte Fragen
6. **Kontakt** - Kontaktformular mit dynamischen Kontaktdaten

## 🛠️ Technologien

- **Framework**: Nuxt.js 3
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Icons**: Nuxt Icon
- **Utilities**: VueUse

## 📦 Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Production Build
npm run build

# Production vorschau
npm run preview
```

## 🌐 API Integration

Die Website nutzt sowohl lokale API-Simulationen als auch externe APIs von portal.digitalssolutions.de:

### Lokale API-Endpunkte (Simulationen)

| Endpoint            | Methode | Zweck           | Bearbeitbar in                    |
|---------------------|---------|-----------------|-----------------------------------|
| `/api/config`       | GET     | Kontaktdaten    | `server/api/config.get.ts`        |
| `/api/services`     | GET     | Services        | `server/api/services.get.ts`      |
| `/api/team`         | GET     | Team-Mitglieder | `server/api/team.get.ts`          |
| `/api/faq`          | GET     | FAQ-Einträge    | `server/api/faq.get.ts`           |
| `/api/contact/submit` | POST  | Kontaktformular | `server/api/contact/submit.post.ts` |

### Externe API-Endpunkte

- **Login**: `POST https://portal.digitalssolutions.de/api/login`
- **Config**: `GET https://portal.digitalssolutions.de/api/config`
- **Contact Submit**: `POST https://portal.digitalssolutions.de/api/contact/submit`

**Hinweis**: Die Endpunkte `/api/services`, `/api/team` und `/api/faq` sind aktuell nur als lokale Simulationen implementiert. Siehe `API-DOCUMENTATION.md` für die vollständige Spezifikation zur Implementierung dieser Endpunkte im Backend.

## 📂 Projektstruktur

```
tagakam-website/
├── app.vue                     # Hauptkomponente
├── assets/
│   ├── css/
│   │   └── main.css           # Tailwind CSS + Custom Styles
│   ├── images/
│   │   ├── header/            # Header-Hintergrundbild
│   │   └── partner/           # Partner-Logos
│   └── logo/                  # TaGaKaM Logo
├── components/
│   ├── sections/
│   │   ├── HeroSection.vue    # Hero Bereich mit Hintergrundbild
│   │   ├── AboutSection.vue   # Über uns
│   │   ├── ServicesSection.vue # Services (API-gesteuert)
│   │   ├── TeamSection.vue    # Team (API-gesteuert)
│   │   ├── PartnersSection.vue # Partner-Logos
│   │   ├── FaqSection.vue     # FAQ (API-gesteuert)
│   │   └── ContactSection.vue # Kontakt mit API-Integration
│   ├── TheHeader.vue          # Navigation mit Logo
│   └── TheFooter.vue          # Footer
├── server/
│   └── api/
│       ├── config.get.ts      # Kontaktdaten API
│       ├── services.get.ts    # Services API (Simulation)
│       ├── team.get.ts        # Team API (Simulation)
│       ├── faq.get.ts         # FAQ API (Simulation)
│       └── contact/
│           └── submit.post.ts # Kontaktformular API
├── stores/
│   ├── config.ts              # Pinia Store für Config
│   ├── services.ts            # Pinia Store für Services
│   ├── team.ts                # Pinia Store für Team
│   └── faq.ts                 # Pinia Store für FAQ
├── types/
│   └── api.ts                 # TypeScript Typen
├── nuxt.config.ts             # Nuxt Konfiguration
├── tailwind.config.ts         # Tailwind Konfiguration (Farben)
├── README.md                  # Projekt-Dokumentation
├── ANPASSUNGEN.md             # Anleitung für Anpassungen
├── API-DOCUMENTATION.md       # API-Spezifikation für Backend
└── package.json
```

## 🎨 Design-System

### Farben
- **Primär**: Blau-Gradient (from-blue-600 to-indigo-600)
- **Akzent**: Lila (purple-600)
- **Hintergrund**: Weiß mit grauen Sektionen

### Komponenten-Klassen
- `btn-primary` - Primärer Button
- `btn-outline` - Outline Button
- `section-title` - Sektions-Überschrift
- `section-subtitle` - Sektions-Untertitel
- `gradient-text` - Gradient Text Effekt
- `card-hover` - Hover Effekt für Cards

## 🔧 Anpassungen

### API Konfiguration
Ändern Sie die API-URL in `nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    apiBase: 'http://ihre-api-url.de/api'
  }
}
```

### Kontaktdaten
Die Kontaktdaten werden automatisch von der API geladen. Als Fallback sind statische Daten in den Komponenten definiert.

### Styling
Anpassungen können in `assets/css/main.css` und `tailwind.config.ts` vorgenommen werden.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Docker (Empfohlen für Produktion)

Das Projekt enthält ein optimiertes Multi-Stage Dockerfile:

```bash
# Image bauen
docker build -t tagakam-website .

# Container starten
docker run -p 3000:3000 tagakam-website
```

### Docker Compose mit Traefik

Für Produktion mit Traefik Reverse Proxy:

```bash
# Container bauen und starten
docker-compose up -d

# Logs anzeigen
docker-compose logs -f

# Container stoppen
docker-compose down
```

**Wichtig**: Das docker-compose.yml ist für die Verwendung mit einem existierenden Traefik-Netzwerk konfiguriert (`traefik-net`).

### Vercel, Netlify, etc.
```bash
npm run build
```

Die generierte `.output` Datei kann auf jedem Node.js Server deployed werden.

## 📄 Lizenz

© 2025 TaGaKaM&Co. Alle Rechte vorbehalten.

## 👨‍💻 Entwickler

Entwickelt von einem Senior Frontend Developer mit Fokus auf moderne Web-Technologien und ansprechendes Design.

## 📞 Support

Bei Fragen zur Website wenden Sie sich bitte an:
- **Email**: info@tagakam.de
- **Telefon**: 0221 2981 3937

## 🎯 Next Steps

### Backend-Implementierung
1. **Services API** implementieren (siehe `API-DOCUMENTATION.md`)
2. **Team API** implementieren (siehe `API-DOCUMENTATION.md`)
3. **FAQ API** implementieren (siehe `API-DOCUMENTATION.md`)
4. Datenbank-Tabellen erstellen (SQL-Schema in API-Dokumentation)
5. Admin-Panel für Content-Verwaltung erstellen

### Deployment
1. SSL-Zertifikat für tagakam.de erneuern
2. Produktions-Domain konfigurieren
3. Umgebungsvariablen für Produktion einrichten
4. CI/CD Pipeline einrichten

### Optimierung
1. SEO-Optimierung durchführen
2. Google Analytics einbinden (optional)
3. Performance-Optimierung (Bilder komprimieren)
4. Lighthouse-Audit durchführen
