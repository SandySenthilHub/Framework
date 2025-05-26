-- Call Center Application Database Schema for Azure SQL Server
-- Modified to align with CSV data structure

-- Universe Table (for multitenancy support)
CREATE TABLE Universe (
    UniverseID INT PRIMARY KEY,
    UniverseName NVARCHAR(100),
    Description NVARCHAR(255),
    IsMaster BIT DEFAULT 0,
    IsActive BIT DEFAULT 1
);

-- Languages Table
CREATE TABLE Languages (
    LanguageID INT PRIMARY KEY,
    LanguageCode NVARCHAR(10) UNIQUE,
    LanguageName NVARCHAR(100),
    Direction NVARCHAR(3) CHECK (Direction IN ('LTR', 'RTL')), -- for UI
    UniverseID INT DEFAULT 0
);

-- Countries Table (aligned with countries.csv)
CREATE TABLE Countries (
    CountryID INT PRIMARY KEY,
    CountryName NVARCHAR(100),
    CountryAlpha3 NVARCHAR(10),       -- iso3 in CSV (e.g., IND, USA)
    CountryCode NVARCHAR(10),         -- iso2 in CSV (e.g., IN, US)
    CountryNumeric NVARCHAR(10),      -- numeric_code in CSV
    PhoneCode NVARCHAR(10),           -- phonecode in CSV (e.g., +91)
    Capital NVARCHAR(100),
    CurrencyCode NVARCHAR(10),        -- currency in CSV
    CurrencyName NVARCHAR(100),       -- Added from CSV
    TLD NVARCHAR(10),                 -- Added from CSV
    Region NVARCHAR(100),             -- Continent/Region in CSV
    RegionID INT,                     -- Added from CSV
    SubRegion NVARCHAR(100),
    SubRegionID INT,                  -- Added from CSV
    Nationality NVARCHAR(100),        -- Added from CSV
    Timezones NVARCHAR(MAX),          -- Added from CSV (JSON format)
    Latitude DECIMAL(10, 8),          -- Added from CSV
    Longitude DECIMAL(11, 8),         -- Added from CSV
    IsActive BIT DEFAULT 1,
    UniverseID INT DEFAULT 0
);

-- States Table (renamed from Regions to match CSV)
CREATE TABLE States (
    StateID INT PRIMARY KEY,          -- id in CSV
    StateName NVARCHAR(100),          -- name in CSV
    StateCode NVARCHAR(10),           -- state_code in CSV
    StateType NVARCHAR(50),           -- type in CSV (province, state, etc.)
    CountryID INT FOREIGN KEY REFERENCES Countries(CountryID),
    CountryCode NVARCHAR(10),         -- Added from CSV
    CountryName NVARCHAR(100),        -- Added from CSV
    Latitude DECIMAL(10, 8),          -- Added from CSV
    Longitude DECIMAL(11, 8),         -- Added from CSV
    UniverseID INT DEFAULT 0
);

-- Cities Table (aligned with cities.csv)
CREATE TABLE Cities (
    CityID INT PRIMARY KEY,           -- id in CSV
    CityName NVARCHAR(100),           -- name in CSV
    StateID INT FOREIGN KEY REFERENCES States(StateID), -- state_id in CSV
    StateCode NVARCHAR(10),           -- Added from CSV
    StateName NVARCHAR(100),          -- Added from CSV
    CountryID INT FOREIGN KEY REFERENCES Countries(CountryID), -- Added from CSV
    CountryCode NVARCHAR(10),         -- Added from CSV
    CountryName NVARCHAR(100),        -- Added from CSV
    PostalCode NVARCHAR(20),          -- Kept from original schema
    Latitude DECIMAL(10, 8),          -- Added from CSV
    Longitude DECIMAL(11, 8),         -- Added from CSV
    WikiDataID NVARCHAR(50),          -- Added from CSV
    UniverseID INT DEFAULT 0
);

-- Companies Table
CREATE TABLE Companies (
    CompanyID INT PRIMARY KEY,
    CompanyName NVARCHAR(200),
    UniverseID INT DEFAULT 0
);

