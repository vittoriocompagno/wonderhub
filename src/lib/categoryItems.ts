// Define an interface for the properties of a category item
interface iAppProps {
    name: string;        // The name of the category
    title: string;       // The title of the category, usually the same as the name
    image: string;       // The path to the image representing the category
    description: string; // A brief description of the category
    id: number;          // A unique identifier for the category
}

// Export an array of category items, each adhering to the iAppProps interface
export const categoryItems: iAppProps[] = [
    {
        name: "Hotel",
        title: "Hotel",
        image: "/categories/bed.png",
        description: "Hotel description",
        id: 1, // Unique ID for the Hotel category
    },
    {
        name: "Restaurant",
        title: "Restaurant",
        image: "/categories/restaurant.png",
        description: "Restaurant description",
        id: 2, // Unique ID for the Restaurant category
    },
    {
        name: "Bar",
        title: "Bar",
        image: "/categories/bar.png",
        description: "Bar description",
        id: 3, // Unique ID for the Bar category
    },
    {
        name: "Store",
        title: "Store",
        image: "/categories/store.png",
        description: "Store description",
        id: 4, // Unique ID for the Store category
    },
    {
        name: "Other",
        title: "Other",
        image: "/categories/other.png",
        description: "Other description",
        id: 5, // Unique ID for the Other category
    }
    // Additional categories can be added here following the same structure
]