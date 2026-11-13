# Jean Angelin ANDRIAMANANTENA — Portfolio Data Analyst

Portfolio bilingue français / English, construit avec React, TypeScript, Vite et Tailwind CSS. Le contenu est préparé pour un recruteur et distingue les résultats vérifiés des éléments encore en cours.

## Démarrer en local

1. Installer Node.js LTS.
2. Dans ce dossier, lancer `npm install`.
3. Lancer `npm run dev` puis ouvrir l’adresse affichée (habituellement `http://localhost:5173`).
4. Vérifier le site avec `npm run typecheck` et `npm run build`.

## Personnaliser le contenu et le CV

- `/admin` ouvre l’éditeur local. Il enregistre les modifications dans le navigateur et permet d’exporter un fichier JSON.
- L’éditeur est local et sans authentification serveur : ses changements ne modifient pas automatiquement le site déjà hébergé. Après modification, reportez les valeurs exportées dans `src/data/content.json`, puis reconstruisez et redéployez.
- Remplacez `public/documents/CV_A_REMPLACER.txt` par votre PDF nommé `CV_Jean_Angelin_ANDRIAMANANTENA.pdf`. Le bouton de téléchargement apparaît seulement quand ce PDF existe.
- Mettez à jour les liens et votre progression dans `src/data/content.json`. Les niveaux de compétence ne sont pas inventés.

## Publier sur GitHub

1. Créez sur GitHub un dépôt public vide appelé `jean-angelin-data-analyst-portfolio` (ne cochez pas la création automatique README).
2. Ouvrez un terminal dans ce dossier et exécutez :

   ```powershell
   git init
   git add .
   git commit -m "Create professional data analyst portfolio"
   git branch -M main
   git remote add origin https://github.com/jeanAngelin/jean-angelin-data-analyst-portfolio.git
   git push -u origin main
   ```

3. Pour créer le site public, connectez le dépôt à Netlify. Commande de build : `npm run build`; dossier publié : `dist`.

Vérifiez le dépôt avant l’envoi : le fichier `.env` et les secrets sont ignorés. Ne publiez aucune donnée personnelle confidentielle.

## Contenu MadaStore

Les données sont synthétiques. Les chiffres et classeurs sont issus du projet local audité. Les captures incluses sont des captures réelles du dashboard Streamlit local. Power BI Desktop est signalé comme en cours d’installation tant que le fichier PBIX n’est pas disponible.
