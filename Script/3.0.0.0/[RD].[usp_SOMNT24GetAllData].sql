IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[RD].[usp_SOMNT24GetAllData]') AND type in (N'P', N'PC'))
DROP PROCEDURE [RD].[usp_SOMNT24GetAllData]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author		:	Chamika Nandathilaka
-- Create date	:	20181226
-- Description	:	Get All Data
--Version		:	3.0.0.0
-- =============================================
CREATE PROCEDURE [RD].[usp_SOMNT24GetAllData]

@BusinessUnit varchar(4)='',
@ModuleCode varchar(2)='',
@ModuleCodeDesc varchar(40)='',
@ReturnType  varchar(2)='',
@Description varchar(40)='',
@ReturnCategory varchar(2)='',
@ProcessingRequired varchar(1)='',
@CreatedBy varchar(40)='',
@LastUpdatedBy varchar(40)='',
@Status  int = 0,
@TimeStamp timestamp=0,
@ExecutionType char(2)='',
@ReturnDeductionType char(1)='',
@ValidateReturnValue char(1)='',
@FirstRow char(4)='',
@LastRow char(4)=''

AS
BEGIN
IF (@ExecutionType = 1)
	BEGIN
		SELECT Parameter AS [Module Code], ParameterDescription AS [Description] FROM XA.Parameter
		WHERE ParameterGroup = 'VRMODULE' 
		AND BusinessUnit = @BusinessUnit
	END

IF (@ExecutionType = 2)
	BEGIN
	declare @sqlString varchar(max)=''
	set @sqlString = 'SELECT * FROM ( '

	set @sqlString += 'SELECT  R.ModuleCode, R.ReturnType, R.[Description], R.ReturnCategory, R.ProcessingRequired, R.[Status], Row_Number() over (order by R.ReturnType) as RowNumber  '
	set @sqlString += 'From RD.ReturnType R '
	set @sqlString += 'INNER JOIN XA.Parameter P '
	set @sqlString += 'ON R.Businessunit = P.Businessunit '
	set @sqlString += 'AND P.ParameterGroup = ''VRMODULE'' '
	set @sqlString += 'AND R.ModuleCode = P.Parameter '
	set @sqlString += 'WHERE R.Businessunit =''' + @BusinessUnit + ''' '
	IF (@ReturnType != '')
		BEGIN
		set @sqlString += 'AND (R.ReturnType LIKE '''+'%'+''+ @ReturnType +''+'%'') '
		END
	IF (@Description != '')
		BEGIN
		set @sqlString += 'AND (R.Description LIKE '''+'%'+''+ @Description +''+'%'') '
		END
	IF (@ModuleCode != '')
		BEGIN
		set @sqlString += 'AND (R.ModuleCode LIKE '''+'%'+''+ @ModuleCode +''+'%'') '
		END
	IF (@ModuleCodeDesc != '')
		BEGIN
		set @sqlString += 'AND (P.ParameterDescription LIKE '''+'%'+''+ @ModuleCodeDesc +''+'%'') '
		END
	IF (@Status = 1)
		BEGIN
		set @sqlString += ' AND R.Status = 1 '
		END
	
	set @sqlString += ' ) AS SUB '
	set @sqlString += ' WHERE RowNumber BETWEEN ' + @FirstRow 
	set @sqlString += ' AND ' + @LastRow 
	EXEC(@sqlString)
	END

IF (@ExecutionType = 3)
	BEGIN
	declare @sqlString1 varchar(max) = ''
	set @sqlString1 = 'SELECT COUNT(*) AS TotalRows '
	set @sqlString1 += 'From RD.ReturnType R '
	set @sqlString1 += 'INNER JOIN XA.Parameter P '
	set @sqlString1 += 'ON R.Businessunit = P.Businessunit '
	set @sqlString1 += 'AND P.ParameterGroup = ''VRMODULE'' '
	set @sqlString1 += 'AND R.ModuleCode = P.Parameter '
	set @sqlString1 += 'WHERE R.Businessunit=''' + @BusinessUnit + ''' '
	IF (@ReturnType != '')
		BEGIN
		set @sqlString1 += 'AND (R.ReturnType LIKE '''+'%'+''+ @ReturnType +''+'%'') '
		END
	IF (@Description != '')
		BEGIN
		set @sqlString1 += 'AND (R.Description LIKE '''+'%'+''+ @Description +''+'%'') '
		END
	IF (@ModuleCode != '')
		BEGIN
		set @sqlString1 += 'AND (R.ModuleCode LIKE '''+'%'+''+ @ModuleCode +''+'%'') '
		END
	IF (@ModuleCodeDesc != '')
		BEGIN
		set @sqlString1 += 'AND (P.ParameterDescription LIKE '''+'%'+''+ @ModuleCodeDesc +''+'%'') '
		END
	IF (@Status = 1)
		BEGIN
		set @sqlString1 += ' AND R.Status = 1 '
		END
	EXEC(@sqlString1)
	END

IF (@ExecutionType = 4)
	BEGIN
		SELECT Parameter AS [Module Code], ParameterDescription AS [Description] 
		FROM XA.Parameter
		WHERE ParameterGroup = 'VRMODULE' 
		AND BusinessUnit = @BusinessUnit
		AND Status = 1
	END

IF (@ExecutionType = 5)
	BEGIN
		SELECT ltrim(Parameter) AS [Return Catagory], ParameterDescription AS Description
		FROM XA.Parameter
		WHERE (ParameterGroup = 'RETNCATG')
		AND (BusinessUnit = @BusinessUnit)
		AND Status = 1
	END

IF (@ExecutionType = 6)
	BEGIN
	SELECT A.ModuleCode AS ModuleCode, A.ReturnType AS ReturnType, A.ReturnCategory AS ReturnCategory,
	A.Description AS [Description], A.ProcessingRequired AS ProcessingRequired, A.Status AS [Status],A.TimeStamp AS [TimeStamp] ,
	B.ModuleCodeDesc AS ModuleCodeDesc ,C.ReturnCategoryDesc AS ReturnCategoryDesc,A.ReturnDeductionType 
	,A.ValidateReturnValue
	FROM(SELECT  ModuleCode, ReturnType, Description, ProcessingRequired, ReturnCategory, [Status],[TimeStamp], ReturnDeductionType
	,ValidateReturnValue
	FROM  RD.ReturnType
	WHERE (BusinessUnit = @BusinessUnit AND ModuleCode = @ModuleCode 
	AND ReturnType = @ReturnType  )) AS A
	LEFT OUTER JOIN  (SELECT   Parameter AS ModuleCode , ParameterDescription as ModuleCodeDesc
	FROM  XA.Parameter
	WHERE   (BusinessUnit = @BusinessUnit ) AND (ParameterGroup = 'VRMODULE')) AS B
	ON A.ModuleCode=B.ModuleCode
	LEFT OUTER JOIN
	(SELECT   Parameter AS ReturnCategory , ParameterDescription as ReturnCategoryDesc 
	FROM  XA.Parameter
	WHERE   (BusinessUnit = @BusinessUnit) AND (ParameterGroup = 'RETNCATG')) AS C
	ON A.ReturnCategory=C.ReturnCategory 

	END
	
IF(@ExecutionType = 7)
	BEGIN
	SELECT ReturnType FROM RD.CreditNoteLine WHERE BusinessUnit = @BusinessUnit AND ReturnType = @ReturnType
	END

END
GO
