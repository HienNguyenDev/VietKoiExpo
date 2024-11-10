create database [VietKoiExpo_Final]
go
use [VietKoiExpo_Final]
go

CREATE TABLE TBLNewsType (
    NewsTypeID VARCHAR(20) PRIMARY KEY,
    NewsTypeName NVARCHAR(50)
);

CREATE TABLE TBLRole (
    RoleID VARCHAR(20) PRIMARY KEY,
	RoleName NVARCHAR(10),
    RoleDescription NVARCHAR(255),
);

CREATE TABLE TBLUser (
    UserID uniqueidentifier PRIMARY KEY,
    RoleID VARCHAR(20),
    [Password] NVARCHAR(100),
    Email NVARCHAR(50),
    FullName NVARCHAR(50),
    Phone NVARCHAR(20),
	[Address] NVARCHAR(100),
	ImageUrl NVARCHAR(255),
	Experience INT,
	Status BIT,
    FOREIGN KEY (RoleID) REFERENCES TBLRole(RoleID)
);

CREATE TABLE TBLNews (
    NewsID uniqueidentifier PRIMARY KEY,
    NewsTypeID VARCHAR(20),
    UserID uniqueidentifier,
    NewsDate DATE,
	Status BIT,
	NewsDescription NVARCHAR(255),
	ImageUrl NVARCHAR(255),
    FOREIGN KEY (NewsTypeID) REFERENCES TBLNewsTYPE(NewsTypeID),
    FOREIGN KEY (UserID) REFERENCES TBLUser(UserID)
);

CREATE TABLE TBLVariety (
    VarietyID VARCHAR(20) PRIMARY KEY,
    VarietyName NVARCHAR(50),
    VarietyDescription NVARCHAR(100)
);

CREATE TABLE TBLKoiFish (
    KoiID uniqueidentifier PRIMARY KEY,
    VarietyID VARCHAR(20),
    UserID uniqueidentifier,
    KoiName NVARCHAR(50),
    Size INT,
    Age INT,
	ImageUrl NVARCHAR(255),
	Status BIT,
    FOREIGN KEY (VarietyID) REFERENCES TBLVariety(VarietyID),
    FOREIGN KEY (UserID) REFERENCES TBLUser(UserID),
);

CREATE TABLE TBLCompetition (
    CompID uniqueidentifier PRIMARY KEY,
    CompName NVARCHAR(50),
    CompDescription NVARCHAR(100),
    Location NVARCHAR(50),
	ImageUrl NVARCHAR(255),
    StartDate DATE,
    EndDate DATE,
    Status INT
);

CREATE TABLE TBLCategory (
    CategoryID VARCHAR(20) PRIMARY KEY,	
    CategoryName NVARCHAR(20),
    Size INT,
    Age INT,
    CategoryDescription NVARCHAR(100),
);


CREATE TABLE TBLCompetitionCategory (
	CompetitionCategoryID uniqueidentifier PRIMARY KEY,
    CompID uniqueidentifier,  
    CategoryID VARCHAR(20),  
	KoiID uniqueidentifier,
    FOREIGN KEY (CompID) REFERENCES TBLCompetition(CompID),
    FOREIGN KEY (CategoryID) REFERENCES TBLCategory(CategoryID),
	FOREIGN KEY (KoiID) REFERENCES TBLKoiFish(KoiID)
);

CREATE TABLE TBLPrediction (
    PredictionID uniqueidentifier PRIMARY KEY,
    KoiID uniqueidentifier,
    CompID uniqueidentifier,
    PredictedScore INT,
	Status BIT,
    FOREIGN KEY (KoiID) REFERENCES TBLKoiFish(KoiID),
    FOREIGN KEY (CompID) REFERENCES TBLCompetition(CompID)
);

