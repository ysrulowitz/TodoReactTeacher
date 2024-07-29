-- DROP SCHEMA todoapp;

CREATE SCHEMA todoapp AUTHORIZATION retool;

-- DROP SEQUENCE todoapp.person_id_seq;

CREATE SEQUENCE todoapp.person_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE todoapp.task_id_seq;

CREATE SEQUENCE todoapp.task_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- todoapp.person definition

-- Drop table

-- DROP TABLE todoapp.person;

CREATE TABLE todoapp.person (
	id serial4 NOT NULL,
	"name" text NOT NULL,
	email text NULL,
	pass text NOT NULL,
	CONSTRAINT person_pkey PRIMARY KEY (id),
	CONSTRAINT person_unique UNIQUE (name)
);


-- todoapp.task definition

-- Drop table

-- DROP TABLE todoapp.task;

CREATE TABLE todoapp.task (
	id serial4 NOT NULL,
	user_id int4 NOT NULL,
	title text NOT NULL,
	tags _text DEFAULT '{}'::text[] NULL,
	description text NULL,
	status text DEFAULT 'active'::text NOT NULL,
	deleted_at timestamptz NULL,
	created_at timestamptz DEFAULT now() NULL,
	url varchar NULL,
	CONSTRAINT task_pkey PRIMARY KEY (id),
	CONSTRAINT task_user_id_fkey FOREIGN KEY (user_id) REFERENCES todoapp.person(id)
);