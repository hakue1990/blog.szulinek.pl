---
title: "MySql Cheatsheet"
date: 2023-07-22T19:33:36+02:00
draft: false
author: ["Adam"]
cover:
    image: img/blog/mysql.webp
    alt: 'mysql'

tags: ["tech","web","cheatsheet"] 
categories: ["tech","web","cheatsheet"]
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Mysql cheatsheet"
canonicalURL: "https://canonical.url/to/page"
disableShare: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true

params:
    ShowShareButtons: true 
---

### Displaying Data

```sql
-- Display available databases
SHOW DATABASES;
-- Display available tables in the current database
SHOW TABLES;
-- Display fields from a table / Describe table structure
SHOW FIELDS FROM table / DESCRIBE table;
-- Display the command used to create a specific table
SHOW CREATE TABLE table;
-- Display a list of active processes (queries) in the database
SHOW PROCESSLIST;
-- Terminate a running process with a specified number
KILL process_number;
```

### Select Queries

```sql
-- Select all columns from a specific table
SELECT * FROM table;
-- Select all columns from two tables (creates a Cartesian product)
SELECT * FROM table1, table2;
-- Select specific columns from two tables (creates a Cartesian product)
SELECT column1, column2 FROM table1, table2;
-- Select data from a table that meets a specified condition
SELECT ... FROM ... WHERE condition;
-- Select data from a table that meets a specified condition and group the results by one of the fields
SELECT ... FROM ... WHERE condition GROUP BY column;
-- Select data from a table that meets a specified condition, group the results by one of the fields, and filter the results by groups
SELECT ... FROM ... WHERE condition GROUP BY column HAVING condition2;
-- Select data from a table that meets a specified condition and sort the results by one or two fields
SELECT ... FROM ... WHERE condition ORDER BY column1, column2;
-- Select data from a table that meets a specified condition and sort the results by one or two fields in descending order
SELECT ... FROM ... WHERE condition ORDER BY column1, column2 DESC;
-- Select data from a table that meets a specified condition and limit the results to 10 rows
SELECT ... FROM ... WHERE condition LIMIT 10;
-- Select unique values from a single column of a table
SELECT DISTINCT column1 FROM ...
-- Select unique combinations of values from two columns of a table
SELECT DISTINCT column1, column2 FROM ...
```

### Select - Join

```sql
-- Select data from two tables that have matching values in the specified fields
SELECT ... FROM table1 JOIN table2 ON table1.id1 = table2.id2 WHERE condition;
-- Select data from the first table (table1) and all matching data from the second table (table2)
SELECT ... FROM table1 LEFT JOIN table2 ON table1.id1 = table2.id2 WHERE condition;
-- Select data from the first table (table1) and all matching data from the result of joining the second (table2) and third (table3) tables
SELECT ... FROM table1 JOIN (table2 JOIN table3 ON ...) ON ...
```

### Conditions

```sql
column1 = value1
column1 <> value1
column1 LIKE 'value _ %'
column1 IS NULL
column1 IS NOT NULL
column1 IN (value1, value2)
column1 NOT IN (value1, value2)
condition1 AND condition2
condition1 OR condition2
```

### Creating / Deleting Databases

```sql
-- Creating a new database with the name DatabaseName
CREATE DATABASE DatabaseName;
-- Creating a new database with the name DatabaseName and specifying the character set (utf8)
CREATE DATABASE DatabaseName CHARACTER SET utf8;
-- Using a specific database (opening it)
USE DatabaseName;
-- Deleting a database with the name DatabaseName
DROP DATABASE DatabaseName;
-- Changing the character set for a specific database
ALTER DATABASE DatabaseName CHARACTER SET utf8;
```

### Database Backup to SQL File

```sql
mysqldump -u UserName -p DatabaseName > backup_file.sql
```

### Restoring a Database from SQL Backup File

```sql
mysql -u UserName -p DatabaseName < backup_file.sql;
```

### Repairing Tables After Improper System Shutdown