CREATE TABLE TBLRegistration (
    RegistrationID uniqueidentifier PRIMARY KEY,
    KoiID uniqueidentifier,
    CompID uniqueidentifier,
    Status INT,
    FOREIGN KEY (KoiID) REFERENCES TBLKoiFish(KoiID),
    FOREIGN KEY (CompID) REFERENCES TBLCompetition(CompID)
);

CREATE TABLE TBLScore (
    ScoreID uniqueidentifier PRIMARY KEY,
    KoiID uniqueidentifier,
    CompID uniqueidentifier,
    UserID uniqueidentifier,
    ScoreShape FLOAT,
    ScoreColor FLOAT,
    ScorePattern FLOAT,
    TotalScore FLOAT,
	Status BIT,
    FOREIGN KEY (KoiID) REFERENCES TBLKoiFish(KoiID),
    FOREIGN KEY (CompID) REFERENCES TBLCompetition(CompID),
    FOREIGN KEY (UserID) REFERENCES TBLUser(UserID)
);

CREATE TABLE TBLRank (
	RankID uniqueidentifier PRIMARY KEY,
	TotalPrize FLOAT,
	TotalCompetition FLOAT,
	KoiID uniqueidentifier,
	UserID uniqueidentifier,
	FOREIGN KEY (KoiID) REFERENCES TBLKoiFish(KoiID),
	FOREIGN KEY (UserID) REFERENCES TBLUser(UserID)
);

CREATE TABLE TBLResult (
    ResultID uniqueidentifier PRIMARY KEY,
    KoiID uniqueidentifier,
    ResultScore FLOAT,
    Prize NVARCHAR(255),
	CompID uniqueidentifier,
	Status BIT,
    FOREIGN KEY (KoiID) REFERENCES TBLKoiFish(KoiID),
	FOREIGN KEY (CompID) REFERENCES TBLCompetition(CompID)
);


CREATE TABLE TBLTask (
	TaskID uniqueidentifier PRIMARY KEY,
	TaskName NVARCHAR(50),
	UserID uniqueidentifier,
	CompID uniqueidentifier,
	TaskDescription NVARCHAR(100),
	Date date,
	Status BIT,
	FOREIGN KEY (UserID) REFERENCES TBLUser(UserID),
	FOREIGN KEY (CompID) REFERENCES TBLCompetition(CompID)
);

