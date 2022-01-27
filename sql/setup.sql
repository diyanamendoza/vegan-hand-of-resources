DROP TABLE IF EXISTS cheeses, desserts, sauces, meals;

CREATE TABLE cheeses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  link TEXT NOT NULL
);

INSERT INTO cheeses (name, category, link)
VALUES
    ('Follow Your Heart', 'Product', 'https://followyourheart.com/product_category/dairy-free-cheese/');

CREATE TABLE desserts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  link TEXT NOT NULL
);

INSERT INTO desserts (name, category, link)
VALUES
    ('Mochidoki', 'Product', 'https://mochidoki.com/collections/all/vegan');

CREATE TABLE sauces (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  link TEXT NOT NULL
);

INSERT INTO sauces (name, category, link)
VALUES
    ('Garlic Alfredo', 'Recipe', 'https://thevegan8.com/vegan-garlic-alfredo-sauce/');

CREATE TABLE meals (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  link TEXT NOT NULL
);

INSERT INTO meals (name, category, link)
VALUES
    ('Filipino Adobo', 'Recipe', 'https://sweetsimplevegan.com/2018/10/filipino-chicken-adobo/');