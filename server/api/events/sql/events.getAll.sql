SELECT
    [Person]
  , [Event]
  , [Date]
  , [ID]
  , [isDeleted]
FROM [dbo].[DimOtherEvents]
WHERE isDeleted = 0