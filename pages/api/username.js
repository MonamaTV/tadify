import prisma from "../../src/utils/prisma";

export default async function handler(req, res) {
  const { username, spotifyUserId } = req.query;

  if (!username) {
    return res.status(400).json({
      message: "Username is required",
      success: false,
      code: 400,
    });
  }

  try {
    //
    const user = await prisma.user.findFirst({
      where: {
        username: username.toLowerCase(),
        NOT: {
          spotifyUserId: spotifyUserId,
        },
      },
    });

    console.log({ user });

    res.status(200).json({
      success: true,
      code: 200,
      message: "Username",
      data: { exists: !!user },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
