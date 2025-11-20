# Guide de Déploiement - TaGaKaM

## ⚠️ Configuration Requise

Pour que l'application fonctionne correctement avec l'API externe, vous **DEVEZ** configurer les variables d'environnement suivantes en production.

### Variables d'Environnement Obligatoires

```bash
# Pour l'authentification JWT (endpoint /config)
API_LOGIN_EMAIL=info@tagakam.de
API_LOGIN_PASSWORD=tagakam

# Pour les endpoints /services, /team, /faq
API_TENANT_KEY=ce9563cab5f81156b3c1f6ba86ace15c5c1c48f97c4a4a68049d7e84f10a4d23
```

### Configuration Docker Compose

Si vous utilisez Docker Compose, créez un fichier `.env` à la racine du projet :

```bash
API_LOGIN_EMAIL=info@tagakam.de
API_LOGIN_PASSWORD=tagakam
API_TENANT_KEY=ce9563cab5f81156b3c1f6ba86ace15c5c1c48f97c4a4a68049d7e84f10a4d23
```

Puis redémarrez le conteneur :

```bash
docker-compose down
docker-compose up -d --build
```

### Configuration Dokploy

Si vous utilisez Dokploy :

1. Allez dans les paramètres de votre application
2. Section "Environment Variables"
3. Ajoutez les trois variables ci-dessus
4. Redéployez l'application

## 🔍 Comportement sans Configuration

**Sans ces variables d'environnement :**

- ✅ L'application **fonctionne quand même** en utilisant les données locales
- ⚠️ Vous verrez des erreurs 401/500 dans la console du navigateur (c'est normal)
- ⚠️ Les données ne seront pas synchronisées avec l'API externe
- ⚠️ Le formulaire de contact ne pourra pas envoyer d'emails via l'API

## 🐛 Dépannage

### Erreur 401 sur /api/portal/config

**Cause :** `API_LOGIN_EMAIL` et `API_LOGIN_PASSWORD` ne sont pas configurés

**Solution :** Configurez ces variables d'environnement et redémarrez le serveur

### Erreur 500 sur /api/portal/services, /team, /faq

**Causes possibles :**
1. `API_TENANT_KEY` n'est pas configuré
2. Timeout de connexion (le serveur ne peut pas accéder à `portal.digitalssolutions.de`)
3. Problème de réseau/firewall

**Solutions :**
1. Vérifiez que `API_TENANT_KEY` est configuré
2. Vérifiez que le serveur peut faire des requêtes HTTPS sortantes vers `portal.digitalssolutions.de`
3. Vérifiez les logs du serveur pour plus de détails

### L'application est lente à charger

**Cause :** Les appels API timeout (15 secondes par endpoint)

**Solution :** 
- Configurez les variables d'environnement pour que les appels réussissent
- Ou augmentez le timeout dans les fichiers `server/api/portal/*.get.ts` (non recommandé)

## ✅ Vérification

Pour vérifier que tout fonctionne :

1. Ouvrez la console du navigateur (F12)
2. Vérifiez qu'il n'y a **pas** d'erreurs 401/500
3. Les données doivent se charger depuis l'API (pas depuis les données locales)

## 📝 Notes

- Les erreurs dans la console sont **normales** si les variables d'environnement ne sont pas configurées
- L'application utilise automatiquement les données locales en cas d'échec de l'API
- Les timeouts sont de 15 secondes avec 1 retry automatique

