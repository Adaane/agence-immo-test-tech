@AGENTS.md

# Maison Vérane

Site vitrine de Maison Vérane, agence immobilière d'exception fictive basée à Paris et à Lyon. Test technique : une homepage premium (présentation du groupe, biens d'exception, services, agences, témoignages, contact). Site en français, thème clair uniquement, sans déploiement.

## Stack du projet

- Type : Site vitrine (homepage unique)
- Framework : Next.js 16 (App Router, `cacheComponents`), bundler Turbopack
- Package manager : pnpm, seul autorisé dans ce dépôt
- Node : 26.13.0 (Active LTS), version de référence dans `.nvmrc`
- CI : GitHub Actions
- Release : release-please

Les commandes disponibles sont dans les scripts de `package.json`.

## Parcours critiques et pages clés

Pages clés : `/` (homepage) et `/biens/[id]` (fiche d'un bien, prérendue pour les 9 biens).

- Recherche du hero (ville, type, budget) : filtre la section « Biens d'exception » et y fait défiler.
- Filtre de ville de la section biens : Tous, Paris, Lyon.
- Formulaire de contact : validation Zod partagée client et serveur, Server Action sans envoi réel, honeypot anti-spam, consentement RGPD obligatoire.
- Carte de bien → fiche → « Organiser une visite » : `/?bien=<id>#contact` préremplit le formulaire, le serveur vérifie que le bien existe.

## Décisions du projet

- Biens fictifs dans `lib/properties/data.ts`, validés par Zod et lus côté serveur. Seul le quartier est affiché, jamais l'adresse.
- Images Unsplash stockées dans `public/images/` et servies par `next/image`.
- Palette : ivoire `#F5F1EA`, encre `#16150F`, bronze `#9A7B52`, gris pierre. Coins droits, aucune ombre.
- Typographies via `next/font` : Cormorant Garamond (titres, un mot en italique) et Inter Tight (texte).
- Aucun analytics, aucun script tiers, aucune carte intégrée.
- Vocabulaire métier dans `GLOSSARY.md`, décisions dans `docs/adr/`.
- Visites immersives : uniquement sur les exclusivités. Générées avec le skill `scroll-video-site` (sources dans `scroll-video/<id>/`, ignorées par git), frames WebP commitées dans `public/scroll-video/<id>/`, lues par `lib/visit/scroll-sequence.ts` avec GSAP et Lenis chargés en lazy sur la fiche seulement.

## TDD

Écrire un test qui passe au _rouge_ avant le code pour toute logique, tout comportement, tout formulaire et toute correction de bug. Le rouge doit échouer pour la raison attendue.

- Vitest couvre la logique métier et les composants à comportement.
- Playwright couvre les parcours critiques.
- Le rendu purement visuel (style, mise en page, animation sans logique) est exempté et se vérifie dans le navigateur.

## Types et validation

TypeScript strict. Zod valide chaque _frontière_ : réponses d'API, formulaires, variables d'environnement, paramètres d'URL, stockage navigateur. Les types de ces données viennent de `z.infer`.

## État et données

- Zustand contient l'état d'interface uniquement.
- Les données serveur viennent d'abord du framework quand il fournit Server Components ou loaders. TanStack Query prend le relais pour les données récupérées côté client.
- Avec du rendu serveur, chaque requête a son propre store Zustand, fourni par un Context, et son propre `QueryClient`. Un store global au module fait fuiter l'état d'un utilisateur vers un autre.
- Les Server Components ne lisent et n'écrivent aucun store.
- Sur Astro, Zustand et TanStack Query vivent uniquement dans les îlots qui en ont besoin.

## Composants et formulaires

- shadcn est la base de tous les composants, stylés avec Tailwind. Les composants sur mesure partent des mêmes primitives headless que shadcn.
- Les formulaires utilisent React Hook Form avec un schéma Zod, le même côté client et côté serveur.

## Animation

Installer une librairie seulement quand une fonctionnalité la demande :

- Motion pour les transitions d'interface.
- GSAP pour les timelines et animations de scroll complexes.
- React Three Fiber pour la 3D.

Charger GSAP et React Three Fiber en lazy. Chaque animation respecte `prefers-reduced-motion`.

## Sécurité

Référence : [OWASP Web Frontend Security](https://cheatsheetseries.owasp.org/cheatsheets/Web_Frontend_Security_Cheat_Sheet.html).

- Afficher le texte via les bindings du framework ou `textContent`. Le HTML dynamique (`innerHTML`, `dangerouslySetInnerHTML`) passe obligatoirement par DOMPurify.
- Bannir `eval`, `new Function` et toute évaluation de chaîne.
- Le serveur décide : autorisations, règles métier et validation des entrées sont appliquées côté serveur, même si le client les vérifie aussi.
- Les secrets restent côté serveur. Seules les valeurs publiques portent le préfixe d'exposition du framework.
- Les jetons de session vivent dans des cookies `HttpOnly`, `Secure` et `SameSite`.
- Les réponses envoient CSP avec `frame-ancestors`, HSTS, `X-Content-Type-Options` et `Referrer-Policy`.
- Les mutations authentifiées par cookie sont protégées contre le CSRF.

## Accessibilité

Cible WCAG 2.2 AA. Toute interaction fonctionne au clavier avec un focus visible. axe ne signale aucune violation sur les pages clés.

## Cache

- Assets hashés : `Cache-Control: public, max-age=31536000, immutable`.
- HTML public : revalidation au CDN adaptée à la fraîcheur du contenu.
- Réponses propres à un utilisateur : `private` ou `no-store`, jamais de cache partagé.
- Choisir explicitement la stratégie de rendu et de cache du framework pour chaque route, et définir `staleTime` dans TanStack Query.

## Commits et versions

- Conventional Commits en anglais. `feat`, `fix` et `BREAKING CHANGE` déterminent la version.
- Merge en squash : le titre de PR suit la même convention.
- release-please gère seul le numéro de version et le changelog. Les modifications passent par les commits.

## Code

- Code, noms et commentaires en anglais.
- Biome est le seul linter et formateur.

## Terminé signifie

Tous ces contrôles sont verts sur le changement : types, Biome, Vitest, Playwright avec axe, et build de production.
