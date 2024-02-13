# Documentation du composant d'InputAutoCompletion

Le composant d'Autocomplétion est conçu pour améliorer l'expérience utilisateur lors de la saisie de texte dans les
champs de formulaire.
Il fournit des suggestions en temps réel basées sur l'entrée de l'utilisateur, permettant une saisie plus rapide et plus
précise.

### Fonctionnalité d'Autocomplétion

La fonctionnalité d'autocomplétion propose une liste de suggestions à l'utilisateur pendant qu'il tape dans le champ de
saisie.
Ces suggestions sont filtrées en fonction des caractères déjà saisis, permettant à l'utilisateur de sélectionner
une suggestion complète au lieu de taper le reste du texte manuellement. Ce processus réduit le temps de saisie et
diminue la probabilité d'erreurs.

### Prérequis Côté Serveur

Pour activer l'autocomplétion, il est nécessaire de préparer une liste de suggestions potentielles côté serveur.
Cette liste doit être transformée en un tableau (ArrayList) et fournie au démarrage du composant.
Les suggestions peuvent être issues, par exemple, de réponses d'intentions qualifiées au sein d'un chatbot.

`const InputSuggestionsList = [
'comment obtenir la qualif C ?',
'RSI : Comment est composée ma rémunération ?',
'Que signifie : montée de nuit?',
'Que signifie : descente de nuit ?',
'Ai-je le droit de cumuler deux emplois?',
'Peut-on être auto entrepreneur et agent SNCF ?',
];
`

### Configuration dans Tock React Kit

Pour activer l'autocomplétion dans le Tock React Kit, vous devez configurer les options de chat comme suit :

`const chatOptions = {
provideHintList: InputSuggestionsList, // Liste des suggestions pour l'autocomplétion
minCharsHint: 2 // Nombre minimum de caractères pour déclencher l'autocomplétion
};`

### Personnalisation

**La fonctionnalité d'autocomplétion peut être personnalisée de plusieurs manières :**

`export interface InputAutoCompletionProps {
provideHintList: string[] | null; // Liste des suggestions ou null
minCharsHint: number | 0; // Seuil minimal de caractères pour l'autocomplétion
// Autres props...
}
`

**Modification de la liste des suggestions :**

Vous pouvez dynamiquement ajuster **la liste des suggestions** (**_provideHintList_**) en fonction du contexte
de la conversation ou des besoins spécifiques de l'utilisateur.

**Ajustement du seuil de caractères** : Le nombre de caractères minimum (**_minCharsHint_**) requis pour déclencher
l'affichage
des suggestions peut être modifié pour s'adapter à la longueur moyenne des termes de recherche ou aux préférences
utilisateur.
