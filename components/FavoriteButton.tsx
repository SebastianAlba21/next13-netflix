import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoritesIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);
  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }
    console.log(response);
    const updateFavoritesIds = response?.data?.favoritesIds;
    mutate({
      ...currentUser,
      favoriteIds: updateFavoritesIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, mutate, currentUser, mutateFavorites]);
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorites}
      className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-2
        border-white
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:bg-neutral-300
        "
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;