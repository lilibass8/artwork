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
      "/116.jpg",
    category: "Renaissance",
  },
  {
    id: "scream",
    title: "The Scream",
    artist: "Edvard Munch",
    year: "1893",
    description:
      "An agonized figure set against a blood-red sky. A raw expression of existential dread and anxiety that has become an icon of modern art.",
    imageUrl: "/17.jpg",
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
      "/18.jpg",
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
      "/19.jpg",
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
      "/20.jpg",
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
      "/21.jpg",
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
      "/22.jpg",
    category: "Ukiyo-e",
  },
];
