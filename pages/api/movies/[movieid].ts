import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    await serverAuth(req);
    const { movieid } = req.query;
    if (typeof movieid !== "string") {
      throw new Error("Invalid movie id");
    }
    if (!movieid) {
      throw new Error("No movie id");
    }
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieid,
      },
    });
    if (!movie) {
      throw new Error("Movie not found");
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
