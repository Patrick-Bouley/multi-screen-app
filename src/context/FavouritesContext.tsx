
/*
 * Favourites Context
 *
 * Stores bookmarked anime IDs in shared React state.
 *
 * React Context allows different screens to access
 * and update the same watchlist without passing props
 * through every component.
 *
 * Bookmarks currently reset when the app fully restarts.
 */
import {createContext, useContext, useState, type ReactNode,} from "react";

// Defines the values and functions available to components
// that use the Favourites Context.
interface FavouritesContextType {
  favourites: string[];
  toggleFavourite: (id: string) => void;
}

// Create the shared Context object.
// undefined allows us to detect components that are accidentally used outside the Provider.
const FavouritesContext = createContext<
  FavouritesContextType | undefined
>(undefined);

// The Provider will wrap other React components.
interface FavouritesProviderProps {
  children: ReactNode;
}

export const FavouritesProvider = ({
  children,
}: FavouritesProviderProps) => {
  // Store the IDs of every bookmarked anime.
  const [favourites, setFavourites] = useState<string[]>([]);

  // Toggle an anime's bookmark status.
  // If the ID exists, remove it. Otherwise, add it.
  const toggleFavourite = (id: string) => {
    setFavourites((currentFavourites) =>
      currentFavourites.includes(id)
        ? currentFavourites.filter((animeId) => animeId !== id)
        : [...currentFavourites, id]
    );
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, toggleFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

// Custom hook that lets components access shared bookmarks.
export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error(
      "useFavourites must be used within FavouritesProvider"
    );
  }

  return context;
};
