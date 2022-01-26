DROP TABLE IF EXISTS cheeses;

CREATE TABLE cheeses (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  link TEXT NOT NULL
);

INSERT INTO cheeses (name, category, link)
VALUES
    ('Follow Your Heart', 'Product', 'https://followyourheart.com/product_category/dairy-free-cheese/')