# Daten-Verwaltung

Alle Daten für die Website werden in diesem Ordner verwaltet.

## Dateien

- **services.ts** - Alle Services/Dienstleistungen
- **team.ts** - Team-Mitglieder
- **faq.ts** - Häufig gestellte Fragen
- **config.ts** - Firmen-Konfiguration und Kontaktdaten

## Daten bearbeiten

### Services hinzufügen/bearbeiten

Bearbeiten Sie `services.ts` und fügen Sie neue Services hinzu:

```typescript
{
  id: 6,
  title: 'Neuer Service',
  description: 'Kurze Beschreibung',
  detailedDescription: 'Ausführliche Beschreibung',
  icon: 'mdi:icon-name', // Icon von https://icon-sets.iconify.design/mdi/
  image: 'https://...',  // Bild-URL
  active: true,          // true = sichtbar, false = versteckt
  serviceItems: [        // Liste der Service-Details
    'Detail 1',
    'Detail 2'
  ]
}
```

### Team-Mitglieder hinzufügen/bearbeiten

Bearbeiten Sie `team.ts`:

```typescript
{
  id: 3,
  name: 'Max Mustermann',
  position: 'Position',
  email: 'email@example.com',
  avatar: 'https://...',  // Bild-URL (optional)
  active: true            // true = sichtbar, false = versteckt
}
```

### FAQs hinzufügen/bearbeiten

Bearbeiten Sie `faq.ts`:

```typescript
{
  id: 4,
  question: 'Ihre Frage?',
  answer: 'Die Antwort',
  active: true,  // true = sichtbar, false = versteckt
  order: 4       // Sortier-Reihenfolge
}
```

### Firmen-Informationen bearbeiten

Bearbeiten Sie `config.ts` für Kontaktdaten und Firmen-Informationen.

## Nach Änderungen

Nach dem Bearbeiten der Daten:
1. Speichern Sie die Datei
2. Der Dev-Server lädt automatisch neu (Hot Reload)
3. Bei Production: Neu deployen

## Deployment mit Dokploy

Die Environment-Variablen können in Dokploy gesetzt werden:
- `NUXT_PUBLIC_COMPANY_NAME` - Firmenname
- `NUXT_PUBLIC_COMPANY_EMAIL` - Kontakt-Email
- `NUXT_PUBLIC_COMPANY_PHONE` - Telefonnummer
- `NUXT_PUBLIC_SITE_URL` - Website-URL

Siehe `.env.example` für alle verfügbaren Variablen.
