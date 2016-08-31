INSERT INTO [dbo].[DimOtherEvents]
    (
          [Person]
        , [Event]
        , [Date]
    )
OUTPUT Inserted.[Person], Inserted.[Event], Inserted.[Date], Inserted.[ID], Inserted.[isDeleted]
VALUES
    (
          @person
        , @event
        , @date
    )