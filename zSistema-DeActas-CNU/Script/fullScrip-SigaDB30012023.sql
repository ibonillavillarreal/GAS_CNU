
-- Se procede a crear Scripts de la base de datos ( etapa analisis y diseño de la estructura base)
/*
	create database [SIGA-CNU] on primary  
*/

-- Enfoque/Seleccion de la bases de datos 
USE [SIGA-CNU]
GO
----------------
/*
* Creacion de los esquemas de trabajo 
* */
/****** Object:  Schema [Auditorias]    Script Date: 30/01/2023 15:00:05 ******/
CREATE SCHEMA [Auditorias]
GO
/****** Object:  Schema [Catalogos]    Script Date: 30/01/2023 15:00:05 ******/
CREATE SCHEMA [Catalogos]
GO
/****** Object:  Schema [Estadisticas]    Script Date: 30/01/2023 15:00:05 ******/
CREATE SCHEMA [Estadisticas]
GO
/****** Object:  Schema [Legales]    Script Date: 30/01/2023 15:00:05 ******/
CREATE SCHEMA [Legales]
GO
/****** Object:  Schema [RRHH]    Script Date: 30/01/2023 15:00:05 ******/
CREATE SCHEMA [RRHH]
GO
/****** Object:  Schema [Seguridad]    Script Date: 30/01/2023 15:00:05 ******/
CREATE SCHEMA [Seguridad]
GO
---------------------------------------------------------------------------------------
-- Creacion de los objetos Tablas y sus relaciones 

