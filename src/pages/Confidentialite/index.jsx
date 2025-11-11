import MainLayout from "../../layouts/MainLayout";
import "./index.css";

const Confidentialite = () => {
  return (
    <MainLayout className="confidentialiteLayout">
      <div className="confidentialite">
        <h1>Politique de confidentialité</h1>
        <p>
          En application du Règlement (UE) 2016/679 du 27 avril 2016 (RGPD) et
          de la loi « Informatique et Libertés », nous avons adapté nos clauses
          d’information pour tenir compte de vos nouveaux droits. Cette page
          décrit quelles données sont traitées, pour quelles finalités et
          comment exercer vos droits.
        </p>

        <h2>Nos engagements</h2>
        <ul>
          <li>Nous ne vendons pas vos données.</li>
          <li>
            Nous agissons en transparence: vous êtes informé de tout partage
            nécessaire.
          </li>
          <li>
            Nous limitons les traitements à des finalités explicites, légitimes
            et proportionnées.
          </li>
          <li>
            Nous ne conservons pas vos données au-delà de ce qui est nécessaire
            aux finalités.
          </li>
          <li>
            Nous priorisons la sécurisation des données qui nous sont confiées.
          </li>
        </ul>

        <h2>Responsable du traitement</h2>
        <p>
          Association / Organisation: Pause Écran
          <br />
          Adresse: 40 rue Fictive, 75000 Paris
          <br />
          Contact: contact@pause-ecran.fr
        </p>

        <h2>Données collectées</h2>
        <ul>
          <li>Informations fournies via le formulaire de contact.</li>
          <li>Données techniques minimales (journal d’erreurs et sécurité).</li>
          <li>
            Événements techniques nécessaires à la détection d’anomalies (ex:
            télémétrie d’erreurs).
          </li>
        </ul>

        <h2>Finalités</h2>
        <ul>
          <li>Répondre à vos demandes de contact.</li>
          <li>
            Assurer la sécurité du site, prévenir la fraude et corriger les
            anomalies.
          </li>
          <li>Améliorer la qualité et l’accessibilité des contenus.</li>
        </ul>

        <h2>Bases légales</h2>
        <ul>
          <li>
            Exécution de mesures précontractuelles ou contractuelles (réponse
            aux demandes).
          </li>
          <li>
            Intérêt légitime (sécurité, prévention de la fraude, amélioration du
            service).
          </li>
          <li>
            Obligation légale (réponses aux autorités, conservation minimale
            requise).
          </li>
        </ul>

        <h2>Destinataires</h2>
        <p>
          Vos données sont destinées aux équipes habilitées de Pause Écran et,
          le cas échéant, à nos prestataires techniques (hébergement,
          journalisation d’erreurs). Elles ne sont pas vendues.
        </p>

        <h2>Transferts hors UE</h2>
        <p>
          Nous privilégions des traitements et hébergements au sein de l’Union
          européenne. Si un transfert hors UE s’avérait nécessaire, il serait
          encadré par des garanties appropriées (clauses contractuelles types,
          etc.).
        </p>

        <h2>Durées de conservation</h2>
        <p>
          Les données de contact sont conservées pendant le temps nécessaire au
          traitement de la demande puis supprimées. Les journaux techniques sont
          conservés pour une durée limitée et proportionnée aux besoins de
          sécurité et de diagnostic.
        </p>

        <h2>Vos droits</h2>
        <ul>
          <li>Droit d’accès et de rectification de vos données.</li>
          <li>Droit à l’effacement (dans les limites prévues par le RGPD).</li>
          <li>Droit d’opposition et de limitation du traitement.</li>
          <li>Droit à la portabilité des données que vous avez fournies.</li>
        </ul>
        <p>Pour exercer vos droits: contact@pause-ecran.fr</p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL (
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noreferrer noopener"
          >
            www.cnil.fr
          </a>
          ).
        </p>

        <h2>Cookies</h2>
        <p>
          Nous limitons l’usage de cookies au strict nécessaire au
          fonctionnement du site. Vous pouvez configurer votre navigateur pour
          refuser ou supprimer des cookies. Certaines fonctionnalités pourraient
          alors être limitées.
        </p>

        <h2>Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles
          adaptées pour protéger vos données contre tout accès non autorisé,
          altération ou divulgation. Seules les personnes habilitées ont accès
          aux données.
        </p>

        <p style={{ marginTop: 12, fontSize: 14, opacity: 0.8 }}>
          Dernière mise à jour: {new Date().toLocaleDateString("fr-FR")}
        </p>
      </div>
    </MainLayout>
  );
};

export default Confidentialite;
