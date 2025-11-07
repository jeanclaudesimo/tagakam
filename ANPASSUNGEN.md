# Anpassungen für TaGaKaM&Co Website

## 🎨 Farben ändern

Die Hauptfarbe ist **#355290** (Blau) und die Sekundärfarbe ist **#2d4579** (Dunkelblau).

### Farben anpassen:

Bearbeiten Sie die Datei: **`tailwind.config.ts`**

```typescript
colors: {
  primary: {
    500: '#355290',  // ← Hier Ihre Hauptfarbe ändern
    // Die anderen Werte werden automatisch als Schattierungen generiert
  },
  secondary: {
    500: '#2d4579',  // ← Hier Ihre Sekundärfarbe ändern (aktuell Dunkelblau)
  }
}
```

**Ändern Sie nur die `500` Werte - das ist die Hauptfarbe!**

### Beispiele für Farbänderungen:

```typescript
// Grün als Hauptfarbe
primary: { 500: '#40af13' }

// Rot als Hauptfarbe
primary: { 500: '#dc2626' }

// Orange als Hauptfarbe
primary: { 500: '#f97316' }
```

---

## 🛠️ Services ändern

Services kommen jetzt aus der API-Simulation.

### Services anpassen:

Bearbeiten Sie die Datei: **`server/api/services.get.ts`**

```typescript
const services = [
  {
    id: 1,
    title: 'Ihr Service Name',
    description: 'Kurze Beschreibung',
    detailedDescription: 'Lange, detaillierte Beschreibung',
    icon: 'mdi:icon-name',  // Siehe Icon-Liste unten
    image: 'https://ihre-bild-url.jpg',
    active: true  // false = Service wird nicht angezeigt
  },
  // Weitere Services...
]
```

### Service hinzufügen:

```typescript
{
  id: 5,
  title: 'Neuer Service',
  description: 'Was macht dieser Service?',
  detailedDescription: 'Detaillierte Erklärung des Services...',
  icon: 'mdi:cog',
  image: 'https://images.unsplash.com/photo-xyz',
  active: true
}
```

### Service deaktivieren:

```typescript
{
  id: 2,
  title: '365Shop&Services',
  active: false  // ← Service wird nicht mehr angezeigt
}
```

### Verfügbare Icons:

