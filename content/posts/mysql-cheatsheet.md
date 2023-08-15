---
title: "Mysql Cheatsheet"
date: 2023-07-22T18:47:05+02:00
draft: false
author: ["Adam"]
cover:
    image: img/blog/mysql.webp
    alt: 'bash'

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
## Wyświetlanie danych

```sql
-- Wyświetl dostępne bazy danych
SHOW DATABASES;
-- Wyświetl dostępne tabele w bieżącej bazie danych
SHOW TABLES;
-- Wyświetl pola z tabeli / Opisz strukturę tabeli
SHOW FIELDS FROM tabela / DESCRIBE tabela;
-- Wyświetl polecenie tworzące daną tabelę
SHOW CREATE TABLE tabela;
-- Wyświetl listę aktywnych procesów (zapytań) w bazie danych
SHOW PROCESSLIST;
-- Zabij (zakończ) działający proces o określonym numerze
KILL numer_procesu;
```

## Selecty

```sql
-- Wybierz wszystkie kolumny z danej tabeli
SELECT * FROM tabela;
-- Wybierz wszystkie kolumny z dwóch tabel (tworzy iloczyn kartezjański)
SELECT * FROM tabela1, tabela2;
-- Wybierz wybrane kolumny z dwóch tabel (tworzy iloczyn kartezjański)
SELECT pole1, pole2 FROM tabela1, tabela2;
-- Wybierz dane z tabeli spełniające określony warunek
SELECT ... FROM ... WHERE warunek;
-- Wybierz dane z tabeli spełniające określony warunek i grupuj wyniki po jednym z pól
SELECT ... FROM ... WHERE warunek GROUP BY pole;
-- Wybierz dane z tabeli spełniające określony warunek, grupuj wyniki po jednym z pól i dodatkowo filtruj wyniki po grupach
SELECT ... FROM ... WHERE warunek GROUP BY pole HAVING warunek2;
-- Wybierz dane z tabeli spełniające określony warunek i posortuj wyniki po jednym lub dwóch polach
SELECT ... FROM ... WHERE warunek ORDER BY pole1, pole2;
-- Wybierz dane z tabeli spełniające określony warunek i posortuj wyniki po jednym lub dwóch polach w kolejności malejącej
SELECT ... FROM ... WHERE warunek ORDER BY pole1, pole2 DESC;
-- Wybierz dane z tabeli spełniające określony warunek i ogranicz wyniki do 10 wierszy
SELECT ... FROM ... WHERE warunek LIMIT 10;
-- Wybierz unikalne wartości z jednej kolumny tabeli
SELECT DISTINCT pole1 FROM ...
-- Wybierz unikalne kombinacje wartości z dwóch kolumn tabeli
SELECT DISTINCT pole1, pole2 FROM ...
```

## Select - Join

```sql
-- Wybierz dane z dwóch tabel, które mają pasujące wartości wskazanych pól
SELECT ... FROM tabela1 JOIN tabela2 ON tabela1.id1 = tabela2.id2 WHERE warunek;
-- Wybierz dane z tabeli pierwszej (tabela1) oraz wszystkie pasujące dane z tabeli drugiej (tabela2)
SELECT ... FROM tabela1 LEFT JOIN tabela2 ON tabela1.id1 = tabela2.id2 WHERE warunek;
-- Wybierz dane z tabeli pierwszej (tabela1) oraz wszystkie pasujące dane z wyniku łączenia tabel drugiej (tabela2) i trzeciej (tabela3)
SELECT ... FROM tabela1 JOIN (tabela2 JOIN tabela3 ON ...) ON ...
```

## Warunki (Conditions)

```sql
pole1 = wartość1
pole1 <> wartość1
pole1 LIKE 'wartość _ %'
pole1 IS NULL
pole1 IS NOT NULL
pole1 IN (wartość1, wartość2)
pole1 NOT IN (wartość1, wartość2)
warunek1 AND warunek2
warunek1 OR warunek2
```

