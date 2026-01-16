CREATE TABLE `User` (
	`id` int NOT NULL,
	`name` varchar(40) NOT NULL,
	`email` varchar(40) NOT NULL,
	`password` varchar(40) NOT NULL,
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_email_unique` UNIQUE(`email`)
);
