-- Stored Procedures for Call Center Application
-- For Azure SQL Server
-- Insert and Update procedures with identity column return

-- Universe Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertUniverse
    @UniverseName NVARCHAR(100),
    @Description NVARCHAR(255),
    @IsMaster BIT = 0,
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

	declare @UniverseID int
    
    INSERT INTO Universe (UniverseID, UniverseName, Description, IsMaster, IsActive)
    OUTPUT INSERTED.UniverseID
    VALUES (@UniverseID, @UniverseName, @Description, @IsMaster, @IsActive);
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateUniverse
    @UniverseID INT,
    @UniverseName NVARCHAR(100),
    @Description NVARCHAR(255),
    @IsMaster BIT = 0,
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Universe
    SET UniverseName = @UniverseName,
        Description = @Description,
        IsMaster = @IsMaster,
        IsActive = @IsActive
    WHERE UniverseID = @UniverseID;
    
    SELECT @UniverseID AS UniverseID;
END;
GO

-- Languages Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertLanguage
    @LanguageCode NVARCHAR(10),
    @LanguageName NVARCHAR(100),
    @Direction NVARCHAR(3) = 'LTR',
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    declare @LanguageID int
    INSERT INTO Languages (LanguageID, LanguageCode, LanguageName, Direction, UniverseID)
    OUTPUT INSERTED.LanguageID
    VALUES (@LanguageID, @LanguageCode, @LanguageName, @Direction, @UniverseID);
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateLanguage
    @LanguageID INT,
    @LanguageCode NVARCHAR(10),
    @LanguageName NVARCHAR(100),
    @Direction NVARCHAR(3) = 'LTR',
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Languages
    SET LanguageCode = @LanguageCode,
        LanguageName = @LanguageName,
        Direction = @Direction,
        UniverseID = @UniverseID
    WHERE LanguageID = @LanguageID;
    
    SELECT @LanguageID AS LanguageID;
END;
GO

