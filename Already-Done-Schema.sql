CREATE DATABASE already_done;

USE already_done;

CREATE TABLE Household(
	`House-ID` INT AUTO_INCREMENT PRIMARY KEY
    );
    

CREATE TABLE Users (
    `User-ID` INT AUTO_INCREMENT PRIMARY KEY,
    `Fname` VARCHAR(255),
    `Lname` VARCHAR(255),
    `DOB` DATE,
    `Points earned` INT DEFAULT 0,
    `Google Auth` VARCHAR(255),
    `PorC-Flag` ENUM('P', 'C') NOT NULL,
    `H-ID` INT,
    FOREIGN KEY (`H-ID`) REFERENCES Household(`House-ID`) ON DELETE CASCADE
);


CREATE TABLE Food (
    `Food-ID` INT AUTO_INCREMENT PRIMARY KEY,
    `Point value` INT,
    `Quantity` INT,
    `Expiry date` DATE,
    `H-ID` INT,
    FOREIGN KEY (`H-ID`) REFERENCES Household(`House-ID`)
    ON DELETE CASCADE
);


CREATE TABLE Consumed_Food (
    `CFood-ID` INT,
    `Date of Consumption` DATE NOT NULL,
    `U-ID` INT,
    PRIMARY KEY (`CFood-ID`, `U-ID`),
    FOREIGN KEY (`CFood-ID`) REFERENCES Food(`Food-ID`)
    ON DELETE CASCADE,
    FOREIGN KEY (`U-ID`) REFERENCES Users(`User-ID`)
    ON DELETE CASCADE
);



CREATE TABLE `Trash Bin` (
    `Bin-ID` INT AUTO_INCREMENT PRIMARY KEY,
    `Items` VARCHAR(255),
    `Date discarded` DATE
);



CREATE TABLE `Discards` (
    `Parent-ID` INT,
    `DBin-ID` INT,
    `DFood-ID` INT,
    PRIMARY KEY (`Parent-ID`, `DBin-ID`, `DFood-ID`),
    FOREIGN KEY (`Parent-ID`) REFERENCES Users(`User-ID`)
    ON DELETE RESTRICT,
    FOREIGN KEY (`DBin-ID`) REFERENCES `Trash Bin`(`Bin-ID`)
    ON DELETE RESTRICT,
    FOREIGN KEY (`DFood-ID`) REFERENCES Food(`Food-ID`)
    ON DELETE RESTRICT
);

CREATE TABLE Reward (
    `R-ID` INT AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(255) NOT NULL,
    `Points needed` INT NOT NULL,
    `Description` TEXT,
    `Status` INT,
    `H-ID` INT,
    FOREIGN KEY (`H-ID`) REFERENCES Household(`House-ID`)
);


CREATE TABLE Redeemed_Reward (
    `ReedemID` INT,
    `Date` DATE NOT NULL,
    `U-ID` INT,
    PRIMARY KEY (`ReedemID`, `U-ID`),
    FOREIGN KEY (`ReedemID`) REFERENCES Reward(`R-ID`)
    ON DELETE CASCADE,
    FOREIGN KEY (`U-ID`) REFERENCES Users(`User-ID`)
    ON DELETE CASCADE
);

USE already_done;

-- Adding name field 
ALTER TABLE Food ADD COLUMN `Name` VARCHAR(255) AFTER `Food-ID`;

-- Removing expiry date from food table
ALTER TABLE Food DROP COLUMN `Expiry date`;

-- Adding name field house
ALTER TABLE Household ADD COLUMN `Name` VARCHAR(255) AFTER `House-ID`;


-- Make status field a tinyint(1) -boolean- instead of a regular int
ALTER TABLE Reward MODIFY COLUMN `Status` TINYINT(1);

-- Getting rid of discards table 
DROP TABLE `Discards`; 

-- Drop trash bin to fix it 
DROP TABLE `Trash Bin`;

-- Update to current trash bin table 
CREATE TABLE `Trash Bin` (
    `Bin-ID` INT AUTO_INCREMENT PRIMARY KEY,
    `H-ID` INT,
    `Food-ID` INT,
    `User-ID` INT,
    `Date discarded` DATE,
    FOREIGN KEY (`H-ID`) REFERENCES Household(`House-ID`) ON DELETE CASCADE,
    FOREIGN KEY (`Food-ID`) REFERENCES Food(`Food-ID`) ON DELETE CASCADE,
    FOREIGN KEY (`User-ID`) REFERENCES Users(`User-ID`) ON DELETE CASCADE
);

-- Checking tables after changes
Desc `Food`;
Desc  `Reward`;
Desc `Household`;
Desc `Trash Bin`;
Desc `Users`;
Desc `Consumed_Food`;


