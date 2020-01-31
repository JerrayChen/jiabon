CREATE TABLE customer (
	customer_id serial PRIMARY KEY NOT NULL,
	email varchar(100) NOT NULL,
	username varchar(20) NOT NULL,
	hash text
);

CREATE TABLE store (
	store_id serial PRIMARY KEY NOT NULL,
	name varchar(100) NOT NULL,
	hashtag TEXT,
	latitude decimal(20,18),
	longitude decimal(20,18),
	address text
);

insert into store (name, hashtag, latitude, longitude, address)
values
('Uncle George''s pasta', 'pasta', 32.7783315, -96.7967625, '1515 Young St, Dallas, TX 75201' ),
('Aunt Sheng''s egg rolls', 'egg roll',32.7811908,-96.7969902,'1902 Main St, Dallas, TX 75201'),
('Awesome pasta', 'pasta',32.7746105,-97.0817267,'1905 Brown Blvd, Arlington, TX 76006'),
('Subarashii pasta', 'pasta',32.771765,-96.8019881,'944 S Lamar St, Dallas, TX 75202')

CREATE TABLE store_menu (
	store_menu_id serial PRIMARY KEY NOT NULL,
	reserve_time timestamptz,
	pick_up_time timestamptz,
	store_id int REFERENCES store(store_id)
);

insert into store_menu (store_id, reserve_time, pick_up_time)
values
(1,'2020-01-30T01:00:00.000Z','2020-01-31T01:00:00.000Z' ),--1
(2,'2020-01-30T01:00:00.000Z','2020-01-31T01:00:00.000Z' ),--2
(3,'2020-01-30T01:00:00.000Z','2020-01-31T01:00:00.000Z' ),--3
(4,'2020-01-30T01:00:00.000Z','2020-01-31T01:00:00.000Z' ),--4
(1,'2020-01-31T01:00:00.000Z','2020-02-01T01:00:00.000Z' ),--5
(1,'2020-02-01T01:00:00.000Z','2020-02-02T01:00:00.000Z' );--6

CREATE TABLE store_dish (
	store_dish_id serial PRIMARY KEY NOT NULL,
	dish_name varchar(50),
	unit_price numeric(6,2),
	serve_amt int,
	store_menu_id int REFERENCES store_menu(store_menu_id)
);

insert into store_dish (store_menu_id, dish_name, unit_price, serve_amt)
values
(1,'Meatball pasta', 9.99, 15 ),
(1,'Clam chowder', 4.99, 15 ),
(2,'Pork egg roll', 5.50, 30 ),
(2,'Vege egg roll', 5.50, 30 ),
(3,'Awesome Meatball pasta', 9.99, 15 ),
(3,'Awesome Clam chowder', 4.99, 15 ),
(4,'Great Meatball pasta', 9.99, 15 ),
(4,'Great Clam chowder', 4.99, 15 ),
(5,'Meatball pasta', 9.99, 15 ),
(5,'Corn chowder', 4.99, 15 ),
(6,'Meatball pasta', 9.99, 10 ),
(6,'Clam chowder', 4.99, 10 );

CREATE TABLE order_master (
	order_master_id serial PRIMARY KEY NOT NULL,
	store_menu_id int REFERENCES store_menu(store_menu_id),
	customer_id int REFERENCES customer(customer_id),
	total_price numeric(6,2),
	charge_id text,
	refund boolean
);

CREATE TABLE order_detail (
	order_detail_id serial PRIMARY KEY NOT NULL,
	order_master_id int REFERENCES order_master(order_master_id),
	store_dish_id int REFERENCES store_dish(store_dish_id),
	order_amt int
);