Nutzen Sie [Material Design Icons](https://icon-sets.iconify.design/mdi/):
- `mdi:truck` - LKW
- `mdi:airplane` - Flugzeug
- `mdi:cart` - Einkaufswagen
- `mdi:broom` - Besen
- `mdi:home` - Haus
- `mdi:cog` - Zahnrad
- `mdi:account` - Person
- `mdi:phone` - Telefon
- `mdi:email` - E-Mail

[Weitere Icons finden](https://icon-sets.iconify.design/mdi/)

---

## 📞 Kontaktdaten ändern

Kontaktdaten kommen von der externen API: `http://portal.digitalssolutions.de/api/config`

### Fallback-Daten ändern:

Falls die API nicht erreichbar ist, werden Fallback-Daten verwendet.

Bearbeiten Sie: **`server/api/config.get.ts`**

```typescript
return {
  contact: {
    company_name: 'TaGaKaM&Co',
    address_line1: 'Ihre Straße 123',
    postal_code: 'PLZ',
    city: 'Ihre Stadt',
    country: 'Deutschland',
    phone: '0123 456789',
    email: 'ihre@email.de',
    // ...
  }
}
```

---

## 🖼️ Logo ändern

Ihr Logo liegt in: **`assets/logo/LogoFaTagakam&Co.jpeg`**

### Neues Logo verwenden:

1. Ersetzen Sie die Datei `LogoFaTagakam&Co.jpeg`
2. Oder ändern Sie den Import in `components/TheHeader.vue`:

```typescript
import logo from '~/assets/logo/IhrNeuesLogo.png'
```

### Logo-Größe anpassen:

In `components/TheHeader.vue`:

```vue
<img class="h-12 w-auto" />  <!-- h-12 = 48px, ändern Sie auf h-16 für 64px -->
```

---

## 🎯 Favicon einrichten

Das Favicon liegt in: **`assets/logo/favicon.ico`**

### Favicon aktivieren:

**WICHTIG**: Das Favicon muss in den `public/` Ordner kopiert werden, damit es funktioniert.

```bash
# Public-Ordner erstellen (falls nicht vorhanden)
mkdir -p public

# Favicon kopieren
cp assets/logo/favicon.ico public/favicon.ico
```

### Favicon ist bereits konfiguriert in:

Die `nuxt.config.ts` referenziert bereits das Favicon. Nach dem Kopieren in den `public/` Ordner sollte es automatisch funktionieren.

### Neues Favicon verwenden:

1. Ersetzen Sie `assets/logo/favicon.ico` mit Ihrem Favicon
2. Kopieren Sie es in den `public/` Ordner
3. Empfohlenes Format: ICO oder PNG (32x32 oder 16x16 Pixel)

---

## 🎆 Header-Hintergrundbild ändern

Das Header-Hintergrundbild liegt in: **`assets/images/header/header.5ab36199.webp`**

### Neues Hintergrundbild verwenden:

1. **Option 1**: Ersetzen Sie die bestehende Datei durch Ihr neues Bild
2. **Option 2**: Ändern Sie den Import in `components/sections/HeroSection.vue`:

```typescript
import headerImage from '~/assets/images/header/IhrNeuesBild.jpg'
```

### Empfohlene Bildgröße:
- **Breite**: Mindestens 1920px
- **Höhe**: Mindestens 1080px
- **Format**: JPG, PNG oder WebP
- **Tipp**: Verwenden Sie komprimierte Bilder für schnellere Ladezeiten

### Overlay-Intensität anpassen:

Falls das Bild zu hell oder zu dunkel ist, ändern Sie die Overlay-Transparenz in `components/sections/HeroSection.vue` Zeile 10:

```vue
<!-- Stärker abdunkeln -->
<div class="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-900/70 to-black/80"></div>

<!-- Weniger abdunkeln -->
<div class="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-primary-900/40 to-black/50"></div>
```

Die Zahlen `/70`, `/60`, `/70` steuern die Transparenz (0 = transparent, 100 = deckend).

---

## 👥 Team-Mitglieder ändern

Team-Mitglieder kommen jetzt aus der API-Simulation.

### Team-Mitglied anpassen:

Bearbeiten Sie die Datei: **`server/api/team.get.ts`**

```typescript
const team = [
  {
    id: 1,
    name: 'Name des Mitglieds',
    position: 'Position/Rolle',
    email: 'email@tagakam.de',
    avatar: null,  // Optional: Pfad zum Avatar-Bild
    social: {
      twitter: '',
      facebook: '',
      linkedin: ''
    },
    active: true  // false = Mitglied wird nicht angezeigt
  },
  // Weitere Team-Mitglieder...
]
```

### Team-Mitglied hinzufügen:

```typescript
{
  id: 5,
  name: 'Neues Mitglied',
  position: 'Position',
  email: 'neues.mitglied@tagakam.de',
  avatar: null,
  social: {
    twitter: 'https://twitter.com/username',
    facebook: '',
    linkedin: 'https://linkedin.com/in/username'
  },
  active: true
}
```

### Team-Mitglied deaktivieren:

```typescript
{
  id: 2,
  name: 'Doriane Ngatchie',
  position: 'Praktikantin',
  active: false  // ← Mitglied wird nicht mehr angezeigt
}
```

### Aktuell im Team:
- Dipl.-Ing Brice Tagakam (Geschäftsführer)
- Doriane Ngatchie (Praktikantin)
- Claude Simo (IT)
- Stephanie (Marketing)

---

## 🤝 Partner-Logos ändern

Partner-Logos werden in der Datei **`components/sections/PartnersSection.vue`** verwaltet.

### Partner-Logo hinzufügen:

Bearbeiten Sie die Datei: **`components/sections/PartnersSection.vue`**

```typescript
const partners = [
  {
    name: 'Partner Name',
    logo: '/pfad/zum/logo.png'  // oder URL
  },
  // Weitere Partner...
]
```

### Logo aus dem assets-Ordner verwenden:

1. Speichern Sie Ihr Logo in: `assets/images/partner/logo.png`
2. Importieren Sie es am Anfang des `<script setup>` Blocks:

```typescript
import partnerLogo from '~/assets/images/partner/logo.png'

const partners = [
  {
    name: 'Partner Name',
    logo: partnerLogo
  }
]
```

### Aktuell verwendete Partner-Logos:

Die Partner-Section zeigt aktuell folgende Logos aus `assets/images/partner/`:
- NT Global Transit
- 365 Shop & Services
- Easy Fly Global
- NT Dream House
- NT Locator
- TaGaKaM & Co
- Logo Rond

### Empfohlene Logo-Größe:
- **Format**: PNG mit transparentem Hintergrund
- **Breite**: 200-300px
- **Höhe**: 80-120px
- **Tipp**: Logos werden automatisch in Graustufen angezeigt und färben sich beim Hover

### Partner-Logo entfernen:

Löschen Sie einfach das entsprechende Objekt aus dem `partners` Array.

---

## ❓ FAQ-Einträge ändern

FAQ-Einträge kommen jetzt aus der API-Simulation.

### FAQ-Eintrag anpassen:

Bearbeiten Sie die Datei: **`server/api/faq.get.ts`**

```typescript
const faqs = [
  {
    id: 1,
    question: 'Ihre Frage?',
    answer: 'Die Antwort auf Ihre Frage...',
    active: true,
    order: 1  // Reihenfolge der Anzeige
  },
  // Weitere FAQs...
]
```

### FAQ hinzufügen:

```typescript
{
  id: 6,
  question: 'Neue Frage?',
  answer: 'Antwort auf die neue Frage...',
  active: true,
  order: 6
}
```

### FAQ deaktivieren:

```typescript
{
  id: 3,
  question: 'Bieten Sie auch internationale Versanddienste an?',
  active: false  // ← FAQ wird nicht mehr angezeigt
}
```

### Reihenfolge ändern:

Die FAQs werden nach dem `order` Feld sortiert (1, 2, 3...). Ändern Sie die Zahlen, um die Reihenfolge zu ändern.

---

## 📧 Kontaktformular-API

Das Kontaktformular sendet Nachrichten direkt an `portal.digitalssolutions.de`.

### Wie es funktioniert:

1. Benutzer füllt das Formular aus
2. **Bot-Schutz** prüft Honeypot-Feld (unsichtbar für echte Benutzer)
3. Daten werden an `/api/contact/submit` gesendet
4. Server leitet die Anfrage an `portal.digitalssolutions.de/api/contact/submit` weiter
5. Tenant API Key ist bereits konfiguriert

### 🤖 Bot-Schutz (Honeypot)

Das Kontaktformular hat einen integrierten Spam-Schutz:
- Unsichtbares Feld, das nur Bots ausfüllen
- Keine zusätzlichen Dienste erforderlich (DSGVO-konform)
- Funktioniert sowohl client- als auch serverseitig
- Bot-Nachrichten werden nicht an die API gesendet

### API-Endpoint:

- **Lokal**: `http://localhost:3000/api/contact/submit`
- **Extern**: `https://portal.digitalssolutions.de/api/contact/submit`

### Tenant Key ändern:

Falls Sie den Tenant Key ändern müssen, bearbeiten Sie: **`server/api/contact/submit.post.ts`**

```typescript
const tenantKey = 'IHR_NEUER_TENANT_KEY'
```

---

## 🚀 Änderungen testen

Nach jeder Änderung:

```bash
# Server läuft bereits? Änderungen werden automatisch geladen!
# Falls nicht:
npm run dev
```

Öffnen Sie: http://localhost:3000

---

## 📝 Wichtige Dateien

| Datei | Zweck |
|-------|-------|
| `tailwind.config.ts` | Farben ändern |
| `server/api/services.get.ts` | Services ändern |
| `server/api/team.get.ts` | Team-Mitglieder ändern |
| `server/api/faq.get.ts` | FAQ-Einträge ändern |
| `server/api/contact/submit.post.ts` | Kontaktformular API |
| `server/api/config.get.ts` | Kontaktdaten-Fallback |
| `components/TheHeader.vue` | Logo und Navigation |
| `components/sections/HeroSection.vue` | Header-Hintergrundbild |
| `components/sections/PartnersSection.vue` | Partner-Logos |
| `assets/css/main.css` | Custom CSS |

---

## ❓ Häufige Fragen

**Q: Wie ändere ich die Hauptfarbe der gesamten Website?**
A: Ändern Sie nur `primary: { 500: '#IhreFarbe' }` in `tailwind.config.ts`

**Q: Services werden nicht angezeigt?**
A: Prüfen Sie, ob `active: true` gesetzt ist in `server/api/services.get.ts`

**Q: Logo wird nicht angezeigt?**
A: Prüfen Sie den Pfad in `components/TheHeader.vue` und ob die Datei existiert

**Q: Farbe ändert sich nicht?**
A: Stoppen Sie den Server (Strg+C) und starten Sie neu: `npm run dev`

---

Viel Erfolg! 🎉
