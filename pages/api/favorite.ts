import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { moviedId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: { id: moviedId },
      });
      if (!existingMovie) {
        throw new Error("Invalid movie id");
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: moviedId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);
      const { moviedId } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: { id: moviedId },
      });
      if (!existingMovie) {
        throw new Error("Invalid movie id");
      }
      const updateFavoritesIds = without(currentUser.favoriteIds, moviedId);
      const updateUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updateFavoritesIds,
        },
      });
      return res.status(200).json(updateUser);
    }
    return res.status(405).end();
  } catch (error) {
    res.status(400).end();
  }
}
