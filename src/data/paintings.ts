export interface Painting {
  id: string;
  title: string;
  artist: string;
  year: string;
  description: string;
  imageUrl: string;
  category: string;
}

export const paintings: Painting[] = [
  {
    id: "starry-night",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    description:
      "A swirling masterpiece depicting the view from Van Gogh's asylum room. The turbulent sky alive with energy captures his emotional state and visionary genius.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    category: "Post-Impressionism",
  },
  {
    id: "mona-lisa",
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    year: "1503–1519",
    description:
      "Perhaps the most famous portrait in history. Her mysterious smile and sfumato technique have captivated viewers for over five centuries.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/402px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    category: "Renaissance",
  },
  {
    id: "scream",
    title: "The Scream",
    artist: "Edvard Munch",
    year: "1893",
    description:
      "An agonized figure set against a blood-red sky. A raw expression of existential dread and anxiety that has become an icon of modern art.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/603px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    category: "Expressionism",
  },
  {
    id: "girl-pearl",
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: "1665",
    description:
      "The 'Mona Lisa of the North'. A luminous figure turns to meet your gaze—intimate, quiet, unforgettable. Painted with extraordinary delicacy.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/594px-1665_Girl_with_a_Pearl_Earring.jpg",
    category: "Dutch Golden Age",
  },
  {
    id: "birth-venus",
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    year: "1484–1486",
    description:
      "Venus rises from the sea on a shell, borne by the winds. A celebration of beauty and the return of mythology to Renaissance art.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1024px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    category: "Renaissance",
  },
  {
    id: "water-lilies",
    title: "Water Lilies",
    artist: "Claude Monet",
    year: "1906",
    description:
      "Monet's late garden series dissolves the boundary between water and sky. Pure sensation over representation—light itself becomes the subject.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/1024px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
    category: "Impressionism",
  },
  {
    id: "night-watch",
    title: "The Night Watch",
    artist: "Rembrandt van Rijn",
    year: "1642",
    description:
      "A colossal group portrait alive with movement, light, and shadow. Rembrandt shattered convention by depicting the militia mid-action — a frozen drama of 34 figures.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Rembrandt_van_Rijn_-_De_Nachtwacht_-_Google_Art_Project.jpg/1280px-Rembrandt_van_Rijn_-_De_Nachtwacht_-_Google_Art_Project.jpg",
    category: "Dutch Golden Age",
  },
  {
    id: "great-wave",
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    year: "1831",
    description:
      "A towering wave dwarfs Mt. Fuji in the background. Japan's most recognized artwork bridges Eastern and Western aesthetics with extraordinary power.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/1024px-The_Great_Wave_off_Kanagawa.jpg",
    category: "Ukiyo-e",
  },
];