```sql
-- Repair all tables in all databases
mysqlcheck --all-databases;
-- Fast repair all tables in all databases
mysqlcheck --all-databases --fast;
```

### Data Insertion (Insert)

```sql
-- Inserting values into specific fields of a table
INSERT INTO table1 (column1, column2) VALUES (value1, value2);
```

### Data Deletion (Delete)

```sql
-- Deleting all data from a specific table (leaving the table with no records)
DELETE FROM table1 / TRUNCATE table1;
-- Deleting selected data from a specific table that meets a specified condition
DELETE FROM table1 WHERE condition;
-- Deleting data from two tables that match based on the specified fields and meet a specified condition
DELETE FROM table1, table2 WHERE table1.id1 = table2.id2 AND condition;
```

### Data Update (Update)

```sql
-- Updating the value of a single field in a specific table that meets a specified condition
UPDATE table1 SET column1=new_value1 WHERE condition;
-- Updating the values of multiple fields in a specific table that meets a specified condition and where data from table1 matches data from table2
UPDATE table1, table2 SET column1=new_value1, column2=new_value2, ... WHERE table1.id1 = table2.id2 AND condition;
```

### Creating / Deleting / Modifying Tables

```sql
-- Creating a new table with specified fields and data types
CREATE TABLE table (column1 type1, column2 type2);
-- Creating a new table with an index on a field
CREATE TABLE table (column1 type1, column2 type2, INDEX (column));
-- Creating a new table with a primary key on a field
CREATE TABLE table (column1 type1, column2 type2, PRIMARY KEY (column1));
-- Creating a new table with multiple fields as the primary key
CREATE TABLE table (column1 type1, column2 type2, PRIMARY KEY (column1, column2));
-- Creating a new table with a foreign key pointing to a field named t2_fieldA in table2
CREATE TABLE table1 (fk_column1 type1, column2 type2, ..., FOREIGN KEY (fk_column1) REFERENCES table2 (t2_fieldA)) [ON UPDATE|ON DELETE] [CASCADE|SET NULL];
-- Creating a new table with multiple foreign keys
CREATE TABLE table1 (fk_column1 type1, fk_column2 type2, ..., FOREIGN KEY (fk_column1, fk_column2) REFERENCES table2 (t2_fieldA, t2_fieldB));
-- Creating a temporary table
CREATE TEMPORARY TABLE table;
-- Deleting a table named table
DROP TABLE table;
-- Deleting a table named table if it exists
DROP TABLE IF EXISTS table;
-- Deleting multiple tables at once
DROP TABLE table1, table2, ...;
-- Changing the type and other settings of a field in a table
ALTER TABLE table MODIFY column1 type1;
-- Changing the type of a field to type1 and adding additional settings, such as NOT NULL
ALTER TABLE table MODIFY column1 type1 NOT NULL ...;
-- Changing the name of a field in a table
ALTER TABLE table CHANGE old_column1 new_column1 type1;
-- Changing the name of a field in a table to new_column1 and changing the type to type1 and adding additional settings, such as NOT NULL
ALTER TABLE table CHANGE old_column1 new_column1 type1 NOT NULL ...;
-- Changing the default value of a field in a table
ALTER TABLE table ALTER column1 SET DEFAULT

 ...;
-- Removing the default value of a field in a table
ALTER TABLE table ALTER column1 DROP DEFAULT;
-- Adding a new field to a table
ALTER TABLE table ADD new_column1 type1;
-- Adding a new field to the beginning of a table
ALTER TABLE table ADD new_column1 type1 FIRST;
-- Adding a new field after another field in a table
ALTER TABLE table ADD new_column1 type1 AFTER another_column;
-- Removing a field from a table
ALTER TABLE table DROP column1;
-- Adding an index to a table
ALTER TABLE table ADD INDEX (column);
-- Changing the order of a field in a table (moving the field to the beginning)
ALTER TABLE table MODIFY column1 type1 FIRST;
-- Changing the order of a field in a table (moving the field after another field)
ALTER TABLE table MODIFY column1 type1 AFTER another_column;
-- Changing the order of a field and changing the name of a field in a table (moving the field to the beginning)
ALTER TABLE table CHANGE old_column1 new_column1 type1 FIRST;
-- Changing the order of a field and changing the name of a field in a table (moving the field after another field)
ALTER TABLE table CHANGE old_column1 new_column1 type1 AFTER another_column;
```

