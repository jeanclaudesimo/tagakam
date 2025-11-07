# API-Dokumentation für TaGaKaM&Co Backend

Diese Dokumentation beschreibt die API-Endpunkte, die im Backend implementiert werden müssen.

## 📋 Inhaltsverzeichnis

1. [Services API](#services-api)
2. [Team API](#team-api)
3. [FAQ API](#faq-api)
4. [Authentifizierung](#authentifizierung)
5. [Fehlerbehandlung](#fehlerbehandlung)

---

## Services API

### GET `/api/services`

Gibt eine Liste aller Services zurück.

#### Request

```http
GET /api/services HTTP/1.1
Host: portal.digitalssolutions.de
Authorization: Bearer {token}
Content-Type: application/json
```

#### Response

**Status Code**: `200 OK`

```json
{
  "services": [
    {
      "id": 1,
      "title": "NTglobaltransit",
      "description": "Kurzbeschreibung des Services (1-2 Sätze)",
      "detailedDescription": "Ausführliche Beschreibung des Services mit allen Details und Vorteilen",
      "icon": "mdi:truck",
      "image": "https://example.com/image.jpg",
      "active": true
    }
  ],
  "total": 4
}
```

#### Felderbeschreibung

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `id` | integer | Ja | Eindeutige ID des Services |
| `title` | string | Ja | Titel des Services (max. 100 Zeichen) |
| `description` | string | Ja | Kurzbeschreibung für Karten (max. 200 Zeichen) |
| `detailedDescription` | string | Ja | Detaillierte Beschreibung für Hover-Overlay (max. 500 Zeichen) |
| `icon` | string | Ja | Material Design Icon Name (z.B. "mdi:truck") |
| `image` | string | Ja | URL zum Service-Bild (empfohlen: 1200x800px) |
| `active` | boolean | Ja | Gibt an, ob der Service angezeigt werden soll |

#### Verwendete Icons

Die Website verwendet [Material Design Icons](https://icon-sets.iconify.design/mdi/):
- `mdi:truck` - LKW/Transport
- `mdi:airplane` - Flugzeug/Reisen
- `mdi:cart` - Einkaufswagen/Shop
- `mdi:home-city` - Immobilien
- `mdi:cctv` - Videoüberwachung
- Weitere Icons: https://icon-sets.iconify.design/mdi/

#### Beispiel Response

```json
{
  "services": [
    {
      "id": 1,
      "title": "NTglobaltransit",
      "description": "Professionelle Speditionslösungen für nationale und internationale Transporte.",
      "detailedDescription": "Wir bieten maßgeschneiderte Transportlösungen für Unternehmen jeder Größe. Von Expressversand bis zu Komplettladungen – wir kümmern uns um Ihre Logistik mit modernster Technologie und GPS-Tracking.",
      "icon": "mdi:truck",
      "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      "active": true
    },
    {
      "id": 2,
      "title": "365Shop&Services",
      "description": "Ihr Online-Shop für Afro-Produkte und Autoteile.",
      "detailedDescription": "Entdecken Sie unsere vielfältige Auswahl an authentischen Afro-Produkten und hochwertigen Autoteilen. Schneller Versand, faire Preise und exzellenter Kundenservice.",
      "icon": "mdi:cart",
      "image": "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
      "active": true
    }
  ],
  "total": 2
}
```

#### Fehlercodes

| Status | Beschreibung |
|--------|--------------|
| `200` | Erfolgreiche Anfrage |
| `401` | Nicht authentifiziert |
| `500` | Serverfehler |

---

## Team API

### GET `/api/team`

Gibt eine Liste aller Team-Mitglieder zurück.

#### Request

```http
GET /api/team HTTP/1.1
Host: portal.digitalssolutions.de
Authorization: Bearer {token}
Content-Type: application/json
```

#### Response

**Status Code**: `200 OK`

```json
{
  "team": [
    {
      "id": 1,
      "name": "Dipl.-Ing Brice Tagakam",
      "position": "Geschäftsführer",
      "email": "b.tagakam@tagakam.de",
      "avatar": null,
      "social": {
        "twitter": "",
        "facebook": "",
        "linkedin": "https://linkedin.com/in/username"
      },
      "active": true
    }
  ],
  "total": 4
}
```

#### Felderbeschreibung

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `id` | integer | Ja | Eindeutige ID des Team-Mitglieds |
| `name` | string | Ja | Vollständiger Name (max. 100 Zeichen) |
| `position` | string | Ja | Position/Rolle im Unternehmen (max. 100 Zeichen) |
| `email` | string | Ja | E-Mail-Adresse (wird als mailto: Link angezeigt) |
| `avatar` | string/null | Nein | URL zum Profilbild (empfohlen: 400x400px, quadratisch) |
| `social` | object/null | Nein | Social Media Links |
| `social.twitter` | string | Nein | Twitter-Profil URL |
| `social.facebook` | string | Nein | Facebook-Profil URL |
| `social.linkedin` | string | Nein | LinkedIn-Profil URL |
| `active` | boolean | Ja | Gibt an, ob das Mitglied angezeigt werden soll |

#### Hinweise

- Wenn `avatar` null ist, wird ein Platzhalter-Icon angezeigt
- Social Media Links sind optional und werden nur angezeigt, wenn sie gesetzt sind
- Leere Strings bei Social Media werden als "nicht gesetzt" behandelt

#### Beispiel Response

```json
{
  "team": [
    {
      "id": 1,
      "name": "Dipl.-Ing Brice Tagakam",
      "position": "Geschäftsführer",
      "email": "b.tagakam@tagakam.de",
      "avatar": "https://example.com/avatars/brice.jpg",
      "social": {
        "twitter": "https://twitter.com/tagakam",
        "facebook": "",
        "linkedin": "https://linkedin.com/in/brice-tagakam"
      },
      "active": true
    },
    {
      "id": 2,
      "name": "Doriane Ngatchie",
      "position": "Praktikantin",
      "email": "d.ngatchie@tagakam.de",
      "avatar": null,
      "social": {
        "twitter": "",
        "facebook": "",
        "linkedin": ""
      },
      "active": true
    }
  ],
  "total": 2
}
```

#### Fehlercodes

| Status | Beschreibung |
|--------|--------------|
| `200` | Erfolgreiche Anfrage |
| `401` | Nicht authentifiziert |
| `500` | Serverfehler |

---

## FAQ API

### GET `/api/faq`

Gibt eine Liste aller FAQ-Einträge zurück.

#### Request

```http
GET /api/faq HTTP/1.1
Host: portal.digitalssolutions.de
Authorization: Bearer {token}
Content-Type: application/json
```

#### Response

**Status Code**: `200 OK`

```json
{
  "faqs": [
    {
      "id": 1,
      "question": "Welche Dienstleistungen bietet TaGaKaM&Co an?",
      "answer": "Wir bieten eine breite Palette von Dienstleistungen...",
      "active": true,
      "order": 1
    }
  ],
  "total": 5
}
```

#### Felderbeschreibung

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `id` | integer | Ja | Eindeutige ID des FAQ-Eintrags |
| `question` | string | Ja | Die Frage (max. 200 Zeichen) |
| `answer` | string | Ja | Die Antwort (max. 1000 Zeichen) |
| `active` | boolean | Ja | Gibt an, ob der FAQ-Eintrag angezeigt werden soll |
| `order` | integer | Ja | Sortierreihenfolge (niedrigere Zahlen werden zuerst angezeigt) |

#### Sortierung

Die FAQs sollten nach dem `order` Feld aufsteigend sortiert werden (1, 2, 3, ...).

#### Beispiel Response

```json
{
  "faqs": [
    {
      "id": 1,
      "question": "Welche Dienstleistungen bietet TaGaKaM&Co an?",
      "answer": "Wir bieten eine breite Palette von Dienstleistungen, darunter GPS-Installation und Videoüberwachung, Immobilien- und Vermietungsdienste, Reisebuchungen über Easy Fly Global sowie den Verkauf von Afro-Produkten und Autoteilen über unseren 365Shop.",
      "active": true,
      "order": 1
    },
    {
      "id": 2,
      "question": "Wie kann ich eine Geschäftsreise mit Easy Fly Global buchen?",
      "answer": "Über Easy Fly Global bieten wir Ihnen einen vollständigen Service für Ihre Geschäftsreisen, einschließlich Flugbuchungen, Hotelreservierungen und maßgeschneiderter Reiseplanung. Kontaktieren Sie uns, und wir erstellen das perfekte Reisepaket für Sie.",
      "active": true,
      "order": 2
    }
  ],
  "total": 2
}
```

#### Fehlercodes

| Status | Beschreibung |
|--------|--------------|
| `200` | Erfolgreiche Anfrage |
| `401` | Nicht authentifiziert |
| `500` | Serverfehler |

---

## Authentifizierung

Alle API-Anfragen (außer Login) erfordern einen Bearer Token im Authorization Header:

```http
Authorization: Bearer {token}
```

### Token erhalten

```http
POST /api/login HTTP/1.1
Host: portal.digitalssolutions.de
Content-Type: application/json

{
  "email": "claude@c-simweb.de",
  "password": "Da##29031990"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "claude@c-simweb.de",
    "name": "Claude"
  }
}
```

---

## Fehlerbehandlung

Alle Fehler folgen diesem Format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Menschenlesbare Fehlermeldung",
    "details": {}
  }
}
```

### Standard-Fehlercodes

| Status | Code | Beschreibung |
|--------|------|--------------|
| `400` | `BAD_REQUEST` | Ungültige Anfrage |
| `401` | `UNAUTHORIZED` | Nicht authentifiziert |
| `403` | `FORBIDDEN` | Keine Berechtigung |
| `404` | `NOT_FOUND` | Ressource nicht gefunden |
| `500` | `INTERNAL_ERROR` | Interner Serverfehler |

---

## Implementierungs-Checkliste

### Services API
- [ ] Datenbank-Tabelle `services` erstellen
- [ ] CRUD-Endpunkte implementieren
- [ ] `active` Flag für Filterung implementieren
- [ ] Bildupload für Service-Images einrichten
- [ ] Icon-Validierung (mdi: Prefix prüfen)

### Team API
- [ ] Datenbank-Tabelle `team` erstellen
- [ ] CRUD-Endpunkte implementieren
- [ ] `active` Flag für Filterung implementieren
- [ ] Avatar-Upload implementieren
- [ ] Social Media Links validieren (URL-Format)

### FAQ API
- [ ] Datenbank-Tabelle `faq` erstellen
- [ ] CRUD-Endpunkte implementieren
- [ ] `active` Flag für Filterung implementieren
- [ ] Sortierung nach `order` implementieren
- [ ] Drag & Drop Sortierung im Admin-Panel (optional)

### Allgemein
- [ ] Authentifizierung mit Bearer Token
- [ ] Rate Limiting implementieren
- [ ] CORS-Header konfigurieren
- [ ] API-Dokumentation (z.B. Swagger) erstellen
- [ ] Logging implementieren
- [ ] Backup-Strategie definieren

---

## Datenbank-Schema Vorschläge

### Services Tabelle

```sql
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(200) NOT NULL,
    detailed_description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    image VARCHAR(500),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Team Tabelle

```sql
CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    avatar VARCHAR(500),
    twitter VARCHAR(500),
    facebook VARCHAR(500),
    linkedin VARCHAR(500),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### FAQ Tabelle

```sql
CREATE TABLE faq (
    id SERIAL PRIMARY KEY,
    question VARCHAR(200) NOT NULL,
    answer TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    order_number INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Testing

### cURL Beispiele

**Services abrufen:**
```bash
curl -X GET https://portal.digitalssolutions.de/api/services \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

**Team abrufen:**
```bash
curl -X GET https://portal.digitalssolutions.de/api/team \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

**FAQ abrufen:**
```bash
curl -X GET https://portal.digitalssolutions.de/api/faq \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

---

## Kontakt

Bei Fragen zur API-Implementierung:
- **Email**: info@tagakam.de
- **Telefon**: 0221 2981 3937

---

**Letzte Aktualisierung**: 2025-01-07