## Tworzenie / Usuwanie bazy danych

```sql
-- Tworzenie nowej bazy danych o nazwie DatabaseName
CREATE DATABASE DatabaseName;
-- Tworzenie nowej bazy danych o nazwie DatabaseName z określonym zestawem znaków (utf8)
CREATE DATABASE DatabaseName CHARACTER SET utf8;
-- Użycie danej bazy danych (otwarcie)
USE DatabaseName;
-- Usunięcie bazy danych o nazwie DatabaseName
DROP DATABASE DatabaseName;
-- Zmiana zestawu znaków dla danej bazy danych
ALTER DATABASE DatabaseName CHARACTER SET utf8;
```

## Backup bazy danych do pliku SQL

```sql
mysqldump -u NazwaUżytkownika -p NazwaBazyDanych > nazwapliku_backup.sql
```

## Przywracanie bazy danych z pliku backup SQL

```sql
mysql -u NazwaUżytkownika -p NazwaBazyDanych < nazwapliku_backup.sql;
```

## Naprawa tabel po nieprawidłowym zamknięciu systemu

```sql
-- Naprawa wszystkich tabel we wszystkich bazach danych
mysqlcheck --all-databases;
-- Szybka naprawa wszystkich tabel we wszystkich bazach danych
mysqlcheck --all-databases --fast;
```

## Wstawianie danych (Insert)

```sql
-- Wstawienie wartości do określonych pól tabeli
INSERT INTO tabela1 (pole1, pole2) VALUES (wartość1, wartość2);
```

## Usuwanie danych (Delete)

```sql
-- Usunięcie wszystkich danych z danej tabeli (zostawia tabelę bez rekordów)
DELETE FROM tabela1 / TRUNCATE tabela1;
-- Usunięcie wybranych danych z danej tabeli spełniających określony warunek
DELETE FROM tabela1 WHERE warunek;
-- Usunięcie danych z dwóch tabel, które pasują do siebie na podstawie wskazanych pól i spełniają określony warunek
DELETE FROM tabela1, tabela2 WHERE tabela1.id1 = tabela2.id2 AND warunek;
```

## Aktualizacja danych (Update)

```sql
-- Aktualizacja wartości jednego pola w danej tabeli spełniającej określony warunek
UPDATE tabela1 SET pole1=nowa_wartość1 WHERE warunek;
-- Aktualizacja wartości wielu pól w danej tabeli spełniającej określony warunek i gdzie dane z tabeli1 pasują do danych z tabeli2
UPDATE tabela1, tabela2 SET pole1=nowa_wartość1, pole2=nowa_wartość2, ... WHERE tabela1.id1 = tabela

2.id2 AND warunek;
```

## Tworzenie / Usuwanie / Modyfikacja tabel