CREATE TABLE [dbo].[TBLCheckIn](
	[CheckInID] [uniqueidentifier] NOT NULL,
	[ImageUrl] [varchar](50) NULL,
	[Status] [int] NULL,
	[RegistrationID] [uniqueidentifier] NULL,
 CONSTRAINT [PK_TBLCheckIn] PRIMARY KEY CLUSTERED 
(
	[CheckInID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[TBLCheckIn]  WITH CHECK ADD  CONSTRAINT [FK_TBLCheckIn_TBLRegistration] FOREIGN KEY([RegistrationID])
REFERENCES [dbo].[TBLRegistration] ([RegistrationID])
GO


-- Insert data into TBLNewsType
INSERT INTO TBLNewsType (NewsTypeID, NewsTypeName) VALUES
('general', 'General'),
('competition', 'Competition'),
('updates', 'Updates'),
('others', 'Others');

-- Insert data into TBLRole
INSERT INTO TBLRole (RoleID, RoleName, RoleDescription) VALUES
('manager', 'Manager', 'Manager with full privileges'),
('judge', 'Judge', 'Competition Jbhudge'),
('staff', 'Staff', 'Managing competition and do task'),
('member', 'Member', 'Regular member for managing their koi fish');

-- Insert data into TBLUser
-- Admins
 INSERT INTO TBLUser (UserID, RoleID, [Password], Email, FullName, Phone, Address, ImageUrl, Status, Experience) VALUES
(NEWID(), 'manager', 'adminpass1', 'admin1@vietkoiexpo.com', N'Trần Văn Bình', '0913456789', N'Đà Nẵng', NULL, 1, NULL), 
(NEWID(), 'manager', 'adminpass2', 'admin2@vietkoiexpo.com', N'Phạm Ngọc Hà', '0987654321', N'Hải Phòng', NULL, 1, NULL); 
-- Staff 
INSERT INTO TBLUser (UserID, RoleID, [Password], Email, FullName, Phone, Address, ImageUrl, Status, Experience) VALUES 
(NEWID(), 'staff', 'staffpass1', 'staff1@vietkoiexpo.com', N'Nguyễn Thanh Mai', '0971234567', N'Bình Dương', NULL, 1, 3), 
(NEWID(), 'staff', 'staffpass2', 'staff2@vietkoiexpo.com', N'Phan Thị Lan', '0934567891', N'Cần Thơ', NULL, 1, 1),
(NEWID(), 'staff', 'staffpass3', 'staff3@vietkoiexpo.com', N'Lê Thị Hoa', '0921234568', N'Hà Nam', NULL, 1, 2), 
(NEWID(), 'staff', 'staffpass4', 'staff4@vietkoiexpo.com', N'Trần Văn Long', '0912345690', N'Nghệ An', NULL, 1, 1), 
(NEWID(), 'staff', 'staffpass5', 'staff5@vietkoiexpo.com', N'Bùi Văn Hùng', '0965432187', N'Lâm Đồng', NULL, 1, 5), 
(NEWID(), 'staff', 'staffpass6', 'staff6@vietkoiexpo.com', N'Đỗ Thị Bích', '0953214678', N'Vũng Tàu', NULL, 1, 2),
-- Judges INSERT INTO TBLUser (UserID, RoleID, [Password], Email, FullName, Phone, Address, ImageUrl, Status, Experience) VALUES 
(NEWID(), 'judge', 'judgepass1', 'judge1@vietkoiexpo.com', N'Hoàng Văn Sơn', '0812345678', N'Thái Bình', NULL, 1, 3), 
(NEWID(), 'judge', 'judgepass2', 'judge2@vietkoiexpo.com', N'Nguyễn Đức Lộc', '0823456789', N'Vĩnh Long', NULL, 1, 5), 
(NEWID(), 'judge', 'judgepass3', 'judge3@vietkoiexpo.com', N'Lê Văn An', '0834567890', N'Quảng Ngãi', NULL, 1, 4), 
(NEWID(), 'judge', 'judgepass4', 'judge4@vietkoiexpo.com', N'Trần Hoài Nam', '0845678901', N'Bắc Giang', NULL, 1, 3), 
(NEWID(), 'judge', 'judgepass5', 'judge5@vietkoiexpo.com', N'Phạm Minh Tâm', '0856789012', N'Khánh Hòa', NULL, 1, 2), 
(NEWID(), 'judge', 'judgepass6', 'judge6@vietkoiexpo.com', N'Đỗ Quốc Việt', '0867890123', N'Bến Tre', NULL, 1, 2); 
-- Members 
INSERT INTO TBLUser (UserID, RoleID, [Password], Email, FullName, Phone, Address, ImageUrl, Status, Experience) VALUES 
(NEWID(), 'member', 'memberpass1', 'member1@vietkoiexpo.com', N'Nguyễn Hữu Hùng', '0923456789', N'Hồ Chí Minh', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass2', 'member2@vietkoiexpo.com', N'Phạm Văn Tài', '0923456790', N'Hà Nội', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass3', 'member3@vietkoiexpo.com', N'Lê Thị Thanh', '0934567891', N'Bình Định', NULL, 1, NULL),
(NEWID(), 'member', 'memberpass4', 'member4@vietkoiexpo.com', N'Trần Văn Quang', '0945678902', N'Ninh Thuận', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass5', 'morgottn1@gmail.com.com', 'Morgott', '0956789013', N'Quảng Trị', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass6', 'member6@vietkoiexpo.com', N'Hoàng Văn Tú', '0967890124', N'Hải Dương', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass7', 'member7@vietkoiexpo.com', N'Đặng Quốc Anh', '0978901235', N'Lạng Sơn', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass8', 'member8@vietkoiexpo.com', N'Phan Ngọc Châu', '0989012346', N'Bắc Ninh', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass9', 'member9@vietkoiexpo.com', N'Ngô Thị Nhung', '0990123457', N'Cao Bằng', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass10', 'member10@vietkoiexpo.com', N'Trần Thị Hoa', '0912345678', N'Phú Thọ', NULL, 1, NULL),
 (NEWID(), 'member', 'memberpass11', 'member11@vietkoiexpo.com', N'Phạm Quang Bình', '0923456789', N'Thái Nguyên', NULL, 1, NULL),
 (NEWID(), 'member', 'memberpass12', 'member12@vietkoiexpo.com', N'Nguyễn Tiến Mạnh', '0934567890', N'Hưng Yên', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass13', 'member13@vietkoiexpo.com', N'Lê Văn Phúc', '0945678901', N'Hà Tĩnh', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass14', 'member14@vietkoiexpo.com', N'Trương Đình Phong', '0956789012', N'Hòa Bình', NULL, 1, NULL), 
(NEWID(), 'member', 'memberpass15', 'member15@vietkoiexpo.com', N'Vũ Văn Minh', '0967890123', N'Đồng Nai', NULL, 1, NULL);

-- Insert data into TBLVariety
INSERT INTO TBLVariety (VarietyID, VarietyName, VarietyDescription) VALUES
('kohaku', 'Kohaku', 'White with red pattern'),
('showa', 'Showa', 'Black, red, and white'),
('tancho', 'Tancho', 'White with red circle on the head'),
('asagi', 'Asagi', 'Blue-silver color with net-like patterned scales on its back'),
('koromo', 'Koromo', 'White with red pattern, the red patches have blue or purple edges'),
('sanke', 'Sanke', 'White with red and black spots');

-- Insert data into TBLKoiFish
INSERT INTO TBLKoiFish (KoiID, VarietyID, UserID, KoiName, Size, Age, ImageUrl, Status) VALUES
(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Kohaku'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Alex Johnson'), 'Sunshine', 45, 3, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Kohaku'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Alex Johnson'), 'Venom', 40, 3, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Showa'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Alex Johnson'), 'Shadow', 55, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Asagi'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Peter Parker'), 'Gaoranger', 55, 3, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Koromo'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Peter Parker'), 'Gokaiger', 40, 2, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Tancho'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Peter Parker'), 'Hurricanger', 80, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Koromo'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Peter Parker'), 'Sengoku', 77, 5, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Sanke'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Peter Parker'), 'John Wick', 70, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Showa'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Alex Johnson'), 'Noir', 50, 3, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Showa'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Alex Johnson'), 'Noir', 50, 3, NULL, 1),


