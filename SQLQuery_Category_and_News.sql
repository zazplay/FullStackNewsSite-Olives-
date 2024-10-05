use News_db;

INSERT INTO Categories (Id, Name) VALUES (NEWID(), 'Politics');
INSERT INTO Categories (Id, Name) VALUES (NEWID(), 'Economy');
INSERT INTO Categories (Id, Name) VALUES (NEWID(), 'Technology');
INSERT INTO Categories (Id, Name) VALUES (NEWID(), 'Sports');
INSERT INTO Categories (Id, Name) VALUES (NEWID(), 'Health');
INSERT INTO Categories (Id, Name) VALUES (NEWID(), 'Entertainment');
INSERT INTO Categories (Id, Name) VALUES (NEWID(), 'Science');
INSERT INTO Categories (Id, Name) VALUES (NEWID(), 'World');
INSERT INTO Categories (Id, Name) VALUES (NEWID(), 'Business');
INSERT INTO Categories (Id, Name) VALUES (NEWID(), 'Culture');

-- Политика
INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Elections 2024: Key Players Revealed', 
        'An in-depth analysis of the 2024 presidential election candidates.', 
        'https://cdn.cnn.com/cnnnext/dam/assets/210305183408-us-election-graphic-large-169.jpg', 
        'https://www.cnn.com/politics/elections', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Politics'));

INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Global Summit 2024: What to Expect', 
        'Leaders from around the world gather for the 2024 summit.', 
        'https://static.euronews.com/articles/stories/06/04/77/32/1000x563_cmsv2_4ef7a393-c08b-597d-8e62-81963e6a0e5e-6047732.jpg', 
        'https://www.euronews.com/my-europe', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Politics'));

-- Экономика
INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Stock Market Hits Record High', 
        'The stock market has reached unprecedented levels this week.', 
        'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iTVLXphMGulI/v1/1200x-1.jpg', 
        'https://www.bloomberg.com/markets/stocks', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Economy'));

INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Unemployment Rates Drop Worldwide', 
        'New economic policies have contributed to lower unemployment rates.', 
        'https://media.cnbc.com/jwplayer/publish/ajWrL60M/original.jpg', 
        'https://www.cnbc.com/world-economy/', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Economy'));

-- Технологии
INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'AI Breakthrough in Healthcare', 
        'New AI technologies are revolutionizing patient care.', 
        'https://www.itu.int/hub/wp-content/uploads/2022/02/AI-in-healthcare-ITU.jpg', 
        'https://www.itu.int/en/AI-in-Healthcare', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Technology'));

INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), '5G Rollout Accelerates Globally', 
        'Countries worldwide are speeding up their 5G infrastructure projects.', 
        'https://www.ericsson.com/4aaad1/assets/images/media/ericsson-5g-network-rollout.png', 
        'https://www.ericsson.com/en/5g', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Technology'));

-- Спорт
INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Olympics 2024: The Most Anticipated Events', 
        'A preview of the key events in the upcoming 2024 Olympics.', 
        'https://olympics.com/images/static/assets/static/og/default/social/og-default-image.jpg', 
        'https://olympics.com/en/olympic-games/paris-2024', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Sports'));

INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'World Cup Qualifiers: Top Teams Advance', 
        'Several teams secure their spots for the 2024 FIFA World Cup.', 
        'https://cloudinary.fifa.com/api/v1/picture/flags-sq-4/arg', 
        'https://www.fifa.com/worldcup/', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Sports'));

-- Здоровье
INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Vaccine Development for New Virus Strains', 
        'Scientists are racing to develop vaccines for newly discovered viruses.', 
        'https://www.who.int/images/default-source/departments/immunization/celebrating-vaccines.jpg', 
        'https://www.who.int/health-topics/vaccines-and-immunization', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Health'));

INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Mental Health Awareness Month: Key Takeaways', 
        'Important lessons from this year’s Mental Health Awareness Month.', 
        'https://cdn.britannica.com/15/215015-050-55D295E3/Mental-Health-Awareness-words.jpg', 
        'https://www.mentalhealth.gov', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Health'));

-- Развлечения
INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Top Movies to Watch This Year', 
        'A roundup of the best movies to watch in 2024.', 
        'https://variety.com/wp-content/uploads/2023/06/movies-summer-2023.jpg', 
        'https://variety.com/t/movies/', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Entertainment'));

INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Music Festivals Making a Comeback', 
        '2024 is set to be a huge year for music festivals globally.', 
        'https://upload.wikimedia.org/wikipedia/commons/f/ff/Coachella_2015.jpg', 
        'https://www.billboard.com/music/music-festivals/', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Entertainment'));

-- Наука
INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Mars Mission: New Discoveries', 
        'The latest discoveries from the Mars exploration mission.', 
        'https://mars.nasa.gov/system/downloadable_items/45371_PIA24726_960w.jpg', 
        'https://mars.nasa.gov/news/', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Science'));

INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Breakthrough in Quantum Computing', 
        'Scientists achieve a major breakthrough in quantum computing.', 
        'https://cdn.wionews.com/sites/default/files/styles/story_page/public/2023/10/01/382172-quantum-111122.jpg', 
        'https://www.wionews.com/science', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Science'));

-- Мир
INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Peace Talks Resume in Conflict Zones', 
        'International leaders push for peace in ongoing conflict zones.', 
        'https://upload.wikimedia.org/wikipedia/commons/e/e8/UN_General_Assembly_2023.jpg', 
        'https://www.un.org/peacekeeping/en', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'World'));

INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Natural Disasters Impact Thousands', 
        'Recent natural disasters have left thousands displaced.', 
        'https://media.nbcconnecticut.com/2023/01/NaturalDisasterClimate.jpg', 
        'https://www.redcross.org/about-us/news-and-events/news/2024-natural-disasters', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'World'));

-- Бизнес
INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Startup Boom in 2024: What’s Driving It?', 
        'An analysis of the rise in startups across industries in 2024.', 
        'https://cdn.techinasia.com/wp-content/uploads/2024/01/startup-ecosystem-2024.jpg', 
        'https://www.techinasia.com/startups', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Business'));

INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Corporate Mergers Expected in Tech Sector', 
        'The tech industry sees an increase in mergers and acquisitions.', 
        'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iRODPUzEgCeA/v1/1200x-1.jpg', 
        'https://www.bloomberg.com/mergers-and-acquisitions', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Business'));

-- Культура
INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'New Art Exhibit Opens in Paris', 
        'A new contemporary art exhibit has opened in Paris to critical acclaim.', 
        'https://upload.wikimedia.org/wikipedia/commons/3/3a/Art_Paris_Art_Fair_2023.jpg', 
        'https://www.artparis.com/en', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Culture'));

INSERT INTO News (Id, Title, Description, ImgSrc, Source, CreatedAt, CategoryId) 
VALUES (NEWID(), 'Cultural Preservation Efforts in 2024', 
        'Global efforts to preserve cultural heritage are increasing.', 
        'https://unesdoc.unesco.org/images/0025/002586/258659e.jpg', 
        'https://www.unesco.org/en/culture', 
        GETDATE(), 
        (SELECT Id FROM Categories WHERE Name = 'Culture'));