```sql
-- Tworzenie nowej tabeli o określonych polach i typach danych
CREATE TABLE tabela (pole1 typ1, pole2 typ2);
-- Tworzenie nowej tabeli z określonym indeksem na polu
CREATE TABLE tabela (pole1 typ1, pole2 typ2, INDEX (pole));
-- Tworzenie nowej tabeli z określonym kluczem głównym na polu
CREATE TABLE tabela (pole1 typ1, pole2 typ2, PRIMARY KEY (pole1));
-- Tworzenie nowej tabeli z wieloma polami jako klucz główny
CREATE TABLE tabela (pole1 typ1, pole2 typ2, PRIMARY KEY (pole1,pole2));
-- Tworzenie nowej tabeli z kluczem obcym na polu, wskazującym na pole o nazwie t2_fieldA w tabeli2
CREATE TABLE tabela1 (fk_pole1 typ1, pole2 typ2, ..., FOREIGN KEY (fk_pole1) REFERENCES tabela2 (t2_poleA)) [ON UPDATE|ON DELETE] [CASCADE|SET NULL];
-- Tworzenie nowej tabeli z wieloma kluczami obcymi
CREATE TABLE tabela1 (fk_pole1 typ1, fk_pole2 typ2, ..., FOREIGN KEY (fk_pole1, fk_pole2) REFERENCES tabela2 (t2_poleA, t2_poleB));
-- Tworzenie tymczasowej tabeli
CREATE TEMPORARY TABLE tabela;
-- Usunięcie tabeli o nazwie tabela
DROP TABLE tabela;
-- Usunięcie tabeli o nazwie tabela, jeśli istnieje
DROP TABLE IF EXISTS tabela;
-- Usunięcie wielu tabel na raz
DROP TABLE tabela1, tabela2, ...;
-- Zmiana typu i innych ustawień pola w tabeli
ALTER TABLE tabela MODIFY pole1 typ1;
-- Zmiana typu pola na typ1 i dodatkowych ustawień, np. NOT NULL
ALTER TABLE tabela MODIFY pole1 typ1 NOT NULL ...;
-- Zmiana nazwy pola w tabeli
ALTER TABLE tabela CHANGE stare_pole1 nowe_pole1 typ1;
-- Zmiana nazwy pola w tabeli na nowe_pole1 oraz typu na typ1 i dodatkowych ustawień, np. NOT NULL
ALTER TABLE tabela CHANGE stare_pole1 nowe_pole1 typ1 NOT NULL ...;
-- Zmiana domyślnej wartości pola w tabeli
ALTER TABLE tabela ALTER pole1 SET DEFAULT ...;
-- Usunięcie domyślnej wartości pola w tabeli
ALTER TABLE tabela ALTER pole1 DROP DEFAULT;
-- Dodanie nowego pola do tabeli
ALTER TABLE tabela ADD nowe_pole1 typ1;
-- Dodanie nowego pola na początku tabeli
ALTER TABLE tabela ADD nowe_pole1 typ1 FIRST;
-- Dodanie nowego pola po innym polu w tabeli
ALTER TABLE tabela ADD nowe_pole1 typ1 AFTER inne_pole;
-- Usunięcie pola z tabeli
ALTER TABLE tabela DROP pole1;
-- Dodanie indeksu do tabeli
ALTER TABLE tabela ADD INDEX (pole);
-- Zmiana kolejności pola w tabeli (przeniesienie pola na początek)
ALTER TABLE tabela MODIFY pole1 typ1 FIRST;
-- Zmiana kolejności pola w tabeli (przeniesienie pola po innym polu)
ALTER TABLE tabela MODIFY pole1 typ1 AFTER inne_pole;
-- Zmiana kolejności pola i zmiana nazwy pola w tabeli (przeniesienie pola na początek)
ALTER TABLE tabela CHANGE stare_pole1 nowe_pole1 typ1 FIRST;
-- Zmiana kolejności pola i zmiana nazwy pola w tabeli (przeniesienie pola po innym polu)
ALTER TABLE tabela CHANGE stare_pole1 nowe_pole1 typ1 AFTER inne_pole;
```

## Klucze (Keys)

```sql
-- Tworzenie tabeli z kluczem głównym składającym się z jednego lub więcej pól
CREATE TABLE tabela (..., PRIMARY KEY (pole1, pole2));
-- Tworzenie tabeli z kluczem obcym wskazującym na inne pole w innej tabeli
CREATE TABLE tabela (..., FOREIGN KEY (pole1, pole2) REFERENCES tabela2 (t2_pole1, t2_pole2));
```

## Użytkownicy i uprawnienia

