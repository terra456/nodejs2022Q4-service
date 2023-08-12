-- CREATE TABLE
CREATE TABLE "public"."User" (
  id PRIMARY KEY NOT NULL UNIQUE,
  login VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  version INTEGER,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP
);

CREATE TABLE "public"."Artist" (
  id PRIMARY KEY NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  grammy BOOLEAN
);

CREATE TABLE "public"."Album" (
  id PRIMARY KEY NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  year INTEGER,
  "artistId" VARCHAR,
  FOREIGN KEY ("artistId") REFERENCES "public"."Artist"(id),
);

CREATE TABLE "public"."Track" (
  id PRIMARY KEY NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  duration INTEGER,
  "artistId" VARCHAR,
  FOREIGN KEY ("artistId") REFERENCES "public"."Artist"(id),
  "albumId" VARCHAR,
  FOREIGN KEY ("albumId") REFERENCES "public"."Album"(id),
);

CREATE TABLE "public"."Favorites" (
  id SERIAL PRIMARY KEY NOT NULL,
  "userId" VARCHAR,
  FOREIGN KEY ("userId") REFERENCES "public"."User"(id),
  artists VARCHAR ARRAY;
  albums VARCHAR ARRAY;
  tracks VARCHAR ARRAY;
);