### Keys

```sql
-- Creating a table with a primary key composed of one or more fields
CREATE TABLE table (..., PRIMARY KEY (column1, column2));
-- Creating a table with a foreign key pointing to another field in another table
CREATE TABLE table (..., FOREIGN KEY (column1, column2) REFERENCES table2 (t2_column1, t2_column2));
```

### Users and Permissions

```sql
-- Creating a new user 'user' with access only to the database on localhost
CREATE USER 'user'@'localhost';
-- Granting all privileges to user 'user' in database 'base' on localhost with password 'password'
GRANT ALL PRIVILEGES ON base.* TO 'user'@'localhost' IDENTIFIED BY 'password';
-- Granting specific permissions SELECT, INSERT, DELETE to user 'user' in database 'base' on localhost with password 'password'
GRANT SELECT, INSERT, DELETE ON base.* TO 'user'@'localhost' IDENTIFIED BY 'password';
-- Revoking specific permission from user 'user' on localhost (e.g., only INSERT)
REVOKE ALL PRIVILEGES ON base.* FROM 'user'@'host';
-- Revoking all privileges from user 'user' on localhost
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'user'@'host';
-- Refreshing privileges (activating changes)
FLUSH PRIVILEGES;
-- Changing the password for user 'user'
SET PASSWORD = PASSWORD('new_password');
-- Changing the password for user 'user' on localhost
SET PASSWORD FOR 'user'@'host' = PASSWORD('new_password');
-- Changing the password using the old password hashing function
SET PASSWORD = OLD_PASSWORD('new_password');
-- Deleting the user 'user' on localhost
DROP USER 'user'@'host';
```

### Data Types (Main Data Types)

```sql
TINYINT (1 byte: -128 to +127)
SMALLINT (2 bytes: -32768 to +32767)
MEDIUMINT (3 bytes: -8388608 to +8388607)
INT (4 bytes: -2147483648 to +2147483647)
BIGINT (8 bytes: -9.10^18 to +9.10^18)

Precise ranges: -(2^(8*N-1)) -> (2^(8*N))-1

FLOAT(M,D)
DOUBLE(M,D)
FLOAT(D=0->53)

e.g., 8,3 -> 12345.678 - NOT 12345678.123!

TIME (HH:MM)
YEAR (YYYY)
DATE (YYYY-MM-DD)
DATETIME (YYYY-MM-DD HH:MM; years 1000->9999)
TIMESTAMP (similar to DATETIME but years 1970->2038, compatible with Unix)

VARCHAR (single-line; specified size)
TEXT (multi-line; maximum size=65535)
BLOB (binary; maximum size=65535)

Variants for TEXT and BLOB: TINY (maximum size=255), MEDIUM (maximum size=~16000), and LONG (maximum size=4 GB). Examples: VARCHAR(32), TINYTEXT, LONGBLOB, MEDIUMTEXT

ENUM ('value1', 'value2', ...) -- (by default, NULL or '' if NOT NULL)
```

### Resetting the Root Password

1. Stop the MySQL server:
```bash
 $ /etc/init.d/mysql stop
 ```
 or
 ```bash
systemctl stop mysqld
 ```
2. Start the MySQL server in safe mode (skip-grant-tables):
```bash
mysqld_safe --skip-grant-tables
 ```
3. Open a new terminal window and log in to MySQL:
```bash
 mysql
 ```
4. Run the following SQL command to change the root password:
```sql
mysql> UPDATE mysql.user SET password=PASSWORD('new_password') WHERE user='root';
```
5. Exit the MySQL session: In the mysqld_safe mode, press the following key combination:
```bash
Control + \
```
6. Restart the MySQL server:
```bash
 /etc/init.d/mysql start
```
or
```bash
systemctl start mysqld
```