(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Sanke'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Alex Johnson'), 'Spot', 50, 2, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Koromo'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Morgott '), 'Lee Sin', 40, 2, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Tancho'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Morgott '), 'Yasuo', 70, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Koromo'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Morgott '), 'Akali', 74, 5, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Sanke'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Morgott '), 'Shen', 80, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Showa'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Morgott '), 'Darius', 40, 3, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Sanke'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Morgott '), 'Iron Man', 50, 2, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Koromo'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Morgott '), 'Annie', 45, 3, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Sanke'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Morgott '), 'Ahri', 50, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Showa'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Morgott '), 'Wukong', 45, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Sanke'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Morgott '), 'Natalya', 30, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Kohaku'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Radahn'), 'Rhoto', 55, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Kohaku'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Radahn'), 'Garen', 45, 3, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Showa'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Radahn'), 'Yone', 45, 3, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Asagi'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Radahn'), 'Amily', 45, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Koromo'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Radahn'), 'Camille', 20, 3, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Tancho'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Radahn'), 'Galio', 78, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Kohaku'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Radahn'), 'Ghost', 55, 5, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Kohaku'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Radahn'), 'Lux', 44, 2, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Showa'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Radahn'), 'Kasha', 55, 4, NULL, 1),

(NEWID(), (SELECT VarietyID FROM TBLVariety WHERE VarietyName = 'Sanke'), 
(SELECT UserID FROM TBLUser WHERE FullName = 'Alex Johnson'), 'Spot_2', 45, 2, NULL, 1);




