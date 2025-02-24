IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'dylanki')
BEGIN
  CREATE DATABASE dylanki;
END;
GO
USE dyalnki;