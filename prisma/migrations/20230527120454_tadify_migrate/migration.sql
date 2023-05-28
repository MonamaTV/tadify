-- CreateTable
CREATE TABLE "SpotifyUser" (
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "stats" TEXT,
    "bio" TEXT,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyUser_email_key" ON "SpotifyUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyUser_userId_key" ON "SpotifyUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyUser_username_key" ON "SpotifyUser"("username");