-- Insert data into TBLCategory
INSERT INTO TBLCategory (CategoryID, CategoryName, Size, Age, CategoryDescription) VALUES
('grand', 'Grand Champion', 80, 4, 'Category for All Koi Fish of size 80cm+ and 4+ Age'),
('sakura', 'Sakura Champion', 50, 3, 'Category for Kohaku, Sanke and Showa Koi Fish of size 50cm+ and 3+ Age'),
('mature', 'Mature Champion', 70, 4, 'Category for All Koi Fish of size beetween 70-80cm and 4+ Age'),
('adult', 'Adult Champion', 55, 3, 'Category for All Koi Fish of size beetween 55-70cm and 3-4 Age'),
('young', 'Young Champion', 40, 2, 'Category for All Koi Fish of size beetween 40-55cm and 2-3 Age'),
('baby', 'Baby Champion', 40, 2, 'Category for All Koi Fish of size small than 40cm and 2 Age');

-- Insert data into TBLCompetition
INSERT INTO TBLCompetition (CompID, CompName, CompDescription, Location, ImageUrl, StartDate, EndDate, Status) VALUES
(NEWID(), 'Annual Koi Show 2024', 'A major Koi competition', 'Tokyo', NULL, '2024-11-10', '2024-11-12', 1);

--Insert data into TBLCompetitionCategory
INSERT INTO TBLCompetitionCategory (CompetitionCategoryID, CompID, CategoryID) VALUES 
(NEWID(), (SELECT CompID FROM TBLCompetition WHERE CompName = 'Annual Koi Show 2024'), 'grand');
INSERT INTO TBLCompetitionCategory (CompetitionCategoryID, CompID, CategoryID) VALUES 
(NEWID(), (SELECT CompID FROM TBLCompetition WHERE CompName = 'Annual Koi Show 2024'), 'sakura');
INSERT INTO TBLCompetitionCategory (CompetitionCategoryID, CompID, CategoryID) VALUES 
(NEWID(), (SELECT CompID FROM TBLCompetition WHERE CompName = 'Annual Koi Show 2024'), 'mature');
INSERT INTO TBLCompetitionCategory (CompetitionCategoryID, CompID, CategoryID) VALUES 
(NEWID(), (SELECT CompID FROM TBLCompetition WHERE CompName = 'Annual Koi Show 2024'), 'adult');
INSERT INTO TBLCompetitionCategory (CompetitionCategoryID, CompID, CategoryID) VALUES 
(NEWID(), (SELECT CompID FROM TBLCompetition WHERE CompName = 'Annual Koi Show 2024'), 'young');
INSERT INTO TBLCompetitionCategory (CompetitionCategoryID, CompID, CategoryID) VALUES 
(NEWID(), (SELECT CompID FROM TBLCompetition WHERE CompName = 'Annual Koi Show 2024'), 'baby');
-- Insert data into TBLPrediction
-- Insert data into TBLRegistration
-- Insert data into TBLScore
-- Insert data into TBLResult
-- Insert data into TBLRank
-- Insert data into TBLTask
INSERT INTO TBLTask (TaskID, TaskName, UserID, CompID, TaskDescription, Date, Status) VALUES
(NEWID(), 'Juding Koi Fish', (SELECT UserID FROM TBLUser WHERE FullName = 'Alex Johnson'), (SELECT CompID FROM TBLCompetition WHERE CompName = 'Annual Koi Show 2024'), 'Grading all Koi fish in competition', '2024-11-30', 1);


