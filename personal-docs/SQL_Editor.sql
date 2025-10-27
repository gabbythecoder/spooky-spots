CREATE TABLE IF NOT EXISTS owners (
    clerk_id TEXT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    phone INT NOT NULL
);

CREATE TABLE IF NOT EXISTS comments (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  place_id TEXT REFERENCES places(endpoint),
  users_id TEXT REFERENCES users(clerk_id),
  comment VARCHAR(500) NOT NULL,
  rating INT
);

CREATE TABLE IF NOT EXISTS roles (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  role VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  place_id TEXT NOT NULL REFERENCES places(endpoint),
  user_id TEXT NOT NULL REFERENCES users(clerk_id),
  date INT8 NOT NULL,
  completed BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE IF NOT EXISTS images (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  place_name TEXT NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS places (
  endpoint TEXT PRIMARY KEY,
  name TEXT,
  owner_id TEXT REFERENCES owners(clerk_id),
  image_id INT REFERENCES images(id),
  address TEXT,
  city TEXT,
  X INT,
  Y INT,
  slug TEXT,
  description TEXT,
  history TEXT,
  booking_slots INT
);

CREATE TABLE IF NOT EXISTS users (
  clerk_id TEXT PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  role_id INT NOT NULL REFERENCES roles(id),
  user_email VARCHAR(255) NOT NULL,
  user_number INT NOT NULL 
);