UPDATE [dbo].[DimOtherEvents]
    SET 
          [Person] = @person
        , [Event] = @event
        , [Date] = @date
        , [isDeleted] = @isdeleted
WHERE ID = @id;
SELECT
    [Person]
  , [Event]
  , [Date]
  , [ID]
  , [isDeleted]
FROM [dbo].[DimOtherEvents]
WHERE ID = @id;