```sql
-- Tworzenie nowego użytkownika 'user' z dostępem tylko do bazy danych na localhost
CREATE USER 'user'@'localhost';
-- Nadanie wszystkich uprawnień dla użytkownika 'user' w bazie danych 'base' na localhost z hasłem 'password'
GRANT ALL PRIVILEGES ON base.* TO 'user'@'localhost' IDENTIFIED BY 'password';
-- Nadanie konkretnych uprawnień SELECT, INSERT, DELETE dla użytkownika 'user' w bazie danych 'base' na localhost z hasłem 'password'
GRANT SELECT, INSERT, DELETE ON base.* TO 'user'@'localhost' IDENTIFIED BY 'password';
-- Odebranie konkretnego uprawnienia od użytkownika 'user' na localhost (np. tylko INSERT)
REVOKE ALL PRIVILEGES ON base.* FROM 'user'@'host';
-- Odebranie wszystkich uprawnień od użytkownika 'user' na localhost
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'user'@'host';
-- Odświeżenie uprawnień (aktywacja zmian)
FLUSH PRIVILEGES;
-- Zmiana hasła dla użytkownika 'user'
SET PASSWORD = PASSWORD('nowe_haslo');
-- Zmiana hasła dla użytkownika 'user' na localhost
SET PASSWORD FOR 'user'@'host' = PASSWORD('nowe_haslo');
-- Zmiana hasła za pomocą starej funkcji haszującej
SET PASSWORD = OLD_PASSWORD('nowe_haslo');
-- Usunięcie użytkownika 'user' na localhost
DROP USER 'user'@'host';
```

## Typy danych (Główne typy danych)

```sql
TINYINT (1 bajt: -128 do +127)
SMALLINT (2 bajty: -32768 do +32767)
MEDIUMINT (3 bajty: -8388608 do +8388607)
INT (4 bajty: -2147483648 do +2147483647)
BIGINT (8 bajtów: -9.10^18 do +9.10^18)

Precyzyjne przedziały: -(2^(8*N-1)) -> (2^(8*N))-1



⚠ INT(2) = "2 cyfry wyświetlane" - NIE "liczba z maks. 2 cyframi"

FLOAT(M,D)
DOUBLE(M,D)
FLOAT(D=0->53)

⚠ 8,3 -> 12345,678 - NIE 12345678,123!

TIME (HH:MM)
YEAR (RRRR)
DATE (RRRR-MM-DD)
DATETIME (RRRR-MM-DD HH:MM; lata 1000->9999)
TIMESTAMP (podobne do DATETIME, ale lata 1970->2038, kompatybilne z Unix)

VARCHAR (jednoliniowy; określony rozmiar)
TEXT (wieloliniowy; maksymalny rozmiar=65535)
BLOB (binarny; maksymalny rozmiar=65535)

Warianty dla TEXT i BLOB: TINY (maksymalny rozmiar=255), MEDIUM (maksymalny rozmiar=~16000), and LONG (maksymalny rozmiar=4 GB). Przykłady: VARCHAR(32), TINYTEXT, LONGBLOB, MEDIUMTEXT

ENUM ('wartość1', 'wartość2', ...) -- (domyślnie NULL lub '' jeśli NOT NULL)
```
## Resetowanie hasła roota

1. Zatrzymaj serwer MySQL:
```bash
 $ /etc/init.d/mysql stop
 ```
 lub
 ```bash
systemctl stop mysqld
 ```
2. Uruchom serwer MySQL w trybie bez weryfikacji uprawnień:
```bash
mysqld_safe --skip-grant-tables
 ```
3. Otwórz nowe okno terminala i zaloguj się do MySQL:
```bash
 mysql
 ```
4. Wprowadź następujące polecenie SQL, aby zmienić hasło roota:
```sql
mysql> UPDATE mysql.user SET password=PASSWORD('nowe_haslo') WHERE user='root';
```
5. Wyjdź z sesji MySQL: W trybie mysqld_safe wciśnij kombinację klawiszy 
```bash
Control + \
```
6. Uruchom ponownie serwer MySQL:
```bash
 /etc/init.d/mysql start
```
lub
```bash
systemctl start mysqld
```