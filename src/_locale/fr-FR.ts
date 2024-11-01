import type { Locale } from '.';

const frFR: Locale = {
  // locales for all components
  global: {
    placeholder: 'Veuillez sélectionner',
    emptyText: 'Aucune donnée disponible',
    okText: 'Déterminer',
    cancelText: 'Annuler',
  },
  calendar: {
    weekdayNames: [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ],
    title: 'YYYY an MM mois',
    today: "Aujourd'hui",
    start: 'Commencer',
    end: 'Fin',
    startAndEnd: 'Début/Fin',
  },
  rangePicker: {
    startPlaceholder: "La sélection n'a pas commencé",
    endPlaceholder: 'Sélection incomplète',
  },
  guideTour: {
    gotItText: "J'ai compris",
    nextStepText: 'Prochaine étape',
    prevStepText: 'Étape précédente',
    jumpText: 'Sauter',
  },
  imageUpload: {
    uploadingText: 'Téléchargement en cours',
    uploadfailedText: 'Échec du téléchargement',
  },
  pageContainer: {
    failed: {
      title: 'La page rencontre quelques problèmes mineurs',
      message: 'Je l’essaierai plus tard',
    },
    disconnected: {
      title: 'Le réseau est un peu occupé.',
      message: 'Bougez vos doigts pour aider à le réparer',
    },
    empty: {
      title: "Il n'y a rien ici.",
      message: 'Regardez les autres.',
    },
    busy: {
      title: "La congestion à l'avant",
      message: 'Essayez de rafraîchir.',
    },
  },
};

export default frFR;