-- Countries Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertCountry
    @CountryID INT,
    @CountryName NVARCHAR(100),
    @CountryAlpha3 NVARCHAR(10),
    @CountryCode NVARCHAR(10),
    @CountryNumeric NVARCHAR(10),
    @PhoneCode NVARCHAR(10),
    @Capital NVARCHAR(100),
    @CurrencyCode NVARCHAR(10),
    @CurrencyName NVARCHAR(100),
    @TLD NVARCHAR(10),
    @Region NVARCHAR(100),
    @RegionID INT,
    @SubRegion NVARCHAR(100),
    @SubRegionID INT,
    @Nationality NVARCHAR(100),
    @Timezones NVARCHAR(MAX),
    @Latitude DECIMAL(10, 8),
    @Longitude DECIMAL(11, 8),
    @IsActive BIT = 1,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Countries (
        CountryID, CountryName, CountryAlpha3, CountryCode, CountryNumeric, 
        PhoneCode, Capital, CurrencyCode, CurrencyName, TLD, 
        Region, RegionID, SubRegion, SubRegionID, Nationality, 
        Timezones, Latitude, Longitude, IsActive, UniverseID
    )
    OUTPUT INSERTED.CountryID
    VALUES (
        @CountryID, @CountryName, @CountryAlpha3, @CountryCode, @CountryNumeric,
        @PhoneCode, @Capital, @CurrencyCode, @CurrencyName, @TLD,
        @Region, @RegionID, @SubRegion, @SubRegionID, @Nationality,
        @Timezones, @Latitude, @Longitude, @IsActive, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateCountry
    @CountryID INT,
    @CountryName NVARCHAR(100),
    @CountryAlpha3 NVARCHAR(10),
    @CountryCode NVARCHAR(10),
    @CountryNumeric NVARCHAR(10),
    @PhoneCode NVARCHAR(10),
    @Capital NVARCHAR(100),
    @CurrencyCode NVARCHAR(10),
    @CurrencyName NVARCHAR(100),
    @TLD NVARCHAR(10),
    @Region NVARCHAR(100),
    @RegionID INT,
    @SubRegion NVARCHAR(100),
    @SubRegionID INT,
    @Nationality NVARCHAR(100),
    @Timezones NVARCHAR(MAX),
    @Latitude DECIMAL(10, 8),
    @Longitude DECIMAL(11, 8),
    @IsActive BIT = 1,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Countries
    SET CountryName = @CountryName,
        CountryAlpha3 = @CountryAlpha3,
        CountryCode = @CountryCode,
        CountryNumeric = @CountryNumeric,
        PhoneCode = @PhoneCode,
        Capital = @Capital,
        CurrencyCode = @CurrencyCode,
        CurrencyName = @CurrencyName,
        TLD = @TLD,
        Region = @Region,
        RegionID = @RegionID,
        SubRegion = @SubRegion,
        SubRegionID = @SubRegionID,
        Nationality = @Nationality,
        Timezones = @Timezones,
        Latitude = @Latitude,
        Longitude = @Longitude,
        IsActive = @IsActive,
        UniverseID = @UniverseID
    WHERE CountryID = @CountryID;
    
    SELECT @CountryID AS CountryID;
END;
GO

-- States Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertState
    @StateID INT,
    @StateName NVARCHAR(100),
    @StateCode NVARCHAR(10),
    @StateType NVARCHAR(50),
    @CountryID INT,
    @CountryCode NVARCHAR(10),
    @CountryName NVARCHAR(100),
    @Latitude DECIMAL(10, 8),
    @Longitude DECIMAL(11, 8),
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO States (
        StateID, StateName, StateCode, StateType, CountryID,
        CountryCode, CountryName, Latitude, Longitude, UniverseID
    )
    OUTPUT INSERTED.StateID
    VALUES (
        @StateID, @StateName, @StateCode, @StateType, @CountryID,
        @CountryCode, @CountryName, @Latitude, @Longitude, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateState
    @StateID INT,
    @StateName NVARCHAR(100),
    @StateCode NVARCHAR(10),
    @StateType NVARCHAR(50),
    @CountryID INT,
    @CountryCode NVARCHAR(10),
    @CountryName NVARCHAR(100),
    @Latitude DECIMAL(10, 8),
    @Longitude DECIMAL(11, 8),
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE States
    SET StateName = @StateName,
        StateCode = @StateCode,
        StateType = @StateType,
        CountryID = @CountryID,
        CountryCode = @CountryCode,
        CountryName = @CountryName,
        Latitude = @Latitude,
        Longitude = @Longitude,
        UniverseID = @UniverseID
    WHERE StateID = @StateID;
    
    SELECT @StateID AS StateID;
END;
GO

-- Cities Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertCity
    @CityID INT,
    @CityName NVARCHAR(100),
    @StateID INT,
    @StateCode NVARCHAR(10),
    @StateName NVARCHAR(100),
    @CountryID INT,
    @CountryCode NVARCHAR(10),
    @CountryName NVARCHAR(100),
    @PostalCode NVARCHAR(20) = NULL,
    @Latitude DECIMAL(10, 8),
    @Longitude DECIMAL(11, 8),
    @WikiDataID NVARCHAR(50) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Cities (
        CityID, CityName, StateID, StateCode, StateName,
        CountryID, CountryCode, CountryName, PostalCode,
        Latitude, Longitude, WikiDataID, UniverseID
    )
    OUTPUT INSERTED.CityID
    VALUES (
        @CityID, @CityName, @StateID, @StateCode, @StateName,
        @CountryID, @CountryCode, @CountryName, @PostalCode,
        @Latitude, @Longitude, @WikiDataID, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateCity
    @CityID INT,
    @CityName NVARCHAR(100),
    @StateID INT,
    @StateCode NVARCHAR(10),
    @StateName NVARCHAR(100),
    @CountryID INT,
    @CountryCode NVARCHAR(10),
    @CountryName NVARCHAR(100),
    @PostalCode NVARCHAR(20) = NULL,
    @Latitude DECIMAL(10, 8),
    @Longitude DECIMAL(11, 8),
    @WikiDataID NVARCHAR(50) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Cities
    SET CityName = @CityName,
        StateID = @StateID,
        StateCode = @StateCode,
        StateName = @StateName,
        CountryID = @CountryID,
        CountryCode = @CountryCode,
        CountryName = @CountryName,
        PostalCode = @PostalCode,
        Latitude = @Latitude,
        Longitude = @Longitude,
        WikiDataID = @WikiDataID,
        UniverseID = @UniverseID
    WHERE CityID = @CityID;
    
    SELECT @CityID AS CityID;
END;
GO

-- Companies Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertCompany
    @CompanyID INT,
    @CompanyName NVARCHAR(200),
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Companies (CompanyID, CompanyName, UniverseID)
    OUTPUT INSERTED.CompanyID
    VALUES (@CompanyID, @CompanyName, @UniverseID);
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateCompany
    @CompanyID INT,
    @CompanyName NVARCHAR(200),
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Companies
    SET CompanyName = @CompanyName,
        UniverseID = @UniverseID
    WHERE CompanyID = @CompanyID;
    
    SELECT @CompanyID AS CompanyID;
END;
GO

-- Divisions Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertDivision
    @DivisionID INT,
    @DivisionName NVARCHAR(200),
    @CompanyID INT,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Divisions (DivisionID, DivisionName, CompanyID, UniverseID)
    OUTPUT INSERTED.DivisionID
    VALUES (@DivisionID, @DivisionName, @CompanyID, @UniverseID);
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateDivision
    @DivisionID INT,
    @DivisionName NVARCHAR(200),
    @CompanyID INT,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Divisions
    SET DivisionName = @DivisionName,
        CompanyID = @CompanyID,
        UniverseID = @UniverseID
    WHERE DivisionID = @DivisionID;
    
    SELECT @DivisionID AS DivisionID;
END;
GO

-- Departments Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertDepartment
    @DepartmentID INT,
    @DepartmentName NVARCHAR(200),
    @DivisionID INT,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Departments (DepartmentID, DepartmentName, DivisionID, UniverseID)
    OUTPUT INSERTED.DepartmentID
    VALUES (@DepartmentID, @DepartmentName, @DivisionID, @UniverseID);
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateDepartment
    @DepartmentID INT,
    @DepartmentName NVARCHAR(200),
    @DivisionID INT,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Departments
    SET DepartmentName = @DepartmentName,
        DivisionID = @DivisionID,
        UniverseID = @UniverseID
    WHERE DepartmentID = @DepartmentID;
    
    SELECT @DepartmentID AS DepartmentID;
END;
GO

-- WorkTeams Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertWorkTeam
    @TeamID INT,
    @TeamName NVARCHAR(200),
    @DepartmentID INT,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO WorkTeams (TeamID, TeamName, DepartmentID, UniverseID)
    OUTPUT INSERTED.TeamID
    VALUES (@TeamID, @TeamName, @DepartmentID, @UniverseID);
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateWorkTeam
    @TeamID INT,
    @TeamName NVARCHAR(200),
    @DepartmentID INT,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE WorkTeams
    SET TeamName = @TeamName,
        DepartmentID = @DepartmentID,
        UniverseID = @UniverseID
    WHERE TeamID = @TeamID;
    
    SELECT @TeamID AS TeamID;
END;
GO

-- Users Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertUser
    @UniverseID INT,
    @FirstName NVARCHAR(100),
    @MiddleName NVARCHAR(100) = NULL,
    @LastName NVARCHAR(100),
    @FullNameLocal NVARCHAR(200) = NULL,
    @NationalID NVARCHAR(50) = NULL,
    @PassportNumber NVARCHAR(50) = NULL,
    @IDExpiryDate DATE = NULL,
    @Username NVARCHAR(50),
    @Email NVARCHAR(100) = NULL,
    @PhoneNumber NVARCHAR(20) = NULL,
    @PasswordHash NVARCHAR(256),
    @PasswordSalt NVARCHAR(256),
    @IsLocked BIT = 0,
    @LockoutEnd DATETIME = NULL,
    @IsLoggedIn BIT = 0,
    @FailedLoginAttempts INT = 0,
    @IsEmailVerified BIT = 0,
    @IsPhoneVerified BIT = 0,
    @Status NVARCHAR(20) = 'Active',
    @LanguageID INT = NULL,
    @CountryID INT = NULL,
    @StateID INT = NULL,
    @CityID INT = NULL,
    @TimeZone NVARCHAR(100) = NULL,
    @CreatedBy NVARCHAR(50) = NULL,
    @UpdatedAt DATETIME = NULL,
    @UpdatedBy NVARCHAR(50) = NULL,
    @LastLogin DATETIME = NULL,
    @IsActive BIT = 1,
    @IsDeleted BIT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Users (
        UniverseID, FirstName, MiddleName, LastName, FullNameLocal,
        NationalID, PassportNumber, IDExpiryDate, Username, Email,
        PhoneNumber, PasswordHash, PasswordSalt, IsLocked, LockoutEnd,
        IsLoggedIn, FailedLoginAttempts, IsEmailVerified, IsPhoneVerified, Status,
        LanguageID, CountryID, StateID, CityID, TimeZone,
        CreatedAt, CreatedBy, UpdatedAt, UpdatedBy, LastLogin,
        IsActive, IsDeleted
    )
    OUTPUT INSERTED.UserID
    VALUES (
        @UniverseID, @FirstName, @MiddleName, @LastName, @FullNameLocal,
        @NationalID, @PassportNumber, @IDExpiryDate, @Username, @Email,
        @PhoneNumber, @PasswordHash, @PasswordSalt, @IsLocked, @LockoutEnd,
        @IsLoggedIn, @FailedLoginAttempts, @IsEmailVerified, @IsPhoneVerified, @Status,
        @LanguageID, @CountryID, @StateID, @CityID, @TimeZone,
        GETDATE(), @CreatedBy, @UpdatedAt, @UpdatedBy, @LastLogin,
        @IsActive, @IsDeleted
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateUser
    @UserID INT,
    @UniverseID INT,
    @FirstName NVARCHAR(100),
    @MiddleName NVARCHAR(100) = NULL,
    @LastName NVARCHAR(100),
    @FullNameLocal NVARCHAR(200) = NULL,
    @NationalID NVARCHAR(50) = NULL,
    @PassportNumber NVARCHAR(50) = NULL,
    @IDExpiryDate DATE = NULL,
    @Username NVARCHAR(50),
    @Email NVARCHAR(100) = NULL,
    @PhoneNumber NVARCHAR(20) = NULL,
    @PasswordHash NVARCHAR(256) = NULL,
    @PasswordSalt NVARCHAR(256) = NULL,
    @IsLocked BIT = 0,
    @LockoutEnd DATETIME = NULL,
    @IsLoggedIn BIT = 0,
    @FailedLoginAttempts INT = 0,
    @IsEmailVerified BIT = 0,
    @IsPhoneVerified BIT = 0,
    @Status NVARCHAR(20) = 'Active',
    @LanguageID INT = NULL,
    @CountryID INT = NULL,
    @StateID INT = NULL,
    @CityID INT = NULL,
    @TimeZone NVARCHAR(100) = NULL,
    @UpdatedBy NVARCHAR(50) = NULL,
    @LastLogin DATETIME = NULL,
    @IsActive BIT = 1,
    @IsDeleted BIT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Users
    SET UniverseID = @UniverseID,
        FirstName = @FirstName,
        MiddleName = @MiddleName,
        LastName = @LastName,
        FullNameLocal = @FullNameLocal,
        NationalID = @NationalID,
        PassportNumber = @PassportNumber,
        IDExpiryDate = @IDExpiryDate,
        Username = @Username,
        Email = @Email,
        PhoneNumber = @PhoneNumber,
        PasswordHash = ISNULL(@PasswordHash, PasswordHash),
        PasswordSalt = ISNULL(@PasswordSalt, PasswordSalt),
        IsLocked = @IsLocked,
        LockoutEnd = @LockoutEnd,
        IsLoggedIn = @IsLoggedIn,
        FailedLoginAttempts = @FailedLoginAttempts,
        IsEmailVerified = @IsEmailVerified,
        IsPhoneVerified = @IsPhoneVerified,
        Status = @Status,
        LanguageID = @LanguageID,
        CountryID = @CountryID,
        StateID = @StateID,
        CityID = @CityID,
        TimeZone = @TimeZone,
        UpdatedAt = GETDATE(),
        UpdatedBy = @UpdatedBy,
        LastLogin = @LastLogin,
        IsActive = @IsActive,
        IsDeleted = @IsDeleted
    WHERE UserID = @UserID;
    
    SELECT @UserID AS UserID;
END;
GO

-- Employees Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertEmployee
    @EmployeeID INT,
    @UserID INT,
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Title NVARCHAR(100) = NULL,
    @ManagerID INT = NULL,
    @DepartmentID INT = NULL,
    @DivisionID INT = NULL,
    @CompanyID INT = NULL,
    @TeamID INT = NULL,
    @Status NVARCHAR(50) = 'Active',
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Employees (
        EmployeeID, UserID, FirstName, LastName, Title,
        ManagerID, DepartmentID, DivisionID, CompanyID, TeamID,
        Status, UniverseID
    )
    OUTPUT INSERTED.EmployeeID
    VALUES (
        @EmployeeID, @UserID, @FirstName, @LastName, @Title,
        @ManagerID, @DepartmentID, @DivisionID, @CompanyID, @TeamID,
        @Status, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateEmployee
    @EmployeeID INT,
    @UserID INT,
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Title NVARCHAR(100) = NULL,
    @ManagerID INT = NULL,
    @DepartmentID INT = NULL,
    @DivisionID INT = NULL,
    @CompanyID INT = NULL,
    @TeamID INT = NULL,
    @Status NVARCHAR(50) = 'Active',
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Employees
    SET UserID = @UserID,
        FirstName = @FirstName,
        LastName = @LastName,
        Title = @Title,
        ManagerID = @ManagerID,
        DepartmentID = @DepartmentID,
        DivisionID = @DivisionID,
        CompanyID = @CompanyID,
        TeamID = @TeamID,
        Status = @Status,
        UniverseID = @UniverseID
    WHERE EmployeeID = @EmployeeID;
    
    SELECT @EmployeeID AS EmployeeID;
END;
GO

-- Tenant Settings Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertTenantSetting
    @TenantID INT,
    @DefaultLanguageID INT = NULL,
    @DefaultCountryID INT = NULL,
    @TimeZone NVARCHAR(100) = NULL,
    @CurrencyCode NVARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO TenantSettings (
        TenantID, DefaultLanguageID, DefaultCountryID, TimeZone, CurrencyCode
    )
    OUTPUT INSERTED.TenantID
    VALUES (
        @TenantID, @DefaultLanguageID, @DefaultCountryID, @TimeZone, @CurrencyCode
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateTenantSetting
    @TenantID INT,
    @DefaultLanguageID INT = NULL,
    @DefaultCountryID INT = NULL,
    @TimeZone NVARCHAR(100) = NULL,
    @CurrencyCode NVARCHAR(10) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE TenantSettings
    SET DefaultLanguageID = @DefaultLanguageID,
        DefaultCountryID = @DefaultCountryID,
        TimeZone = @TimeZone,
        CurrencyCode = @CurrencyCode
    WHERE TenantID = @TenantID;
    
    SELECT @TenantID AS TenantID;
END;
GO

-- UI Translations Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertUITranslation
    @UIKey NVARCHAR(100),
    @LanguageID INT,
    @TranslatedText NVARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO UI_Translations (UIKey, LanguageID, TranslatedText)
    VALUES (@UIKey, @LanguageID, @TranslatedText);
    
    SELECT @UIKey AS UIKey, @LanguageID AS LanguageID;
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateUITranslation
    @UIKey NVARCHAR(100),
    @LanguageID INT,
    @TranslatedText NVARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE UI_Translations
    SET TranslatedText = @TranslatedText
    WHERE UIKey = @UIKey AND LanguageID = @LanguageID;
    
    SELECT @UIKey AS UIKey, @LanguageID AS LanguageID;
END;
GO

-- Translations Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertTranslation
    @EntityType NVARCHAR(50),
    @EntityID INT,
    @LanguageID INT,
    @TranslatedText NVARCHAR(200),
    @FieldName NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO Translations (
        EntityType, EntityID, LanguageID, TranslatedText, FieldName
    )
    OUTPUT INSERTED.TranslationID
    VALUES (
        @EntityType, @EntityID, @LanguageID, @TranslatedText, @FieldName
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateTranslation
    @TranslationID INT,
    @EntityType NVARCHAR(50),
    @EntityID INT,
    @LanguageID INT,
    @TranslatedText NVARCHAR(200),
    @FieldName NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Translations
    SET EntityType = @EntityType,
        EntityID = @EntityID,
        LanguageID = @LanguageID,
        TranslatedText = @TranslatedText,
        FieldName = @FieldName
    WHERE TranslationID = @TranslationID;
    
    SELECT @TranslationID AS TranslationID;
END;
GO

-- Audit Logs Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertAuditLog
    @LogID INT,
    @UserID INT,
    @Action NVARCHAR(255),
    @IPAddress NVARCHAR(45) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO AuditLogs (LogID, UserID, Action, Timestamp, IPAddress, UniverseID)
    OUTPUT INSERTED.LogID
    VALUES (@LogID, @UserID, @Action, GETDATE(), @IPAddress, @UniverseID);
END;
GO

-- Workflow Actions Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertWorkflowAction
    @ActionID INT,
    @ActionName NVARCHAR(100),
    @Description NVARCHAR(255) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO WorkflowActions (ActionID, ActionName, Description, UniverseID)
    OUTPUT INSERTED.ActionID
    VALUES (@ActionID, @ActionName, @Description, @UniverseID);
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateWorkflowAction
    @ActionID INT,
    @ActionName NVARCHAR(100),
    @Description NVARCHAR(255) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE WorkflowActions
    SET ActionName = @ActionName,
        Description = @Description,
        UniverseID = @UniverseID
    WHERE ActionID = @ActionID;
    
    SELECT @ActionID AS ActionID;
END;
GO

-- User Access Restrictions Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertUserAccessRestriction
    @RestrictionID INT,
    @UserID INT,
    @AllowedIP NVARCHAR(45) = NULL,
    @StartTime TIME = NULL,
    @EndTime TIME = NULL,
    @ActiveFromDate DATE = NULL,
    @ActiveToDate DATE = NULL,
    @AllowedDays NVARCHAR(100) = NULL,
    @IsEnabled BIT = 1,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO UserAccessRestrictions (
        RestrictionID, UserID, AllowedIP, StartTime, EndTime,
        ActiveFromDate, ActiveToDate, AllowedDays, IsEnabled, UniverseID
    )
    OUTPUT INSERTED.RestrictionID
    VALUES (
        @RestrictionID, @UserID, @AllowedIP, @StartTime, @EndTime,
        @ActiveFromDate, @ActiveToDate, @AllowedDays, @IsEnabled, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateUserAccessRestriction
    @RestrictionID INT,
    @UserID INT,
    @AllowedIP NVARCHAR(45) = NULL,
    @StartTime TIME = NULL,
    @EndTime TIME = NULL,
    @ActiveFromDate DATE = NULL,
    @ActiveToDate DATE = NULL,
    @AllowedDays NVARCHAR(100) = NULL,
    @IsEnabled BIT = 1,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE UserAccessRestrictions
    SET UserID = @UserID,
        AllowedIP = @AllowedIP,
        StartTime = @StartTime,
        EndTime = @EndTime,
        ActiveFromDate = @ActiveFromDate,
        ActiveToDate = @ActiveToDate,
        AllowedDays = @AllowedDays,
        IsEnabled = @IsEnabled,
        UniverseID = @UniverseID
    WHERE RestrictionID = @RestrictionID;
    
    SELECT @RestrictionID AS RestrictionID;
END;
GO

-- System Assets Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertSystemAsset
    @AssetID INT,
    @AssetType NVARCHAR(50),
    @AssetName NVARCHAR(200),
    @Description NVARCHAR(255) = NULL,
    @IsActive BIT = 1,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO SystemAssets (
        AssetID, AssetType, AssetName, Description, IsActive, UniverseID
    )
    OUTPUT INSERTED.AssetID
    VALUES (
        @AssetID, @AssetType, @AssetName, @Description, @IsActive, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateSystemAsset
    @AssetID INT,
    @AssetType NVARCHAR(50),
    @AssetName NVARCHAR(200),
    @Description NVARCHAR(255) = NULL,
    @IsActive BIT = 1,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE SystemAssets
    SET AssetType = @AssetType,
        AssetName = @AssetName,
        Description = @Description,
        IsActive = @IsActive,
        UniverseID = @UniverseID
    WHERE AssetID = @AssetID;
    
    SELECT @AssetID AS AssetID;
END;
GO

-- Role Asset Access Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertRoleAssetAccess
    @RoleID INT,
    @AssetID INT,
    @HasAccess BIT = 1,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO RoleAssetAccess (RoleID, AssetID, HasAccess, UniverseID)
    VALUES (@RoleID, @AssetID, @HasAccess, @UniverseID);
    
    SELECT @RoleID AS RoleID, @AssetID AS AssetID;
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateRoleAssetAccess
    @RoleID INT,
    @AssetID INT,
    @HasAccess BIT = 1,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE RoleAssetAccess
    SET HasAccess = @HasAccess,
        UniverseID = @UniverseID
    WHERE RoleID = @RoleID AND AssetID = @AssetID;
    
    SELECT @RoleID AS RoleID, @AssetID AS AssetID;
END;
GO

-- Asset Access Logs Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertAssetAccessLog
    @AccessLogID INT,
    @UserID INT,
    @AssetID INT,
    @IPAddress NVARCHAR(45) = NULL,
    @Action NVARCHAR(100) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO AssetAccessLogs (
        AccessLogID, UserID, AssetID, AccessedAt, IPAddress, Action, UniverseID
    )
    OUTPUT INSERTED.AccessLogID
    VALUES (
        @AccessLogID, @UserID, @AssetID, GETDATE(), @IPAddress, @Action, @UniverseID
    );
END;
GO

-- Software Metering Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertSoftwareMetering
    @MeteringID INT,
    @UserID INT,
    @ApplicationName NVARCHAR(200),
    @Version NVARCHAR(50) = NULL,
    @StartTime DATETIME,
    @EndTime DATETIME = NULL,
    @DurationInSeconds INT = NULL,
    @HostName NVARCHAR(100) = NULL,
    @IPAddress NVARCHAR(45) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO SoftwareMetering (
        MeteringID, UserID, ApplicationName, Version, StartTime,
        EndTime, DurationInSeconds, HostName, IPAddress, UniverseID
    )
    OUTPUT INSERTED.MeteringID
    VALUES (
        @MeteringID, @UserID, @ApplicationName, @Version, @StartTime,
        @EndTime, @DurationInSeconds, @HostName, @IPAddress, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateSoftwareMetering
    @MeteringID INT,
    @UserID INT,
    @ApplicationName NVARCHAR(200),
    @Version NVARCHAR(50) = NULL,
    @StartTime DATETIME,
    @EndTime DATETIME = NULL,
    @DurationInSeconds INT = NULL,
    @HostName NVARCHAR(100) = NULL,
    @IPAddress NVARCHAR(45) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE SoftwareMetering
    SET UserID = @UserID,
        ApplicationName = @ApplicationName,
        Version = @Version,
        StartTime = @StartTime,
        EndTime = @EndTime,
        DurationInSeconds = @DurationInSeconds,
        HostName = @HostName,
        IPAddress = @IPAddress,
        UniverseID = @UniverseID
    WHERE MeteringID = @MeteringID;
    
    SELECT @MeteringID AS MeteringID;
END;
GO

-- Software Metering Summary Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertSoftwareMeteringSummary
    @SummaryID INT,
    @UserID INT,
    @ApplicationName NVARCHAR(200),
    @UsageDate DATE,
    @TotalDurationInSeconds INT,
    @UsageCount INT,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO SoftwareMeteringSummary (
        SummaryID, UserID, ApplicationName, UsageDate, 
        TotalDurationInSeconds, UsageCount, UniverseID
    )
    OUTPUT INSERTED.SummaryID
    VALUES (
        @SummaryID, @UserID, @ApplicationName, @UsageDate, 
        @TotalDurationInSeconds, @UsageCount, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateSoftwareMeteringSummary
    @SummaryID INT,
    @UserID INT,
    @ApplicationName NVARCHAR(200),
    @UsageDate DATE,
    @TotalDurationInSeconds INT,
    @UsageCount INT,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE SoftwareMeteringSummary
    SET UserID = @UserID,
        ApplicationName = @ApplicationName,
        UsageDate = @UsageDate,
        TotalDurationInSeconds = @TotalDurationInSeconds,
        UsageCount = @UsageCount,
        UniverseID = @UniverseID
    WHERE SummaryID = @SummaryID;
    
    SELECT @SummaryID AS SummaryID;
END;
GO

-- Software Resource Metering Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertSoftwareResourceMetering
    @ResourceMeteringID INT,
    @UserID INT,
    @HostName NVARCHAR(100),
    @IPAddress NVARCHAR(45) = NULL,
    @ResourceType NVARCHAR(50),
    @UsageValue DECIMAL(18, 4),
    @Unit NVARCHAR(20),
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO SoftwareResourceMetering (
        ResourceMeteringID, UserID, HostName, IPAddress, 
        ResourceType, UsageValue, Unit, RecordedAt, UniverseID
    )
    OUTPUT INSERTED.ResourceMeteringID
    VALUES (
        @ResourceMeteringID, @UserID, @HostName, @IPAddress, 
        @ResourceType, @UsageValue, @Unit, GETDATE(), @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateSoftwareResourceMetering
    @ResourceMeteringID INT,
    @UserID INT,
    @HostName NVARCHAR(100),
    @IPAddress NVARCHAR(45) = NULL,
    @ResourceType NVARCHAR(50),
    @UsageValue DECIMAL(18, 4),
    @Unit NVARCHAR(20),
    @RecordedAt DATETIME = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE SoftwareResourceMetering
    SET UserID = @UserID,
        HostName = @HostName,
        IPAddress = @IPAddress,
        ResourceType = @ResourceType,
        UsageValue = @UsageValue,
        Unit = @Unit,
        RecordedAt = ISNULL(@RecordedAt, RecordedAt),
        UniverseID = @UniverseID
    WHERE ResourceMeteringID = @ResourceMeteringID;
    
    SELECT @ResourceMeteringID AS ResourceMeteringID;
END;
GO

-- Software Resource Summary Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertSoftwareResourceSummary
    @SummaryID INT,
    @UserID INT,
    @HostName NVARCHAR(100),
    @ResourceType NVARCHAR(50),
    @UsageDate DATE,
    @TotalUsage DECIMAL(18, 4),
    @Unit NVARCHAR(20),
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO SoftwareResourceSummary (
        SummaryID, UserID, HostName, ResourceType, 
        UsageDate, TotalUsage, Unit, UniverseID
    )
    OUTPUT INSERTED.SummaryID
    VALUES (
        @SummaryID, @UserID, @HostName, @ResourceType, 
        @UsageDate, @TotalUsage, @Unit, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateSoftwareResourceSummary
    @SummaryID INT,
    @UserID INT,
    @HostName NVARCHAR(100),
    @ResourceType NVARCHAR(50),
    @UsageDate DATE,
    @TotalUsage DECIMAL(18, 4),
    @Unit NVARCHAR(20),
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE SoftwareResourceSummary
    SET UserID = @UserID,
        HostName = @HostName,
        ResourceType = @ResourceType,
        UsageDate = @UsageDate,
        TotalUsage = @TotalUsage,
        Unit = @Unit,
        UniverseID = @UniverseID
    WHERE SummaryID = @SummaryID;
    
    SELECT @SummaryID AS SummaryID;
END;
GO

-- Voice Prints Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertVoicePrint
    @UserID INT,
    @VoicePrintData VARBINARY(MAX),
    @IsActive BIT = 1,
    @UpdatedBy INT = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO VoicePrints (
        UserID, EnrollmentDate, VoicePrintData, 
        IsActive, LastUpdated, UpdatedBy, UniverseID
    )
    OUTPUT INSERTED.VoicePrintID
    VALUES (
        @UserID, GETDATE(), @VoicePrintData, 
        @IsActive, GETDATE(), @UpdatedBy, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateVoicePrint
    @VoicePrintID INT,
    @UserID INT,
    @VoicePrintData VARBINARY(MAX) = NULL,
    @IsActive BIT = 1,
    @UpdatedBy INT = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE VoicePrints
    SET UserID = @UserID,
        VoicePrintData = ISNULL(@VoicePrintData, VoicePrintData),
        IsActive = @IsActive,
        LastUpdated = GETDATE(),
        UpdatedBy = @UpdatedBy,
        UniverseID = @UniverseID
    WHERE VoicePrintID = @VoicePrintID;
    
    SELECT @VoicePrintID AS VoicePrintID;
END;
GO

-- Voice Authentication Logs Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertVoiceAuthenticationLog
    @UserID INT,
    @AuthenticationResult BIT,
    @ConfidenceScore DECIMAL(5,2),
    @IPAddress NVARCHAR(45) = NULL,
    @DeviceInfo NVARCHAR(255) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO VoiceAuthenticationLogs (
        UserID, AuthenticationDate, AuthenticationResult, 
        ConfidenceScore, IPAddress, DeviceInfo, UniverseID
    )
    OUTPUT INSERTED.LogID
    VALUES (
        @UserID, GETDATE(), @AuthenticationResult, 
        @ConfidenceScore, @IPAddress, @DeviceInfo, @UniverseID
    );
END;
GO

-- Voice Fraud Detection Table Procedures
CREATE OR ALTER PROCEDURE sp_InsertVoiceFraudDetection
    @UserID INT,
    @FraudProbability DECIMAL(5,2),
    @FraudType NVARCHAR(50),
    @ActionTaken NVARCHAR(100) = NULL,
    @Notes NVARCHAR(MAX) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    INSERT INTO VoiceFraudDetection (
        UserID, DetectionDate, FraudProbability, 
        FraudType, ActionTaken, Notes, UniverseID
    )
    OUTPUT INSERTED.DetectionID
    VALUES (
        @UserID, GETDATE(), @FraudProbability, 
        @FraudType, @ActionTaken, @Notes, @UniverseID
    );
END;
GO

CREATE OR ALTER PROCEDURE sp_UpdateVoiceFraudDetection
    @DetectionID INT,
    @UserID INT,
    @FraudProbability DECIMAL(5,2),
    @FraudType NVARCHAR(50),
    @ActionTaken NVARCHAR(100) = NULL,
    @Notes NVARCHAR(MAX) = NULL,
    @UniverseID INT = 0
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE VoiceFraudDetection
    SET UserID = @UserID,
        FraudProbability = @FraudProbability,
        FraudType = @FraudType,
        ActionTaken = @ActionTaken,
        Notes = @Notes,
        UniverseID = @UniverseID
    WHERE DetectionID = @DetectionID;
    
    SELECT @DetectionID AS DetectionID;
END;
GO
