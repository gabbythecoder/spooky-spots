CREATE TABLE IF NOT EXISTS owners (
    clerk_id TEXT PRIMARY KEY,
    email VARCHAR,
    phone INT
);

CREATE TABLE IF NOT EXISTS comments (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  place_id TEXT REFERENCES places(endpoint),
  users_id TEXT REFERENCES users(clerk_id),
  comment VARCHAR,
  rating INT,
  timestamp INT
);

CREATE TABLE IF NOT EXISTS roles (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  role VARCHAR
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  place_id TEXT REFERENCES places(endpoint),
  user_id TEXT REFERENCES users(clerk_id),
  date INT8,
  completed BOOLEAN DEFAULT FALSE,
  group_size TEXT,
  phone TEXT,
  name TEXT,
  email TEXT
);

CREATE TABLE IF NOT EXISTS images (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  place_name TEXT,
  image_url TEXT
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
  services TEXT,
  description TEXT,
  history TEXT,
  booking_slots INT
);

CREATE TABLE IF NOT EXISTS users (
  clerk_id TEXT PRIMARY KEY,
  user_name VARCHAR,
  role_id INT NOT NULL REFERENCES roles(id),
  user_email VARCHAR,
  user_number INT,
  optional_email VARCHAR,
  additional_info TEXT
  );