-- Divisions Table
CREATE TABLE Divisions (
    DivisionID INT PRIMARY KEY,
    DivisionName NVARCHAR(200),
    CompanyID INT,
    UniverseID INT DEFAULT 0
);

-- Departments Table
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName NVARCHAR(200),
    DivisionID INT,
    UniverseID INT DEFAULT 0
);

-- WorkTeams Table
CREATE TABLE WorkTeams (
    TeamID INT PRIMARY KEY,
    TeamName NVARCHAR(200),
    DepartmentID INT,
    UniverseID INT DEFAULT 0
);

-- Users Table
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    UniverseID INT NOT NULL,
    FirstName NVARCHAR(100),
    MiddleName NVARCHAR(100),
    LastName NVARCHAR(100),
    FullNameLocal NVARCHAR(200),
    NationalID NVARCHAR(50),
    PassportNumber NVARCHAR(50),
    IDExpiryDate DATE,
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Email NVARCHAR(100) UNIQUE,
    PhoneNumber NVARCHAR(20),
    PasswordHash NVARCHAR(256),
    PasswordSalt NVARCHAR(256),
    IsLocked BIT DEFAULT 0,
    LockoutEnd DATETIME NULL,
    IsLoggedIn BIT DEFAULT 0,
    FailedLoginAttempts INT DEFAULT 0,
    IsEmailVerified BIT DEFAULT 0,
    IsPhoneVerified BIT DEFAULT 0,
    Status NVARCHAR(20) DEFAULT 'Active', -- Active, Inactive, Suspended, Deleted
    LanguageID INT,
    CountryID INT,
    StateID INT,                      -- Changed from RegionID to StateID
    CityID INT,
    TimeZone NVARCHAR(100),
    CreatedAt DATETIME DEFAULT GETDATE(),
    CreatedBy NVARCHAR(50),
    UpdatedAt DATETIME,
    UpdatedBy NVARCHAR(50),
    LastLogin DATETIME,
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0
);

-- Employees Table
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    UserID INT,
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    Title NVARCHAR(100),
    ManagerID INT,
    DepartmentID INT,
    DivisionID INT,
    CompanyID INT,
    TeamID INT,
    Status NVARCHAR(50),
    UniverseID INT DEFAULT 0
);

-- Tenant Settings Table
CREATE TABLE TenantSettings (
    TenantID INT PRIMARY KEY,
    DefaultLanguageID INT,
    DefaultCountryID INT FOREIGN KEY REFERENCES Countries(CountryID),
    TimeZone NVARCHAR(100),
    CurrencyCode NVARCHAR(10)
);

-- UI Translations Table
CREATE TABLE UI_Translations (
    UIKey NVARCHAR(100),
    LanguageID INT,
    TranslatedText NVARCHAR(200),
    PRIMARY KEY (UIKey, LanguageID)
);

-- Translations Table
CREATE TABLE Translations (
    TranslationID INT IDENTITY(1,1) PRIMARY KEY,
    EntityType NVARCHAR(50),     -- e.g., 'Permission', 'Role'
    EntityID INT,
    LanguageID INT,
    TranslatedText NVARCHAR(200),
    FieldName NVARCHAR(50)       -- e.g., 'Description', 'Name'
);

-- Audit Logs Table
CREATE TABLE AuditLogs (
    LogID INT PRIMARY KEY,
    UserID INT,
    Action NVARCHAR(255),
    Timestamp DATETIME DEFAULT GETDATE(),
    IPAddress NVARCHAR(45),
    UniverseID INT DEFAULT 0
);

-- Workflow Actions Table
CREATE TABLE WorkflowActions (
    ActionID INT PRIMARY KEY,
    ActionName NVARCHAR(100),
    Description NVARCHAR(255),
    UniverseID INT DEFAULT 0
);

-- User IP & Time Restrictions Table
CREATE TABLE UserAccessRestrictions (
    RestrictionID INT PRIMARY KEY,
    UserID INT,
    AllowedIP NVARCHAR(45),
    StartTime TIME,
    EndTime TIME,
    ActiveFromDate DATE,
    ActiveToDate DATE,
    AllowedDays NVARCHAR(100),
    IsEnabled BIT DEFAULT 1,
    UniverseID INT DEFAULT 0
);

