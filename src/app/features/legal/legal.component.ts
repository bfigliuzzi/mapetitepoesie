import { Component, input } from '@angular/core';

@Component({
  selector: 'app-legal',
  template: `
    <div class="legal-container">
      @switch (type()) {
        @case ('mentions') {
          <h1>Mentions Légales</h1>
          <p>Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique (LCEN), nous portons à la connaissance des utilisateurs et visiteurs du site Ma Petite Poésie les informations suivantes :</p>
          
          <h2>Éditeur du site</h2>
          <p>Le site Ma Petite Poésie est édité par :<br>
          Benoît FIGLIUZZI<br>
          Statut : Particulier<br>
          Conformément à l'article 6, I, 4° de la loi 2004-575 du 21 juin 2004, l'éditeur a choisi de rester anonyme quant à ses coordonnées postales directes. Celles-ci ont été communiquées à l'hébergeur qui est tenu au secret professionnel.</p>
          
          <h2>Contact</h2>
          <p>Pour toute question ou signalement, l'éditeur peut être contacté via ses profils professionnels :</p>
          <ul>
            <li>LinkedIn : <a href="https://www.linkedin.com/in/bfigliuzzi/" target="_blank">https://www.linkedin.com/in/bfigliuzzi/</a></li>
            <li>GitHub : <a href="https://github.com/bfigliuzzi" target="_blank">https://github.com/bfigliuzzi</a></li>
          </ul>

          <h2>Hébergement</h2>
          <p>Le site est hébergé par :<br>
          Netlify, Inc.<br>
          510 Townsend Street<br>
          San Francisco, CA 94103<br>
          États-Unis<br>
          Site web : <a href="https://www.netlify.com" target="_blank">https://www.netlify.com</a></p>
        }
        @case ('privacy') {
          <h1>Politique de Confidentialité</h1>
          
          <h2>Absence de collecte de données (Architecture "Zero-Knowledge")</h2>
          <p>L'application Ma Petite Poésie a été conçue dans un but strictement éducatif, avec une priorité absolue donnée au respect de la vie privée, notamment celle des enfants.</p>
          <p><strong>Nous ne collectons, ne stockons et ne transmettons aucune donnée personnelle vers un serveur distant.</strong></p>
          <p>L'application fonctionne entièrement en "Client-Side" (côté client). Cela signifie que :</p>
          <ul>
            <li>Les poésies que vous saisissez.</li>
            <li>Les scores ou indicateurs de réussite (gamification).</li>
            <li>Les préférences d'affichage.</li>
          </ul>
          <p>Sont stockés exclusivement sur votre appareil via la technologie du LocalStorage de votre navigateur. L'éditeur du site n'a techniquement aucun moyen d'accéder à ces informations.</p>

          <h2>Cookies et Traceurs</h2>
          <p>Ma Petite Poésie n'utilise aucun cookie publicitaire, aucun traceur marketing, ni aucun outil d'analyse d'audience tiers (type Google Analytics).</p>
          <p>Le seul mécanisme de stockage utilisé est le stockage local technique (localStorage) nécessaire au fonctionnement de l'application (sauvegarde de vos textes pour que vous les retrouviez lors de votre prochaine visite).</p>

          <h2>Suppression des données</h2>
          <p>Puisque les données sont hébergées uniquement sur votre appareil, vous en avez le contrôle total. Vous pouvez supprimer l'intégralité de vos données à tout moment en :</p>
          <ul>
            <li>Vidant le cache/les données de site de votre navigateur.</li>
            <li>Désinstallant la PWA de votre appareil mobile.</li>
          </ul>

          <h2>Propriété Intellectuelle des contenus saisis</h2>
          <p>L'utilisateur est seul responsable des textes qu'il saisit dans l'application. L'application est un outil "contenant" neutre destiné à l'apprentissage privé. L'utilisateur s'engage à respecter les droits d'auteur éventuels des œuvres qu'il copie pour son usage personnel ou celui de ses enfants dans le cadre du cercle de famille.</p>
        }
        @case ('cgu') {
          <h1>Conditions Générales d'Utilisation (CGU)</h1>

          <h2>Article 1 : Objet</h2>
          <p>Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités de mise à disposition des services du site et de l'application Ma Petite Poésie, ci-après nommé « le Service », et les conditions d'utilisation du Service par l'Utilisateur.</p>
          <p>L'utilisation de l'application implique l'acceptation pleine et entière des présentes CGU.</p>

          <h2>Article 2 : Accès au service</h2>
          <p>Le Service est accessible gratuitement à tout Utilisateur disposant d'un accès à Internet. L'éditeur met en œuvre tous les moyens disponibles pour assurer un accès de qualité, mais n'est tenu à aucune obligation de résultat.</p>
          <p>Le Service peut être interrompu, suspendu ou modifié sans préavis pour des raisons de maintenance ou pour toute autre raison technique (notamment liée à l'hébergeur Netlify). L'éditeur ne pourra être tenu responsable de ces interruptions.</p>

          <h2>Article 3 : Responsabilité et Données (Avertissement Important)</h2>
          <p>Ma Petite Poésie est une application fonctionnant sur le principe du « Zéro Serveur » pour les données utilisateur.</p>
          <ol>
            <li><strong>Stockage local</strong> : Toutes les données saisies (textes des poésies, progression, scores) sont stockées exclusivement dans la mémoire du navigateur de l'Utilisateur (LocalStorage). Aucune sauvegarde n'est effectuée sur un serveur distant (Cloud).</li>
            <li><strong>Perte de données</strong> : L'Éditeur ne saurait être tenu responsable de la perte des données saisies par l'Utilisateur en cas de :
              <ul>
                <li>Nettoyage du cache du navigateur par l'Utilisateur.</li>
                <li>Désinstallation de l'application ou réinitialisation de l'appareil.</li>
                <li>Dysfonctionnement du matériel de l'Utilisateur.</li>
                <li>Mise à jour du système d'exploitation affectant le stockage local.</li>
              </ul>
            </li>
          </ol>
          <p>L'Utilisateur est seul responsable de la conservation des textes originaux de ses poésies en dehors de l'application.</p>

          <h2>Article 4 : Propriété intellectuelle</h2>
          <p>L'Application : La structure générale, le code source, le design et les éléments graphiques de l'interface sont la propriété exclusive de Benoît FIGLIUZZI, sauf mention contraire (librairies Open Source, composants Angular Material).</p>
          <p><strong>Les Contenus</strong> : Les poésies et textes saisis par l'Utilisateur restent la propriété de leurs auteurs respectifs. L'application n'est qu'un outil technique de mémorisation. L'Utilisateur s'engage à utiliser l'application dans le respect du droit d'auteur, uniquement pour un usage privé ou éducatif (Cercle de Famille).</p>

          <h2>Article 5 : Liens hypertextes</h2>
          <p>Le Service peut contenir des liens hypertextes vers d’autres sites (ex: LinkedIn, GitHub). L'éditeur ne prend pas la responsabilité de ces sites externes ni de leur contenu.</p>

          <h2>Article 6 : Droit applicable et juridiction compétente</h2>
          <p>La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.</p>
        }
      }
    </div>
  `,
  styles: [`
    .legal-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
  `]
})
export class LegalComponent {
  readonly type = input.required<string>();
}
