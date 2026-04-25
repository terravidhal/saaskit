# @saaskit — Idées de design pour le site de documentation

<response>
<idea>
**Design Movement**: Developer-first Brutalism Doux — inspiré de Linear, Vercel et Resend
**Core Principles**:
1. Monochromie fonctionnelle avec accents d'encre — noir profond, blanc cassé, un seul accent vif (emerald ou violet)
2. Typographie à forte hiérarchie : display serif condensé pour les titres, mono pour le code, sans-serif propre pour le corps
3. Grille asymétrique : sidebar fixe à gauche, contenu principal centré, annotations flottantes à droite
4. Densité d'information maîtrisée — chaque composant présenté avec preview + code + install en une seule vue

**Color Philosophy**: Fond `#0a0a0a` (noir charbon), texte `#f5f5f0` (blanc cassé), accent `oklch(0.72 0.2 160)` (emerald vif). L'accent est réservé aux éléments interactifs et aux badges de plan. Crée une sensation de terminal professionnel.

**Layout Paradigm**: Sidebar de navigation fixe à gauche (240px), zone de contenu principale avec max-width 860px, colonne de table des matières flottante à droite sur desktop. Les previews de composants sont dans des "sandboxes" avec fond légèrement plus clair.

**Signature Elements**:
1. Bordures en pointillés pour les zones de preview de composants
2. Badges de plan colorés (Free=gris, Pro=emerald, Enterprise=or) omniprésents
3. Commande d'installation avec bouton copy dans un terminal stylisé

**Interaction Philosophy**: Tout est keyboard-navigable. Les hover states sont subtils (légère élévation). Le code se copie en un clic avec feedback visuel.

**Animation**: Entrées de page via `opacity 0→1` + `translateY 8px→0` en 200ms. Transitions de sidebar en 150ms ease-out. Pas d'animations superflues.

**Typography System**: `JetBrains Mono` pour le code, `Geist` pour l'UI, `Fraunces` (serif variable) pour les gros titres de section.
</idea>
<probability>0.08</probability>
</response>

<response>
<idea>
**Design Movement**: SaaS Dashboard Glassmorphism — inspiré de Stripe, Lemon Squeezy et Paddle
**Core Principles**:
1. Fond gradient subtil (bleu nuit → violet profond), cartes en verre dépoli
2. Composants présentés dans leur contexte réel (faux dashboard SaaS autour)
3. Typographie ronde et friendly : Outfit ou Plus Jakarta Sans
4. Animations fluides et généreuses pour illustrer les états des composants

**Color Philosophy**: Fond `oklch(0.15 0.03 270)` (bleu-violet profond), cartes `oklch(1 0 0 / 8%)` (verre), accent `oklch(0.65 0.25 290)` (violet vif). Évoque la confiance et la modernité des SaaS premium.

**Layout Paradigm**: Navigation top horizontale avec tabs par catégorie, contenu en deux colonnes (preview à gauche, doc à droite), hero avec animation de composants flottants.

**Signature Elements**:
1. Cartes en verre avec `backdrop-blur` et bordures `oklch(1 0 0 / 15%)`
2. Gradient mesh animé en arrière-plan (CSS uniquement)
3. Composants présentés dans un faux "app shell" pour le contexte

**Interaction Philosophy**: Les previews sont interactifs — on peut cliquer sur les boutons, toggle les états. Feedback haptique via micro-animations.

**Animation**: Gradient mesh animé en CSS `@keyframes`. Composants avec entrée en `scale 0.95→1` + `opacity`. Hover sur les cartes avec `translateY(-4px)`.

**Typography System**: `Plus Jakarta Sans` pour tout, avec variation de poids (300→800) pour la hiérarchie. Titres en 800, corps en 400, code en `Fira Code`.
</idea>
<probability>0.06</probability>
</response>

<response>
<idea>
**Design Movement**: Ink & Grid — Editorial technique, inspiré de la documentation de Radix UI et Oxide Computer
**Core Principles**:
1. Grille de colonnes stricte visible (lignes de guidage subtiles), tout aligné sur la grille
2. Typographie éditoriale : titres en condensed bold, corps en regular, accents en italique
3. Fond blanc pur avec encre noire — minimalisme typographique absolu
4. Les composants sont les vedettes : grandes previews avec beaucoup d'espace autour

**Color Philosophy**: Fond `#ffffff`, texte `#111111`, accent `oklch(0.55 0.22 25)` (rouge brique). Couleur utilisée avec parcimonie — uniquement pour les éléments critiques (CTA, badges actifs, liens). Évoque la rigueur technique et l'élégance éditoriale.

**Layout Paradigm**: Layout en colonnes inégales (1/3 + 2/3), navigation latérale gauche très fine (icônes + labels), contenu principal avec marges généreuses. Les sections de composants alternent entre preview pleine largeur et doc en colonne.

**Signature Elements**:
1. Numérotation des composants en grand (01, 02...) en arrière-plan semi-transparent
2. Séparateurs horizontaux en trait fin avec label centré
3. Tags de catégorie en UPPERCASE avec espacement de lettres

**Interaction Philosophy**: Transitions de page en slide horizontal. Les previews de composants ont un fond quadrillé (dot grid) pour rappeler les wireframes. Hover states en underline animé.

**Animation**: Page transitions en `translateX`. Apparition des sections au scroll via `IntersectionObserver`. Curseur personnalisé sur les éléments interactifs.

**Typography System**: `Bricolage Grotesque` (condensed variable) pour les titres, `Instrument Sans` pour le corps, `IBM Plex Mono` pour le code.
</idea>
<probability>0.07</probability>
</response>