-- System Assets Table (Screens, Menus, Classes, Functions)
CREATE TABLE SystemAssets (
    AssetID INT PRIMARY KEY,
    AssetType NVARCHAR(50),
    AssetName NVARCHAR(200),
    Description NVARCHAR(255),
    IsActive BIT DEFAULT 1,
    UniverseID INT DEFAULT 0
);

-- Role-Based Access Control Table
CREATE TABLE RoleAssetAccess (
    RoleID INT,
    AssetID INT,
    HasAccess BIT DEFAULT 1,
    UniverseID INT DEFAULT 0,
    PRIMARY KEY (RoleID, AssetID)
);

-- Asset Access Logs Table
CREATE TABLE AssetAccessLogs (
    AccessLogID INT PRIMARY KEY,
    UserID INT,
    AssetID INT,
    AccessedAt DATETIME DEFAULT GETDATE(),
    IPAddress NVARCHAR(45),
    Action NVARCHAR(100),
    UniverseID INT DEFAULT 0
);

-- Software Metering Table (applications usage tracking)
CREATE TABLE SoftwareMetering (
    MeteringID INT PRIMARY KEY,
    UserID INT,
    ApplicationName NVARCHAR(200),
    Version NVARCHAR(50),
    StartTime DATETIME,
    EndTime DATETIME,
    DurationInSeconds INT,
    HostName NVARCHAR(100),
    IPAddress NVARCHAR(45),
    UniverseID INT DEFAULT 0
);

-- Software Metering Summary Table (daily/hourly summaries)
CREATE TABLE SoftwareMeteringSummary (
    SummaryID INT PRIMARY KEY,
    UserID INT,
    ApplicationName NVARCHAR(200),
    UsageDate DATE,
    TotalDurationInSeconds INT,
    UsageCount INT,
    UniverseID INT DEFAULT 0
);

-- Software Resource Metering Table (CPU, Storage, GPU)
CREATE TABLE SoftwareResourceMetering (
    ResourceMeteringID INT PRIMARY KEY,
    UserID INT,
    HostName NVARCHAR(100),
    IPAddress NVARCHAR(45),
    ResourceType NVARCHAR(50), -- e.g., 'CPU', 'GPU', 'Storage'
    UsageValue DECIMAL(18, 4), -- e.g., CPU% or GB used
    Unit NVARCHAR(20),         -- e.g., 'Percent', 'MB', 'GB'
    RecordedAt DATETIME DEFAULT GETDATE(),
    UniverseID INT DEFAULT 0
);

-- Software Resource Summary Table (aggregated usage)
CREATE TABLE SoftwareResourceSummary (
    SummaryID INT PRIMARY KEY,
    UserID INT,
    HostName NVARCHAR(100),
    ResourceType NVARCHAR(50), -- CPU, GPU, Storage
    UsageDate DATE,
    TotalUsage DECIMAL(18, 4),
    Unit NVARCHAR(20),         -- Percent, MB, GB
    UniverseID INT DEFAULT 0
);

-- Voice Authentication Tables (based on user requirements)
CREATE TABLE VoicePrints (
    VoicePrintID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    EnrollmentDate DATETIME DEFAULT GETDATE(),
    VoicePrintData VARBINARY(MAX),
    IsActive BIT DEFAULT 1,
    LastUpdated DATETIME,
    UpdatedBy INT,
    UniverseID INT DEFAULT 0
);

CREATE TABLE VoiceAuthenticationLogs (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    AuthenticationDate DATETIME DEFAULT GETDATE(),
    AuthenticationResult BIT,
    ConfidenceScore DECIMAL(5,2),
    IPAddress NVARCHAR(45),
    DeviceInfo NVARCHAR(255),
    UniverseID INT DEFAULT 0
);

CREATE TABLE VoiceFraudDetection (
    DetectionID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    DetectionDate DATETIME DEFAULT GETDATE(),
    FraudProbability DECIMAL(5,2),
    FraudType NVARCHAR(50),
    ActionTaken NVARCHAR(100),
    Notes NVARCHAR(MAX),
    UniverseID INT DEFAULT 0
);