/****** Object:  Table [Catalogos].[CatalogoTipo]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Catalogos].[CatalogoTipo](
	[CodCatalogoTipo] [int] IDENTITY(1,1) NOT NULL,
	[CodDocTipo] [int] NOT NULL,
	[Nombre] [nvarchar](max) NULL,
	[Descripcion] [nvarchar](max) NULL,
 CONSTRAINT [PK_CatalogoTipo] PRIMARY KEY CLUSTERED 
(
	[CodCatalogoTipo] ASC,
	[CodDocTipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Catalogos].[CodigoTipo]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Catalogos].[CodigoTipo](
	[CodTipo] [int] IDENTITY(0,1) NOT NULL,
	[CodCatalogoTipo] [int] NULL,
	[CodDocTipo] [int] NULL,
	[Tipo] [nvarchar](max) NULL,
	[Descripcion] [nvarchar](max) NULL,
 CONSTRAINT [PK_CodigoTipo] PRIMARY KEY CLUSTERED 
(
	[CodTipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Catalogos].[DocumentoTipo]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Catalogos].[DocumentoTipo](
	[CodDocTipo] [int] IDENTITY(1,1) NOT NULL,
	[ObjetoNombre] [nvarchar](max) NULL,
	[Descripcion] [nvarchar](max) NULL,
 CONSTRAINT [PK_DocTipo] PRIMARY KEY CLUSTERED 
(
	[CodDocTipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Estadisticas].[Cumplimiento]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Estadisticas].[Cumplimiento](
	[CodCumplimiento] [int] NOT NULL,
	[CodActa] [int] NOT NULL,
	[CodFuncionario] [int] NULL,
	[IdCumplimiento] [nvarchar](max) NULL,
	[FechaCumplimiento] [date] NULL,
	[Observacion] [nvarchar](max) NULL,
	[EstadoCumplimiento] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Cumplimiento] PRIMARY KEY CLUSTERED 
(
	[CodCumplimiento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [CodActaUnica] UNIQUE NONCLUSTERED 
(
	[CodActa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Estadisticas].[CumplimientoDetalle]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Estadisticas].[CumplimientoDetalle](
	[CodCumplimientoDetalle] [int] NOT NULL,
	[CodCumplimiento] [int] NOT NULL,
	[CodAcuerdo] [int] NULL,
	[CodAgenda] [int] NULL,
	[CodResolucion] [int] NULL,
	[Observacion] [nvarchar](max) NULL,
	[EstadoDelAcuerdo] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_CumplimientoDetalle_1] PRIMARY KEY CLUSTERED 
(
	[CodCumplimientoDetalle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Legales].[Actas]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[Actas](
	[CodActas] [int] IDENTITY(1,1) NOT NULL,
	[CodAgenda] [int] NULL,
	[CodSesion] [int] NULL,
	[IdActaMembrete] [nvarchar](max) NULL,
	[ActaDescripcion] [nvarchar](max) NULL,
	[EstadoActaX100] [float] NULL,
	[Observacion] [nvarchar](max) NULL,
	[EstadoActa] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Actas] PRIMARY KEY CLUSTERED 
(
	[CodActas] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Legales].[Acuerdos]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[Acuerdos](
	[CodAcuerdo] [int] IDENTITY(1,1) NOT NULL,
	[CodActa] [int] NULL,
	[CodAgendaDetalles] [int] NULL,
	[IdAcuerdos] [int] NULL,
	[Acuerdos] [nvarchar](max) NULL,
	[EstadoAcuerdo] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Acuerdos] PRIMARY KEY CLUSTERED 
(
	[CodAcuerdo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Legales].[AgendaDetalles]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[AgendaDetalles](
	[CodAgendaDetalles] [int] IDENTITY(1,1) NOT NULL,
	[CodAgenda] [int] NULL,
	[PuntosAgenda] [nvarchar](max) NULL,
	[EstadoPunto] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_AgendaDetalles] PRIMARY KEY CLUSTERED 
(
	[CodAgendaDetalles] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Legales].[Agendas]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[Agendas](
	[CodAgenda] [int] IDENTITY(1,1) NOT NULL,
	[IdAgenda] [nvarchar](max) NULL,
	[TemaDeAgenda] [nvarchar](max) NULL,
	[EstadoAgenda] [int] NULL,
	[FechaRegristro] [date] NULL,
	[EstadoRegsistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Agendas] PRIMARY KEY CLUSTERED 
(
	[CodAgenda] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Legales].[CuorumRepresentantes]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[CuorumRepresentantes](
	[CodCuorum] [int] IDENTITY(1,1) NOT NULL,
	[CodActas] [int] NULL,
	[CodMiembro] [int] NULL,
	[Descripcion] [nvarchar](max) NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_CuorumRepresentantes] PRIMARY KEY CLUSTERED 
(
	[CodCuorum] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Legales].[Resoluciones]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Legales].[Resoluciones](
	[CodResolucion] [int] IDENTITY(1,1) NOT NULL,
	[CodAcuerdo] [int] NULL,
	[IdReSolucion] [nvarchar](max) NULL,
	[ReSolucion] [nvarchar](max) NULL,
	[EstadoResolucion] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Resoluciones] PRIMARY KEY CLUSTERED 
(
	[CodResolucion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [CodAcuerdoUnico] UNIQUE NONCLUSTERED 
(
	[CodAcuerdo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [RRHH].[Miembros]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [RRHH].[Miembros](
	[CodMiembro] [int] NOT NULL,
	[CodCargo] [int] NULL,
	[CodClaustro] [int] NULL,
	[CodGradoAcademico] [int] NULL,
	[IdMiembro] [nvarchar](max) NULL,
	[pNombre] [nvarchar](max) NULL,
	[sNombre] [nvarchar](max) NULL,
	[pApellido] [nvarchar](max) NULL,
	[sApellido] [nvarchar](max) NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdUsuario] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Miembros_1] PRIMARY KEY CLUSTERED 
(
	[CodMiembro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Seguridad].[Roles]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Seguridad].[Roles](
	[CodRol] [int] IDENTITY(1,1) NOT NULL,
	[idUsuario] [int] NULL,
	[NombreRol] [nvarchar](max) NULL,
	[EstadoRol] [int] NULL,
	[FechaRegistro] [date] NULL,
	[IdGrandUser] [nvarchar](max) NULL,
	[Operacion] [nvarchar](max) NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[CodRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/****** Object:  Table [Seguridad].[Usuario]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Seguridad].[Usuario](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[IdMiembro] [int] NULL,
	[Usuario] [nvarchar](max) NULL,
	[Contrasenia] [nvarchar](max) NULL,
	[EstadoUsuario] [int] NULL,
	[FechaRegistro] [date] NULL,
	[EstadoRegistro] [int] NULL,
	[IdGrandUser] [int] NULL,
	[Operacion] [int] NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [RRHH].[Miembros] ADD  CONSTRAINT [DF_Miembros_CodMiembro]  DEFAULT ((0)) FOR [CodMiembro]
GO
ALTER TABLE [Catalogos].[CatalogoTipo]  WITH CHECK ADD  CONSTRAINT [FK_CatalogoTipo_DocumentoTipo] FOREIGN KEY([CodDocTipo])
REFERENCES [Catalogos].[DocumentoTipo] ([CodDocTipo])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Catalogos].[CatalogoTipo] CHECK CONSTRAINT [FK_CatalogoTipo_DocumentoTipo]
GO
ALTER TABLE [Catalogos].[CodigoTipo]  WITH CHECK ADD  CONSTRAINT [FK_CodigoTipo_CatalogoTipo] FOREIGN KEY([CodCatalogoTipo], [CodDocTipo])
REFERENCES [Catalogos].[CatalogoTipo] ([CodCatalogoTipo], [CodDocTipo])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Catalogos].[CodigoTipo] CHECK CONSTRAINT [FK_CodigoTipo_CatalogoTipo]
GO
ALTER TABLE [Estadisticas].[Cumplimiento]  WITH CHECK ADD  CONSTRAINT [FK_Cumplimiento_Actas] FOREIGN KEY([CodActa])
REFERENCES [Legales].[Actas] ([CodActas])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Estadisticas].[Cumplimiento] CHECK CONSTRAINT [FK_Cumplimiento_Actas]
GO
ALTER TABLE [Estadisticas].[CumplimientoDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CumplimientoDetalle_Cumplimiento] FOREIGN KEY([CodCumplimiento])
REFERENCES [Estadisticas].[Cumplimiento] ([CodCumplimiento])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Estadisticas].[CumplimientoDetalle] CHECK CONSTRAINT [FK_CumplimientoDetalle_Cumplimiento]
GO
ALTER TABLE [Legales].[Acuerdos]  WITH CHECK ADD  CONSTRAINT [FK_Acuerdos_Actas] FOREIGN KEY([CodActa])
REFERENCES [Legales].[Actas] ([CodActas])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[Acuerdos] CHECK CONSTRAINT [FK_Acuerdos_Actas]
GO
ALTER TABLE [Legales].[Acuerdos]  WITH CHECK ADD  CONSTRAINT [FK_Acuerdos_AgendaDetalles] FOREIGN KEY([CodAgendaDetalles])
REFERENCES [Legales].[AgendaDetalles] ([CodAgendaDetalles])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[Acuerdos] CHECK CONSTRAINT [FK_Acuerdos_AgendaDetalles]
GO
ALTER TABLE [Legales].[AgendaDetalles]  WITH CHECK ADD  CONSTRAINT [FK_AgendaDetalles_Agendas] FOREIGN KEY([CodAgenda])
REFERENCES [Legales].[Agendas] ([CodAgenda])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[AgendaDetalles] CHECK CONSTRAINT [FK_AgendaDetalles_Agendas]
GO
ALTER TABLE [Legales].[CuorumRepresentantes]  WITH CHECK ADD  CONSTRAINT [FK_CuorumRepresentantes_Actas] FOREIGN KEY([CodActas])
REFERENCES [Legales].[Actas] ([CodActas])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[CuorumRepresentantes] CHECK CONSTRAINT [FK_CuorumRepresentantes_Actas]
GO
ALTER TABLE [Legales].[CuorumRepresentantes]  WITH CHECK ADD  CONSTRAINT [FK_CuorumRepresentantes_Miembros] FOREIGN KEY([CodMiembro])
REFERENCES [RRHH].[Miembros] ([CodMiembro])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[CuorumRepresentantes] CHECK CONSTRAINT [FK_CuorumRepresentantes_Miembros]
GO
ALTER TABLE [Legales].[Resoluciones]  WITH CHECK ADD  CONSTRAINT [FK_Resoluciones_Acuerdos] FOREIGN KEY([CodAcuerdo])
REFERENCES [Legales].[Acuerdos] ([CodAcuerdo])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Legales].[Resoluciones] CHECK CONSTRAINT [FK_Resoluciones_Acuerdos]
GO
ALTER TABLE [Seguridad].[Roles]  WITH CHECK ADD  CONSTRAINT [FK_Roles_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [Seguridad].[Usuario] ([IdUsuario])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [Seguridad].[Roles] CHECK CONSTRAINT [FK_Roles_Usuario]
GO

-----------------------------------------------------------------------------------------------------------------
/*
* 
* 
* Crreacion de los objetos procedimienos almacenados 
* 
* 
* */
/****** Object:  StoredProcedure [Catalogos].[p_DeleteCatalogoTipo]    Script Date: 30/01/2023 15:00:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Catalogos].[p_DeleteCatalogoTipo]
/***********************************************************
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Catalogos].[CatalogoTipo]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCatalogoTipo int,
    @CodDocTipo int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Catalogos].[CatalogoTipo]
    WHERE  CodCatalogoTipo = @CodCatalogoTipo
          AND CodDocTipo = @CodDocTipo

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO

/****** Object:  StoredProcedure [Catalogos].[p_DeleteCodigoTipo]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Catalogos].[p_DeleteCodigoTipo]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Catalogos].[CodigoTipo]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodTipo int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Catalogos].[CodigoTipo]
    WHERE  CodTipo = @CodTipo

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO

/****** Object:  StoredProcedure [Catalogos].[p_DeleteDocumentoTipo]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Catalogos].[p_DeleteDocumentoTipo]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Catalogos].[DocumentoTipo]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodDocTipo int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Catalogos].[DocumentoTipo]
    WHERE  CodDocTipo = @CodDocTipo

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Catalogos].[p_GetCatalogoTipo]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Catalogos].[p_GetCatalogoTipo]
* Code generated by SoftTree SQL Assistant © v11.0.35
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Catalogos].[CatalogoTipo]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCatalogoTipo int,
    @CodDocTipo int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodCatalogoTipo,
           CodDocTipo,
           Nombre,
           Descripcion 
    FROM [Catalogos].[CatalogoTipo]
    WHERE  CodCatalogoTipo = @CodCatalogoTipo
          AND CodDocTipo = @CodDocTipo

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO
/****** Object:  StoredProcedure [Catalogos].[p_GetCodigoTipo]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Catalogos].[p_GetCodigoTipo]
/***********************************************************
* Code generated by SoftTree SQL Assistant © v11.0.35
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Catalogos].[CodigoTipo]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodTipo int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodTipo,
           CodCatalogoTipo,
           CodDocTipo,
           Tipo,
           Descripcion 
    FROM [Catalogos].[CodigoTipo]
    WHERE  CodTipo = @CodTipo

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO
/****** Object:  StoredProcedure [Catalogos].[p_GetDocumentoTipo]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Catalogos].[p_GetDocumentoTipo]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Catalogos].[DocumentoTipo]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodDocTipo int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodDocTipo,
           ObjetoNombre,
           Descripcion 
    FROM [Catalogos].[DocumentoTipo]
    WHERE  CodDocTipo = @CodDocTipo

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO
/****** Object:  StoredProcedure [Catalogos].[p_SaveCatalogoTipo]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Catalogos].[p_SaveCatalogoTipo]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Catalogos].[CatalogoTipo]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCatalogoTipo int = NULL,
    @CodDocTipo int = NULL,
    @Nombre nvarchar(max) = NULL,
    @Descripcion nvarchar(max) = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Catalogos].[CatalogoTipo]
         WHERE  CodCatalogoTipo = @CodCatalogoTipo
               AND CodDocTipo = @CodDocTipo
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Catalogos].[CatalogoTipo]
         (
             CodDocTipo,
             Nombre,
             Descripcion
         )
         VALUES 
         (
             @CodDocTipo,
             @Nombre,
             @Descripcion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Catalogos].[CatalogoTipo]
         SET CodDocTipo = @CodDocTipo,
             Nombre = @Nombre,
             Descripcion = @Descripcion
         WHERE  CodCatalogoTipo = @CodCatalogoTipo
               AND CodDocTipo = @CodDocTipo
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Catalogos].[p_SaveCodigoTipo]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Catalogos].[p_SaveCodigoTipo]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Catalogos].[CodigoTipo]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodTipo int = NULL,
    @CodCatalogoTipo int = NULL,
    @CodDocTipo int = NULL,
    @Tipo nvarchar(max) = NULL,
    @Descripcion nvarchar(max) = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Catalogos].[CodigoTipo]
         WHERE  CodTipo = @CodTipo
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Catalogos].[CodigoTipo]
         (
             CodCatalogoTipo,
             CodDocTipo,
             Tipo,
             Descripcion
         )
         VALUES 
         (
             @CodCatalogoTipo,
             @CodDocTipo,
             @Tipo,
             @Descripcion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Catalogos].[CodigoTipo]
         SET CodCatalogoTipo = @CodCatalogoTipo,
             CodDocTipo = @CodDocTipo,
             Tipo = @Tipo,
             Descripcion = @Descripcion
         WHERE  CodTipo = @CodTipo
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Catalogos].[p_SaveDocumentoTipo]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Catalogos].[p_SaveDocumentoTipo]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Catalogos].[DocumentoTipo]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodDocTipo int = NULL,
    @ObjetoNombre nvarchar(max) = NULL,
    @Descripcion nvarchar(max) = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Catalogos].[DocumentoTipo]
         WHERE  CodDocTipo = @CodDocTipo
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Catalogos].[DocumentoTipo]
         (
             ObjetoNombre,
             Descripcion
         )
         VALUES 
         (
             @ObjetoNombre,
             @Descripcion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Catalogos].[DocumentoTipo]
         SET ObjetoNombre = @ObjetoNombre,
             Descripcion = @Descripcion
         WHERE  CodDocTipo = @CodDocTipo
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Estadisticas].[p_DeleteCumplimiento]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Estadisticas].[p_DeleteCumplimiento]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Estadisticas].[Cumplimiento]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCumplimiento int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Estadisticas].[Cumplimiento]
    WHERE  CodCumplimiento = @CodCumplimiento

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Estadisticas].[p_DeleteCumplimientoDetalle]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Estadisticas].[p_DeleteCumplimientoDetalle]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Estadisticas].[CumplimientoDetalle]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCumplimientoDetalle int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Estadisticas].[CumplimientoDetalle]
    WHERE  CodCumplimientoDetalle = @CodCumplimientoDetalle

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Estadisticas].[p_GetCumplimiento]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Estadisticas].[p_GetCumplimiento]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Estadisticas].[Cumplimiento]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCumplimiento int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodCumplimiento,
           CodActa,
           CodFuncionario,
           IdCumplimiento,
           FechaCumplimiento,
           Observacion,
           EstadoCumplimiento,
           FechaRegistro,
           EstadoRegistro,
           IdUsuario,
           Operacion 
    FROM [Estadisticas].[Cumplimiento]
    WHERE  CodCumplimiento = @CodCumplimiento

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [Estadisticas].[p_GetCumplimientoDetalle]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Estadisticas].[p_GetCumplimientoDetalle]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Estadisticas].[CumplimientoDetalle]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCumplimientoDetalle int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodCumplimientoDetalle,
           CodCumplimiento,
           CodAcuerdo,
           CodAgenda,
           CodResolucion,
           Observacion,
           EstadoDelAcuerdo,
           FechaRegistro,
           EstadoRegistro,
           IdUsuario,
           Operacion 
    FROM [Estadisticas].[CumplimientoDetalle]
    WHERE  CodCumplimientoDetalle = @CodCumplimientoDetalle

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [Estadisticas].[p_SaveCumplimiento]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Estadisticas].[p_SaveCumplimiento]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Estadisticas].[Cumplimiento]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCumplimiento int = NULL,
    @CodActa int = NULL,
    @CodFuncionario int = NULL,
    @IdCumplimiento nvarchar(max) = NULL,
    @FechaCumplimiento date = NULL,
    @Observacion nvarchar(max) = NULL,
    @EstadoCumplimiento int = NULL,
    @FechaRegistro date = NULL,
    @EstadoRegistro int = NULL,
    @IdUsuario int = NULL,
    @Operacion int = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Estadisticas].[Cumplimiento]
         WHERE  CodCumplimiento = @CodCumplimiento
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Estadisticas].[Cumplimiento]
         (
             CodCumplimiento,
             CodActa,
             CodFuncionario,
             IdCumplimiento,
             FechaCumplimiento,
             Observacion,
             EstadoCumplimiento,
             FechaRegistro,
             EstadoRegistro,
             IdUsuario,
             Operacion
         )
         VALUES 
         (
             @CodCumplimiento,
             @CodActa,
             @CodFuncionario,
             @IdCumplimiento,
             @FechaCumplimiento,
             @Observacion,
             @EstadoCumplimiento,
             @FechaRegistro,
             @EstadoRegistro,
             @IdUsuario,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Estadisticas].[Cumplimiento]
         SET CodCumplimiento = @CodCumplimiento,
             CodActa = @CodActa,
             CodFuncionario = @CodFuncionario,
             IdCumplimiento = @IdCumplimiento,
             FechaCumplimiento = @FechaCumplimiento,
             Observacion = @Observacion,
             EstadoCumplimiento = @EstadoCumplimiento,
             FechaRegistro = @FechaRegistro,
             EstadoRegistro = @EstadoRegistro,
             IdUsuario = @IdUsuario,
             Operacion = @Operacion
         WHERE  CodCumplimiento = @CodCumplimiento
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Estadisticas].[p_SaveCumplimientoDetalle]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Estadisticas].[p_SaveCumplimientoDetalle]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Estadisticas].[CumplimientoDetalle]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCumplimientoDetalle int = NULL,
    @CodCumplimiento int = NULL,
    @CodAcuerdo int = NULL,
    @CodAgenda int = NULL,
    @CodResolucion int = NULL,
    @Observacion nvarchar(max) = NULL,
    @EstadoDelAcuerdo int = NULL,
    @FechaRegistro date = NULL,
    @EstadoRegistro int = NULL,
    @IdUsuario int = NULL,
    @Operacion int = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Estadisticas].[CumplimientoDetalle]
         WHERE  CodCumplimientoDetalle = @CodCumplimientoDetalle
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Estadisticas].[CumplimientoDetalle]
         (
             CodCumplimientoDetalle,
             CodCumplimiento,
             CodAcuerdo,
             CodAgenda,
             CodResolucion,
             Observacion,
             EstadoDelAcuerdo,
             FechaRegistro,
             EstadoRegistro,
             IdUsuario,
             Operacion
         )
         VALUES 
         (
             @CodCumplimientoDetalle,
             @CodCumplimiento,
             @CodAcuerdo,
             @CodAgenda,
             @CodResolucion,
             @Observacion,
             @EstadoDelAcuerdo,
             @FechaRegistro,
             @EstadoRegistro,
             @IdUsuario,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Estadisticas].[CumplimientoDetalle]
         SET CodCumplimientoDetalle = @CodCumplimientoDetalle,
             CodCumplimiento = @CodCumplimiento,
             CodAcuerdo = @CodAcuerdo,
             CodAgenda = @CodAgenda,
             CodResolucion = @CodResolucion,
             Observacion = @Observacion,
             EstadoDelAcuerdo = @EstadoDelAcuerdo,
             FechaRegistro = @FechaRegistro,
             EstadoRegistro = @EstadoRegistro,
             IdUsuario = @IdUsuario,
             Operacion = @Operacion
         WHERE  CodCumplimientoDetalle = @CodCumplimientoDetalle
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_DeleteActas]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_DeleteActas]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Legales].[Actas]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodActas int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Legales].[Actas]
    WHERE  CodActas = @CodActas

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_DeleteAcuerdos]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_DeleteAcuerdos]
/***********************************************************
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Legales].[Acuerdos]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodAcuerdo int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Legales].[Acuerdos]
    WHERE  CodAcuerdo = @CodAcuerdo

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_DeleteAgendaDetalles]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_DeleteAgendaDetalles]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Legales].[AgendaDetalles]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodAgendaDetalles int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Legales].[AgendaDetalles]
    WHERE  CodAgendaDetalles = @CodAgendaDetalles

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_DeleteAgendas]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_DeleteAgendas]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Legales].[Agendas]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodAgenda int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Legales].[Agendas]
    WHERE  CodAgenda = @CodAgenda

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_DeleteCuorumRepresentantes]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_DeleteCuorumRepresentantes]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Legales].[CuorumRepresentantes]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCuorum int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Legales].[CuorumRepresentantes]
    WHERE  CodCuorum = @CodCuorum

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_DeleteResoluciones]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_DeleteResoluciones]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Legales].[Resoluciones]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodResolucion int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Legales].[Resoluciones]
    WHERE  CodResolucion = @CodResolucion

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_GetActas]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_GetActas]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Legales].[Actas]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodActas int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodActas,
           CodAgenda,
           CodSesion,
           IdActaMembrete,
           ActaDescripcion,
           EstadoActaX100,
           Observacion,
           EstadoActa,
           FechaRegistro,
           EstadoRegistro,
           IdUsuario,
           Operacion 
    FROM [Legales].[Actas]
    WHERE  CodActas = @CodActas

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_GetAcuerdos]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_GetAcuerdos]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Legales].[Acuerdos]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodAcuerdo int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodAcuerdo,
           CodActa,
           CodAgendaDetalles,
           IdAcuerdos,
           Acuerdos,
           EstadoAcuerdo,
           FechaRegistro,
           EstadoRegistro,
           IdUsuario,
           Operacion 
    FROM [Legales].[Acuerdos]
    WHERE  CodAcuerdo = @CodAcuerdo

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_GetAgendaDetalles]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_GetAgendaDetalles]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Legales].[AgendaDetalles]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodAgendaDetalles int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodAgendaDetalles,
           CodAgenda,
           PuntosAgenda,
           EstadoPunto,
           FechaRegistro,
           EstadoRegistro,
           IdUsuario,
           Operacion 
    FROM [Legales].[AgendaDetalles]
    WHERE  CodAgendaDetalles = @CodAgendaDetalles

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_GetAgendas]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_GetAgendas]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Legales].[Agendas]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodAgenda int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodAgenda,
           IdAgenda,
           TemaDeAgenda,
           EstadoAgenda,
           FechaRegristro,
           EstadoRegsistro,
           IdUsuario,
           Operacion 
    FROM [Legales].[Agendas]
    WHERE  CodAgenda = @CodAgenda

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_GetCuorumRepresentantes]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_GetCuorumRepresentantes]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Legales].[CuorumRepresentantes]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCuorum int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodCuorum,
           CodActas,
           CodMiembro,
           Descripcion,
           FechaRegistro,
           EstadoRegistro,
           IdUsuario,
           Operacion 
    FROM [Legales].[CuorumRepresentantes]
    WHERE  CodCuorum = @CodCuorum

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_GetResoluciones]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_GetResoluciones]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Legales].[Resoluciones]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodResolucion int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodResolucion,
           CodAcuerdo,
           IdReSolucion,
           ReSolucion,
           EstadoResolucion,
           FechaRegistro,
           EstadoRegistro,
           IdUsuario,
           Operacion 
    FROM [Legales].[Resoluciones]
    WHERE  CodResolucion = @CodResolucion

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_SaveActas]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_SaveActas]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Legales].[Actas]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodActas int = NULL,
    @CodAgenda int = NULL,
    @CodSesion int = NULL,
    @IdActaMembrete nvarchar(max) = NULL,
    @ActaDescripcion nvarchar(max) = NULL,
    @EstadoActaX100 float = NULL,
    @Observacion nvarchar(max) = NULL,
    @EstadoActa int = NULL,
    @FechaRegistro date = NULL,
    @EstadoRegistro int = NULL,
    @IdUsuario int = NULL,
    @Operacion int = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Legales].[Actas]
         WHERE  CodActas = @CodActas
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Legales].[Actas]
         (
             CodAgenda,
             CodSesion,
             IdActaMembrete,
             ActaDescripcion,
             EstadoActaX100,
             Observacion,
             EstadoActa,
             FechaRegistro,
             EstadoRegistro,
             IdUsuario,
             Operacion
         )
         VALUES 
         (
             @CodAgenda,
             @CodSesion,
             @IdActaMembrete,
             @ActaDescripcion,
             @EstadoActaX100,
             @Observacion,
             @EstadoActa,
             @FechaRegistro,
             @EstadoRegistro,
             @IdUsuario,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Legales].[Actas]
         SET CodAgenda = @CodAgenda,
             CodSesion = @CodSesion,
             IdActaMembrete = @IdActaMembrete,
             ActaDescripcion = @ActaDescripcion,
             EstadoActaX100 = @EstadoActaX100,
             Observacion = @Observacion,
             EstadoActa = @EstadoActa,
             FechaRegistro = @FechaRegistro,
             EstadoRegistro = @EstadoRegistro,
             IdUsuario = @IdUsuario,
             Operacion = @Operacion
         WHERE  CodActas = @CodActas
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_SaveAcuerdos]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_SaveAcuerdos]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Legales].[Acuerdos]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodAcuerdo int = NULL,
    @CodActa int = NULL,
    @CodAgendaDetalles int = NULL,
    @IdAcuerdos int = NULL,
    @Acuerdos nvarchar(max) = NULL,
    @EstadoAcuerdo int = NULL,
    @FechaRegistro date = NULL,
    @EstadoRegistro int = NULL,
    @IdUsuario int = NULL,
    @Operacion int = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Legales].[Acuerdos]
         WHERE  CodAcuerdo = @CodAcuerdo
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Legales].[Acuerdos]
         (
             CodActa,
             CodAgendaDetalles,
             IdAcuerdos,
             Acuerdos,
             EstadoAcuerdo,
             FechaRegistro,
             EstadoRegistro,
             IdUsuario,
             Operacion
         )
         VALUES 
         (
             @CodActa,
             @CodAgendaDetalles,
             @IdAcuerdos,
             @Acuerdos,
             @EstadoAcuerdo,
             @FechaRegistro,
             @EstadoRegistro,
             @IdUsuario,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Legales].[Acuerdos]
         SET CodActa = @CodActa,
             CodAgendaDetalles = @CodAgendaDetalles,
             IdAcuerdos = @IdAcuerdos,
             Acuerdos = @Acuerdos,
             EstadoAcuerdo = @EstadoAcuerdo,
             FechaRegistro = @FechaRegistro,
             EstadoRegistro = @EstadoRegistro,
             IdUsuario = @IdUsuario,
             Operacion = @Operacion
         WHERE  CodAcuerdo = @CodAcuerdo
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_SaveAgendaDetalles]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_SaveAgendaDetalles]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Legales].[AgendaDetalles]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodAgendaDetalles int = NULL,
    @CodAgenda int = NULL,
    @PuntosAgenda nvarchar(max) = NULL,
    @EstadoPunto int = NULL,
    @FechaRegistro date = NULL,
    @EstadoRegistro int = NULL,
    @IdUsuario int = NULL,
    @Operacion int = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Legales].[AgendaDetalles]
         WHERE  CodAgendaDetalles = @CodAgendaDetalles
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Legales].[AgendaDetalles]
         (
             CodAgenda,
             PuntosAgenda,
             EstadoPunto,
             FechaRegistro,
             EstadoRegistro,
             IdUsuario,
             Operacion
         )
         VALUES 
         (
             @CodAgenda,
             @PuntosAgenda,
             @EstadoPunto,
             @FechaRegistro,
             @EstadoRegistro,
             @IdUsuario,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Legales].[AgendaDetalles]
         SET CodAgenda = @CodAgenda,
             PuntosAgenda = @PuntosAgenda,
             EstadoPunto = @EstadoPunto,
             FechaRegistro = @FechaRegistro,
             EstadoRegistro = @EstadoRegistro,
             IdUsuario = @IdUsuario,
             Operacion = @Operacion
         WHERE  CodAgendaDetalles = @CodAgendaDetalles
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_SaveAgendas]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_SaveAgendas]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Legales].[Agendas]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodAgenda int = NULL,
    @IdAgenda nvarchar(max) = NULL,
    @TemaDeAgenda nvarchar(max) = NULL,
    @EstadoAgenda int = NULL,
    @FechaRegristro date = NULL,
    @EstadoRegsistro int = NULL,
    @IdUsuario int = NULL,
    @Operacion int = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Legales].[Agendas]
         WHERE  CodAgenda = @CodAgenda
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Legales].[Agendas]
         (
             IdAgenda,
             TemaDeAgenda,
             EstadoAgenda,
             FechaRegristro,
             EstadoRegsistro,
             IdUsuario,
             Operacion
         )
         VALUES 
         (
             @IdAgenda,
             @TemaDeAgenda,
             @EstadoAgenda,
             @FechaRegristro,
             @EstadoRegsistro,
             @IdUsuario,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Legales].[Agendas]
         SET IdAgenda = @IdAgenda,
             TemaDeAgenda = @TemaDeAgenda,
             EstadoAgenda = @EstadoAgenda,
             FechaRegristro = @FechaRegristro,
             EstadoRegsistro = @EstadoRegsistro,
             IdUsuario = @IdUsuario,
             Operacion = @Operacion
         WHERE  CodAgenda = @CodAgenda
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_SaveCuorumRepresentantes]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_SaveCuorumRepresentantes]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Legales].[CuorumRepresentantes]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodCuorum int = NULL,
    @CodActas int = NULL,
    @CodMiembro int = NULL,
    @Descripcion nvarchar(max) = NULL,
    @FechaRegistro date = NULL,
    @EstadoRegistro int = NULL,
    @IdUsuario int = NULL,
    @Operacion int = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Legales].[CuorumRepresentantes]
         WHERE  CodCuorum = @CodCuorum
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Legales].[CuorumRepresentantes]
         (
             CodActas,
             CodMiembro,
             Descripcion,
             FechaRegistro,
             EstadoRegistro,
             IdUsuario,
             Operacion
         )
         VALUES 
         (
             @CodActas,
             @CodMiembro,
             @Descripcion,
             @FechaRegistro,
             @EstadoRegistro,
             @IdUsuario,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Legales].[CuorumRepresentantes]
         SET CodActas = @CodActas,
             CodMiembro = @CodMiembro,
             Descripcion = @Descripcion,
             FechaRegistro = @FechaRegistro,
             EstadoRegistro = @EstadoRegistro,
             IdUsuario = @IdUsuario,
             Operacion = @Operacion
         WHERE  CodCuorum = @CodCuorum
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Legales].[p_SaveResoluciones]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Legales].[p_SaveResoluciones]
/***********************************************************
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Legales].[Resoluciones]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodResolucion int = NULL,
    @CodAcuerdo int = NULL,
    @IdReSolucion nvarchar(max) = NULL,
    @ReSolucion nvarchar(max) = NULL,
    @EstadoResolucion int = NULL,
    @FechaRegistro date = NULL,
    @EstadoRegistro int = NULL,
    @IdUsuario int = NULL,
    @Operacion int = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Legales].[Resoluciones]
         WHERE  CodResolucion = @CodResolucion
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Legales].[Resoluciones]
         (
             CodAcuerdo,
             IdReSolucion,
             ReSolucion,
             EstadoResolucion,
             FechaRegistro,
             EstadoRegistro,
             IdUsuario,
             Operacion
         )
         VALUES 
         (
             @CodAcuerdo,
             @IdReSolucion,
             @ReSolucion,
             @EstadoResolucion,
             @FechaRegistro,
             @EstadoRegistro,
             @IdUsuario,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Legales].[Resoluciones]
         SET CodAcuerdo = @CodAcuerdo,
             IdReSolucion = @IdReSolucion,
             ReSolucion = @ReSolucion,
             EstadoResolucion = @EstadoResolucion,
             FechaRegistro = @FechaRegistro,
             EstadoRegistro = @EstadoRegistro,
             IdUsuario = @IdUsuario,
             Operacion = @Operacion
         WHERE  CodResolucion = @CodResolucion
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [RRHH].[p_DeleteMiembros]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [RRHH].[p_DeleteMiembros]
/***********************************************************
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[RRHH].[Miembros]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodMiembro int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [RRHH].[Miembros]
    WHERE  CodMiembro = @CodMiembro

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [RRHH].[p_GetMiembros]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [RRHH].[p_GetMiembros]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[RRHH].[Miembros]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodMiembro int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodMiembro,
           CodCargo,
           CodClaustro,
           CodGradoAcademico,
           IdMiembro,
           pNombre,
           sNombre,
           pApellido,
           sApellido,
           FechaRegistro,
           EstadoRegistro,
           IdUsuario,
           Operacion 
    FROM [RRHH].[Miembros]
    WHERE  CodMiembro = @CodMiembro

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [RRHH].[p_SaveMiembros]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [RRHH].[p_SaveMiembros]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[RRHH].[Miembros]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodMiembro int = NULL,
    @CodCargo int = NULL,
    @CodClaustro int = NULL,
    @CodGradoAcademico int = NULL,
    @IdMiembro nvarchar(max) = NULL,
    @pNombre nvarchar(max) = NULL,
    @sNombre nvarchar(max) = NULL,
    @pApellido nvarchar(max) = NULL,
    @sApellido nvarchar(max) = NULL,
    @FechaRegistro date = NULL,
    @EstadoRegistro int = NULL,
    @IdUsuario int = NULL,
    @Operacion int = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [RRHH].[Miembros]
         WHERE  CodMiembro = @CodMiembro
    )
    BEGIN 
         -- insert new record
         INSERT INTO [RRHH].[Miembros]
         (
             CodMiembro,
             CodCargo,
             CodClaustro,
             CodGradoAcademico,
             IdMiembro,
             pNombre,
             sNombre,
             pApellido,
             sApellido,
             FechaRegistro,
             EstadoRegistro,
             IdUsuario,
             Operacion
         )
         VALUES 
         (
             @CodMiembro,
             @CodCargo,
             @CodClaustro,
             @CodGradoAcademico,
             @IdMiembro,
             @pNombre,
             @sNombre,
             @pApellido,
             @sApellido,
             @FechaRegistro,
             @EstadoRegistro,
             @IdUsuario,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [RRHH].[Miembros]
         SET CodMiembro = @CodMiembro,
             CodCargo = @CodCargo,
             CodClaustro = @CodClaustro,
             CodGradoAcademico = @CodGradoAcademico,
             IdMiembro = @IdMiembro,
             pNombre = @pNombre,
             sNombre = @sNombre,
             pApellido = @pApellido,
             sApellido = @sApellido,
             FechaRegistro = @FechaRegistro,
             EstadoRegistro = @EstadoRegistro,
             IdUsuario = @IdUsuario,
             Operacion = @Operacion
         WHERE  CodMiembro = @CodMiembro
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Seguridad].[p_DeleteRoles]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Seguridad].[p_DeleteRoles]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Seguridad].[Roles]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodRol int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Seguridad].[Roles]
    WHERE  CodRol = @CodRol

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Seguridad].[p_DeleteUsuario]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Seguridad].[p_DeleteUsuario]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        deleting records from table 
*                        [SIGA-CNU].[Seguridad].[Usuario]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @IdUsuario int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- start transaction
	BEGIN TRANSACTION

    -- delete record using the specified criteria, 1 record deletion is expected
    DELETE FROM [Seguridad].[Usuario]
    WHERE  IdUsuario = @IdUsuario

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

    -- check for errors
	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to delete record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    -- check for rows updated
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
		IF @rowcount = 0
            RAISERROR('Warning. No records found for the specified criteria, while just 1 was expected.', 10, 1) 
		ELSE
            RAISERROR('Critical error. More than 1 record found for the specified criteria, while just 1 was expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION
    RETURN 0
END
GO

/****** Object:  StoredProcedure [Seguridad].[p_GetRoles]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Seguridad].[p_GetRoles]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Seguridad].[Roles]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodRol int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT CodRol,
           idUsuario,
           NombreRol,
           EstadoRol,
           FechaRegistro,
           IdGrandUser,
           Operacion 
    FROM [Seguridad].[Roles]
    WHERE  CodRol = @CodRol

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [Seguridad].[p_GetUsuario]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Seguridad].[p_GetUsuario]
/***********************************************************
*
* Procedure description: This procedure is used for 
*                        retrieving records from table 
*                        [SIGA-CNU].[Seguridad].[Usuario]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @IdUsuario int
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT

    -- search and return records
    SELECT IdUsuario,
           IdMiembro,
           Usuario,
           Contrasenia,
           EstadoUsuario,
           FechaRegistro,
           EstadoRegistro,
           IdGrandUser,
           Operacion 
    FROM [Seguridad].[Usuario]
    WHERE  IdUsuario = @IdUsuario

     -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR

	IF @error != 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Unable to retrieve records. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount = 0
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. No records found for the specified criteria.', 16, 1) 
		RETURN 1
    END 
    IF @rowcount > 1 
    BEGIN
		-- report error and exit with non-zero exit code
        RAISERROR('Warning. More than 1 record found for the specified criteria, while just 1 is expected.', 10, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
	RETURN 0
END
GO


/****** Object:  StoredProcedure [Seguridad].[p_SaveRoles]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Seguridad].[p_SaveRoles]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Seguridad].[Roles]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @CodRol int = NULL,
    @idUsuario int = NULL,
    @NombreRol nvarchar(max) = NULL,
    @EstadoRol int = NULL,
    @FechaRegistro date = NULL,
    @IdGrandUser nvarchar(max) = NULL,
    @Operacion nvarchar(max) = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Seguridad].[Roles]
         WHERE  CodRol = @CodRol
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Seguridad].[Roles]
         (
             idUsuario,
             NombreRol,
             EstadoRol,
             FechaRegistro,
             IdGrandUser,
             Operacion
         )
         VALUES 
         (
             @idUsuario,
             @NombreRol,
             @EstadoRol,
             @FechaRegistro,
             @IdGrandUser,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Seguridad].[Roles]
         SET idUsuario = @idUsuario,
             NombreRol = @NombreRol,
             EstadoRol = @EstadoRol,
             FechaRegistro = @FechaRegistro,
             IdGrandUser = @IdGrandUser,
             Operacion = @Operacion
         WHERE  CodRol = @CodRol
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO


/****** Object:  StoredProcedure [Seguridad].[p_SaveUsuario]    Script Date: 30/01/2023 15:00:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Seguridad].[p_SaveUsuario]
/***********************************************************
*
* Procedure description: This procedure is used for adding 
*                        and updating records in table 
*                        [SIGA-CNU].[Seguridad].[Usuario]
* Date:   30/01/2023 
* Author: IBonilla
*
* Changes
* Date        Modified By            Comments
************************************************************
* 30/01/2023  IBonilla     Initial version
************************************************************/
(
    @IdUsuario int = NULL,
    @IdMiembro int = NULL,
    @Usuario nvarchar(max) = NULL,
    @Contrasenia nvarchar(max) = NULL,
    @EstadoUsuario int = NULL,
    @FechaRegistro date = NULL,
    @EstadoRegistro int = NULL,
    @IdGrandUser int = NULL,
    @Operacion int = NULL
)
AS
BEGIN
    SET NOCOUNT ON
    DECLARE @rowcount INT, @error INT, @id INT

    -- start transaction
	BEGIN TRANSACTION

    -- check if the specified record already exists, if yes, update it, if no, create it
    IF NOT EXISTS 
    (    
         SELECT * 
         FROM [Seguridad].[Usuario]
         WHERE  IdUsuario = @IdUsuario
    )
    BEGIN 
         -- insert new record
         INSERT INTO [Seguridad].[Usuario]
         (
             IdMiembro,
             Usuario,
             Contrasenia,
             EstadoUsuario,
             FechaRegistro,
             EstadoRegistro,
             IdGrandUser,
             Operacion
         )
         VALUES 
         (
             @IdMiembro,
             @Usuario,
             @Contrasenia,
             @EstadoUsuario,
             @FechaRegistro,
             @EstadoRegistro,
             @IdGrandUser,
             @Operacion
         )
    END 
    ELSE
    BEGIN
         -- update existing record
         UPDATE [Seguridad].[Usuario]
         SET IdMiembro = @IdMiembro,
             Usuario = @Usuario,
             Contrasenia = @Contrasenia,
             EstadoUsuario = @EstadoUsuario,
             FechaRegistro = @FechaRegistro,
             EstadoRegistro = @EstadoRegistro,
             IdGrandUser = @IdGrandUser,
             Operacion = @Operacion
         WHERE  IdUsuario = @IdUsuario
    END

    -- capture operation completion code and number of records affected
	SELECT @rowcount = @@ROWCOUNT, 
           @error = @@ERROR,
           @id = SCOPE_IDENTITY()

	IF @error != 0
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Unable to update or insert new record. See previous message for details.', 16, 1) 
		RETURN @error
    END
    IF @rowcount != 1 
    BEGIN
        -- cancel transaction, undo changes
        ROLLBACK TRANSACTION

		-- report error and exit with non-zero exit code
        RAISERROR('Critical error. More than 1 record found for the specified criteria, just 1 is expected.', 16, 1) 
		RETURN 1
    END 

    -- commit changes and return 0 code indicating successful completion
    COMMIT TRANSACTION

	-- if operation type 'Add record', return result set with the last inserted column value 
    IF @id IS NOT NULL
        SELECT @id AS NewRecordID
    RETURN 0
END
GO




