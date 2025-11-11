import MainLayout from "../../layouts/MainLayout";
import "./index.css";

const MentionsLegales = () => {
  return (
    <MainLayout className="mentionsLayout">
      <div className="mentions legalPage">
        <h1>Mentions légales</h1>
        <p>
          Le présent site a pour objectif de sensibiliser aux usages du
          numérique et des écrans (prévention, sécurité, réseaux sociaux, jeux
          vidéo, sommeil, cerveau). Les informations sont fournies à titre
          informatif.
        </p>

        <h2>Éditeur du site</h2>
        <p>
          Association / Organisation: Pause Écran
          <br />
          Adresse: 40 rue Fictive, 75000 Paris
          <br />
          Email: contact@pause-ecran.fr
        </p>

        <h2>Hébergement</h2>
        <p>OVHcloud – 2 rue Kellermann – 59100 Roubaix – France</p>

        <h2>Directeur de la publication</h2>
        <p>Responsable de la publication de Pause Écran.</p>

        <h2>Maintenance et gestion</h2>
        <p>Équipe Pause Écran.</p>

        <h2>Crédits photos</h2>
        <p>
          Photographies: créations internes et banques d’images (ex: Unsplash).
        </p>

        <h2>Conditions d’accès et d’utilisation</h2>
        <p>
          Le site est soumis au droit français. Les contenus sont proposés en
          langue française. Le site est accessible gratuitement, 7j/7 et 24h/24
          (sous réserve d’interruptions de maintenance). Les présentes
          informations légales peuvent être modifiées à tout moment sans
          préavis.
        </p>

        <h2>Responsabilité</h2>
        <p>
          Malgré le soin apporté aux contenus, des erreurs peuvent subsister.
          Signalez‑les via la page Contact afin que nous puissions corriger.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Le site et l’ensemble de ses éléments (textes, images, logos,
          graphismes, marques, etc.) sont protégés par le Code de la propriété
          intellectuelle. Toute reproduction, représentation ou diffusion, en
          tout ou partie, à des fins autres que strictement personnelles est
          interdite sans autorisation écrite préalable. La création de liens
          profonds demeure soumise à accord.
        </p>

        <p style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>
          Dernière mise à jour: {new Date().toLocaleDateString("fr-FR")}
        </p>
      </div>
    </MainLayout>
  );
};

export default MentionsLegales;
